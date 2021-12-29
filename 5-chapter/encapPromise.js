import { readFile } from 'fs'

function ReadFilePromise(dir) {
  return new Promise((resolve, reject) => {
    readFile(dir, (err, data) => {
      if(err) return reject(err);
      cb(null, data)
    })
  })
}