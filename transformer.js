"use strict";

// Your project should be able to take a transform as a callback that
// will be run once the bitmap file has been read into a buffer.

function run(file, fileName, callback) {

var fs = require("fs");
var invertPixels = require("./lib/invertPixels.js");
var invertPalette = require("./lib/invertPalette.js");

fs.readFile(file, function(err, data) {

var bitMapFileHeader = {
   type: data.slice(0, 2).toString("ascii"),
   size: data.readUInt32LE(2), // in bytes
   pixelOffset: data.readUInt32LE(10)
};

if (bitMapFileHeader.pixelOffset == 54) {
  invertPixels(data, bitMapFileHeader.pixelOffset);
 } else {
  invertPalette(data, bitMapFileHeader.pixelOffset);
}

  fs.writeFile(fileName, data, function(err) {
    if (err) { throw err; }
    console.log("The inverted file is saved at " + fileName + "!");
    if (typeof callback === "function") {
    callback();
    }
    });
  });
}

module.exports = run;
