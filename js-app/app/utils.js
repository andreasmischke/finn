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
