const express = require("express")
const router = express.Router();
const glob = require("glob");

const getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
};

router.get("/", (req, res) => {
    getDirectories("D:\\Music\\My Music", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

module.exports = router