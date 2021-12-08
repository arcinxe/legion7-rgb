
var packetsData = require("./packets");

// console.log(packets)

var HID = require('node-hid');
Array.prototype.zeroFill = function (len) {
    for (var i = this.length; i < len; i++) {
        this[i] = 0;
    }
    return this;
};
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
    for (let i = 0; i <= 200; i++) {
        console.log(`trying write ${i}/200`)
        let values = packetsData.packets[i % 4]
    console.log("values to write", values, values.length)
    device.sendFeatureReport(values)
        console.log(`written data ${i}/200`, values)
    }
}

