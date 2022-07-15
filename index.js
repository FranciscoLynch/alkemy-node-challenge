const express = require('express');
const app = express();  
const { port } = require('./src/config/cfg');


function main() {
    app.listen(port, (req, res) => {
        console.log(`Server running in port ${port}`);
    });
}