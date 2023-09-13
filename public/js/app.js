console.log('Client side JavaScript File')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#msz1')
const message2=document.querySelector('#msz2')
message1.textContent='Your result will be displayed here'
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value
    message1.textContent="Loading..."
    message2.textContent=""
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           return message1.textContent=data.error 
        }
        else{
            msz1.textContent=data.location
            msz2.textContent=data.forecast
        }
    })
})
    
})