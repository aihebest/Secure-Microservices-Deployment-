const express = require('express');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello from the Secure Microservices Deployment Pipeline!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.listen(port, () => {
  console.log(`Sample app listening at http://localhost:${port}`);
});