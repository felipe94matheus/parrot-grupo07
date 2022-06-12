const express = require('express');
const routes = require('./routes');
const db = require('./infrastructure/database');

const app = express();

app.use(express.json());

db.hasConnection();

app.use(routes);

app.listen(4000, () => console.log('Servidor no ar!'));