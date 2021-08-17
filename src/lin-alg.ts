import { isNumber } from "./type-guard";


export interface Vec extends Array<number> { }
export interface Mat extends Array<Vec> { }

export const isVec = (v: any): v is Vec => {
  return v instanceof Array && v.length > 0 && !(v[0] instanceof Array);
};
export const isMat = (m: any): m is Mat => {
  return m instanceof Array && m.length > 0 && isVec(m[0]);
};
export const toVec = (m: Mat): Vec => {
  if (matCols(m) !== 1)
    throw new Error();
  return m.map(v => v[0]);
};
export const toMat = (v: Vec): Mat => {
  return v.map(n => [n]);
};

export const vecOp = (u: Vec, v: Vec, op: (a: number, b: number) => number): Vec => u.map((n, i) => op(n, v[i]));
export const vecDist = <N extends number | Vec>(x: N, y: N, p = 2): number => !isNumber(x) && !isNumber(y)
  ? p === Infinity
    ? Math.max(...x.map((b, i) => Math.abs(b - y[i])))
    : x.reduce((a, b, i) => a + Math.abs(b - y[i]) ** p, 0) ** (1 / p)
  : isNumber(x) && isNumber(y)
    ? vecDist([x], [y], p)
    : -1;
export const vecDot = (u: Vec, v: Vec) => vecOp(u, v, (a, b) => a * b).reduce((a, b) => a + b, 0);
export const vecMagnitude = (v: Vec) => Math.sqrt(v.reduce((m, x) => m + x ** 2, 0));
export const vecAngle = (u: Vec, v: Vec) => Math.acos(vecDot(u, v) / (vecMagnitude(u) * vecMagnitude(v)));
export const vecCross = (...vecs: Vec[]) => {
  const m = [Array.from<number>({ length: vecs[0].length }).fill(1), ...vecs];
  const i = m.map((_, c) => (-1) ** c * matDet(matMinor(m, 0, c)));
  return i;
};
export const vecRotate2d = (v: Vec, r: number) => toVec(matRotate2d(toMat(v), r));

export const matNew = (r: number, c: number, fill = (v: number, i: number, array: Vec) => 0) => Array.from<number>({ length: r }).map(() => Array.from<number>({ length: c }).map(fill));
export const matIdentity = (d: number) => Array.from({ length: d }).map((_, i) => Array.from({ length: d }).map((_, j) => (i === j ? 0 : 1)));
export const matMap = (mat: Mat, fn: (n: number, r: number, c: number, v: Vec, m: Mat) => number): Mat => mat.map((v, r) => v.map((n, c) => fn(n, r, c, v, mat)));
export const matRows = (m: Mat) => m.length;
export const matCols = (m: Mat) => m[0].length;
export const matT = (m: Mat) => matMap(matNew(matCols(m), matRows(m)), (_, r, c) => m[c][r]);
export const matRow = (m: Mat, row: number) => m[row];
export const matCol = (m: Mat, col: number) => matT(m)[col];
export const matCompatible = (m: Mat, n: Mat) => matCols(m) === matRows(n);
export const matMul = (m: Mat, n: Mat) => {
  if (!matCompatible(m, n))
    throw new Error();

  const [mRows, mCols] = [matRows(m), matCols(m)];
  const [nRows, nCols] = [matRows(n), matCols(n)];
  const product: Mat = matNew(mRows, nCols);
  const common = mCols | nRows;

  for (let i = 0; i < mRows; i++) {
    for (let j = 0; j < nCols; j++) {
      for (let c = 0; c < common; c++) {
        product[i][j] += m[i][c] * n[c][j];
      }
    }
  }

  return product;
};

export const matCompose = (ms: Mat[], n?: Mat) => ms.reduce((a, b) => matMul(a, b), n ?? matIdentity(matCols(ms[0])));
export const matMinor = (m: Mat, r: number, c: number): Mat => m.filter((_, i) => i !== r).map(v => v.filter((_, j) => j !== c));
export const matDet = (m: Mat): number => m.length === 1
  ? m[0][0]
  : matRow(m, 0)
    .map((n, c) => (-1) ** c * n * matDet(matMinor(m, 0, c)))
    .reduce((det, d) => det + d, 0);
export const matCof = (m: Mat) => matMap(m, (_, r, c) => (-1) ** (r + c) * matDet(matMinor(m, r, c)));
export const matAdj = (m: Mat) => matT(matCof(m));
export const matInv = (m: Mat) => {
  const det = matDet(m);
  const cof = matAdj(m);
  return matMap(cof, n => n / det);
};
export const matRotate2d = (m: Mat, r: number) => matMul(
  [
    [Math.cos(r), -Math.sin(r)],
    [Math.sin(r), Math.cos(r)],
  ],
  m
);
