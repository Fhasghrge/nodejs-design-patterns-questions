import { EventEmitter } from 'events';

// 实现任务执行，错误时重连, 不断重联的逻辑因该是错误的，因该设置错误重连次数
class ErrorReconnectTaskQueue extens EventEmitter {
  constructor(concurency) {
    super();
    this.concuerency = concuerency; // 并发上限
    this.taskQueue = []; // 任务队列
    this.running = 0; // 当前正在执行任务数量
    this.waitQueue = false;
  }

  pushTask(task) {
    this.taskQueue.push(task);
    process.nextTick(this.next.bind(this));
    return this;
  }
  next() {
    if(this.running === 0 && this.taskQueue.length === 0 && !this.waitQueue) {
      return this.emit('empty');
    }
    while(this.running < this.concuerency && this.taskQueue.length) {
      const currTask = this.taskQueue.shift();
      currTask((err) => {
        if(err) {
          this.emit('error', err);
          this.waitQueue = true;
          setTimeout(() => {
            this.pushTask(currTask)
            this.waitQueue = false;
          }, 500)
        }
        this.running--;
        process.nextTick(this.next.bind(this));
      })
      this.running++;
    }
  }
}