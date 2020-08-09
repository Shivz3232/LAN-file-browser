function serveWithoutRanges(request, response, content) {
    var total = content.length;
    var start = 0;
    var end = 0;
    var chunksize = 0;
    start = 0;
    end = content.length - 1;
    if (request.url.match(".mp3$")) {
        response.writeHead(200, {
            "Content-Type": "audio/mp3",
            "Content-Length": end
        });
    } else {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
    }
    response.end(content);
}

module.exports = serveWithoutRanges;