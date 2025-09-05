const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Prestamo",
  tableName: "prestamos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    usuario: {
      type: "varchar"
    },
    fecha_prestamo: {
      type: "date"
    },
    fecha_devolucion: {
      type: "date"
    }
  },
  relations: {
    libro: {
      target: "Libro",
      type: "many-to-one",
      joinColumn: true,
      eager: true
    }
  }
});
