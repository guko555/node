const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('task 1');
        resolve(1)
    }, 2000)
})
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('task 2');
        // resolve(2)
        reject(new Error('message'))
    }, 2000)
})

Promise.race([p1, p2]).then(result => console.log(result))
       .catch(err => console.log(err.message))