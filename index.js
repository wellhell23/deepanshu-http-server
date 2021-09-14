const fs = require('fs');
const http = require('http');


const requestListener = function (req, res) {
    if (req.method === 'GET') {
        if (req.url === '/html') {

            fs.readFile("./index.html", 'utf8', (err, htmlData) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        res.writeHead(404);
                        res.write("File Not Found");
                    }
                    else {
                        res.writeHead(500);
                        res.write("Something went wrong");
                    }

                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(htmlData);
                }
                res.end();
            })
        }
        else {
            res.writeHead(404);
            res.write(http.STATUS_CODES[404])
            res.end();
        }
    }
    else {
        res.writeHead(405);
        res.write(http.STATUS_CODES[405]);
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(8080);