const express = require("express")
const router = express.Router()
const readcontent = require("../fetchfile");
const serveWithRanges = require("../streamers/serveWithRanges");
const serveWithoutRanges = require("../streamers/serveWithoutRanges");

router.get("/ranges/:name", (req, res) => {
    readcontent(process.cwd() + '\\public\\music\\' + req.params.name, serveWithRanges, req, res);
})

router.get("/withoutranges/:name", (req, res) => {
    readcontent(process.cwd() + '\\public\\music\\' + req.params.name, serveWithoutRanges, req, res);
})

module.exports = router