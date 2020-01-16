const router = require("express").Router();
const GOOGLE_KEY = process.env.GOOGLE_API_KEY;
const FOURSQUARE_KEY = process.env.FOURSQUARE_API_KEY;
const FOURSQUARE_SECRET = process.env.FOURSQUARE_SECRET_KEY;
const HIKING_KEY = process.env.HIKING_API;
const TIX_KEY = process.env.TIX_API;
const axios = require("axios");
const moment = require("moment");

const { addFSData } = require("../helpers/addFSData");

const cityImgData = {
  VANCOUVER:
    "https://vancouver.ca/images/cov/feature/about-vancouver-landing-size.jpg",
  TORONTO:
    "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  DUBAI:
    "https://www.thenational.ae/image/policy:1.869199:1569838554/bz03-Money-col.jpg?f=16x9&w=1200&$p$f$w=5ab25ec",
  TOKYO:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  LONDON:
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  "NEW YORK CITY":
    "https://img.theculturetrip.com/768x432/wp-content/uploads/2019/01/fda03y.jpg",
  SYDNEY:
    "https://media-cdn.tripadvisor.com/media/photo-c/2560x500/08/d8/b7/f1/sydney-opera-house-sydney.jpg",
  OTHERS:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqH_sN0GBELqyCXJmZAqovNQ7f_4EUBFSnP-OOTdTmEF1HGw2jXA&s"
};

module.exports = db => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  router.get("/", (req, res) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.city}&types=geocode&language=en&key=${GOOGLE_KEY}`
      )
      .then(results => {
        console.log(results.data);
        res.json(results.data);
      });
  });

  router.post("/", (req, res) => {
    // res.setHeader('Expires', '-1');
    // res.setHeader('Cache-Control', 'no-cache');
    console.log("Post itinerary successfully");
    let itinerariesId;
    const userId = req.query.user;
    let { city, tripStart, tripEnd } = req.body;
    city = city.toUpperCase();
    cityImgData[city]
      ? (cityImg = cityImgData[city])
      : (cityImg = cityImgData.OTHERS);
    db.query(
      `SELECT * FROM itineraries
      WHERE city = $1 AND trip_start = $2 AND trip_end = $3;
      `,
      [city, tripStart, tripEnd]
    ).then(query => {
      const data = query.rows[0];
      console.log("get itinerary from database", data);
      if (!data) {
        db.query(
          `INSERT INTO itineraries (
              city, city_img, trip_start, trip_end
            ) VALUES (
              $1, $2, $3, $4
            )
            RETURNING id;
            `,
          [city, cityImg, tripStart, tripEnd]
        )
          .then(query => {
            itinerariesId = query.rows[0].id;
            return db.query(
              `INSERT INTO user_itinerary (
                  user_id, itinerary_id
                ) VALUES (
                  $1, $2
                )
                `,
              [userId, itinerariesId]
            );
          })
          .then(() => res.json(itinerariesId))
          .catch(err => {
            console.log(err);
            res.sendStatus(500);
          });
      } else {
        res.json(data.id);
      }
    });
  });

  router.get("/:itinerariesId", (req, res) => {
    const attractionList = [];
    const itinerariesId = req.params.itinerariesId;
    let city;
    let tripStart;
    let tripEnd;

    db.query(
      `SELECT city, trip_start, trip_end FROM itineraries
      WHERE  itineraries.id = $1;
      `,
      [itinerariesId]
    ).then(query => {
      city = query.rows[0].city;
      tripStart = query.rows[0].trip_start;
      tripEnd = query.rows[0].trip_end;

      city.toUpperCase();
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_KEY}`
        )
        .then(results => {
          const { lat, lng } = results.data.results[0].geometry.location;
          return Promise.all([
            axios.get(
              `https://api.foursquare.com/v2/venues/explore?near=${city}?&limit=20&client_id=${FOURSQUARE_KEY}&client_secret=${FOURSQUARE_SECRET}&v=20200120`
            ),
            axios.get(
              `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=150&key=${HIKING_KEY}`
            )
            // axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=${TIX_KEY}&latlong=${lat},${lng}`)
          ]);
        })
        .then(([res1, res2]) => {
          console.log("First api successfully");
          addFSData(res1.data.response.groups[0].items, attractionList);

          // return Promise.all(
          //   attractionList.map(attraction => {
          //     return axios.get(
          //       `https://api.foursquare.com/v2/venues/${attraction.id}/photos?client_id=${FOURSQUARE_KEY}&client_secret=${FOURSQUARE_SECRET}&v=20200120`
          //     );
          //   })
          // ).then(results => {
          //   attractionList.map((attraction, index) => {
          //     attraction.photo =
          //       results[index].data.response.photos.items[0].prefix +
          //       "500x500" +
          //       results[index].data.response.photos.items[0].suffix;
          //   });
          for (let trail of res2.data.trails) {
            if (trail.imgMedium !== "") {
              attractionList.push({
                id: trail.id,
                name: trail.name,
                description: trail.summary,
                review: trail.stars,
                lat: trail.latitude,
                long: trail.longitude,
                open_time: 32400,
                close_time: 64800,
                visit_duration: 21600,
                photo: trail.imgMedium,
                location: trail.location,
                category: "TRAILS"
              });
            }
          }
          // });

          // for (let event of results[2].data._embedded.events) {
          //   const test = moment.utc(event.dates.start.dateTime).format();
          //   console.log(test)
          //   attractionList.push({
          //     id: event.id,
          //     name: event.name,
          //     description: event.info,
          //     review: '',
          //     lat: event._embedded.venues[0].location.latitude,
          //     long: event._embedded.venues[0].location.longitude,
          //     open_time: event.dates.start.dateTime,
          //     close_time: '',
          //     visit_duration: 180,
          //     photo: event.images[0].url,
          //     location: event._embedded.venues[0].name
          //   })
          //   // console.log('check time format', moment.utc(event.dates.start.dateTime).local().format())
          // }
        })
        .then(() => {
          // console.log("List of Attractions", attractionList);
          res.json([attractionList, city]);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    });
  });

  router.post(`/:itinerariesId/`, (req, res) => {
    console.log("Adding attraction to database");
    const {
      name,
      description,
      review,
      lat,
      long,
      open_time,
      close_time,
      visit_duration,
      photo,
      location
    } = req.body.attraction;
    const itinerariesId = req.params.itinerariesId;
    db.query(
      `SELECT * FROM attractions
      JOIN timeslots on attractions.id = timeslots.attraction_id
      WHERE name = $1;
      `,
      [name]
    ).then(query => {
      console.log(query.rows[0]);
      const itinerary = query.rows[0];
      // console.log(itinerary)
      if (!itinerary) {
        db.query(
          `INSERT INTO attractions (
              name,
              description,
              review,
              latitude,
              longitude,
              open_time,
              close_time,
              visit_duration,
              photo,
              location,
              submitted_by
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            )
            RETURNING id;
            `,
          [
            name,
            description,
            review ? review : null,
            lat,
            long,
            open_time,
            close_time,
            visit_duration,
            photo,
            location,
            req.query.user
          ]
        ).then(query => {
          const activityId = query.rows[0].id;
          db.query(
            `INSERT INTO timeslots (
                start_time,
                end_time,
                itinerary_id,
                attraction_id
              ) VALUES (
                $1, $2, $3, $4
              )`,
            [null, null, itinerariesId, activityId]
          );
        });
      }
    });
  });

  return router;
};

// module.exports = routes;
