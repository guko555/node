// const p = Promise.resolve({ id: 1 })
const p = Promise.reject(new Error('username error'))

p.catch(err => console.log(err))