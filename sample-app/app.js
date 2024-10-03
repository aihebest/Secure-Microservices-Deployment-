const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the sample microservice!');
});

app.listen(port, () => {
  console.log(`Sample microservice listening at http://localhost:${port}`);
});