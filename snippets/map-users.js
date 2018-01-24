const chars = 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
const boundarys = '驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳'.split('')

const getKey = word => boundarys
  .filter(a => a.localeCompare(word[0], 'zh') <= 0)
  .map(x => 1)
  .reduce((a, b) => a + b, 0)

const mapAndSortUsers = arr => {
  const userDict = arr
    .map(user => ({ [chars[getKey(user)]]: user }))
    .reduce((a, b) => {
      const keyB = Object.keys(b)[0]
      return { ...a, [keyB]: a[keyB] ? `${a[keyB]}, ${b[keyB]}` : b[keyB] }
    })
  return Object.keys(userDict)
    .map(key => ({ char: key, users: userDict[key] }))
    .sort((a, b) => a.char <= b.char ? -1 : 1)
}

const users = [
  '糖饼', '绿箭', '灿灿', '曼巴', '天吴', '芝士',
  '东邪', '瓶子', '云芦', '白陀', '菜瓜', '城管',
  '枫叶', '花生', '流浪人', '雪碧'
]
console.log(mapAndSortUsers(users))
