export declare const isNull: (o: any) => o is null;
export declare const isUndef: (o: any) => o is undefined;
export declare const isNullOrUndef: (o: any) => o is null;
export declare const isObject: (o: any, nullable?: boolean) => o is Record<string | number | symbol, any>;
export declare const isString: (s: any, nullable?: boolean) => s is string;
export declare const isNumber: (n: any, nullable?: boolean) => n is number;
