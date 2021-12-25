// async 不考虑顺序
const sourceArr = [1, 2, 3];

function asyncFetch(times) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, times)
    } catch (error) {
      reject(error);
    }
  })
}

const asyncResult = Promise.all(sourceArr.map(async (item) => {
  await asyncFetch(1000);
  return item * 2;
}))
asyncResult.then(console.log);
