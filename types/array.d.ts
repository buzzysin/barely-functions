/**
 * Returns array without duplicates
 */
export declare const arrUnique: <E>(a: E[]) => E[];
/**
 * Returns single instances of duplicated entries
 */
export declare const arrDuped: <E>(a: E[]) => E[];
/**
 * Returns A + B or "all unique items in either A or B"
 */
export declare const arrUnion: (a1: any[], a2: any[]) => any[];
/**
 * Returns A ^ B or "the items in both A and B"
 */
export declare const arrIntersect: (a1: any[], a2: any[]) => any[];
/**
 * Returns (A + B) - (A ^ B) or "the items not in both A and B"
 */
export declare const arrDiff: (a1: any[], a2: any[]) => any[];
