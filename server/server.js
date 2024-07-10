const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const arenaRoutes = require('./routes/arenaRoutes');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.json());
app.use('/api/arena', arenaRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
