// Will invert the colors of an image by
// manipulating the pixels
"use strict";

module.exports = function(data, offset) {
  var wholeImg = data.slice(offset, data.length); // from the pixel offset to end of file
  for (var i = 0; i < wholeImg.length ; i++) {
    wholeImg.writeUInt8(255 - wholeImg.readUInt8(i), i);
  }
};
