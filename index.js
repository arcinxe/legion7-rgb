#!/usr/bin/env node

let ledsData = require("./leds");
const yargs = require("yargs");

const HID = require('node-hid');
const devices = HID.devices()
const deviceInfo = devices.find(function (d) {
    const isKeyboard = d.vendorId === 0x048D && d.productId === 0xC956
    return isKeyboard
});
const options = yargs
    .option('k', { alias: 'keys', describe: 'Set the color of all the keyboard keys', type: 'string', demandOption: false })
    .option('n', { alias: 'neon', describe: 'Set the color of the front bottom neon', type: 'string', demandOption: false })
    .option('v', { alias: 'vents', describe: 'Set the color of the back vents', type: 'string', demandOption: false })
    .option('l', { alias: 'logo', describe: 'Set the color of the back lid LEGION logo', type: 'string', demandOption: false })
    .argv

const parseHexColor = hexValue => {
    const regex = /^\#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i
    const hexColorTest = regex.exec(hexValue)
    if (hexColorTest)
        return [hexColorTest[1], hexColorTest[2], hexColorTest[3]]
            .map(v => parseInt(v, 16))
    return null
}
if (deviceInfo) {
    const device = new HID.HID(deviceInfo.path)
    // console.log({ deviceInfo, device })
    const keysColor = parseHexColor(options.k)
    const neonColor = parseHexColor(options.n)
    const ventsColor = parseHexColor(options.v)
    const logoColor = parseHexColor(options.l)

    // update colors
    if (keysColor) {
        console.log({ keysColor })
        ledsData.leds = ledsData.leds.map((led, idx) => {
            return idx % 4 > 0 && idx < (145 * 4) ? keysColor[(idx % 4) - 1] : led;
        })
    }
    if (logoColor) {
        const ledIndex = 145;
        console.log({ logoColor })
        ledsData.leds[ledIndex * 4 + 1] = logoColor[0]
        ledsData.leds[ledIndex * 4 + 2] = logoColor[1]
        ledsData.leds[ledIndex * 4 + 3] = logoColor[2]
    }
    if (neonColor) {
        const ledIndex = 146;
        console.log({ neonColor })
        ledsData.leds[ledIndex * 4 + 1] = neonColor[0]
        ledsData.leds[ledIndex * 4 + 2] = neonColor[1]
        ledsData.leds[ledIndex * 4 + 3] = neonColor[2]
    }
    if (ventsColor) {
        const ledIndex = 147;
        console.log({ ventsColor })
        ledsData.leds[ledIndex * 4 + 1] = ventsColor[0]
        ledsData.leds[ledIndex * 4 + 2] = ventsColor[1]
        ledsData.leds[ledIndex * 4 + 3] = ventsColor[2]
    }



    // split all the bytes into less than 192 byte chunks
    const result = ledsData.leds.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 180)
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])
    result.forEach((chunk, idx) => {
        console.log(`writing packet #${idx}`)
        // seems like each packet needs those bytes at the beginning
        device.sendFeatureReport([0x07, 0xa1, 0x2f, 0x00, ...chunk])
    })
}

