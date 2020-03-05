const ls = window.localStorage;

export function qs(selector) {
    return document.querySelector(selector);
}

export function qsa(selector) {
    return document.querySelectorAll(selector);
}

export function getLS(key) {
    return ls.getItem(key);
}

export function setLS(key, value) {
    ls.setItem(key, value);
}