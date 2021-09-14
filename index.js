const fs = require('fs');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const requestListener = function (req, res) {
    if (req.method === 'GET') {
        if (req.url === '/html' || req.url === '/html/') {

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
            });
        }
        else if (req.url === '/json' || req.url === '/json/') {

            fs.readFile("./data.json", 'utf8', (err, jsonData) => {
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
                        'Content-Type': 'application/JSON'
                    });
                    res.write(jsonData);
                }
                res.end();
            })
        } else if (req.url === '/uuid' || req.url === '/uuid/') {
            res.writeHead(200, {
                'Content-Type': 'application/JSON'
            });
            let uuidObject = { name: uuidv4() };
            res.write(JSON.stringify(uuidObject));
            res.end();
        }
        else if (req.url.includes('/status')) {

            let statusCode = path.basename(req.url);
            let responseStatus = http.STATUS_CODES[statusCode];
            if (responseStatus) {
                res.writeHead(parseInt(statusCode));
                res.write(responseStatus);
                res.end();
            }
            else if (statusCode == 'status') {
                res.writeHead(422);
                res.write(http.STATUS_CODES[422]);
                res.end();
            }
            else {
                res.writeHead(404);
                res.write(http.STATUS_CODES[404])
                res.end();
            }
        }
        else if (req.url.includes('/delay')) {
            let delayTime = +path.basename(req.url);
            if (isNaN(delayTime)) {
                res.writeHead(422);
                res.write(http.STATUS_CODES[422]);
                res.end();
            }
            else {
                setTimeout(() => {
                    res.writeHead(200);
                    res.write(http.STATUS_CODES[200]);
                    res.end();
                }, delayTime * 1000);
            }
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