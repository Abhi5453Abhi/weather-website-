
console.log("JS loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageTwo.textContent = ''

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const location = search.value
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                console.log(data.placeName)
                if (data.error) {
                    messageOne.textContent = "Please enter some other location"
                    console.log("Please enter some other location")
                } else {
                    messageOne.textContent = data.placeName
                    messageTwo.textContent = data.weatherDetails
                    console.log(data.placeName)
                    console.log(data.weatherDetails)
                }
            })
        })
    })