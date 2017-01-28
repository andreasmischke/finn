export function range(startOrEnd, end = null, step = 1) {

    if(arguments.length < 1) {
        end = 0;
        startOrEnd = 0;
    } else if(end === null) {
        end = startOrEnd;
        startOrEnd = 0;
    }

    var range = [];

    while(startOrEnd != end) {
        range.push(startOrEnd);
        startOrEnd += step;
    }
    return range;
}

export function shuffle(arr) {
    let shuffled = [],
        array = arr.slice(0);

    while(array.length > 0) {
        let rand = Math.floor(Math.random() * array.length);
        shuffled.push(array.splice(rand, 1)[0]);
    }

    return shuffled;
}

class DomElementDraft {
    constructor(tag) {
        this.el = document.createElement(tag);
    }
    class(clazz) {
        this.el.classList.add(clazz);
        return this;
    }
    id(id) {
        this.el.setAttribute('id', id);
        return this;
    }
    attr(name, value) {
        this.el.setAttribute(name, value);
        return this;
    }
    style(property, value) {
        this.el.style.setProperty(property, value);
        return this;
    }
    text(text) {
        this.el.textContent = text;
        return this;
    }
    adopt(child) {
        this.el.appendChild(child);
        return this;
    }
    click(func) {
        this.el.addEventListener('click', func);
        return this;
    }
    render() {
        return this.el;
    }
}

export function create_element(tag) {
    return new DomElementDraft(tag);
}

export function to_array(array_like) {
    return Array.prototype.slice.call(array_like);
}

export function check_args() {
    for(let i = 1; i < arguments.length; i++) {
        if(arguments[i] != typeof(arguments[0][i-1])) {
            return false;
        }
    }
    return true;
}
