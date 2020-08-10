const express = require("express")
const router = express.Router();
const glob = require("glob");
const fs = require("fs");
const duration = require("mp3-duration");
const moment = require("moment")

function create(array) {
    if (1 == 1) {
        fs.stat('D:/Docs/API/Basic api/public/music/lol.mp3', (err, stat) => {
            console.log("stat:", stat)
            array.push(stat)
        })
    }
}

router.get('/', function (req, res) {

    let collection = new Array();

    glob("D:\\Docs\\API\\Basic api\\public" + "/**/*", async (err, results) => {
        for (let i = 0; i < results.length; i++) {
            if (results[i].match(".mp3$") || results[i].match(".ogg$") || results[i].match(".wav$")) {
                fs.stat(results[i], async (err, stat) => {
                    if (!err) {
                        duration(results[i], async (err, length) => {
                            if (!err) {
                                let minutes = Math.floor(length / 60)
                                let remainingSeconds = Math.floor(length) - minutes * 60

                                let file = new Object()
                                file.key = results[i]
                                file.duration = String(minutes) + ' : ' + String(remainingSeconds)
                                file.lastListend = moment(stat.atime).fromNow()

                                collection.push(file)
                                console.log(collection)
                            }
                        })
                    }
                })
            }
        }
        console.log(collection);
    })

    res.send(collection)
});

module.exports = router