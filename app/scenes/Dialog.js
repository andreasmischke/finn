import {check_args, create_element} from "../utils";

class Timeout {
    constructor(callable, delay) {
        this.remaining_time = delay;
        this.callable = callable;
        this.__run(delay);
    }

    __run(delay) {
        const self = this;
        self.target_time = delay + (+new Date());
        self.timeout = setTimeout(function() {
            self.state = 'completed';
            self.remaining_time = 0;
            self.callable();
        }, delay);
        self.state = 'running';
    }

    pause() {
        clearInterval(this.timeout);
        if(this.state == 'running') {
            this.remaining_time = this.target_time - (+new Date());
            if(this.remaining_time < 1) {
                this.state = 'cancelled';
            } else {
                this.state = 'paused';
            }
        }
    }

    resume() {
        if(this.state == 'paused') {
            this.__run(this.remaining_time);
        }
    }

    cancel() {
        clearInterval(this.timeout);
        if(this.state !== 'completed') {
            this.state = 'cancelled';
            this.remaining_time = 0;
        }
    }

    toString() {
        return `Timeout ${this.state}; ${this.remaining_time} remaining`;
    }

    toSource() {
        return `${this.toString()}; ${this.callable.toSource()}`;
    }
}

export default class Dialog {

    constructor() {
        this.bubbles = {};
        this.items = [];
        this.current = 0;
        this.timeout = undefined;
        this.draft = undefined;
    }

    add_bubble(name) {
        const bubble = create_element("div")
                .class('dialog_bubble')
                .class('dialog_bubble_' + name)
                .click(this.next.bind(this))
                .render();
        this.bubbles[name] = bubble;
        return bubble;
    }

    process_draft() {
        if(this.draft != undefined) {
            if(this.draft.type == 'text') {
                this.add_text.apply(this, this.draft.args);
            } else {
                this.add_callable.apply(this, this.draft.args);
            }
            this.draft = undefined;
        }
    }

    let(name) {
        this.process_draft();
        this.draft = {type: 'text', args: [name, '', 0]};
        return this;
    }

    say(text) {
        if(this.draft == undefined) {
            throw "Who shall say that?! Give me a name via let() first";
        }
        if(this.draft.type != 'text') {
            throw "A function cannot say anything";
        }
        this.draft.args[1] = text;
        return this;
    }

    do(callable) {
        this.process_draft();
        this.draft = {type: 'func', args: [callable, null, 0]};
        return this;
    }

    wait(time) {
        if(this.draft == undefined) {
            throw "Nothing to do for that amount of time";
        }
        this.draft.args[2] = time;
        return this;
    }

    then(callable) {
        if(this.draft == undefined) {
            throw "No draft to append this exit function to";
        }
        if(this.draft.type != 'func') {
            throw "Cannot append exit function to text item";
        }
        this.draft.args[1] = callable;
        return this;
    }

    add() {
        const argc = arguments.length;

        if(argc == 2 && check_args(arguments, "function", "number")) {
            this.add_callable.call(this, arguments[0], null, arguments[1]);
        } else if(argc == 3 && check_args(arguments, "function", "function", "number")) {
            this.add_callable.apply(this, arguments);
        } else if(argc == 3 && check_args(arguments, "string", "string", "number")) {
            this.add_text.apply(this, arguments);
        } else {
            console.error('Cannot identify parameters', arguments);
        }
        return this;
    }

    add_text(speaker, text, time) {
        if(speaker in this.bubbles) {
            const bubble = this.bubbles[speaker],
                  enter = function() {
                      bubble.classList.add('dialog_bubble_visible');
                      bubble.textContent = text;
                  },
                  exit = function() {
                      bubble.classList.remove('dialog_bubble_visible');
                      bubble.textContent = '';
                  };
            this.add_callable(enter, exit, time);
        } else {
            console.warn(`cannot add text, since speaker ${speaker} has no bubble`);
        }
    }

    create_speaker_function(bubble, text) {
        return function() {
            bubble.textContent = text;
        }
    }

    add_callable(enter, exit, time) {
        this.items.push({callable: enter, time: time});
        if(exit !== null) {
            this.items.push({callable: exit, time: 0});
        }
    }

    play() {
        this.process_draft();
        const item = this.items[this.current];
        if(item !== undefined) {
            item.callable();
            this.timeout = new Timeout(this.play.bind(this), item.time);
            this.current = this.current + 1;
        }
        return this;
    }

    pause() {
        this.timeout && this.timeout.pause();
        return this;
    }

    resume() {
        this.timeout && this.timeout.resume();
        return this;
    }

    rewind() {
        const state = this.timeout.state || 'cancelled';
        this.timeout && this.timeout.cancel();
        this.current = 0;
        if(state == 'playing') {
            this.play();
        }
        return this;
    }

    prev() {
        this.current = Math.max(0, this.current - 2);
        return this;
    }

    next() {
        this.timeout && this.timeout.cancel();
        this.play();
        return this;
    }

    stop() {
        this.timeout && this.timeout.cancel();
        return this;
    }
}
