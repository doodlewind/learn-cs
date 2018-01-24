const { lex } = require('./lexer')
const { parse } = require('./parser')
const { destruct } = require('./destructer')

function destructArray (targetArray, formatter) {
  const tokens = lex(formatter)
  const formatArr = parse(tokens)
  return destruct(targetArray, formatArr)
}

[
  destructArray([1, 2], '[a, b]'),
  destructArray([1, 2], '[a,b]  '),
  destructArray([1, 2, [3, 4, [5]]], '[a, b, [c, d, [e]]]'),
  destructArray([1, 2, [[[3]]]], '[a, b, [[[c]]]]')
].map(item => console.log(item))
