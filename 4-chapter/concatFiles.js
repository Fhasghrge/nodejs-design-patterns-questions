import fs from 'fs';

function ConcatFiles(dest, cb, ...sourceFiles) { 
  const iterate = (index) => {
    if(index === sourceFiles.length) return cb()
    const file = sourceFiles[index];
    fs.readFile(file, (err, data) => {
      if(err) {
        return cb(err);
      }
      fs.appendFile(dest, data, (err) => {
        if(err) {
          return cb(err);
        }
        iterate(index + 1)
      })
    })
  }
  iterate(0);
}

ConcatFiles(
  './test/d.js', 
  (err) => {
    if(err) {
      console.log('this is an error ', err);
    }
    console.log('completed')
  },
  './test/a.js', 
  './test/b.js'
  )