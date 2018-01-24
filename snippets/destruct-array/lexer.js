const LBracket = new RegExp(/^\[/)
const RBracket = new RegExp(/^\]/)
// 非左括号 非右括号 非空白
// eslint-disable-next-line
const Value = new RegExp(/^[^\[\]s]+/)

function getToken (str) {
  if (str.match(RBracket)) return str.match(RBracket)[0]
  else if (str.match(LBracket)) return str.match(LBracket)[0]
  else if (str.match(Value)) return str.match(Value)[0]
  else throw new Error('Lex Error')
}

// 切分 '[a, b, [c, d]]'
// 为 ['[', 'a', 'b', '[', 'c', 'd', ']', ']'] 的词法数组
function lex (formatter) {
  const results = []
  let currStr = formatter
  while (currStr.length) {
    const token = getToken(currStr)
    if (token !== '[' && token !== ']') {
      token.split(',').forEach(str => {
        if (!str.trim()) return
        results.push(str.trim())
      })
    } else results.push(token)
    currStr = currStr.substr(token.length)
  }
  return results
}

module.exports = {
  lex
}
