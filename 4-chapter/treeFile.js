// 记录正在执行异步任务，在每个异步执行完的时候  检查任务有没有清零，清零就cb
import fs from 'fs';
import path from 'path';

const info = {
  running: 1,
  fileList: []
}

function ListNestedDir(dir, cb) {
  fs.readdir(dir, (err, files) => {
    if(err) {
      if(err.code !== "ENOTDIR") return cb(err);
      info.fileList.push(dir);
    }else {
      files.forEach(file => {
        info.running++;
        ListNestedDir(path.join(dir, file), cb);
      })
    }
    info.running--;
    if(info.running === 0) {
      process.nextTick(() => cb(null, info.fileList));
    }
  })
}

ListNestedDir('./test', console.log)