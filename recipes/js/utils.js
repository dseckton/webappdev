import { fetchByUrl } from "./spoonacular.js";
import { createShopping, initCal } from "./main.js";

const ls = window.localStorage;
const main = qs("main");
const modal = qs(".modal");
let favArray = [];
let ingArray = [];
let favStyle = null;

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

export function buildList(element, listArray, option) {
    let ul = qs(element);
    let output;
    if (getLS("favorites") != null) {
        favArray = getLS("favorites");
        favArray = favArray.split(",");
    }
    ul.innerHTML = '';
    if (listArray.length === 0) {
        output = "<li>Sorry! We couldn't find any results...</li>"
    } else {
        output = "";
        for (let listItem of listArray) {
            if (listItem) {
                switch (option) {
                    case "search":
                        if (favArray.includes(listItem.id.toString())) {
                            favStyle = "fav";
                        } else {
                            favStyle = null;
                        };
                        output += 
                        `<li class="search-result">
                            <a class="open-recipe" data-recipe="${listItem.id}">
                                <img src="https://spoonacular.com/recipeImages/${listItem.imageUrls[0]}">
                                <span>${listItem.title}</span>
                            </a>
                            <a class="fav-item ${favStyle}" data-favid="${listItem.id}">
                            <svg height="25px" viewBox="0 -10 511.99143 511" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"/></svg>
                            </a>
                        </li>`;
                    break;
                    case "ingredients": output += 
                        `<li class="ingredient-result">
                            <span>${listItem.amount} ${listItem.unit}</span> <span>${listItem.name}</span>
                            <a class="add-ingredient" data-ingId="${listItem.id}">
                            &#10010;
                            </a>
                        </li>`;
                    break;
                    case "instructions": output += 
                        `<li class="instruction-result">
                            <span>${listItem.step}</span>
                        </li>`;
                    break;
                    case "favorites": output +=
                        `<li class="favorites-result">
                            <a class="open-recipe" data-recipe="${listItem.id}">
                                <img src="${listItem.image}">
                                <span>${listItem.title}</span>
                            </a>
                        </li>`
                    break;
                    case "shopping": output +=
                        `<li class="shopping-result">
                            <img src="https://spoonacular.com/cdn/ingredients_100x100/${listItem.image}" alt="${listItem.name}">
                            <span>${listItem.name}</span>
                            <a class="remove-ingredient" data-ingredient="${listItem.id}">&#10006;
                            </a>
                        </li>`
                    break;
                }
            }
        }
    }
    ul.innerHTML = output;
}

export function buildView(recipe, element) {
    if (favArray.includes(recipe.id.toString())) {
        favStyle = "fav";
    } else {
        favStyle = null;
    };
    element.innerHTML = `
        <div class="recipe-view">
            <img src="${recipe.image}" alt="">
            <h1>${recipe.title}</h1><span class="fav-span"><a class="fav-item ${favStyle}" data-favid="${recipe.id}">
            <svg height="48px" viewBox="0 -10 511.99143 511" width="48px" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"/></svg>
        </a></span>
            <h2>Ingredients</h2>
            <section class="ingredients">
                <ul>
                    <li>Ingredients not founds...</li>
                </ul>
            </section>
            <h2>Instructions</h2>
            <section class="instructions">
                <ol>
                    <li>Instructions not found...</li>
                </ol>
            </section>
        </div>
    `;
    buildList(".instructions ol", recipe.analyzedInstructions[0].steps, "instructions");
    buildList(".ingredients ul", recipe.extendedIngredients, "ingredients");
    buildAddIng();
    buildFavToggle();
}

export function buildSearch() {
    main.innerHTML = `
        <div class="search">
            <div class="search-bar">
                <input type="text" placeholder="Search for recipes"><button type="button"><svg xmlns="http://www.w3.org/2000/svg" height="25px" version="1.1" viewBox="-1 0 136 136.21852" width="25px">
                <g id="surface1">
                <path d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 " style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" />
                </g>
                </svg></button>
            </div>
            <ul>
            </ul>
        </div>
    `;
}

export function buildCalendar() {
    main.innerHTML = `
        <div class="calendar">
            <div class="calendar-week">
                <div class="calendar-day sun">
                    <span>Sunday</span>
                    <div class="meal breakfast" data-recipe=""></div>
                    <div class="meal lunch" data-recipe=""></div>
                    <div class="meal dinner" data-recipe=""></div>
                </div>
                <div class="calendar-day mon">
                    <span>Monday</span>
                    <div class="meal breakfast" data-recipe=""></div>
                    <div class="meal lunch" data-recipe=""></div>
                    <div class="meal dinner" data-recipe=""></div>
                </div>
                <div class="calendar-day tue">
                    <span>Tuesday</span>
                    <div class="meal breakfast" data-recipe=""></div>
                    <div class="meal lunch" data-recipe=""></div>
                    <div class="meal dinner" data-recipe=""></div>
                </div>
                <div class="calendar-day wed">
                    <span>Wednesday</span>
                    <div class="meal breakfast" data-recipe=""></div>
                    <div class="meal lunch" data-recipe=""></div>
                    <div class="meal dinner" data-recipe=""></div>
                </div>
                <div class="calendar-day thu">
                    <span>Thursday</span>
                    <div class="meal breakfast" data-recipe=""></div>
                    <div class="meal lunch" data-recipe=""></div>
                    <div class="meal dinner" data-recipe=""></div>
                </div>
                <div class="calendar-day fri">
                    <span>Friday</span>
                    <div class="meal breakfast" data-recipe=""></div>
                    <div class="meal lunch" data-recipe=""></div>
                    <div class="meal dinner" data-recipe=""></div>
                </div>
                <div class="calendar-day sat">
                    <span>Saturday</span>
                    <div class="meal breakfast" data-recipe=""></div>
                    <div class="meal lunch" data-recipe=""></div>
                    <div class="meal dinner" data-recipe=""></div>
                </div>
            </div>
        </div>
        <a class="reset">Reset Week</button>
        `;
}

export function buildFavToggle() {
    let favToggles = qsa(".fav-item");
    for (let toggle of favToggles) {
        toggle.addEventListener("click", (target) => {
            toggle.classList.toggle("fav");
            if (favArray.includes(target.currentTarget.dataset.favid)) {
                favArray.splice(favArray.indexOf(target.currentTarget.dataset.favid), 1);
            } else {
                favArray.push(target.currentTarget.dataset.favid)
            }
            setLS("favorites", favArray);
            if (favArray.length == 1 && favArray[0] == "") {
                ls.removeItem("favorites");
            }
        })
    }
}

export function buildRemoves() {
    let removeBtns = qsa(".remove-ingredient");
    for (let btn of removeBtns) {
        btn.addEventListener("click", (target) => {
            ingArray.splice(ingArray.indexOf(target.currentTarget.dataset.ingredient), 1);
            setLS("ingredients", ingArray);
            if (favArray.length == 1 && favArray[0] == "") {
                ls.removeItem("favorites");
            }
            createShopping();
        })
    }
}

export function buildFavorites() {
    main.innerHTML = `
        <div class="favorites">
            <ul>
            </ul>
        </div>
    `
}

export function buildShopList() {
    main.innerHTML = `
        <div class="shopping">
            <ul>
            </ul>
        </div>
    `
}

export function buildAddIng() {
    let addIng = qsa(".add-ingredient");
    for (let btn of addIng) {
        btn.addEventListener("click", (target) => {
            if (ingArray.includes(target.currentTarget.dataset.ingid)) {
                return;
            } else {
                ingArray.push(target.currentTarget.dataset.ingid);
                setLS("ingredients", ingArray);
            }
        })
    }
}

export function fetchRecipeById(id) {
    return fetchByUrl(`https://api.spoonacular.com/recipes/${id}/information?`);
}

export async function popCalendar(calObj) {
    let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    for (let day of days) {
        let dayB = qs("." + day + " .breakfast"), dayL = qs("." + day + " .lunch"), dayD = qs("." + day + " .dinner");

        dayB.dataset.recipe = calObj[day].breakfast;
        if (dayB.dataset.recipe != "") {
            await fetchRecipeById(dayB.dataset.recipe).then((myJson) => {
                dayB.innerHTML = `<a class="open-recipe" data-recipe="${myJson.id}">${myJson.title}</a>`;
            });
        } else {
            dayB.innerHTML = `<a class="add-meal" data-selector="${day}.breakfast">Add breakfast</a>`;
        }
        dayL.dataset.recipe = calObj[day].lunch;
        if (dayL.dataset.recipe != "") {
            await fetchRecipeById(dayL.dataset.recipe).then((myJson) => {
                dayL.innerHTML = `<a class="open-recipe" data-recipe="${myJson.id}">${myJson.title}</a>`;
            });
        } else {
            dayL.innerHTML = `<a class="add-meal" data-selector="${day}.lunch">Add lunch</a>`;
        }
        dayD.dataset.recipe = calObj[day].dinner;
        if (dayD.dataset.recipe != "") {
            await fetchRecipeById(dayD.dataset.recipe).then((myJson) => {
                dayD.innerHTML = `<a class="open-recipe" data-recipe="${myJson.id}">${myJson.title}</a>`;
            });
        } else {
            dayD.innerHTML = `<a class="add-meal" data-selector="${day}.dinner">Add dinner</a>`;
        }
    }
    buildModal();
    buildAddMeals();
}

export function buildModal() {
    let viewBuilds = qsa(".open-recipe");
    for (let viewBuild of viewBuilds) {
        viewBuild.addEventListener("click", (target) => {
            fetchRecipeById(target.currentTarget.dataset.recipe).then((myJson) => {
                buildView(myJson, modal);
                openModal();
            })
        })
    }
}

export function closeModal() {
    qs("main").classList.remove("modal-on");
    qs(".modal").classList.remove("on");
}

export function openModal() {
    qs("main").classList.add("modal-on");
    qs(".modal").classList.add("on");
}

export function buildAddMeals() {
    let addBtns = qsa(".add-meal");
    let mealStore = JSON.parse(getLS("meals"));
    for (let btn of addBtns) {
        btn.addEventListener("click", (target) => {
            let selector = target.currentTarget.dataset.selector;
            let mealType = selector.split(".");
            openModal();
            modal.innerHTML = `
                <div class="search">
                    <div class="search-bar">
                        <input type="text" placeholder="Search for a ${mealType[1]} recipe"><button type="button"><svg xmlns="http://www.w3.org/2000/svg" height="25px" version="1.1" viewBox="-1 0 136 136.21852" width="25px">
                        <g id="surface1">
                        <path d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 " style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;"></path>
                        </g>
                        </svg>
                    </button>
                    </div>
                    <ul>
                    </ul>
                </div>
            `;
            let searchVal = qs(".search-bar input");
            qs("button").addEventListener("click", () => {
                fetchByUrl(`https://api.spoonacular.com/recipes/search?query=${searchVal.value}&number=20&`)
                .then((myJson) => {
                    buildList(".search ul", myJson.results, "search");
                    buildFavToggle();
                    let searchRes = qsa(".open-recipe");
                    for (let result of searchRes) {
                        result.addEventListener("click", (target) => {
                            mealStore[mealType[0]][mealType[1]] = target.currentTarget.dataset.recipe;
                            setLS("meals", JSON.stringify(mealStore));
                            closeModal();
                            initCal();
                        })
                    }
                })
            })
        })
    }
}