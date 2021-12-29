async function mapAsync(iterate, callback, concurrency) {
  const queue = [];
  let running = 0;

  function wrapperTask(task) {
    return new Promise((resolve, reject) => {
      queue.push(() => {
        return task().then(resolve, reject);
      })
      next();
    })
  }

  async function next(){
    while(running < concurrency && queue.length) {
      const task = queue.shift();
      running++;
      await task();
      running--;
      next();
    }
  }
  return Promise.all(iterate.map(item => wrapperTask(() => callback(item))));
}