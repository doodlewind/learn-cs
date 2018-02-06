const { readFileSync, writeFileSync } = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const rp = require('request-promise-native')
const {
  parsePagesCount,
  parseCourse,
  parsePage
} = require('./parser')

function readFile (name) {
  return readFileSync(path.resolve(name), 'utf8')
}

const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'
}

async function fetchPagesCount (key) {
  const options = {
    url: 'https://i.daxue.taobao.com/study/search/searchList.htm',
    headers,
    qs: { key }
  }
  try {
    const body = await rp(options)
    return parsePagesCount(body)
  } catch (err) { console.error(err) }
}

async function fetchCourse (courseId) {
  const options = {
    url: 'https://v.daxue.taobao.com/detail.htm',
    headers,
    qs: { courseId }
  }
  try {
    const body = await rp(options)
    return parseCourse(body)
  } catch (err) { console.error(err) }
}

async function fetchPage (key, count) {
  const k = encodeURIComponent(key)
  const options = {
    url: `https://i.daxue.taobao.com/search/categ-c-p${count}-k${k}-s-o-tdg-f.htm`,
    headers
  }
  try {
    const body = await rp(options)
    return parsePage(body)
  } catch (err) { console.error(err) }
}

const wait = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time + Math.random() * time)
})

function yymmdd () {
  const date = new Date()
  const mm = date.getMonth() + 1
  const dd = date.getDate()
  return [
    date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('')
}

function initDirs (names) {
  const now = yymmdd()
  names.forEach(name => {
    mkdirp.sync(path.join(path.resolve('./results'), now, name))
  })
}

function writeResult (name, id, result) {
  const now = yymmdd()
  writeFileSync(
    path.join(path.resolve('./results'), now, name, `${id}.json`),
    JSON.stringify(result, null, 2)
  )
}

module.exports = {
  fetchPagesCount,
  fetchCourse,
  fetchPage,
  initDirs,
  readFile,
  yymmdd,
  wait,
  writeResult
}
