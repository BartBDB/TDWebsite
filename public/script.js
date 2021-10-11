/*
let socket = io();

const form = document.getElementById('form')
const input = document.getElementById('input')
const xbox = document.getElementById('xbox')

form.addEventListener("submit",(e) => {
    e.preventDefault();
    //console.log(input.value)
    socket.emit('message sent',input.value);
    input.value = "";
})

socket.on("respond", (msg) => {
    console.log("response is " + msg)
    xbox.innerHTML += msg + '<br>'
})

*/