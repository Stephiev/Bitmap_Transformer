"use strict";

var expect = require("chai").expect;
var transformer = require("../transformer.js");
var fs = require("fs");

describe("transformer.js", function() {
  describe("bmp without a palette", function() {
    beforeEach(function(done) {
      transformer("./test/Support/Images/bitmap2.bmp", "./test/Support/temp/newBit2.bmp");
      done();
    });
    it("should invert the pixel array", function(done) {
      var newImage = fs.readFileSync("./test/Support/temp/newBit2.bmp");
      var orgImage = fs.readFileSync("./test/Support/Images/bitmap2.bmp");
      for (var i = 54; i < newImage.length; i++) {
        expect(newImage.readUInt8(i)).to.eql(255 - orgImage.readUInt8(i));
      }
      done();
     });
  });
  describe("bmp with a palette", function(done) {
    beforeEach(function(done) {
      transformer("./test/Support/Images/bitmap1.bmp", "./test/Support/temp/newBit1.bmp");
      done();
    });

    it("should invert the color palette", function(done) {
      var newImage = fs.readFileSync("./test/Support/temp/newBit1.bmp");
      var orgImage = fs.readFileSync("./test/Support/Images/bitmap1.bmp");
      var offset = orgImage.readUInt32LE(10);
      for (var i = 54; i < offset ; i++) {
        expect(newImage.readUInt8(i)).to.eql(255 - orgImage.readUInt8(i));
      }
      done();
    });
  });
});
