const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('username already exist'))
        resolve(1)
    }, 1000)
})

p.then(result => console.log(result))
 .catch(err => console.log(`Error ${err.message}`))