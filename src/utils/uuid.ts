/**
 * @param length (23 max)
 * @returns
 */
export function uuid(length = 16): string {
  return String(Date.now().toString(32) + Math.random().toString(16))
    .replace(/\./g, "")
    .split("")
    .sort(() => 0.5 - Math.random())
    .slice(0, length)
    .join("");
}
