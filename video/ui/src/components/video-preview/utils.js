export function getCurrentOffset (bar) {
  const leftPx = window.getComputedStyle(bar).getPropertyValue('left')
  return parseFloat(leftPx) / 300 * 100
}
