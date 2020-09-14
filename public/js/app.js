const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')
const messageThree = document.querySelector('#p3')
const messageFour = document.querySelector('#p4')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location =  search.value

    fetch('/weather?city=' + location).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.city
            messageTwo.textContent = "Temperature of " + data.temperature + "Cº"
            messageThree.textContent = "Feelslike " + data.feelslike + "Cº"
            messageFour.textContent = "Weather description: " + data.weather_description
        }

    })
})
})