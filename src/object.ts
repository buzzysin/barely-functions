import { isObject } from "./type-guard";
import { arrDiff, arrIntersect } from "./array";

const { keys, assign } = Object;

export const objDiff = <R = any>(stale: any, fresh: any, removeStale = false): R => {
  const result: any = {};

  if (isObject(stale) && isObject(fresh)) {
    const staleKeys = keys(stale);
    const freshKeys = keys(fresh);

    // ? These arrays are mutually exclusive by design
    const diffKeys = arrDiff(staleKeys, freshKeys) as string[];
    const shareKeys = arrIntersect(staleKeys, freshKeys) as string[];

    const allKeys = diffKeys.concat(shareKeys);
    const constructorType = allKeys.every(key => /\d+/.test(key)) ? "array" : "object";

    for (const k of allKeys) {
      const keyIsStaleAndHasNoUpdate = staleKeys.includes(k) && diffKeys.includes(k);

      if (removeStale && keyIsStaleAndHasNoUpdate) {
      } else {
        assign(result, { [k]: objDiff(stale[k], fresh[k], removeStale) });
      }
    }

    const resultKeys = keys(result);
    if (constructorType === "array") assign(result, { length: resultKeys.length });

    return constructorType === "array" ? Array.from(result) : result;
  } else {
    return fresh ?? stale;
  }
};

export const objMerge = <O1, O2>(o1: O1, o2: O2) => assign({}, o1, o2);
export const objMergeFn = <O2>(o2: O2) => <O1>(o1: O1) => objMerge(o1, o2)