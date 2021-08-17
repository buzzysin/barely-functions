"use strict";
exports.__esModule = true;
exports.objMergeFn = exports.objMerge = exports.objDiff = void 0;
var type_guard_1 = require("./type-guard");
var array_1 = require("./array");
var keys = Object.keys, assign = Object.assign;
var objDiff = function (stale, fresh, removeStale) {
    var _a;
    if (removeStale === void 0) { removeStale = false; }
    var result = {};
    if ((0, type_guard_1.isObject)(stale) && (0, type_guard_1.isObject)(fresh)) {
        var staleKeys = keys(stale);
        var freshKeys = keys(fresh);
        // ? These arrays are mutually exclusive by design
        var diffKeys = (0, array_1.arrDiff)(staleKeys, freshKeys);
        var shareKeys = (0, array_1.arrIntersect)(staleKeys, freshKeys);
        var allKeys = diffKeys.concat(shareKeys);
        var constructorType = allKeys.every(function (key) { return /\d+/.test(key); }) ? "array" : "object";
        for (var _i = 0, allKeys_1 = allKeys; _i < allKeys_1.length; _i++) {
            var k = allKeys_1[_i];
            var keyIsStaleAndHasNoUpdate = staleKeys.includes(k) && diffKeys.includes(k);
            if (removeStale && keyIsStaleAndHasNoUpdate) {
            }
            else {
                assign(result, (_a = {}, _a[k] = (0, exports.objDiff)(stale[k], fresh[k], removeStale), _a));
            }
        }
        var resultKeys = keys(result);
        if (constructorType === "array")
            assign(result, { length: resultKeys.length });
        return constructorType === "array" ? Array.from(result) : result;
    }
    else {
        return fresh !== null && fresh !== void 0 ? fresh : stale;
    }
};
exports.objDiff = objDiff;
var objMerge = function (o1, o2) { return assign({}, o1, o2); };
exports.objMerge = objMerge;
var objMergeFn = function (o2) { return function (o1) { return (0, exports.objMerge)(o1, o2); }; };
exports.objMergeFn = objMergeFn;
