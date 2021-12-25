import { EventEmitter } from 'events'

function Ticker(number, callback) {
  const emitter = new EventEmitter();

  recursion(number, 0, emitter, callback);

  return emitter;
}

function recursion(number, count, event, cb) {
  if (number <= 0) {
    cb(null, count);
    return;
  }

  if(Date.now() % 5 === 0) {
    const err = new Error('time-split')
    process.nextTick(() => event.emit('error',err));
    cb(err, count);
    return;
  }

  process.nextTick(() => event.emit('tick', count));

  setTimeout(() => {
    recursion(number - 50, count + 1, event, cb)
  }, 50)
}

Ticker(500, (err, count) => {
  if (err) {
    console.error('there is an error');
  }
  console.log(`there has benn ${count} times`);
})
  .on('start', () => {
    console.log('start =>>>')
  })
  .on('tick', (count) => {
    console.log(`the ${count} times`)
  })
  .on('error', (err) => {
    console.log(`err abort`)
  }) 