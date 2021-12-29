function promisify(callbackFn) {
  return function promisfied(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        (err, data) => {
          if(err) return reject(err);
          resolve(data);
        }
      ]
      callbackFn(...newArgs)
    })
  }
}