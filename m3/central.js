// // based on the example on https://www.npmjs.com/package/@abandonware/noble

// const noble = require('@abandonware/noble');
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app); // Create an HTTP server
// const io = socketIO(server); // Attach Socket.io to the server
// const port = 3000;

// const uuid_service = "1101"
// const uuid_value1 = "2101"
// const uuid_value2 = "2102"
// const uuid_value3 = "2103"

// app.set('view engine', 'ejs');

// const path = require('path');

// // Set the 'public' directory as the location for static files
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.post('/', (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'application/json'
//     });
//     res.end(JSON.stringify({
//         sensorValue: sensorValue
//     }));
// });

// server.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

// let sensorValue = NaN

// noble.on('stateChange', async (state) => {
//     if (state === 'poweredOn') {
//         console.log("start scanning")
//         await noble.startScanningAsync([uuid_service], false);
//     }
// });

// noble.on('discover', async (peripheral) => {
//     await noble.stopScanningAsync();
//     await peripheral.connectAsync();
//     const {
//         characteristics
//     } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], [uuid_value1, uuid_value2, uuid_value3]);
//     readData(characteristics)
// });

// let readData = async (characteristics) => {
//     const xCharacteristic = characteristics[0];
//     const yCharacteristic = characteristics[1];
//     const zCharacteristic = characteristics[2];

//     const xValue = await xCharacteristic.readAsync();
//     const yValue = await yCharacteristic.readAsync();
//     const zValue = await zCharacteristic.readAsync();

//     const x = xValue.readFloatLE(0);
//     const y = yValue.readFloatLE(0);
//     const z = zValue.readFloatLE(0);

//     console.log(`X: ${x}, Y: ${y}, Z: ${z}`);

//     io.emit('gyroscopeData', { x: x, y: y, z: z });

//     // Read data again in t milliseconds
//     setTimeout(() => {
//         readData(characteristics);
//     }, 50);
// };



// based on the example on https://www.npmjs.com/package/@abandonware/noble

const noble = require('@abandonware/noble');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIO(server); // Attach Socket.io to the server
const port = 3000;

const uuid_service = "1101"
const uuid_value1 = "2101"
const uuid_value2 = "2102"
const uuid_value3 = "2103"
const uuid_value4 = "2104"
const uuid_value5 = "2105"
const uuid_value6 = "2106"

app.set('view engine', 'ejs');

const path = require('path');

// Set the 'public' directory as the location for static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        sensorValue: sensorValue
    }));
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

let sensorValue = NaN

noble.on('stateChange', async (state) => {
    if (state === 'poweredOn') {
        console.log("start scanning")
        await noble.startScanningAsync([uuid_service], false);
    }
});

noble.on('discover', async (peripheral) => {
    await noble.stopScanningAsync();
    if (!peripheral.connected) {
        await peripheral.connectAsync();

        const { characteristics: characteristics1 } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], [uuid_value1, uuid_value2, uuid_value3]);
        readData(characteristics1, peripheral.id);

        // Second set of characteristics
        const { characteristics: characteristics2 } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], [uuid_value4, uuid_value5, uuid_value6]);
        readData(characteristics2, peripheral.id);

        // Continue scanning for more peripherals
        await noble.startScanningAsync([uuid_service], false);
    }
});

let readData = async (characteristics, id) => {
    if (!characteristics) {
        console.error(`No characteristics found for Arduino: ${id}`);
        return;
    }

    const xCharacteristic = characteristics[0];
    const yCharacteristic = characteristics[1];
    const zCharacteristic = characteristics[2];

    if (!xCharacteristic || !yCharacteristic || !zCharacteristic) {
        console.error(`Missing characteristics for Arduino: ${id}`);
        return;
    }

    const xValue = await xCharacteristic.readAsync();
    const yValue = await yCharacteristic.readAsync();
    const zValue = await zCharacteristic.readAsync();

    if (!xValue || !yValue || !zValue) {
        console.error(`Error reading values for Arduino: ${id}`);
        return;
    }

    const x = xValue.readFloatLE(0);
    const y = yValue.readFloatLE(0);
    const z = zValue.readFloatLE(0);

    console.log(`Arduino: ${id}, X: ${x}, Y: ${y}, Z: ${z}`);

    io.emit('gyroscopeData', { id: id, x: x, y: y, z: z });

    // Read data again in t milliseconds
    setTimeout(() => {
        readData(characteristics, id);
    }, 50);
};
