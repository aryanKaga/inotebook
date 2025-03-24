const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser'); 
const app = express();
const connection = require('./controller/connect_server');
const authRouter = require('./router/auth');
const canvasRouter = require('./router/canvas');
const FileRouter = require('./router/fileInfo'); // Fixed extra '/'
const { verify } = require('./router/Login&verify');
const cors = require('cors');
const renamefile = require('./controller/function/renamefile');
const PORT = 5000;
const url = "mongodb://localhost:27017/inotebook";
const { getAllFiles } = require('./controller/function/getfiles');
const fileAccessRouter = require('./router/fileAccess');
const { getUsers } = require('./controller/function/getUsers');
const http = require('http');
const { WebSocketServer } = require('ws');
const { v4: uuid } = require('uuid');
const { ConnectUser } = require('./websocket/connectUser');

// ✅ CORS Configuration
const corsOptions = {
    origin: [ 'http://192.168.137.1:3003', 'http://localhost:3003','http://10.0.4.252:3003'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true ,

};
app.use(cors(corsOptions));

// ✅ Log payload size
app.use((req, res, next) => {
    console.log(`Payload Size: ${req.headers['content-length']} bytes`);
    next();
});

// ✅ Corrected Payload Limit
app.use(express.json({ limit: "10000mb" }));
app.use(express.urlencoded({ limit: "10000mb", extended: true }));
app.use(cookieParser());

connection(url);

// ✅ Express Middleware & Routes
app.use('/', verify);
app.use('/auth', authRouter);
app.use('/canvas', canvasRouter);
app.use('/Files', FileRouter);
app.use('/access', fileAccessRouter);
app.get('/getUsers', getUsers);

// ✅ HTTP & WebSocket Server Setup
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const rooms = new Map;

wss.on("connection", (connection, request) => {
    const origin = request.headers.origin;
    console.log('request has come for webscoket')
    if (!corsOptions.origin.includes(origin)) {
        console.log("Blocked WebSocket connection from:", origin);
        connection.close();
        return;
    }
    
    ConnectUser({ rooms, connection, request });
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
