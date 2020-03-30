const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(username, password) {

    logger.debug(`auth.service - login with username: ${username}`)
    if (!username || !password) return Promise.reject('username and password are required!')

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password;
    return user;
}

async function signup(username, password, fullName, imgUrl, isAdmin, joinAt, karma, position, notifications) {
    if (!fullName || !password || !username) return Promise.reject('fullName, username and password are required!')
    logger.debug(`auth.service - signup with username: ${username}`)
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ fullName, password: hash, username, imgUrl, isAdmin, joinAt, karma, position, notifications })
}


module.exports = {
    signup,
    login,
}