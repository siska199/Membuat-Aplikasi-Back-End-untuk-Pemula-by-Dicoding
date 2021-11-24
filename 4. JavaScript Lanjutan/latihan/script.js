const data = document.querySelectorAll('[data-duration]')

//Mencari jumlah video
const video = Array.from(data).filter(el=>el.innerHTML.includes('JAVASCRIPT LANJUTAN'))
document.querySelector('.jumlah-video').innerText = video.length

//Mencari jumlah waktu
const waktu = video.map(el=>{
                el = el.dataset.duration.split(':').map(elc=>Number(elc))
                secTotal = el[0]*60+el[1]
                return secTotal
            })
            .reduce((acc,curr)=>acc+curr)

const time = new Date(null)
time.setSeconds(waktu)
const mhsTime = time.toISOString().substr(11,8)
document.querySelector('.total-durasi').innerText = mhsTime+' jam';
 
const a = document.querySelector('.total-durasi').innerText.includes('Total')
console.log(a)







// const lists = ulChild.filter((el) => {
//     if(el.innerText.match(/javascript lanjutan/i) && el.getAttribute("data-duration")){
//         return el
//     }
// })

// const totVideo = lists.length;
// document.querySelector('.jumlah-video').innerText = totVideo;

// //---------------------------------------------------------------------------

// const listTime = lists.map(e=>{
//     return e.getAttribute("data-duration")
// })

// const minutes = []  
// const seconds = [] 

// listTime.forEach(el=>{
//     [min,sec]=el.split(":")
//     minutes.push(Number(min))
//     seconds.push(Number(sec))
// })

// const sumMinutes = minutes.reduce((acc,curr)=>acc+curr)
// const sumSecond = seconds.reduce((acc,curr)=>acc+curr)









