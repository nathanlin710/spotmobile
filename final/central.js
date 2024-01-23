// const noble = require('@abandonware/noble');
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const SpotifyWebApi = require('spotify-web-api-node');
// const spotifyAuthCallbackPath = '/callback';

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
// const port = 3000;

// const uuid_service = "6a2d19f4-2fbf-4e56-94eb-c24f1474a68c";
// const uuid_value1 = "1e0f8133-7955-4d59-9852-5ec6c33fd674";
// const uuid_value2 = "c7e87136-267e-4c28-bb55-983ca3ec210d";

// app.set('view engine', 'ejs');
// app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.post('/', (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'application/json'
//     });
//     res.end(JSON.stringify({
//         sensorValue: sensorValue
//     }));
// });

// app.get(spotifyAuthCallbackPath, (req, res) => {
//     const authorizationCode = req.query.code;
//     console.log('Authorization Code:', authorizationCode);
//     res.send('Authorization Successful! You can close this window.');
// });

// server.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

// let sensorValue = NaN;

// // Spotify API credentials
// const clientId = '8b7cc3fbdc07402184feded066a4af9d';
// const clientSecret = 'd227bd52d1524bea96b8b06b8caa5bc8';
// const redirectUri = 'http://localhost:3000/callback'; // Update with your redirect URI

// // Create a new SpotifyWebApi instance
// const spotifyApi = new SpotifyWebApi({
//     clientId: clientId,
//     clientSecret: clientSecret,
//     redirectUri: redirectUri,
// });

// // Use the authorization code flow to authenticate with Spotify
// // For simplicity, you can manually obtain an access token and refresh token using the Spotify API authorization guide.

// // Your Spotify access token (replace with a valid token)
// const accessToken = 'BQCuYvliStAAHVW2Uz4Exana2y5nt-zkuHPxD_AR6lB92pYL8hdTJjCbMeXQU1Y52JL5esSYtl91r5HESdDIYGPRGaipK09HL1XdEFhn1xeiRFNA8zU8-VBqngudKT0vxugwWENTJ17rzb3OvO5xa9hTKR_I2sUzQ_Q_qgsgQDF1Rc67AzkUTuYTSgDidDOZP0BvQd3KnpA';

// // Set the access token
// spotifyApi.setAccessToken(accessToken);

// noble.on('stateChange', async (state) => {
//     if (state === 'poweredOn') {
//         console.log("start scanning");
//         await noble.startScanningAsync([uuid_service], false);
//     }
// });

// noble.on('discover', async (peripheral) => {
//     await noble.stopScanningAsync();
//     await peripheral.connectAsync();
//     const {
//         characteristics
//     } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], [uuid_value1, uuid_value2]);
//     readData(characteristics);
// });

// let readData = async (characteristics) => {
//     const xCharacteristic = characteristics[0];
//     const yCharacteristic = characteristics[1];

//     const xValue = await xCharacteristic.readAsync();
//     const yValue = await yCharacteristic.readAsync();

//     const x = xValue.readFloatLE(0);
//     const y = yValue.readFloatLE(0);

//     // Adjust sensitivity by multiplying sensorValue with a scaling factor
//     const scalingFactor = 1; // Adjust this value as needed
//     const scaledYValue = y * scalingFactor;

//     console.log(`X: ${x}, Y: ${scaledYValue}`);

//     io.emit('gyroscopeData', { x, y: scaledYValue });

//     // Example: Skip to the next track if Y value is below a threshold
//     if (scaledYValue < -0.8) {
//         console.log('Skip to next track');
//         await spotifyApi.skipToNext();
//     }

//     // Example: Go to the previous track if Y value is above a threshold
//     if (scaledYValue > 0.8) {
//         console.log('Go to previous track');
//         await spotifyApi.skipToPrevious();
//     }

//     // Get the current playback state
//     const playbackState = await spotifyApi.getMyCurrentPlaybackState();

//     // Example: Pause/Play Spotify if X value is above/below a threshold
//     if (x > 0.8) {
//         // Check if playbackState is defined and has the expected structure
//         if (playbackState && playbackState.body.is_playing !== undefined) {
//             // Check if playback is currently playing
//             if (playbackState.body.is_playing) {
//                 console.log('Pause Spotify');
//                 await spotifyApi.pause();
//             }
//         }
//     } else if (x < -0.8) {
//         // Check if playbackState is defined and has the expected structure
//         if (playbackState && playbackState.body.is_playing !== undefined) {
//             // Check if playback is currently paused
//             if (!playbackState.body.is_playing) {
//                 console.log('Play Spotify');
//                 await spotifyApi.play();
//             }
//         }
//     }

//     // Read data again in t milliseconds
//     setTimeout(() => {
//         readData(characteristics);
//     }, 50);
// };

// // Generate Access Token
// // Authorization Code
// // AQCi_AKXW_SCuUwTB9cFPDOnLsI70BqInZ8uD6my_-JQ9Q238FC9kkOe0oH5Ive6oQq0JC-RN8ftLKOdnjkniXp8FZ8UaUx6frJWEfC51Kpd6KWHQmaDpahuXPX5HUPcWrX6Xxw5uG_T4zbVuWVs70hrQc_cqi7MwQnHEW6XGoHUQjN5JXSyT-fqBlzGAZIZmBkJDrpyRwbxEvM9Q5W__-P6g6hpKO9BeT-8q9qQgtHzoYgOOrKhkpWsZm4sz_BFKEK7QbfDVSa8HVPVvu7w_uB5zIDCy3qDNWY9Tw
// // curl -d client_id=8b7cc3fbdc07402184feded066a4af9d -d client_secret=d227bd52d1524bea96b8b06b8caa5bc8 -d grant_type=authorization_code -d code=AQCi_AKXW_SCuUwTB9cFPDOnLsI70BqInZ8uD6my_-JQ9Q238FC9kkOe0oH5Ive6oQq0JC-RN8ftLKOdnjkniXp8FZ8UaUx6frJWEfC51Kpd6KWHQmaDpahuXPX5HUPcWrX6Xxw5uG_T4zbVuWVs70hrQc_cqi7MwQnHEW6XGoHUQjN5JXSyT-fqBlzGAZIZmBkJDrpyRwbxEvM9Q5W__-P6g6hpKO9BeT-8q9qQgtHzoYgOOrKhkpWsZm4sz_BFKEK7QbfDVSa8HVPVvu7w_uB5zIDCy3qDNWY9Tw -d redirect_uri=http://localhost:3000/callback https://accounts.spotify.com/api/token

// // Use Refresh Token
// // AQDDD0p-dLM4V7eFAOc1xl0XwMYoUoNvW2ej5AHXGhioQ60gG6RSMlocM-03D8x6u4_hFhzA2ppHqzO5rTeJUPF2V8P5K4QcnSxt-ZnT6Cd_82dSCfjgR3RxeVvpszIBPc0
// // curl -d client_id=8b7cc3fbdc07402184feded066a4af9d -d client_secret=d227bd52d1524bea96b8b06b8caa5bc8 -d grant_type=refresh_token -d refresh_token=AQDO-bbYkD7n12EI4So_nEgYf7NGSyFU3W6-N1s0rnMz5GkhdqG64UrGF1OMG7tgY0qU-iKbl9I8pl8Ycspjz7XlhN0m3XTx2nQXZYKRQkiwcEBHUDG-T94P2BoUj02vCQI https://accounts.spotify.com/api/token






// based on the example on https://www.npmjs.com/package/@abandonware/noble

const noble = require('@abandonware/noble');
const crypto = require('crypto');
var querystring = require('querystring');
const fetch = require("node-fetch");
// require('dotenv').config()

const uuid_service = "6a2d19f4-2fbf-4e56-94eb-c24f1474a68c"
// const uuid_values = ["2101", "2102", "2103", "2104", "2105", "2106"]
const uuid_values = ["1e0f8133-7955-4d59-9852-5ec6c33fd674", "c7e87136-267e-4c28-bb55-983ca3ec210d"]

let ax = NaN
let ay = NaN
let az = NaN
let gx = NaN
let gy = NaN
let gz = NaN

// let ay = NaN
// let az = NaN

noble.on('stateChange', async (state) => {
    if (state === 'poweredOn') {
        console.log("start scanning")
        await noble.startScanningAsync([uuid_service], false);
    }
});

noble.on('discover', async (peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const {
        characteristics
    } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], uuid_values);
    console.log(characteristics)
    readData(characteristics)
});

//
// read data periodically
//
let readData = async (characteristics) => {
    let axvalue = (await characteristics[0].readAsync());
    ax = (axvalue.readFloatLE(0).toFixed(10))
    let ayvalue = (await characteristics[1].readAsync());
    ay = (ayvalue.readFloatLE(0).toFixed(10))
    // let azvalue = (await characteristics[2].readAsync());
    // az = (azvalue.readFloatLE(0).toFixed(10))
    // let gxvalue = (await characteristics[3].readAsync());
    // gx = (gxvalue.readFloatLE(0).toFixed(10))
    // let gyvalue = (await characteristics[4].readAsync());
    // gy = (gyvalue.readFloatLE(0).toFixed(10))
    // let gzvalue = (await characteristics[5].readAsync());
    // gz = (gzvalue.readFloatLE(0).toFixed(10))



    // read data again in t milliseconds
    setTimeout(() => {
        readData(characteristics)
    }, 10);
}

//
// hosting a web-based front-end and respond requests with sensor data
// based on example code on https://expressjs.com/
//
const express = require('express');
const { access } = require('fs');
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // if (req.query.access_token) {
        res.render('index', { access_token: req.query.access_token });
    // } else {
    //     res.render('index')
    // }
    
})

app.post('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        ax,
        ay,
        // az,
        // gx,
        // gy,
        // gz
    }))
})

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let values = []
    for (let i = 0; i < length; i+=1) {
        values.push(crypto.randomInt(possible.length))
    }

    // const values = window.crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

var client_id = "8b7cc3fbdc07402184feded066a4af9d";
var client_secret = "d227bd52d1524bea96b8b06b8caa5bc8"
var redirect_uri = 'http://127.0.0.1:3000/callback';

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-playback-state user-modify-playback-state';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});


app.get('/callback', async function(req, res) {

    var code = req.query.code || null;
    var state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
        let form = {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        }
        let formData = new URLSearchParams(form).toString();
        console.log(form)
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        }
      const accessTokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        body: formData,
        headers: headers,
      })
      const accessTokenData = await accessTokenResponse.json();
        console.log(accessTokenData["access_token"]);
        accessToken = accessTokenData["access_token"]
        res.redirect('/?access_token=' + accessToken);
    }
  });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})