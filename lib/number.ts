
export const numRand = (min: number, max: number): number => min > max ? numRand(max, min) : min + Math.floor((max - min + 1) * Math.random());

export const numRandF = (min: number, max: number): number => min > max ? numRandF(max, min) : min + (max - min) * Math.random();

export const numClamp = (min: number, max: number, value: number): number => min > max ? numClamp(max, min, value) : Math.max(min, Math.min(value, max));
