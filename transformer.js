"use strict";

// Your project should be able to take a transform as a callback that
// will be run once the bitmap file has been read into a buffer.
var fs = require("fs");
var invertPixels = require("./lib/invertPixels.js");
var invertPalette = require("./lib/invertPalette.js");

function run(file, fileName, callback) {
  fs.readFile(file, function(err, data) {

    var bitMapFileHeader = {
      type: data.slice(0, 2).toString("ascii"), // Was not used in the program.
      size: data.readUInt32LE(2), // In bytes. Was not used in the program but wanted to keep it.
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
