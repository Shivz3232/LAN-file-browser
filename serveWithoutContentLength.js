function serveWithoutContentLength(request, response, content) {
  response.writeHead(200, {
    "Content-Type": "audio/ogg"
  });
  response.end(content);
}

module.exports = serveWithoutContentLength