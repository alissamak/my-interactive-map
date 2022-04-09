
// foursquare key: fsq3883VuFRctHJpVP1ZKXU5feHeGKjhWQtREQmPUxlWm8o=
//get user location
const myMap = L.map('map');
async function userCoord(){
    const location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    console.log(location);
    console.log([location.coords.latitude, location.coords.longitude]);
    //get lat and lng coords
    lat = location.coords.latitude
    lng = location.coords.longitude
    // create map based on coords
    myMap.setView([lat, lng],15);
    // myMap.locate({setView: true, maxZoom: 16})
    
    //create coords marker
    const marker = L.marker([lat, lng])
    marker.addTo(myMap).bindPopup('<p1><b>You are Here!</b></p1>').openPopup()
    
    //returns person coords to the map
    return myMap;
};
//call coords
userCoord();

// add openstreetmap tiles to map
const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '5',
}).addTo(myMap);

//add eventListener for businesses
const coffee = document.querySelector('.coffee');
const restaurant = document.querySelector('.restuarnt');
const hotel = document.querySelector('.hotel');
const market = document.querySelector('.market');

const goBtn = document.querySelector('.go-btn');
const clickBtn = goBtn.addEventListener('click', () => {
    
});

// //fetching foursquare apis
// var businessStats = {
//         business: ["coffee", "restaurant", "hotel", "market"],
//         limit: 10,
//         // lat: ,
//         // long ,
// }

async function getcoffee(){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3883VuFRctHJpVP1ZKXU5feHeGKjhWQtREQmPUxlWm8o='
        }
      };
      
    // let response = fetch(`https://api.foursquare.com/v3/places/search?query=${business}&ll=${lat}%2C${lon}&radius=10000&limit=${limit}`, options)     
    let response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=35.83%2C-79.02&limit=10', options) 
    let data = await response.text();
    let parsedData = JSON.parse(data);
    let coffee = parsedData.results;
    console.log(coffee);
    coffee.forEach(element => {
        let coffeeLat = element.geocodes.main.latitude;
        let coffeeLng = element.geocodes.main.longitude;
        let coffeeName = element.name;
        // console.log(element.geocodes.main)
        let coffeeCoords = [coffeeLat, coffeeLng]
        
        const marker = L.marker(coffeeCoords)
        marker.addTo(myMap).bindPopup(coffeeName).openPopup()
    });
    // return coffee;

}
getcoffee();

// async function getcoffee(){
//     const options = {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           Authorization: 'fsq3883VuFRctHJpVP1ZKXU5feHeGKjhWQtREQmPUxlWm8o='
//         }
//       };
      
//     // let response = fetch(`https://api.foursquare.com/v3/places/search?query=${business}&ll=${lat}%2C${lon}&radius=10000&limit=${limit}`, options)     
//     let response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=35.83%2C-79.02&limit=10', options) 
//     let data = await response.text();
//     let parsedData = JSON.parse(data);
//     let coffee = parsedData.results;
//     console.log(coffee);
//     coffee.forEach(element => {
//         let coffeeLat = element.geocodes.main.latitude;
//         let coffeeLng = element.geocodes.main.longitude;
//         let coffeeName = element.name;
//         // console.log(element.geocodes.main)
//         let coffeeCoords = [coffeeLat, coffeeLng]
        
//         const marker = L.marker(coffeeCoords)
//         marker.addTo(myMap).bindPopup(coffeeName).openPopup()
//     });
//     // return coffee;

// }
// getcoffee();
// // fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`)

// //adding layer controls
// const coffees = L.layerGroup([]).addTo(myMap); 
// const restaurants = L.layerGroup([]).addTo(myMap);
// const hotels = L.layerGroup([]).addTo(myMap);
// const markets = L.layerGroup([]).addTo(myMap);

// var baseMaps = {
//     "main": baseLayer
// };
    
// var overlayMaps = {
//     "coffee": coffees,
//     "restaurant": restaurants,
//     "hotel": hotels,
//     "market": markets,
// };

// L.control.layers(baseMaps, overlayMaps).addTo(myMap);