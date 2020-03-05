const apiKey = "?apiKey=f6423277c7f44d5b9cc1a26bbfcbc3a1";

export function fetchByUrl(url) {
    return fetch(url+apiKey)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        return response.json();
    })
    .then((myJson) => {
        return myJson;
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

