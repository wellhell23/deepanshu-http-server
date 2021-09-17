const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');



app.listen(8080, () => {
    console.log("Server is Running");
});