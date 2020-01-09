const kmeans = require('node-kmeans');

// sample data
const data = [
  {
    "id": 14,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 9,
    "travel_mode": null,
    "name": "Central Park",
    "description": null,
    "review": 5,
    "latitude": 40.785091,
    "longitude": -73.968285,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://lonelyplanetimages.imgix.net/a/g/hi/t/e169d0c6394f2e1f46eea3f653f2b7b4-central-park.jpg",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  },
  {
    "id": 15,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 10,
    "travel_mode": null,
    "name": "Ellis Island",
    "description": null,
    "review": 5,
    "latitude": 40.6997222,
    "longitude": -74.0394444,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://lonelyplanetimages.imgix.net/a/g/hi/t/10dde96588c6cddf880e59c2f99f1fdd-ellis-island.jpg",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  },
  {
    "id": 16,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 11,
    "travel_mode": null,
    "name": "Metropolitan Museum of Art",
    "description": null,
    "review": 5,
    "latitude": 40.778965,
    "longitude": -73.962311,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://static01.nyt.com/images/2019/03/21/arts/21metcontemp-item1/2121metcontemp-item1-jumbo.jpg",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  },
  {
    "id": 17,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 12,
    "travel_mode": null,
    "name": "Empire State Building",
    "description": null,
    "review": 5,
    "latitude": 40.748817,
    "longitude": -73.985428,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/33/e6.jpg",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  },
  {
    "id": 18,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 13,
    "travel_mode": null,
    "name": "Brooklyn Bridge",
    "description": null,
    "review": 5,
    "latitude": 40.70569,
    "longitude": -73.99639,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://loving-newyork.com/wp-content/uploads/2016/07/Brooklyn-Bridge_170614090305011-1600x960.jpg",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  },
  {
    "id": 19,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 14,
    "travel_mode": null,
    "name": "Statue of Liberty",
    "description": null,
    "review": 5,
    "latitude": 40.689247,
    "longitude": -74.044502,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  },
  {
    "id": 20,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 15,
    "travel_mode": null,
    "name": "Coney Island",
    "description": null,
    "review": 5,
    "latitude": 40.57788,
    "longitude": -73.99403,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://lp-cms-production.imgix.net/features/2019/08/amusement-coney-island-shutterstockRF_332266760-08ffe08a73d3.jpg",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  },
  {
    "id": 21,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 16,
    "travel_mode": null,
    "name": "Grand Central Terminal",
    "description": null,
    "review": 5,
    "latitude": 40.752655,
    "longitude": -73.977295,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://untappedcities-wpengine.netdna-ssl.com/wp-content/uploads/2013/03/Grand-Central-Terminal-Aerial-View-from-Glass-Walkways-NYC.jpg",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  },
  {
    "id": 22,
    "start_time": null,
    "end_time": null,
    "itinerary_id": 3,
    "attraction_id": 17,
    "travel_mode": null,
    "name": "American Museum of Natural History",
    "description": null,
    "review": 5,
    "latitude": 40.7809345,
    "longitude": -73.9737497,
    "open_time": null,
    "close_time": null,
    "visit_duration": null,
    "photo": "https://d21xlh2maitm24.cloudfront.net/nyc/natural-history-museum.jpg?",
    "location": null,
    "submitted_by": null,
    "city": "New York City",
    "city_img": "https://lonelyplanetimages.imgix.net/a/g/hi/t/21c6ef0ba96e0ce5107a91c4506e2df7-statue-of-liberty.jpg",
    "trip_start": "1591747200",
    "trip_end": "1592179200"
  }
];


const transitTime = [[23, 34, 40, 15], [15]]; //total transit time between attractions as in minutes (will fetch from google direction API)
let itineraries = [];
let vectors = new Array();
for (let i = 0; i < data.length; i++) {
  vectors[i] = [data[i]['latitude'], data[i]['longitude']];
}

// calculate number of days for the trip
const getDays = (start, end) => {
  return Math.round((end - start) / 86400)
};

// K refers to number of days
const cluster = kmeans.clusterize(vectors, { k: getDays(data[0].trip_start, data[0].trip_end) }, (err, res) => {
  if (err) console.error(err);
  else {
    // console.log('%o',res);
    return res;
  }
});

//Loop through the result from kmeans function to get the array of attractions

cluster.groups.forEach(element => {
  for (let i in element.clusterInd) {
    element.clusterInd[i] = data[element.clusterInd[i]]
  }
  itineraries.push(element.clusterInd);
});


// calculate distance from point x to point y  - used for findNextDestination to compare distances
const getDistance = (x, y) => {
  let latDiff = x.latitude - y.latitude;
  let longDiff = x.longitude - y.longitude;
  return Math.sqrt(Math.pow(latDiff, 2) + Math.pow(longDiff, 2));
};

// find next closest destination - from "start" point, loop through all points available, and go to the nearest location point
const findNextDestination = (start, options) => {
  let distances = [];
  for (let i = 0; i < options.length; i++) {
    distances.push(getDistance(start, options[i]));
  }
  return options[distances.indexOf(Math.min(...distances))];
};

// get schedule for day (the order/sequence of destinations from morning to night) by picking one random "start point" and always going to closest attraction point
const getSchedule = (day) => {
  let schedule = [];
  schedule.push(day[0]);
  day.splice(0, 1);

  while (day.length > 0) {
    let nextDestination = findNextDestination(schedule[schedule.length - 1], day);
    schedule.push(nextDestination)
    day.splice(day.indexOf(nextDestination), 1)
  }

  return schedule;
}
// console.log('FIRST DAY', getSchedule(itineraries[0]))
// console.log('SECOND DAY', getSchedule(itineraries[1]))
// console.log('THIRD DAY', getSchedule(itineraries[2]))
// console.log('FOURTH DAY', getSchedule(itineraries[3]))
// console.log('FIFTH DAY', getSchedule(itineraries[4]))

// formate the dataset 
// loop internary array
// getSchedule(iternary[i])
const getTimeForSchedule = (array) => {
  let dataset = []
  for (let i = 0; i < array.length; i++) {
    // console.log(`Day${i + 1}`, getSchedule(array[i]))
    dataset.push(getSchedule(array[i]))
  }
  return dataset
}

// console.log(getTimeForSchedule(itineraries))
const trip = getTimeForSchedule(itineraries);

// axios callback function for google direction api


// nest loop to conditional making google api direction axios request call
const getTravelTime = (array, axiosCallback) => {
  for (let i = 0; i < array.length; i++) {
    console.log('NEW DAY')
    for (let j = 0; j < array[i].length; j++) {
      // console.log(typeof array[i][j])
      if (array[i][j + 1]) {
        if (typeof array[i][j] === 'object' && typeof array[i][j + 1] === 'object') {
          // console.log('GET DIRECTIONS FROM', array[i][j].name, 'TO', array[i][j + 1].name)
          const origin = `${array[i][j].latitude},${array[i][j].longitude}`
          const destination = `${array[i][j + 1].latitude},${array[i][j + 1].longitude}`
          // console.log(`get direction from ${origin} to ${destination}`)
          axiosCallback(origin, destination)
        }
      }
    }
  }
}
getTravelTime(trip)