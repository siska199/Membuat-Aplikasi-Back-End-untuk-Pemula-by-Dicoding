// const objParent = {
//     name : "siska",
//     sekolah : "UI"
// }

// const objChild = Object.create(objParent);
// objChild.umur = "5 Tahun"

// console.log(objChild)


// class Mahasiswa{
//     constructor(name, energi) {
//         this.name = name
//         this.energi = energi
//     }
//     tambahEnergi(enAdd){
//         this.energi += enAdd
//         return(this.energi)
//     }

// }

// const mahasiswa1 = new Mahasiswa("Siska", 1200)

// console.log(mahasiswa1.tambahEnergi(20))

// const tF = tryFunction()
// console.log("hasil tryFunction", tF)

// function tryFunction(){
//     return ("yeay")
// }


// let name = "siska"
// let umur = 33

// console.log(sayHello(name, umur))
// function sayHello(name1, umur1){
//     return(`Hola saya ${name1} umur ${umur1}`)
// }

// function anonymeParameter(){
//     console.log(arguments)
// }
// anonymeParameter("a","b","c")

// function init(){
//     let name = "Siska"
//     function tampilNama(){
//         return name;
//     }
//     return tampilNama()

// }
// console.log("Closure example",init())

// function ucapkanSalam(waktu){
//     return function(name){
//         console.log(`Halo ${name}, Selamat ${waktu}`)
//     }
// }
// let selamatPagi = ucapkanSalam('Pagi');
// let selamatSiang = ucapkanSalam('Siang');
// let selamatMalam = ucapkanSalam('Malam');

// selamatPagi('Siska')
// selamatSiang('Dinda')
// selamatMalam('Mutiara')




// let add = (()=>{
//     let counter = 0;
//     return function addPrivate(){
//         return(++counter)
//     }
// })()

// console.log(add())
// console.log(add())
// console.log(add())

// class Mahasiswa{
//     constructor(name, umur){
//         this.name = name;
//         this.umur = umur;
//         console.log(this)
//     }
// }

// const inst = new Mahasiswa("siska","22")
// console.log("Halo",inst.name)


// const Mahasiswa = () =>{
//     console.log(this)
// }
// Mahasiswa()

// const obj = {
//     name : 'siska',
//     hello : function(){
//         console.log(`Hello ${this.name}`)
//     }
// }
// obj.hello()


// const obj = {
//     name : 'siska',
//     hello : ()=>{
//         console.log(`Hello ${this.name}`)
//     }
// }
// obj.hello()



const box = document.querySelector('.box')

box.addEventListener('click',function(){
    // console.log(this)
    // console.log(event.target)
    let size = 'size'
    let caption = 'caption'
    
    if(this.classList.contains(size)){
        [size,caption]=[caption,size]
    }
    this.classList.toggle(size)
    setTimeout(() => {
        this.classList.toggle(caption)
    }, 600);

    this.className += "siska baba"
    console.log(this.classList)
})
