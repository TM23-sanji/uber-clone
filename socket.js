const socketIo = require('socket.io');
const userModel= require('./models/user');
const captainModel= require('./models/captain');

let io;

function initializeSocket(server) {
    io = socketIo(server,{
        cors:{
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('join', async (data) => {
            const {userId, captainId, userType} = data;
            if (userType === 'user') {
                const user = await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
            } else if (userType === 'captain') {
                const captain = await captainModel.findByIdAndUpdate(captainId,{socketId:socket.id});
        }});

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io is not initialized.');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};