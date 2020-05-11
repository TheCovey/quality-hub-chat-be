const router = require('express').Router();
const db = require('./chatModel.js');

router.get('/messages/:userId', (req, res) => {
    const { userId } = req.params
    db.findByUser(userId)
    .then(chats => {
        if (chats.length > 0){
            res.status(200).json(chats)
        }
        else{
            res.status(401).json({ message: 'No messages found'})
        }
    })
    .catch(err => res.status(500).json({err}))
})

router.get('/rooms/:userId', (req, res) => {
    const { userId } = req.params
    db.findRoomsByUser(userId)
    .then(chats => {
        if (chats.length > 0){
            res.status(200).json(chats)
        }
        else{
            res.status(401).json({ message: 'No active rooms found'})
        }
    })
    .catch(err => res.status(500).json({err}))
})

router.get('/:roomId', (req, res) => {
    const { roomId } = req.params
    db.findByChatId(roomId)
    .then(chats => {
        res.status(200).json(chats)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/newRoom', (req, res) => {
    const { user_1, user_2 } = req.body
    const roomId = [user_1, user_2].sort().join('')
    db.findByChatId(roomId)
    .then(room => {
        if (room.length > 0){
            res.status(409).json({message: 'Room already exists'})
        }
        else {

            db.createChat(user_1, user_2)
            .then(chat => res.status(200).json({ message: 'Successfully added'}))
            .catch(error => {
                console.log(error)
                res.status(500).json(error)
            })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})

router.post('/:roomId', (req, res) => {
    const { roomId } = req.params
    const message = req.body
    db.findChatById(roomId)
    .then(room => {
        if(room){
            if (message.sender === room.user_1 || message.sender === room.user_2){
                db.insertMessage(req.body, roomId)
                .then(message => res.status(200).json({ message: 'Successfully added' }))
                .catch(err => res.status(500).json({ err }))
            }
            else{
                res.status(401).json({ error: 'Invalid Sender'})
            }
        }
        else{
            res.status(401).json({ error: 'Room does not exist'})
        }
    })
    .catch(error => res.status(500).json({ error }))
})

module.exports = router