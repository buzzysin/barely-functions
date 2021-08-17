"use strict";
exports.__esModule = true;
exports.numClamp = exports.numRandF = exports.numRand = void 0;
var numRand = function (min, max) { return min > max ? (0, exports.numRand)(max, min) : min + Math.floor((max - min + 1) * Math.random()); };
exports.numRand = numRand;
var numRandF = function (min, max) { return min > max ? (0, exports.numRandF)(max, min) : min + (max - min) * Math.random(); };
exports.numRandF = numRandF;
var numClamp = function (min, max, value) { return min > max ? (0, exports.numClamp)(max, min, value) : Math.max(min, Math.min(value, max)); };
exports.numClamp = numClamp;
