import {
  HEADER_BLOCK,
  LOGICAL_SCREEN_DESCRIPTOR
} from './consts'

function readStr (gif, begin, end) {
  let result = ''
  for (let i = begin; i < end; i++) {
    result += String.fromCharCode(gif[i])
  }
  return result
}

function readWord (gif, cur) {
  return gif[cur + 1] << 8 | gif[cur]
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
        version: readStr(gif, cur + 3, cur + 6)
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
        width: readWord(gif, cur),
        height: readWord(gif, cur + 2)
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
    for (let i = 0; i < newRules.length; i++) {
      if (newRules[i].match(gif, cur)) {
        const { props } = newRules[i].query(gif, cur)
        console.log(props)
      }
    }
  }
}
