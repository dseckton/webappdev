export function qs(query) {
    return document.querySelector(query);
}

export function qsa(query) {
    return document.querySelectorAll(query);
}

export function bindTouch(element, callback) {
    element.addEventListener('touchend', function(e) {
        callback();
        e.preventDefault;
    });
    element.addEventListener('click', function(e) {
        callback();
        // e.preventDefault;
    });
}

export function getLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}