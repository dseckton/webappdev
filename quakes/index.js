import { getJSON, getLocation } from "./utilities.js";

const testUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-02-02"

function concatURL(firstUrl, geolocation) {
    return firstUrl + `&latitude=${geolocation.coords.latitute}&longitude=${geolocation.coords.longitude}&maxradiuskm=100`;
}

async function start() {
    const loc = await getLocation();
    
}
getJSON(testUrl).then((response)=>{
    console.log(response);
})


getJSON(concatURL(testUrl, getLocation));