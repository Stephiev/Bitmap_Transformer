"use strict";

// Your project should be able to take a transform as a callback that
// will be run once the bitmap file has been read into a buffer.
var fs = require("fs");
var invertPixels = require("./lib/invertPixels.js");
var invertPalette = require("./lib/invertPalette.js");

fs.readFile("./bitmap2.bmp", function(err, data) {

var bitMapFileHeader = {
   type: data.slice(0, 2).toString("ascii"),
   size: data.readUInt32LE(2), // in bytes
   pixelOffset: data.readUInt32LE(10)
};

// var dibHeader = {
//   sizeDib: data.readUInt32LE(14),
//   imgWidth: data.readUInt32LE(18),
//   imgHeight: data.readUInt32LE(22),
//   paletteNum: data.readUInt32LE(46)
// };

if (bitMapFileHeader.pixelOffset == 54) {
  invertPixels(data, bitMapFileHeader.pixelOffset);
 } else {
  invertPalette(data, bitMapFileHeader.pixelOffset);
}

  fs.writeFile("newBit2.bmp", data, function(err) {
    if (err) { throw err; }
    console.log("It\'s saved!");
  });
});
