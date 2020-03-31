module.exports = connectSockets
const userService = require('../user/user.service')

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('applyToProj', request => {

            //TODO go to service and update proj
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            // io.to(request.projOwnerId).emit('send request', request)

            //Save to data base(push request into creator notification)
            userService.getById(request.projOwnerId)
                .then(user => {
                    var projOwner = user
                    projOwner.notifications.push(request)
                    userService.update(projOwner)
                })
                // userService.update(user)

            io.emit(request.projOwnerId, request)
        })

        socket.on('user topic', topic => {
            socket.id = topic
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;

        })

    })
}