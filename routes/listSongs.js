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

router.get('/', async function (req, res) {

    let results = await new Promise((res, rej) => {
        glob("D:\\Music\\My Music\\02- One Direction - Take Me Home-2012" + "/**/*", (err, results) => {
            if (err != null) rej(err);
            else res(results);
        });
    });

    results = results.filter(
        (result) => /\.mp3$/.test(result) || /\.ogg/.test(result) || /\.wav/.test(result)
    );

    const collection = await Promise.all(
        results.map(async (result) => {
            const stat = await new Promise((res, rej) => {
                fs.stat(result, (err, stat) => {
                    if (err != null) rej(err);
                    else res(stat)
                })
            })

            const length = await new Promise((res, rej) => {
                duration(result, (err, length) => {
                    if (err != null) rej(err);
                    else res(length)
                })
            })

            const minutes = Math.floor(length / 60)
            const remainingSeconds = Math.floor(length) - minutes * 60;

            return {
                key: result,
                duration: `${minutes} : ${remainingSeconds}`,
                lastListened: moment(stat.atime).fromNow()
            }
        })
    )

    res.send({
        collection
    });
});

module.exports = router

let collection = new Array();

// // glob returns an array 'results' containg the path of every subdirectory and file in the given location
// glob("D:\\Music" + "/**/*", async (err, results) => {

//     // Filter out the required files and prepare them to be served in the required format by
//     for (let i = 0; i < results.length; i++) {
//         if (results[i].match(".mp3$") || results[i].match(".ogg$") || results[i].match(".wav$")) {

//             // To get the alst accessed time of the file: stat.atime
//             fs.stat(results[i], async (err, stat) => {
//                 if (!err) {

//                     // To get the duration if that mp3 song
//                     duration(results[i], async (err, length) => {
//                         if (!err) {
//                             let minutes = Math.floor(length / 60)
//                             let remainingSeconds = Math.floor(length) - minutes * 60

//                             // The format to be served
//                             let file = new Object()
//                             file.key = results[i]
//                             file.duration = String(minutes) + ' : ' + String(remainingSeconds)
//                             file.lastListend = moment(stat.atime).fromNow()

//                             collection.push(file)
//                             console.log(collection) //this does log every iteration
//                         }
//                     })
//                 }
//             })
//         }
//     }
//     console.log(collection); //logs an empty array
// })