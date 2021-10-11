const express = require('express')
const app = express();

const fs = require('fs')

const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.sendFile('index.html');
})

/*
io.on('connection',(socket) => {
    //console.log('new connection')
    socket.on('message sent', (msg) => {
        //console.log(msg)
        io.emit('respond', msg)
        fs.writeFile('message.txt', msg, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
    })
})
*/

server.listen(3000, ()=> {
console.log("listenin")
})