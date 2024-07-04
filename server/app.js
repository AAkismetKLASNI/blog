const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const PORT = 3600;

app.use(cookieParser());
app.use(express.json());

app.use('/', routes);
mongoose
  .connect(
    'mongodb+srv://forevernoox:shoutsphobia@cluster2.h9nybyo.mongodb.net/blog?retryWrites=true&w=majority&appName=cluster2'
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER STARTED ON ${PORT} PORT`);
    });
  });
