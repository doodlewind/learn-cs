import {
  HEADER_BLOCK,
  LOGICAL_SCREEN_DESCRIPTOR
} from './consts'

function getSubstr (gif, begin, end) {
  let result = ''
  for (let i = begin; i < end; i++) {
    result += String.fromCharCode(gif[i])
  }
  return result
}

const rules = {
  [HEADER_BLOCK]: {
    match: (gif, cur) => (
        gif[cur] === 0x47 && gif[cur + 1] === 0x49 && gif[cur + 2] === 0x46
      ),
    query: (gif, cur) => ({
      offset: 0,
      size: 6,
      props: {
        version: getSubstr(gif, cur + 3, cur + 6)
      }
    }),
    next: [LOGICAL_SCREEN_DESCRIPTOR]
  },
  [LOGICAL_SCREEN_DESCRIPTOR]: {
    match: (gif, cur) => true,
    query: (gif, cur) => ({
      offset: cur,
      size: 7,
      props: {
        binary: gif.subarray(cur, cur + 7)
      }
    }),
    next: []
  }
}

export function getBlockMeta (gif, cur) {
  const { match, query, next } = rules[HEADER_BLOCK]
  if (match(gif, cur)) {
    const meta = query(gif, cur)
    cur += meta.size
    const newRules = next.map(key => rules[key])
    console.log(newRules)
  }
}
