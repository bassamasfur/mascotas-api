// api/serverless.js (opcional, solo si usas middlewares avanzados)
const app = require('./index');

module.exports = (req, res) => {
  app(req, res);
};
