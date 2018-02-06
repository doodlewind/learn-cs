const cheerio = require('cheerio')
const qs = require('query-string')

function getInfo (script) {
  try {
    const code = `(function () { ${script}; return detailModel; })()`
    // eslint-disable-next-line
    const json = eval(code)
    const keys = ['title', 'shopName', 'sellerNick', 'brightSpot', 'learnCount']
    const result = {}
    keys.forEach(key => { result[key] = json[key] })
    return result
  } catch (e) {
    console.log(e)
    return null
  }
}

function parseCourse (html) {
  const $ = cheerio.load(html)
  const script = $('script').last().html()
  return getInfo(script)
}

function parseList (html) {
  const $ = cheerio.load(html)
  const hrefs = $('#J_ResultList .result-desc-main h4 a')
    .map((i, el) => $(el).attr('href'))
    .get()
    .map(url => qs.parseUrl(url).query.courseId)
  return hrefs
}

module.exports = {
  parseCourse,
  parseList
}
