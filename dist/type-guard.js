"use strict";
exports.__esModule = true;
exports.isNumber = exports.isString = exports.isObject = exports.isNullOrUndef = exports.isUndef = exports.isNull = void 0;
var isNull = function (o) {
    return o === null;
};
exports.isNull = isNull;
var isUndef = function (o) {
    return typeof o === "undefined";
};
exports.isUndef = isUndef;
var isNullOrUndef = function (o) {
    return (0, exports.isNull)(o) || (0, exports.isUndef)(o);
};
exports.isNullOrUndef = isNullOrUndef;
var isObject = function (o, nullable) {
    if (nullable === void 0) { nullable = false; }
    return (nullable && (0, exports.isNull)(o)) || typeof o === "object";
};
exports.isObject = isObject;
var isString = function (s, nullable) {
    if (nullable === void 0) { nullable = false; }
    return (nullable && (0, exports.isNull)(s)) || typeof s === "string";
};
exports.isString = isString;
var isNumber = function (n, nullable) {
    if (nullable === void 0) { nullable = false; }
    return (nullable && (0, exports.isNull)(n)) || typeof n === "number";
};
exports.isNumber = isNumber;
