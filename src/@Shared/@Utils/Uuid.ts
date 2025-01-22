const charsSet =
  "0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const charsSetLength = charsSet.length;

export function uuid(length = 12): string {
  return length < 1
    ? ""
    : Array(length)
        .fill("")
        .map(() => charsSet.charAt(Math.random() * charsSetLength))
        .join("");
}
