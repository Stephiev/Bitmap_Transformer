// Uses the image's color palette to
// invert the colors
"use strict";

module.exports =  function(data, offset) {
  var palette = data.slice(54, offset);
  for (var j = 0; j < 256 * 4; j++) {
    palette.writeUInt8(255 - palette.readUInt8(j), j);
    }
  };
