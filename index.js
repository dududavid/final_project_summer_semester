const express = require('express');
const app = express();
const port = 3500;

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {res.sendFile(__dirname + '/public/index.html');})
app.use('/p', require('./routes/finalProject_R'));

app.listen(port, () => {console.log(`http://localhost: ${port}`)})