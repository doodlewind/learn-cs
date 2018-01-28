function getSubstr (gif, begin, end) {
  let result = ''
  for (let i = begin; i < end; i++) {
    result += String.fromCharCode(gif[i])
  }
  return result
}

const rules = [
  {
    match: (gif, cur) => (
      gif[cur] === 0x47 && gif[cur + 1] === 0x49 && gif[cur + 2] === 0x46
    ),
    parse: (gif, cur) => ({
      type: 'HeaderBlock',
      offset: 0,
      size: 6,
      props: {
        version: getSubstr(gif, cur + 3, cur + 6)
      }
    })
  }
]

export function getBlockMeta (gif, cur) {
  const rule = rules[0]
  if (rule.match(gif, cur)) {
    const meta = rule.parse(gif, cur)
    console.log(meta)
  }
}
