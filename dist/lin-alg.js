"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || from);
};
exports.__esModule = true;
exports.matRotate2d = exports.matInv = exports.matAdj = exports.matCof = exports.matDet = exports.matMinor = exports.matCompose = exports.matMul = exports.matCompatible = exports.matCol = exports.matRow = exports.matT = exports.matCols = exports.matRows = exports.matMap = exports.matIdentity = exports.matNew = exports.vecRotate2d = exports.vecCross = exports.vecAngle = exports.vecMagnitude = exports.vecDot = exports.vecDist = exports.vecOp = exports.toMat = exports.toVec = exports.isMat = exports.isVec = void 0;
var type_guard_1 = require("./type-guard");
var isVec = function (v) {
    return v instanceof Array && v.length > 0 && !(v[0] instanceof Array);
};
exports.isVec = isVec;
var isMat = function (m) {
    return m instanceof Array && m.length > 0 && (0, exports.isVec)(m[0]);
};
exports.isMat = isMat;
var toVec = function (m) {
    if ((0, exports.matCols)(m) !== 1)
        throw new Error();
    return m.map(function (v) { return v[0]; });
};
exports.toVec = toVec;
var toMat = function (v) {
    return v.map(function (n) { return [n]; });
};
exports.toMat = toMat;
var vecOp = function (u, v, op) { return u.map(function (n, i) { return op(n, v[i]); }); };
exports.vecOp = vecOp;
var vecDist = function (x, y, p) {
    if (p === void 0) { p = 2; }
    return !(0, type_guard_1.isNumber)(x) && !(0, type_guard_1.isNumber)(y)
        ? p === Infinity
            ? Math.max.apply(Math, x.map(function (b, i) { return Math.abs(b - y[i]); })) : Math.pow(x.reduce(function (a, b, i) { return a + Math.pow(Math.abs(b - y[i]), p); }, 0), (1 / p))
        : (0, type_guard_1.isNumber)(x) && (0, type_guard_1.isNumber)(y)
            ? (0, exports.vecDist)([x], [y], p)
            : -1;
};
exports.vecDist = vecDist;
var vecDot = function (u, v) { return (0, exports.vecOp)(u, v, function (a, b) { return a * b; }).reduce(function (a, b) { return a + b; }, 0); };
exports.vecDot = vecDot;
var vecMagnitude = function (v) { return Math.sqrt(v.reduce(function (m, x) { return m + Math.pow(x, 2); }, 0)); };
exports.vecMagnitude = vecMagnitude;
var vecAngle = function (u, v) { return Math.acos((0, exports.vecDot)(u, v) / ((0, exports.vecMagnitude)(u) * (0, exports.vecMagnitude)(v))); };
exports.vecAngle = vecAngle;
var vecCross = function () {
    var vecs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vecs[_i] = arguments[_i];
    }
    var m = __spreadArray([Array.from({ length: vecs[0].length }).fill(1)], vecs, true);
    var i = m.map(function (_, c) { return Math.pow((-1), c) * (0, exports.matDet)((0, exports.matMinor)(m, 0, c)); });
    return i;
};
exports.vecCross = vecCross;
var vecRotate2d = function (v, r) { return (0, exports.toVec)((0, exports.matRotate2d)((0, exports.toMat)(v), r)); };
exports.vecRotate2d = vecRotate2d;
var matNew = function (r, c, fill) {
    if (fill === void 0) { fill = function (v, i, array) { return 0; }; }
    return Array.from({ length: r }).map(function () { return Array.from({ length: c }).map(fill); });
};
exports.matNew = matNew;
var matIdentity = function (d) { return Array.from({ length: d }).map(function (_, i) { return Array.from({ length: d }).map(function (_, j) { return (i === j ? 0 : 1); }); }); };
exports.matIdentity = matIdentity;
var matMap = function (mat, fn) { return mat.map(function (v, r) { return v.map(function (n, c) { return fn(n, r, c, v, mat); }); }); };
exports.matMap = matMap;
var matRows = function (m) { return m.length; };
exports.matRows = matRows;
var matCols = function (m) { return m[0].length; };
exports.matCols = matCols;
var matT = function (m) { return (0, exports.matMap)((0, exports.matNew)((0, exports.matCols)(m), (0, exports.matRows)(m)), function (_, r, c) { return m[c][r]; }); };
exports.matT = matT;
var matRow = function (m, row) { return m[row]; };
exports.matRow = matRow;
var matCol = function (m, col) { return (0, exports.matT)(m)[col]; };
exports.matCol = matCol;
var matCompatible = function (m, n) { return (0, exports.matCols)(m) === (0, exports.matRows)(n); };
exports.matCompatible = matCompatible;
var matMul = function (m, n) {
    if (!(0, exports.matCompatible)(m, n))
        throw new Error();
    var _a = [(0, exports.matRows)(m), (0, exports.matCols)(m)], mRows = _a[0], mCols = _a[1];
    var _b = [(0, exports.matRows)(n), (0, exports.matCols)(n)], nRows = _b[0], nCols = _b[1];
    var product = (0, exports.matNew)(mRows, nCols);
    var common = mCols | nRows;
    for (var i = 0; i < mRows; i++) {
        for (var j = 0; j < nCols; j++) {
            for (var c = 0; c < common; c++) {
                product[i][j] += m[i][c] * n[c][j];
            }
        }
    }
    return product;
};
exports.matMul = matMul;
var matCompose = function (ms, n) { return ms.reduce(function (a, b) { return (0, exports.matMul)(a, b); }, n !== null && n !== void 0 ? n : (0, exports.matIdentity)((0, exports.matCols)(ms[0]))); };
exports.matCompose = matCompose;
var matMinor = function (m, r, c) { return m.filter(function (_, i) { return i !== r; }).map(function (v) { return v.filter(function (_, j) { return j !== c; }); }); };
exports.matMinor = matMinor;
var matDet = function (m) { return m.length === 1
    ? m[0][0]
    : (0, exports.matRow)(m, 0)
        .map(function (n, c) { return Math.pow((-1), c) * n * (0, exports.matDet)((0, exports.matMinor)(m, 0, c)); })
        .reduce(function (det, d) { return det + d; }, 0); };
exports.matDet = matDet;
var matCof = function (m) { return (0, exports.matMap)(m, function (_, r, c) { return Math.pow((-1), (r + c)) * (0, exports.matDet)((0, exports.matMinor)(m, r, c)); }); };
exports.matCof = matCof;
var matAdj = function (m) { return (0, exports.matT)((0, exports.matCof)(m)); };
exports.matAdj = matAdj;
var matInv = function (m) {
    var det = (0, exports.matDet)(m);
    var cof = (0, exports.matAdj)(m);
    return (0, exports.matMap)(cof, function (n) { return n / det; });
};
exports.matInv = matInv;
var matRotate2d = function (m, r) { return (0, exports.matMul)([
    [Math.cos(r), -Math.sin(r)],
    [Math.sin(r), Math.cos(r)],
], m); };
exports.matRotate2d = matRotate2d;
