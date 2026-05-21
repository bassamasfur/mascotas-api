const express = require('express');
const bodyParser = require('body-parser');
const mascotasRoutes = require('../src/routes/mascotasRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/mascotas', mascotasRoutes);

module.exports = app;
