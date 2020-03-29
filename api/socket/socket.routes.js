module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('applyToProj', request => {
            console.log('room:', io.sockets.adapter.rooms);

            console.log('yovel', request);
            //TODO go to service and update proj
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            socket.broadcast.to(request.projOwnerId).emit('send request', request)
        })

        socket.on('user topic', topic => {
            console.log('user', topic);
            socket.id = topic
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
            console.log('hasama', socket.myTopic);

        })

    })
}