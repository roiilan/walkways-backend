module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('applyToProj', request => {
            console.log(request);

            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('send request', request)
        })
        socket.on('proj topic', topic => {

                if (socket.myTopic) {
                    socket.leave(socket.myTopic)
                }
                socket.join(topic)
                socket.myTopic = topic;
            })
            // socket.on('writingUser', ({ from, topic }) => {
            //     socket.broadcast.emit('typing', { from, topic })
            // })
    })
}