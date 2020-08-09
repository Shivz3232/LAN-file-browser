const express = require("express")
const router = express.Router()
const readcontent = require("../fetchfile");
const serveWithRanges = require("../streamers/serveWithRanges");
const serveWithoutRanges = require("../streamers/serveWithoutRanges");

router.get("/ranges/:name", (req, res) => {
    readcontent(__dirname + '\\public\\movies\\' + req.params.name, serveWithRanges, req, res);
})

router.get("/withoutranges/:name", (req, res) => {
    readcontent(__dirname + '\\public\\movies\\' + req.params.name, serveWithoutRanges, req, res);
})

module.exports = router