const button = document.querySelector("#lbut");
const map = document.querySelector("#map");

button.addEventListener("click", () => {
    button.innerText = "Fetching Location...";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        button.innerText = "Geolocation Not Supported!";
    }
});

function success(pos) {
    const { latitude: lat, longitude: long } = pos.coords;

    // Display latitude and longitude
    button.innerText = `Latitude: ${lat.toFixed(2)}, Longitude: ${long.toFixed(2)}`;

    // Display the map with the user's location
    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${long - 0.05},${lat - 0.05},${long + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${long}`;
    map.style.display = "block";
}

function error(err) {
    if (err.code === 1) {
        button.innerText = "Permission Denied!";
    } else if (err.code === 2) {
        button.innerText = "Location Unavailable!";
    } else {
        button.innerText = "Something Went Wrong!";
    }
    button.setAttribute("disabled", "true");
}
