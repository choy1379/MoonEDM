/**
 * Check and return true if an object is type of string
 */
/**
 * Check and return true if an object is type of string
 */ export function isString(obj) {
    return typeof obj === "string";
}
/**
 * Check and return true if an object not undefined or null
 */
export function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
/**
 * Check and return true if an object is type of Function
 */
export function isFunction(obj) {
    return typeof obj === "function";
}
/**
 * Create Image element with specified url string
 */
export function createImage(src) {
    var img = new HTMLImageElement();
    img.src = src;
    return img;
}
/**
 * Call the function
 */
export function callFun(fun) {
    return fun();
}
