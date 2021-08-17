/**
 * Returns array without duplicates
 */
export const arrUnique = <E>(a: E[]) => {
  return a.reduce((newA, e) => (newA.includes(e) ? newA : (newA.push(e), newA)), [] as E[]);
};

/**
 * Returns single instances of duplicated entries
 */
export const arrDuped = <E>(a: E[]) => {
  return arrUnique(
    a.reduce((newA, e, i, oldA) => (oldA.slice(0, i).includes(e) ? (newA.push(e), newA) : newA), [] as E[])
  );
};

/**
 * Returns A + B or "all unique items in either A or B"
 */
export const arrUnion = (a1: any[], a2: any[]) => {
  return arrUnique(a1.concat(a2));
};

/**
 * Returns A ^ B or "the items in both A and B"
 */
export const arrIntersect = (a1: any[], a2: any[]) => {
  return a2.filter(e => a1.includes(e));
};

/**
 * Returns (A + B) - (A ^ B) or "the items not in both A and B"
 */
export const arrDiff = (a1: any[], a2: any[]) => {
  const unionEs = arrUnion(a1, a2);
  const intersectEs = arrIntersect(a1, a2);
  return unionEs.filter(e => !intersectEs.includes(e));
};
