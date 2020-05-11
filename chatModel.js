const db = require('./data/dbConfig');

module.exports = {
    findByUser,
    findByChatId,
    findChatById,
    createChat,
    insertMessage,
    findRoomsByUser
}

function findByUser (id) {
    return db('chats')
    .where('chats.user_1', id)
    .orWhere('chats.user_2', id)
    .join('messages', 'chats.id', 'messages.chat_id')
    .select('chats.id', 'messages.*')
}

function findByChatId (chat_id){
    return db('chats')
    .where('chats.id', chat_id)
    .join('messages', 'chats.id', 'messages.chat_id')
    .select('chats.id', 'messages.*')
}

function createChat(user1, user2){
    const chat_id = [user1, user2].sort().join('');
    const newChat = {
        id: chat_id,
        user_1: user1,
        user_2: user2
    }
    return db('chats').insert(newChat)
}

function insertMessage(message, chat_id){
    const messageObj = {
        ...message,
        chat_id
    }
    return db('messages').insert(messageObj)
}

function findChatById(id){
    return db('chats')
    .where({ id })
    .first()
}

function findRoomsByUser(id){
    return db('chats')
    .where('chats.user_1', id)
    .orWhere('chats.user_2', id)
    .select('chats.*')
}