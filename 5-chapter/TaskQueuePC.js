class TaskQueuePC {
  constructor(concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];
  }

  // async + while 不会永远循环，会暂停
  async consumer () {
    while(true) {
      try {
        const task = await this.getNextTask();
        await task()
      } catch (error) {
        console.error(error)
      }
    }
  }

  // 拿不到task就把通知拿到的resolve存起来
  getNextTask() {
    return new Promise((resolve, reject) => {
      if(this.taskQueue.length) {
        return resolve(this.taskQueue.shift())
      }
      this.consumerQueue.push(resolve);
    })
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const promise = task;
        task().then(resolve, reject);
        return promise;
      }
      if(this.consumerQueue.length) {
        const consumer = this.consumerQueue.shift();
        consumer(taskWrapper);
      }else {
        this.taskQueue.push(taskWrapper);
      }
    })
  }
}