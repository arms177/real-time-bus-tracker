mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtczE3NyIsImEiOiJjbGFjcHlnbGswMGJlM25xenczdzhkbmZ5In0.b8oJALQCUG6d1bUIb7HCJA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14
});

const marker = new mapboxgl.Marker()
  .setLngLat([-71.092761, 42.357575])
  .addTo(map);

async function run(){
  // get bus data
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);

  let counter = 0;
  if (counter >= locations.length) return;
  marker.setLngLat(locations[counter]);
  counter++;
  // timer
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  return json.data;
}

run();
