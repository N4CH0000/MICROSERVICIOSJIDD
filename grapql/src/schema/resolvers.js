const { AppDataSource } = require("../db"); // 👈 en lugar de index.js

const resolvers = {
  Query: {
    getLibros: async () => {
      return await AppDataSource.getRepository("Libro").find({ relations: ["prestamos"] });
    },
    getPrestamos: async () => {
      return await AppDataSource.getRepository("Prestamo").find({ relations: ["libro"] });
    },
    getPrestamoById: async (_, { id }) => {
      return await AppDataSource.getRepository("Prestamo").findOne({
        where: { id },
        relations: ["libro"]
      });
    },
    getPrestamosByUsuario: async (_, { usuario }) => {
      return await AppDataSource.getRepository("Prestamo").find({
        where: { usuario },
        relations: ["libro"]
      });
    }
  },
  Mutation: {
    createLibro: async (_, { titulo, autor, isbn, anio_publicacion }) => {
      const repo = AppDataSource.getRepository("Libro");
      const libro = repo.create({ titulo, autor, isbn, anio_publicacion });
      return await repo.save(libro);
    },
    createPrestamo: async (_, { usuario, fecha_prestamo, fecha_devolucion, libroId }) => {
      const repoPrestamo = AppDataSource.getRepository("Prestamo");
      const repoLibro = AppDataSource.getRepository("Libro");

      const libro = await repoLibro.findOneBy({ id: libroId });
      if (!libro) throw new Error("Libro no encontrado");

      const prestamo = repoPrestamo.create({
        usuario,
        fecha_prestamo,
        fecha_devolucion,
        libro
      });

      return await repoPrestamo.save(prestamo);
    }
  }
};

module.exports = resolvers;

// const resolvers = {
//     Query: {
//         getPadrones: async () => {
//             return await AppDataSource.getRepository("Padron").find({ relations: ["mesa"] });
//         },
//         getMesas: async () => {
//             return await AppDataSource.getRepository("Mesa").find({ relations: ["padrones"] });
//         },
//         getPadronById: async (_, { id }) => {
//             return await AppDataSource.getRepository("Padron").findOne({
//                 where: { id },
//                 relations: ["mesa"]
//             });
//         }
//     },
//     Mutation: {
//         createMesa: async (_, { nro_mesa, nombre_escuela }) => {
//             const repo = AppDataSource.getRepository("Mesa");
//             const mesa = repo.create({ nro_mesa, nombre_escuela });
//             return await repo.save(mesa);
//         },
//         createPadron: async (_, { nombres, apellidos, numero_documento, fotografia, mesaId }) => {
//             const repoPadron = AppDataSource.getRepository("Padron");
//             const repoMesa = AppDataSource.getRepository("Mesa");

//             const mesa = await repoMesa.findOneBy({ id: mesaId });
//             if (!mesa) throw new Error("Mesa no encontrada");

//             const padron = repoPadron.create({
//                 nombres,
//                 apellidos,
//                 numero_documento,
//                 fotografia,
//                 mesa
//             });
//             return await repoPadron.save(padron);
//         }
//     }
// };
// module.exports = resolvers;
