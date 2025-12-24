/**
 * Math Functions for calculator
 */

/**
 * Convert degrees to radians
 */
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function radToDeg(radians) {
  return (radians * 180) / Math.PI;
}

/**
 * Trigonometric functions
 */
export function sin(x, angleMode = 'DEG') {
  const rad = angleMode === 'DEG' ? degToRad(x) : x;
  return Math.sin(rad);
}

export function cos(x, angleMode = 'DEG') {
  const rad = angleMode === 'DEG' ? degToRad(x) : x;
  return Math.cos(rad);
}

export function tan(x, angleMode = 'DEG') {
  const rad = angleMode === 'DEG' ? degToRad(x) : x;
  return Math.tan(rad);
}

export function asin(x, angleMode = 'DEG') {
  if (x < -1 || x > 1) {
    throw new Error('MATH_ERROR: Invalid input for asin');
  }
  const rad = Math.asin(x);
  return angleMode === 'DEG' ? radToDeg(rad) : rad;
}

export function acos(x, angleMode = 'DEG') {
  if (x < -1 || x > 1) {
    throw new Error('MATH_ERROR: Invalid input for acos');
  }
  const rad = Math.acos(x);
  return angleMode === 'DEG' ? radToDeg(rad) : rad;
}

export function atan(x, angleMode = 'DEG') {
  const rad = Math.atan(x);
  return angleMode === 'DEG' ? radToDeg(rad) : rad;
}

/**
 * Hyperbolic functions
 */
export function sinh(x) {
  return Math.sinh(x);
}

export function cosh(x) {
  return Math.cosh(x);
}

export function tanh(x) {
  return Math.tanh(x);
}

/**
 * Logarithmic functions
 */
export function ln(x) {
  if (x <= 0) {
    throw new Error('MATH_ERROR: Invalid input for ln');
  }
  return Math.log(x);
}

export function log(x) {
  if (x <= 0) {
    throw new Error('MATH_ERROR: Invalid input for log');
  }
  return Math.log10(x);
}

/**
 * Other functions
 */
export function sqrt(x) {
  if (x < 0) {
    throw new Error('MATH_ERROR: Invalid input for sqrt');
  }
  return Math.sqrt(x);
}

export function abs(x) {
  return Math.abs(x);
}

export function fact(x) {
  if (x < 0 || !Number.isInteger(x)) {
    throw new Error('MATH_ERROR: Invalid input for factorial');
  }
  if (x === 0 || x === 1) return 1;
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result *= i;
  }
  return result;
}

export function pow(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Constants
 */
export const PI = Math.PI;
export const E = Math.E;
