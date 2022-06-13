const express = require('express');
const routes = require('./routes');
const db = require('./infrastructure/database');
const trataErros = require('./middleware/trataErros');


const app = express();

app.use(express.json());

db.hasConnection();

app.use(routes);
app.use(trataErros)

app.listen(4000, () => console.log('Servidor no ar!'));