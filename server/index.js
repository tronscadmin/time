require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const indexRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 3002;

(async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        require('./scripts/updateEvents').start();
        require('./scripts/getDailyData').start();
        require('./scripts/getDataPoints').start();
        const server = require('http').createServer(app);
        const io = require('socket.io')(server);
        io.on('connection', (socket) => {
            console.log('new socket connection==>>');
            global.socket = socket;
        });
        app.use(express.json());
        app.use('/api', indexRouter);

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(__dirname + '/../dist'));
            app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
            });
        }

        server.listen(PORT, () => console.log(`Server started at ${PORT}`));
    } catch (err) {
        console.log('err connecting to db', err);
    }
})();
