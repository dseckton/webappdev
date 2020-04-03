const apiKey = "apiKey=f6423277c7f44d5b9cc1a26bbfcbc3a1";

export function fetchByUrl(url) {
    return fetch(url+apiKey)
    .then((response) => {
        if (!response.ok) {
            console.log(response);
            console.log("Unfortunately, the Spoonacular API restricts how many I requests I make per day, so it's possible that my quota has been reached already. Sorry about that! Please try again in a day or two.")
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

