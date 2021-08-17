"use strict";
exports.__esModule = true;
exports.arrDiff = exports.arrIntersect = exports.arrUnion = exports.arrDuped = exports.arrUnique = void 0;
/**
 * Returns array without duplicates
 */
var arrUnique = function (a) {
    return a.reduce(function (newA, e) { return (newA.includes(e) ? newA : (newA.push(e), newA)); }, []);
};
exports.arrUnique = arrUnique;
/**
 * Returns single instances of duplicated entries
 */
var arrDuped = function (a) {
    return (0, exports.arrUnique)(a.reduce(function (newA, e, i, oldA) { return (oldA.slice(0, i).includes(e) ? (newA.push(e), newA) : newA); }, []));
};
exports.arrDuped = arrDuped;
/**
 * Returns A + B or "all unique items in either A or B"
 */
var arrUnion = function (a1, a2) {
    return (0, exports.arrUnique)(a1.concat(a2));
};
exports.arrUnion = arrUnion;
/**
 * Returns A ^ B or "the items in both A and B"
 */
var arrIntersect = function (a1, a2) {
    return a2.filter(function (e) { return a1.includes(e); });
};
exports.arrIntersect = arrIntersect;
/**
 * Returns (A + B) - (A ^ B) or "the items not in both A and B"
 */
var arrDiff = function (a1, a2) {
    var unionEs = (0, exports.arrUnion)(a1, a2);
    var intersectEs = (0, exports.arrIntersect)(a1, a2);
    return unionEs.filter(function (e) { return !intersectEs.includes(e); });
};
exports.arrDiff = arrDiff;
