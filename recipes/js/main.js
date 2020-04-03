"use strict"
import { fetchByUrl } from './spoonacular.js';
import { qs, qsa, getLS, setLS, buildList, buildView, buildSearch, buildFavToggle, buildFavorites, buildShopList, buildCalendar, popCalendar, fetchRecipeById, closeModal, buildModal, buildRemoves, buildAddMeals } from './utils.js';

const random = qs("#random");
const search = qs("#search");
const favorites = qs("#favorites");
const shopping = qs("#shopping");
const calendar = qs("#calendar");

const main = qs("main");

let favObjArray = [];

let mealprep = {
    sun: {
        breakfast: "",
        lunch: "",
        dinner: ""
    },
    mon: {
        breakfast: "",
        lunch: "",
        dinner: ""
    },
    tue: {
        breakfast: "",
        lunch: "",
        dinner: ""
    },
    wed: {
        breakfast: "",
        lunch: "",
        dinner: ""
    },
    thu: {
        breakfast: "",
        lunch: "",
        dinner: ""
    },
    fri: {
        breakfast: "",
        lunch: "",
        dinner: ""
    },
    sat: {
        breakfast: "",
        lunch: "",
        dinner: ""
    }
}

initCal();

if (getLS("meals") == null) {
    resetCal();
}

function resetCal() {
    setLS("meals", JSON.stringify(mealprep));
    initCal();
}

random.addEventListener("click", () => {
    closeModal();
    fetchByUrl("https://api.spoonacular.com/recipes/random?")
    .then((myJson) => {
        let data = myJson.recipes[0];
        buildView(data, main);
    })
});

search.addEventListener("click", () => {
    closeModal();
    buildSearch();
    const searchText = qs(".search-bar input");
    qs(".search-bar button").addEventListener("click", () => {
        fetchByUrl(`https://api.spoonacular.com/recipes/search?query=${searchText.value}&number=20&`)
        .then((myJson) => {
            buildList(".search ul", myJson.results, "search");
            buildFavToggle();
            buildModal();
        })
    })
})

favorites.addEventListener("click", createFavs)

async function createFavs() {
    closeModal();
    if (getLS("favorites") != null) {
        let favIDs = getLS("favorites").split(',');
        if (favIDs.length > 1 || (favIDs.length == 1 && !favIDs.includes(""))) {
            favObjArray = [];
            for (let id of favIDs) {
                await fetchRecipeById(id)
                .then((myJson) => {
                    favObjArray.push(myJson);
                })
            }
            buildFavorites();
            buildList(".favorites ul", favObjArray, "favorites");
            buildModal();
        } else {
            qs("main").innerHTML = "<span>You don't have any favorites yet.</span>"
        }
    } else {
        qs("main").innerHTML = "<span>You don't have any favorites yet.</span>"
    }
    
}

shopping.addEventListener("click", createShopping)

export async function createShopping() {
    closeModal();
    if (getLS("ingredients") != null) {
        let ingIds = getLS("ingredients").split(",");
        if (ingIds.length > 1 || (ingIds.length == 1 && !ingIds.includes(""))) {
            let ingObjArray = [];
            for (let id of ingIds) {
                await buildIngObjArray(id)
                .then((myJson) => {
                    ingObjArray.push(myJson);
                })
            }
            buildShopList();
            buildList(".shopping ul", ingObjArray, "shopping")
        } else {
            qs("main").innerHTML = `<span>You don't have anything in your shopping list yet.</span>`;
        }
    } else {
        qs("main").innerHTML = `<span>You don't have anything in your shopping list yet.</span>`;
    }
    buildRemoves();
}

function buildIngObjArray(id) {
    return fetchByUrl(`https://api.spoonacular.com/food/ingredients/${id}/information?`);
}

calendar.addEventListener("click", initCal);

export function initCal() {
    let mealStore = JSON.parse(getLS("meals"));
    closeModal();
    buildCalendar();
    popCalendar(mealStore);
    qs(".reset").addEventListener("click", resetCal);
}