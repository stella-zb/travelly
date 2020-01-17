# Travelly

A collaborative travel itinerary generator app that creates itineraries for users based on their picked attractions, city and travel dates.

The app uses Foursquare API and Hiking Project API to provide recommendations, Google Place API (Place AutoComplete, Geolocation and Direction) to create itineraries, and Mapbox to provide a map view for the trip.

## Tech Stack
- React
- Node.js/Express
- TypeScript
- Styled Components
- PostgreSQL


## Contributors
- [Stella](https://github.com/stella-zb)
- [Michelle](https://github.com/mchllsrgr)
- [Sherry](https://github.com/sherrynganguyen)


## Running the app

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.