// 相对于async模式，使用cb真的反人类

const source  = [1, 2, 3, 4];

function iterator(item, pre, cb) {
  try {
    setTimeout(() => {
      cb(null, item * 2 + pre)
    }, 1000)
  } catch (error) {
    cb(error)
  }
}

function iterateSeries(collection, iteratorCallback, finallCallback) {
  if(collection.length === 0) {
    return finallCallback(collection)
  }
  
  const resContainer = [];

  const iterate = (index) => {
    if(index === collection.length) {
      return finallCallback(null, resContainer)
    }
    iteratorCallback(collection[index], resContainer[index - 1] || 0,  (_, mapRes) => {
      if(_) return finallCallback(_);
      resContainer.push(mapRes);
      iterate(index + 1);
    })
  }

  iterate(0)
}

iterateSeries(source, iterator, (_, res) => {
  if(_) console.log('err', _)
  console.log('the resulte is ', res)
})