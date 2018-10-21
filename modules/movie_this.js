require('dotenv').config();
const keys = require('../modules/keys');
const request = require('request');
const omdbKey = keys.omdb.key;
let movie;

function findMovie(movieTitle, callback) {
    const _movieTitle = ((movieTitle) ? movieTitle : 'Mr Nobody');

    let url = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${_movieTitle}&type=movie&r=json&plot=short`;
    request(url, (error, response, body) => {

        if (!error && response.statusCode === 200) {

            const result = JSON.parse(body);

            setMovie(result);
            printMovieInfo(_movieTitle, movie);

            callback();

        } else {

            console.log('No results');
            return callback();
        }
    });

}

function setMovie(sourceData) {
    movie = {
        title: sourceData.Title,
        year: sourceData.Year,
        plot: sourceData.Plot,
        actors: sourceData.Actors,
        country: sourceData.Country,
        language: sourceData.Language,
        rating: {
            rottenTomatoes: sourceData.Ratings[1].Value,
        },
    };
}

function printMovieInfo(search, movie) {

    // Set Rotten Tomatoes ratings colors based on the rating
    let rotTomRating = parseFloat(movie.rating.rottenTomatoes.replace('%', ''));
    let rotTomColor = ((rotTomRating > 50));

    console.log(`\n\n\rResults of search: "${(search)}":\n\n`);
    console.log(`Title:     ${(movie.title)}`);
    console.log(`Year:      ${(movie.year)}`);
    console.log(`RottenTomatoes: ${(movie.rating.rottenTomatoes)}`);
    console.log(`Country:   ${(movie.country)}`);
    console.log(`Actors:    ${(movie.actors)}`);
    console.log(`Plot:      ${(movie.plot)}`);
    console.log('-----\n');
}

module.exports = { findMovie };
