function defaults(a, b) {
  for (var key in b) {
    if (!a.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }

  return a;
}

function merge(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }

  return a;
}

function clone(o) {
  return defaults({}, o);
}

function toArray(x) {
  return Array.prototype.slice.call(x);
}

function isNumber(x) { return typeof x === 'number'; }
function isString(x) { return typeof x === 'string'; }
function isFunction(x) { return typeof x === 'function'; }
function isArray(x) { return x instanceof Array; }
function isObject(x) { return typeof x === 'object'; }
function isNull(x) { return x === null; }
function isUndefined(x) { return x === void undefined; }

// adapted from:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  /*eslint-disable no-extend-native*/
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5 internal
      // IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
        'what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      NOP = function () {},
      fBound = function () {
        return fToBind.apply(this instanceof NOP && oThis
           ? this
           : oThis,
           aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    NOP.prototype = this.prototype;
    fBound.prototype = new NOP();

    return fBound;
  };
  /*eslint-enable no-extend-native*/
}

module.exports = {
  defaults: defaults,
  merge: merge,
  clone: clone,
  toArray: toArray,
  isNumber: isNumber,
  isString: isString,
  isFunction: isFunction,
  isArray: isArray,
  isObject: isObject,
  isNull: isNull,
  isUndefined: isUndefined
};
