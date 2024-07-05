require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

const PORT = 3500;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/', routes);
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT} PORT`);
  });
});
