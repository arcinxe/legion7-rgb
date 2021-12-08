
var HID = require('node-hid');
Array.prototype.zeroFill = function (len) {
    for (var i = this.length; i < len; i++) {
        this[i] = 0;
    }
    return this;
};
console.log("im alive")
var devices = HID.devices();
var deviceInfo = devices.find( function(d) {
    var isKeyboard = d.vendorId===0x048D && d.productId===0xC956;
    return isKeyboard;
});
if( deviceInfo ) {
  var device = new HID.HID( deviceInfo.path );
  console.log({deviceInfo, device})
  // ... use device

  console.log("trying write")
  let values = [0x0, 0x07, 0xa1, 0xb4, 0x00, 0x60, 0x00, 0x00, 0x00, 0x6b, 0x00, 0x00, 0x00, 0x5e, 0x00, 0x00, 0x00, 0x61, 0x00, 0x00, 0x00, 0x56, 0x00, 0x00, 0x00, 0x57, 0x00, 0x00, 0x00, 0x36, 0x00, 0x00, 0x00, 0x34, 0x00, 0x00, 0x00, 0x35, 0x00, 0x00, 0x00, 0x32, 0x00, 0x00, 0x00, 0x33, 0x00, 0x00, 0x00, 0x30, 0x00, 0x00, 0x00, 0x31, 0x00, 0x00, 0x00, 0x2e, 0x00, 0x0f, 0xff, 0x2f, 0x00, 0x00, 0x00, 0x2c, 0xff, 0x00, 0x0c, 0x2d, 0x00, 0xff, 0x00, 0x2b, 0x00, 0x00, 0x00, 0xa6, 0x00, 0x00, 0x00, 0x93, 0x00, 0x00, 0x00, 0xa4, 0x00, 0x00, 0x00, 0x8f, 0x00, 0x00, 0x00, 0x91, 0x00, 0x00, 0x00, 0x7d, 0x00, 0x00, 0x00, 0x7a, 0x00, 0x00, 0x00, 0x65, 0x00, 0x00, 0x00, 0x66, 0x00, 0x00, 0x00, 0xa8, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x68, 0x00, 0x00, 0x00, 0x3b, 0x00, 0x00, 0x00, 0xa0, 0x00, 0x00, 0x00, 0x9e, 0x00, 0x00, 0x00, 0xa2, 0x00, 0x00, 0x00, 0x39, 0x00, 0x00, 0x00, 0x3a, 0x00, 0x00, 0x00, 0x37, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0x62, 0x00, 0x00, 0x00, 0x63, 0x00, 0x00, 0x00, 0x99, 0x00, 0x00, 0x00, 0x8b, 0x00, 0x00, 0x00, 0x89, 0x00, 0x00, 0x00, 0x8a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0];

  device.sendFeatureReport(values)
console.log("written data", values)
}

