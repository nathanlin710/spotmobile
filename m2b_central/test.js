// based on the example on https://www.npmjs.com/package/@abandonware/noble

const noble = require('@abandonware/noble');

const uuid_service = "1101"
const uuid_value = "2101"

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    console.log("start scanning")
    await noble.startScanningAsync([uuid_service], false);
  } else {
    console.error('Bluetooth is not powered on.');
  }
});

noble.on('peripheralConnect', (peripheral) => {
  console.log('Connected to peripheral:', peripheral);
});

noble.on('peripheralDisconnect', (peripheral) => {
  console.log('Disconnected from peripheral:', peripheral);
});

noble.on('servicesDiscover', (services) => {
  console.log('Discovered services:', services);
});

noble.on('characteristicsDiscover', (characteristics) => {
  console.log('Discovered characteristics:', characteristics);
});

noble.on('read', (data, isNotification) => {
  console.log('Read data:', data);
});

noble.on('readError', (error) => {
  console.error('Read error:', error);
});


noble.on('discover', async (peripheral) => {
  console.log('Discovered peripheral:', peripheral);

  await noble.stopScanningAsync();
  await peripheral.connectAsync();

  const services = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], [uuid_value]);
  console.log('Discovered services:', services);

  const {characteristics} = services;
  console.log('Discovered characteristics:', characteristics);

  readData(characteristics[0]);
});


//
// read data periodically
//
let readData = async (characteristic) => {
  const value = (await characteristic.readAsync());
  console.log(value.readFloatLE(0));

  // read data again in t milliseconds
  setTimeout(() => {
    readData(characteristic)
  }, 100);
}