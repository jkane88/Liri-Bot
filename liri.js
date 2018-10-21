const inquirer = require('inquirer');
const movie_this = require('./modules/movie_this');
const concert_this = require('./modules/concert_this');
const spotify_song = require('./modules/spotify_song');

let liriCount = 0;

function startLIRI() {

    let message = (liriCount === 0) ? 'Choose Task' : 'Next Task?';
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        choices: ['spotify-song', 'concert-this', 'movie-this', 'do-what-it-says', 'exit'],
        message: message
    }]).then((inqResult) => {

        switch (inqResult.choice) {
            case 'spotify-song':
                getUserInput('Enter a song to search for:', spotify_song.findSong);
                break;
            case 'concert-this':
                getUserInput('Enter a band to search for:', concert_this.findBand);
                break;
            case 'movie-this':
                getUserInput('Enter a move title to search for:', movie_this.findMovie);
                break;
            case 'exit':
                console.log('Goodbye');
                setTimeout(() => {
                    console.clear();
                }, 1000);
                break;
            default:
                break;
        }

        liriCount++;
    });
}

function getUserInput(message, callback) {
    inquirer.prompt([{
        type: 'input',
        name: 'userInput',
        message: message
    }]).then((inqRes) => {
        console.clear();
        callback(inqRes.userInput, startLIRI);
    });
}


 
startLIRI();

