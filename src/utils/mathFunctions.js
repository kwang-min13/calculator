/**
 * Math Functions for calculator
 */

/**
 * Convert degrees to radians
 */
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
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

export function pow(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Constants
 */
export const PI = Math.PI;
export const E = Math.E;
