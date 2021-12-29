Promise.MyAll = function(promises) {
  new Promise((resolve, reject) => {
    const res = new Array(promises.length);
    let resolveLen = 0;
    for(let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        res[i] = data;
        if(++resolveLen === promises.length) resolve(res);
      }, reject)
    }
  })
}