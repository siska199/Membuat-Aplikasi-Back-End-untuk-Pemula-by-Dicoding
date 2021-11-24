console.log(Object.getOwnPropertyNames(require));
/*Menyediakan informasi mengenai lokasi di mana proses dijalankan*/
const currentPath = process.env.PWD
console.log(currentPath)
/*Menyediakan informasi nama user pada komputer anda*/
const userName = process.env.USER
console.log(userName)

console.log(process.env.NODE_ENV)

console.log(process.memoryUsage())


const firstName = process.argv[2]
const lastName = process.argv[3]

console.log(`${firstName} ${lastName}`)

console.log(process.argv[0]) /*Alamat (path) lengkap dari lokasi node yang menjalankan prosesnya*/
console.log(process.argv[1]) /*Alamat (path) berkas JavaScript yang dieksekusi (app.js) */