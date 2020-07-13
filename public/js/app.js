console.log('Client side js file is printed')

/*fetch() is a function defined by browser.It cannot be used by nodejs*/

/*At first it will fetch the data from the url provided and then it will convert it to json and later it will check if the data (here address will
  will go to data) is provided or not.*/ 


const weatherForm=document.querySelector('form') /*When we put some tag inside queryselector it targets the first tag on the page.Like her it will
                                                   target the first form in that page.*/
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value

     messageOne.textContent='Loading....'
     messageTwo.textContent=''

fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
           messageOne.textContent= data.error
        } 
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})
})