
const validate = /^\d*\.?\d*$/ ;

let fromSelect = document.querySelector('#fromSelect')
     toSelect = document.querySelector('#toSelect')
     
     fromCountry = document.querySelector('.fromCountry')
      toCountry = document.querySelector('.toCountry')

     inputText = document.querySelector('#inputText')

     result = document.querySelector('#result')
     button = document.querySelector('button')


dateT = document.querySelector('.dateT')




// get Curancy Names
fetch('currencies.json')
.then(res => res.json())
.then(data => {
    Object.keys(data).forEach(key => {
        fromSelect.innerHTML += `<option value="${key}">${key}</option>`
        toSelect.innerHTML += `<option value="${key}">${key}</option>`


    })
})





button.addEventListener('click', changeCurancy)

fromSelect.addEventListener('change', cuntryFrom)
fromSelect.addEventListener('change', changeCurancy)

toSelect.addEventListener('change', cuntryTo)
toSelect.addEventListener('change', changeCurancy)

inputText.addEventListener('input', changeCurancy)


function changeCurancy(){

    if(fromSelect.value != "" && toSelect.value != "" ){
        fetch(`https://v6.exchangerate-api.com/v6/ded9e1cc49300f93ee9aed63/latest/${fromSelect.value}`)
        .then(res => res.json())
        .then(data => {
        result.innerHTML = " - - - "
        result.style.color = "white"


        
        if(inputText.value != ""  && inputText.value.match(validate)){
            result.innerHTML = (inputText.value  * data.conversion_rates[toSelect.value]).toFixed(3) + " " + toSelect.value
        }else{
            result.innerHTML = ` 1 ${fromSelect.value} =   ${data.conversion_rates[toSelect.value]} ${toSelect.value}`
        } 
    })

    }else{
        result.innerHTML = "please select the currency ."
        result.style.color = "red"
    }

       
}




// display country name
function cuntryFrom(){
    fetch('currencies.json')
    .then(res => res.json())
    .then(data => {
        fromCountry.innerHTML = data[fromSelect.value] 
    }) 
}



function cuntryTo(){
    fetch('currencies.json')
    .then(res => res.json())
    .then(data => {
        toCountry.innerHTML = data[toSelect.value] 
    }) 
}





// show date and time
function dateTime(){
date = new Date()
utcDate = date.toUTCString()
myDate = date.toLocaleString()
dateT.innerHTML = utcDate + '<br>' + myDate
setTimeout(dateTime, 1000)
}

dateTime()



