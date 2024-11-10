let map;

function init() {
  // Latitude and longitude of the location
  const myLatlng = new google.maps.LatLng(14.2137, 121.1675);

  // Map options
  const mapOptions = {
    zoom: 7,
    center: myLatlng,
    scrollwheel: false,
    styles: [
      {
        featureType: "administrative.land_parcel",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "landscape.man_made",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "simplified" }, { lightness: 20 }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ hue: "#f49935" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ hue: "#fad959" }],
      },
      {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "road.local",
        elementType: "labels",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [{ hue: "#a1cdfc" }, { saturation: 30 }, { lightness: 49 }],
      },
    ],
  };

  // Initialize the map
  const mapElement = document.getElementById("map");
  map = new google.maps.Map(mapElement, mapOptions);

  // Define addresses
  const addresses = ["Brooklyn"];

  // Fetch geolocation data and place markers
  addresses.forEach((address) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=YOUR_API_KEY`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const p = data.results[0].geometry.location;
          const latlng = new google.maps.LatLng(p.lat, p.lng);
          new google.maps.Marker({
            position: latlng,
            map: map,
            icon: "images/loc.png",
          });
        } else {
          console.error(
            "Geocode was not successful for the following reason: " +
              data.status
          );
        }
      })
      .catch((error) => console.error("Error fetching geocode data:", error));
  });
}

// Initialize map on window load
google.maps.event.addDomListener(window, "load", init);
