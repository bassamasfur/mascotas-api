const express = require('express');
const bodyParser = require('body-parser');
const mascotasRoutes = require('./src/routes/mascotasRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/mascotas', mascotasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
