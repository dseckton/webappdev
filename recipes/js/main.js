"use strict"
import { fetchByUrl } from './spoonacular.js';
import { qs, qsa, getLS, setLS } from './utils.js';

// const btn1 = qs("#btn1");

// const btn2 = qs("#btn2");

// btn1.addEventListener("click", () => {
//     let data = fetchByUrl("https://api.spoonacular.com/recipes/search");
//     data.then((myJson) => {
//         console.log(myJson);
//     });
// });

// btn2.addEventListener("click", () => {
//     let data = fetchByUrl("https://api.spoonacular.com/recipes/random");
//     data.then((myJson) => {
//         console.log(myJson.recipes[0].analyzedInstructions[0].steps);
//     })
// })


let data = fetchByUrl("https://api.spoonacular.com/recipes/search");
    data.then((myJson) => {
    console.log(myJson);
});