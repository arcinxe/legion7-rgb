
var ledsData = require("./leds");

// console.log(packets)

var HID = require('node-hid');
console.log("im alive")
var devices = HID.devices()
var deviceInfo = devices.find(function (d) {
    var isKeyboard = d.vendorId === 0x048D && d.productId === 0xC956
    return isKeyboard
});
if (deviceInfo) {
    var device = new HID.HID(deviceInfo.path)
    console.log({ deviceInfo, device })
    // ... use device




    var result = ledsData.leds.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 180)
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])
console.log({result})
    result.forEach(chunk => {
        console.log(`trying write ${chunk.length}`)

        device.sendFeatureReport([0x07, 0xa1, 0x2f, 0x00, ...chunk])
    })
}

