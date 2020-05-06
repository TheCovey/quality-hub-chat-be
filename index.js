const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http')

const app = express();

const PORT = process.env.PORT || 3300;
const server = http.createServer(app)
app.use(helmet());
app.use(cors());
app.use(express.json());

const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('new connection')

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})

server.listen(PORT, ()=> {
    console.log(`***SERVER LISTENING ON PORT ${PORT}***`)
});

app.get('/', (req, res) => {
    res.status(200).json('Chat API');
})




// io.on('connection', function(client){
//     client.on('register', handleRegister)
//     client.on('join', handleJoin)
//     client.on('leave', handleLeave)
//     client.on('message', handleMessage)
//     client.on('chatrooms', handleGetChatrooms)
//     client.on('disconnect', function(){
//         console.log('client disconnected...', client.id)
//         handleDisconnect()
//     })
//     client.on('error', function(err){
//         console.log('recieved error', err)
//     })
// })


