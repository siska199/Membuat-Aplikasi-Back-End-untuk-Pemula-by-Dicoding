const {EvenEmitter} = require('events')
 
const myEmitter =EvenEmitter

const birthdayEventListener = (name) => {
    console.log(`Happy birthday ${name}!`);
  }
   
myEmitter.on('birthday',birthdayEventListene)

myEmitter.emit('birthday',{name:'Siska'})