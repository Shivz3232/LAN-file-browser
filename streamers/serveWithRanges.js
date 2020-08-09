function serveWithRanges(request, response, content) {
    var range = request.headers.range;
    var total = content.length;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total;
    var chunksize = (end - start);
    response.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/ogg"
    });
    response.end(content.slice(start, end));
}

module.exports = serveWithRanges;