const express = require('express')
const app = express();

const fs = require('fs')

const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)

const PORT = process.env.PORT || 5000

const env = Object.assign({}, process.env, {PORT: 5000});

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.sendFile('public/index.html'); //index.html
})

app.get('/download',function(req,res){
    res.download(__dirname +'/level.json','level.json'); //index.html/download
})

// Anyone up for some JSON WRITING?
io.on('connection',(socket) => {
    //console.log('new connection')
    socket.on('save level', (msg) => {
        //console.log(msg)
        io.emit('respond', msg)
        fs.writeFile('level.json', msg, (err) => { //and here is where we write to the JSON file
            if (err) throw err;
            console.log('The file has been saved!'); 
        });       
    })
})


server.listen(PORT, ()=> {
console.log("listenin")
})