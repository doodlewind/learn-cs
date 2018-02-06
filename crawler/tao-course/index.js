const {
  fetchCourse,
  fetchList,
  readFile,
  wait
} = require('./utils')
const {
  parseCourse,
  parseList
} = require('./parser')

async function courseLoop (hrefs) {
  for (let i = 0; i < hrefs.length; i++) {
    console.log(`query course ${hrefs[i]}: ${i + 1}/${hrefs.length}`)
    await wait(4000)
    const html = await fetchCourse(hrefs[i])
    const result = parseCourse(html)
    console.log(result)
  }
}

async function listLoop (list) {
  for (let i = 0; i < list.length; i++) {
    console.log(`query list ${list[i]}: ${i + 1}/${list.length}`)
    await wait(2000)
    const html = await fetchList(list[i])
    const hrefs = parseList(html)
    await courseLoop(hrefs)
  }
}

function run () {
  const inputs = JSON.parse(readFile('./inputs.json'))
  listLoop(inputs)
}

run()
