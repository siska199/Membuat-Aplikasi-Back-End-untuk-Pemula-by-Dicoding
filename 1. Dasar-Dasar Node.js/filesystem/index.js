const fs = require('fs')
const path = require('path')


const data = fs.readFileSync('notes.txt','UTF-8')
console.log(data)

console.log(path.resolve(__dirname, 'notes.txt'))