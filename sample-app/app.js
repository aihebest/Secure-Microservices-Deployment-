const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = 3000;

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'sample-app'
});

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Create a histogram metric for http request duration
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
});

// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds);

// Create a counter for total requests
const totalRequests = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'code']
});

// Register the counter
register.registerMetric(totalRequests);

app.get('/', (req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.send('Hello from the Secure Microservices Deployment Pipeline!');
  end({ method: req.method, route: req.route.path, code: res.statusCode });
  totalRequests.inc({ method: req.method, route: req.route.path, code: res.statusCode });
});

// Expose the Prometheus metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Sample app listening at http://localhost:${port}`);
});