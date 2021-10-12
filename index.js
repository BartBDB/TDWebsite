const express = require('express')
const app = express();

const fs = require('fs')

const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.sendFile('public/index.html');
})

// yo this is very very important very very very soon
io.on('connection',(socket) => {
    //console.log('new connection')
    socket.on('save level', (msg) => {
        console.log(msg)
        io.emit('respond', msg)
        fs.writeFile('level.json', msg, (err) => { //and here is where we write to the JSON file
            if (err) throw err;
            console.log('The file has been saved!');
          });
    })
})

server.listen(3000, ()=> {
console.log("listenin")
})