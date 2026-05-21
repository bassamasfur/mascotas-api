const Mascota = require('../models/mascota');

exports.getAllMascotas = (req, res) => {
  res.json(Mascota.getAll());
};

exports.getMascotaById = (req, res) => {
  const mascota = Mascota.getById(parseInt(req.params.id));
  if (mascota) {
    res.json(mascota);
  } else {
    res.status(404).json({ error: 'Mascota no encontrada' });
  }
};

exports.createMascota = (req, res) => {
  const nuevaMascota = Mascota.create(req.body);
  res.status(201).json(nuevaMascota);
};

exports.updateMascota = (req, res) => {
  const mascotaActualizada = Mascota.update(parseInt(req.params.id), req.body);
  if (mascotaActualizada) {
    res.json(mascotaActualizada);
  } else {
    res.status(404).json({ error: 'Mascota no encontrada' });
  }
};

exports.deleteMascota = (req, res) => {
  const eliminado = Mascota.delete(parseInt(req.params.id));
  if (eliminado) {
    res.json({ mensaje: 'Mascota eliminada' });
  } else {
    res.status(404).json({ error: 'Mascota no encontrada' });
  }
};
