const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/html', (req, res) => {
    // res.sendFile(path.join(__dirname, '/index.html'));
    res.redirect("/index.html");
});

app.get('/json', (req, res) => {
    // res.sendFile(path.join(__dirname, '/json.html'));
    res.redirect("/data.json");
});

app.get('/uuid', (req, res) => {
    let uuidObject = { name: uuidv4() };
    res.json(uuidObject);
});

app.get('/status/:id', (req, res) => {
    let responseStatus = http.STATUS_CODES[req.params.id];
    if (responseStatus) {
        res.status(parseInt(req.params.id));
        res.send(responseStatus);
    } else {
        res.status(404).send("Please enter correct status code");
    }
});

app.get('/delay/:id', (req, res) => {
    if (req.params.id >= 0) {
        setTimeout(() => {
            res.send(`Delay time is ${req.params.id}`)
        }, req.params.id * 1000);
    }
    else {
        res.status(404).send(http.STATUS_CODES[404])
    }
})

app.listen(8080, () => {
    console.log("Server is Running");
});