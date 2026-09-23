/**
 * Precision Formatter Module.
 * Eliminates JavaScript floating point artifacts (e.g. 0.1 + 0.2 = 0.3)
 * and formats numbers cleanly for display.
 */

export function formatNumber(val, maxDigits = 12) {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') {
    if (val === 'Cannot divide by zero' || val === 'Error') return val;
    val = parseFloat(val);
  }

  if (isNaN(val)) return 'Error';
  if (!isFinite(val)) return 'Error';

  // Fix floating point precision artifacts by rounding to 10 decimal places first
  let rounded = Number(Math.round(parseFloat(val + 'e10')) + 'e-10');

  // Check if number exceeds display threshold for scientific notation
  const absVal = Math.abs(rounded);
  if ((absVal >= 1e12 || (absVal > 0 && absVal < 1e-7)) && rounded !== 0) {
    return rounded.toExponential(6).replace(/\.0+e/, 'e');
  }

  // Format to standard string avoiding unnecessary trailing zeroes
  const str = rounded.toString();
  if (str.length > maxDigits) {
    // Trim decimal precision if string exceeds max display length
    const parts = str.split('.');
    if (parts.length === 2) {
      const allowedDecimals = Math.max(0, maxDigits - parts[0].length - 1);
      if (allowedDecimals > 0) {
        return rounded.toFixed(allowedDecimals).replace(/\.?0+$/, '');
      } else {
        return Math.round(rounded).toString();
      }
    }
  }

  return str;
}
