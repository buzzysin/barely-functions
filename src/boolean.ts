export const mux =
  (c: any) =>
  <A, B>(a: A, b: B) =>
    c ? a : b;
