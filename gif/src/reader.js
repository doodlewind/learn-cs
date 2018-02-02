import {
  HEADER_BLOCK,
  LOGICAL_SCREEN_DESCRIPTOR
} from './consts'
import {
  readStr,
  readWord
} from './utils'

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
        height: readWord(gif, cur + 2),
        globalColorTable: (gif[cur + 4] & 0b10000000) >> 7,
        sort: (gif[cur + 4] & 0b00001000) >> 3,
        packed: gif[cur + 4].toString(16),
        backgroundColorIndex: gif[cur + 5]
      }
    }),
    next: []
  }
}

function getBlockMeta (gif, cur) {
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

export function read (gif) {
  getBlockMeta(gif, 0)
}
