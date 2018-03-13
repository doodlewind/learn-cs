// Usage:
// ```
// node post-process.js results/20180228/**/*.json
// ```

const glob = require('glob')
const fs = require('fs')
const path = require('path')
const pattern = process.argv[2]

function sanitize (obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'string') return
    obj[key] = obj[key].replace(/(\r\n|\n|\r)/gm, '')
  })
}

const results = []
glob(pattern, (err, fileNames) => {
  console.log(fileNames)
  if (err) throw err
  fileNames.forEach(fileName => {
    const file = fs.readFileSync(fileName)
    const json = JSON.parse(file)
    json.category = fileName.split('/')[2]
    sanitize(json)
    results.push(json)
  })
  const str = JSON.stringify(results, null, 2)
  const outPath = path.resolve('./result.json')
  fs.writeFileSync(outPath, str, 'utf8')
})
