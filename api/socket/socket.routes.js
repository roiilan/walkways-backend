module.exports = connectSockets
const userService = require('../user/user.service')

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('applyToProj', request => {
            console.log('I\'m in sockets.routes');
            

            //TODO go to service and update proj
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            // io.to(request.projOwnerId).emit('send request', request)
            console.log(request, 'request//////////////////////////////');
            
            //Save to data base(push request into creator notification)
            userService.getById(request.to._id)
            // userService.getById(request.projOwnerId)
                .then(user => {
                    // var projOwner = user
                    // projOwner.notifications.push(request)
                    // userService.update(projOwner)
                    user.notifications.push(request)
                    userService.update(user)
                })
                // userService.update(user)

                io.emit(request.to._id, request)
                // io.to(socket.myTopic).emit(request.to._id, request)
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