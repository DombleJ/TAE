const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  await res.send('Hello World!');
});

app.get('/participants', async (req, res) => {
  res.send('GET EVERYONE!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
