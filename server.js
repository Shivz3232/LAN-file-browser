var express = require('express');
var app = express();
const playSong = require("./routes/playSong");
const listSongs = require("./routes/listSongs")
const serveIndex = require("serve-index")

app.get("/", (req, res) => {
    const obj = {
        msg: "App is under development",
        listenToSong: "http://<ip>:<port>/api/playsong/withoutranges/lol.mp3",
    }
    res.status(200).json(obj);
})

app.use('/ftp', express.static("D:\\Music\\My Music"), serveIndex("D:\\Music\\My Music", {
    'icons': true
}));
// app.use("/static", express.static('public'));
app.use("/api/playsong", playSong)
app.use("/api/listsongs", listSongs)

'use strict';

const {
    networkInterfaces
} = require('os');

const nets = networkInterfaces();
var ip = new String();

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
            if (name === 'Wi-Fi')
                ip[String] = net.address;
        }
    }
}

const port = 3927;

var server = app.listen(port, ip[String] || 'localhost', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})