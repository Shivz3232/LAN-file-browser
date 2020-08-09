const fs = require("fs")

function readcontent(file, callback, request, response) {
    var toreturn;
    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, function (error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end("<h1>500, internal error.</h1>");
                    toreturn = undefined;
                } else {
                    callback(request, response, content);
                }
            });
        } else {
            response.writeHead(404);
            response.end("<h1>404, not found.</h1>");
            toreturn = undefined;
        }
    });
    return toreturn;
}

module.exports = readcontent;