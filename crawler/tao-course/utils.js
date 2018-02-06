const { readFileSync } = require('fs')
const path = require('path')
const rp = require('request-promise-native')

function readFile (name) {
  return readFileSync(path.resolve(name), 'utf8')
}

const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'
}

async function fetchCourse (courseId) {
  const options = {
    url: 'https://v.daxue.taobao.com/detail.htm',
    headers,
    qs: { courseId }
  }
  try {
    const body = await rp(options)
    return body
  } catch (err) { console.error(err) }
}

async function fetchList (key) {
  const options = {
    url: 'https://i.daxue.taobao.com/study/search/searchList.htm',
    headers,
    qs: { key }
  }
  try {
    const body = await rp(options)
    return body
  } catch (err) { console.error(err) }
}

const wait = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time + Math.random() * time)
})

module.exports = {
  fetchCourse,
  fetchList,
  readFile,
  wait
}
