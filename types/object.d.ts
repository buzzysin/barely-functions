export declare const objDiff: <R = any>(stale: any, fresh: any, removeStale?: boolean) => R;
export declare const objMerge: <O1, O2>(o1: O1, o2: O2) => {} & O1 & O2;
export declare const objMergeFn: <O2>(o2: O2) => <O1>(o1: O1) => {} & O1 & O2;
