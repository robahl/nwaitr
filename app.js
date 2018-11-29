const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let logFormat = 'dev';
if (process.env.PRODUCTION) {
  logFormat = 'short';
}

// Middleware
app.use(logger(logFormat));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    error: 'No `delay` param. Usage: `/2000` will respond after 2 seconds.'
  });
});

app.get('/:ms', (req, res) => {
  let responseDelay = req.params.ms;

  if (isNaN(responseDelay)) {
    return res.json({ error: 'Must provide a valid `delay` in milliseconds.' });
  }

  // Convert to number
  responseDelay = Number(responseDelay);

  setTimeout(
    () => res.json({ success: true, delayed: req.params.ms }),
    responseDelay
  );
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port', listener.address().port);
});
