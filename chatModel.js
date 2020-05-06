const db = require('./data/dbConfig');

module.exports = {
    findByUser
}

function findByUser (id) {
    return db('chats')
    .where('chats.user_1', id)
    .orWhere('chats.user_2', id)
    .join('messages', 'chats.id', 'messages.chat_id')
    .select('chats.id', 'messages.*')
}