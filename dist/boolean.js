"use strict";
exports.__esModule = true;
exports.mux = void 0;
var mux = function (c) {
    return function (a, b) {
        return c ? a : b;
    };
};
exports.mux = mux;
