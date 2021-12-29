class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.tasks = [];
    this.running = 0;
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const promise = task;
        task().then(resolve, reject);
        return promise;
      }
      this.tasks.push(taskWrapper);
      this.next();
    })
  }

  async next() {
    while(this.running < this.concurrency && this.tasks.length) {
      const task = this.tasks.shift();
      this.running++;
      await task();
      this.running--;
      this.next();
    }
  }
}