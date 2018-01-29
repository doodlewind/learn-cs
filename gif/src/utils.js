export function readStr (gif, begin, end) {
  let result = ''
  for (let i = begin; i < end; i++) {
    result += String.fromCharCode(gif[i])
  }
  return result
}

export function readWord (gif, cur) {
  return gif[cur + 1] << 8 | gif[cur]
}
