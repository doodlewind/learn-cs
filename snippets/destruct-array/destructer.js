function getItem (targetArray, indexArr) {
  let result = targetArray
  for (let i = 0; i < indexArr.length; i++) {
    result = result[indexArr[i]]
  }
  if (result === targetArray) throw new Error('invalid index')
  return result
}

// 递归解构 targetArray 到扁平 result 中
function destruct (targetArray, formatter) {
  const result = {}

  function walk (targetArr, formatter, indexArr) {
    for (let i = 0; i < targetArray.length; i++) {
      if (!formatter[i]) return
      if (!Array.isArray(formatter[i])) {
        const key = formatter[i]
        const value = getItem(targetArray, [...indexArr, i])
        result[key] = value
      } else {
        walk(targetArray, formatter[i], [...indexArr, i])
      }
    }
  }
  walk(targetArray, formatter, [])
  return result
}

module.exports = {
  destruct
}
