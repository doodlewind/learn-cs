const {
  fetchPagesCount,
  fetchPage,
  fetchCourse,
  initDirs,
  readFile,
  writeResult,
  wait
} = require('./utils')

async function loopCourse (name, ids) {
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    console.log(`query course ${id}: ${i + 1}/${ids.length}`)
    await wait(6000)
    const result = await fetchCourse(id)
    writeResult(name, id, result)
    console.log(name, id, result)
  }
}

async function loopPages (names) {
  for (let i = 0; i < names.length; i++) {
    console.log(`query list ${names[i]}: ${i + 1}/${names.length}`)
    const pageCount = await fetchPagesCount(names[i])
    for (let j = 0; j < pageCount; j++) {
      await wait(2000)
      const courseIds = await fetchPage(names[i], j + 1)
      await loopCourse(names[i], courseIds)
    }
  }
}

function run () {
  const names = JSON.parse(readFile('./inputs.json'))
  initDirs(names)
  loopPages(names)
}

run()
