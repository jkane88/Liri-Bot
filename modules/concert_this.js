require('dotenv').config();
const keys = require('../modules/keys');
const moment = require('moment');
const request = require('request');
const bandsintownID = keys.bandsInTown.id;
let concert;
let concerts;

function findBand(bandName, callback) {
    const _bandName = ((bandName) ? bandName : 'Led Zeppelin');
    const url = `https://rest.bandsintown.com/artists/${_bandName}/events?app_id=${bandsintownID}`;

    request(url, (error, response, body) => {

        if (!error && response.statusCode === 200 && util.requestValidated(body)) {

            const results = JSON.parse(body);

            concerts = [];
            for (var i = 0; i < results.length && i < 3; i++) {
                addConcertToArray(results[i]);
            }

            printConcerts(_bandName);
            callback();

        } else if (!util.requestValidated(body)) {

            console.log('No Results');
            return callback();

        } else {

            console.log(error);
            return callback();
        }
    });

    util.appendCommandLog('concert-this', _bandName);
}

function addConcertToArray(dataSource) {
    concert = {
        venue: {
            name: dataSource.venue.name,
            country: dataSource.venue.country,
            region: dataSource.venue.region,
            city: dataSource.venue.city,
        },
        dateTime: moment(dataSource.datetime).format('MMM Do, YYYY @ hh:mm a'),
        artist: dataSource.lineup[0],
        lineup: dataSource.lineup.slice(1, this.length).join(', '),
    }

    if (concert.venue.region != '') {
        concert.venue.region = ', ' + concert.venue.region;
    }

    concerts.push(concert);
}

function printConcerts(bandName) {
    if (concerts.length > 0) {

        console.log(`\n\n\r Concerts that are coming up: ${(concerts[0].artist)}:\n\n`);

        concerts.forEach((concert) => {
            console.log(`Lineup:   ${(concert.artist)}, ${concert.lineup}`);
            console.log(`Country:  ${(concert.venue.country)}`);
            console.log(`City:     ${(`${concert.venue.city}${concert.venue.region}`)}`);
            console.log(`When:     ${concert.dateTime}`);
            console.log(`Venue:    ${concert.venue.name}`);
        });
    } else {

        console.log(`No concerts found for "${(bandName)}".`);
        
    }
}

module.exports = {findBand};