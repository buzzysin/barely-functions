
export const isNull = (o: any): o is null => {
  return o === null;
};

export const isUndef = (o: any): o is undefined => {
  return typeof o === "undefined";
};

export const isNullOrUndef = (o: any): o is null | undefined => {
  return isNull(o) || isUndef(o);
};

export const isObject = (o: any, nullable = false): o is Record<string | number | symbol, any> => {
  return (nullable && isNull(o)) || typeof o === "object";
};

export const isString = (s: any, nullable = false): s is string => {
  return (nullable && isNull(s)) || typeof s === "string";
};

export const isNumber = (n: any, nullable = false): n is number => {
  return (nullable && isNull(n)) || typeof n === "number";
};
