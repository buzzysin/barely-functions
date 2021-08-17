export interface Vec extends Array<number> {
}
export interface Mat extends Array<Vec> {
}
export declare const isVec: (v: any) => v is Vec;
export declare const isMat: (m: any) => m is Mat;
export declare const toVec: (m: Mat) => Vec;
export declare const toMat: (v: Vec) => Mat;
export declare const vecOp: (u: Vec, v: Vec, op: (a: number, b: number) => number) => Vec;
export declare const vecDist: <N extends number | Vec>(x: N, y: N, p?: number) => number;
export declare const vecDot: (u: Vec, v: Vec) => number;
export declare const vecMagnitude: (v: Vec) => number;
export declare const vecAngle: (u: Vec, v: Vec) => number;
export declare const vecCross: (...vecs: Vec[]) => number[];
export declare const vecRotate2d: (v: Vec, r: number) => Vec;
export declare const matNew: (r: number, c: number, fill?: (v: number, i: number, array: Vec) => number) => number[][];
export declare const matIdentity: (d: number) => (0 | 1)[][];
export declare const matMap: (mat: Mat, fn: (n: number, r: number, c: number, v: Vec, m: Mat) => number) => Mat;
export declare const matRows: (m: Mat) => number;
export declare const matCols: (m: Mat) => number;
export declare const matT: (m: Mat) => Mat;
export declare const matRow: (m: Mat, row: number) => Vec;
export declare const matCol: (m: Mat, col: number) => Vec;
export declare const matCompatible: (m: Mat, n: Mat) => boolean;
export declare const matMul: (m: Mat, n: Mat) => Mat;
export declare const matCompose: (ms: Mat[], n?: Mat) => Mat;
export declare const matMinor: (m: Mat, r: number, c: number) => Mat;
export declare const matDet: (m: Mat) => number;
export declare const matCof: (m: Mat) => Mat;
export declare const matAdj: (m: Mat) => Mat;
export declare const matInv: (m: Mat) => Mat;
export declare const matRotate2d: (m: Mat, r: number) => Mat;
