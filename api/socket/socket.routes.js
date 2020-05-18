module.exports = connectSockets
const userService = require('../user/user.service')

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('applyToProj', request => {
                io.emit(`apply ${request.to._id}`, request)
                console.log('apply',request );
                
                // io.to(socket.myTopic).emit(request.to._id, request)
        })
        socket.on('decline', notification => {
            console.log('declinedddddd!', notification);
            io.emit(`decline ${notification.from._id}`, notification)
            io.emit(`decline ${notification.to._id}`, notification)
        })
        socket.on('approve', notification => {

            io.emit(`approve ${notification.from._id}`, notification)
            io.emit(`approve ${notification.to._id}`, notification)
        })

        socket.on('chat newMsg', msg=>{
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('chat topic', topic=>{
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('writingUser', ({ from, topic }) => {
            socket.broadcast.emit('typing', { from, topic })
        })
    })
}