export function qs(query) {
    return document.querySelector(query);
}

export function qsa(query) {
    return document.querySelectorAll(query);
}

export function bindTouch(selector, callback) {
    qs(selector).addEventListener('touchend', function(e) {
        e.preventDefault;
        callback();
    });
    qs(selector).addEventListener('click', function(e) {
        callback();
    });
}