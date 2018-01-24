/**
 * 服从均匀分布的随机数生成
 */
function randomStr (len = 6) {
  if (!len) return ''

  const items = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ]
  // 逐位 push 后统一 join 以优化字符串拼接
  let results = []
  for (let i = 0; i < len; i++) {
    // slice 去除 '0.' 后截取 0000~9999 均匀分布的四位数字
    // 若位数过少，不能保证取余后仍服从均匀分布
    const numStr = Math.random().toString().slice(2).substr(0, 4)
    results.push(parseInt(numStr) % items.length)
  }
  // 将取余后下标映射到字母
  return results.map(index => items[index]).join('')
}

const result = randomStr(10)
console.log(result)
