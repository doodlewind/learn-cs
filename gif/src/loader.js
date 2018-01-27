import { readFile } from 'fs'
import path from 'path'

export function loadResource (name) {
  return new Promise((resolve, reject) => {
    const fileName = path.join(path.resolve('./resources', name))
    readFile(fileName, (err, data) => {
      if (err) reject(err)
      resolve(new Uint8Array(data))
    })
  })
}
