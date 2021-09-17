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

app.listen(8080, () => {
    console.log("Server is Running");
});