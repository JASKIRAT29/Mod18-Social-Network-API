const express = require('express');
// Run npm install mongodb and require mongodb and MongoClient class
const mongodb = require('mongodb');
const routes = require("./routes");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log('API server running on port ${PORT}!');
  });
});

