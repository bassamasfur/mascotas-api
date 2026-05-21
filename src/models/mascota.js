// Simulación de base de datos en memoria
let mascotas = [];
let idCounter = 1;

class Mascota {
  constructor({ nombre, tipo, edad }) {
    this.id = idCounter++;
    this.nombre = nombre;
    this.tipo = tipo;
    this.edad = edad;
  }

  static getAll() {
    return mascotas;
  }

  static getById(id) {
    return mascotas.find(m => m.id === id);
  }

  static create(data) {
    const mascota = new Mascota(data);
    mascotas.push(mascota);
    return mascota;
  }

  static update(id, data) {
    const mascota = Mascota.getById(id);
    if (mascota) {
      mascota.nombre = data.nombre || mascota.nombre;
      mascota.tipo = data.tipo || mascota.tipo;
      mascota.edad = data.edad || mascota.edad;
      return mascota;
    }
    return null;
  }

  static delete(id) {
    const index = mascotas.findIndex(m => m.id === id);
    if (index !== -1) {
      mascotas.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = Mascota;
