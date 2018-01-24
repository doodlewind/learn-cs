// 递归下降解析 lexer 的扁平字符串 tokens 为嵌套数组
function parse (tokens) {
  if (!tokens.length) throw new Error('unexpected EOF')
  // 取出首个 token
  let token = tokens.splice(0, 1)[0]
  if (token === '[') {
    let L = []
    while (tokens[0] !== ']') L.push(parse(tokens))
      // 弹出 ']' 符号
    tokens.splice(0, 1)
    return L
  } else if (token === ']') throw new Error('unexpected brace')
  else return token
}

module.exports = {
  parse
}
