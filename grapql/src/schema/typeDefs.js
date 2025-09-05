const { gql } = require("apollo-server-express");
const typeDefs = gql`
type Libro {
  id: ID!
  titulo: String!
  autor: String!
  isbn: String!
  anio_publicacion: Int!
  prestamos: [Prestamo!] # historial de préstamos asociados
}

type Prestamo {
  id: ID!
  usuario: String!
  fecha_prestamo: String!
  fecha_devolucion: String!
  libro: Libro!
}

# Consultas
type Query {
  getLibros: [Libro!]!
  getPrestamos: [Prestamo!]!
  getPrestamoById(id: ID!): Prestamo
  getPrestamosByUsuario(usuario: String!): [Prestamo!]! # 👈 desafío extra
}

# Mutaciones
type Mutation {
  createLibro(
    titulo: String!
    autor: String!
    isbn: String!
    anio_publicacion: Int!
  ): Libro!

  createPrestamo(
    usuario: String!
    fecha_prestamo: String!
    fecha_devolucion: String!
    libroId: ID!
  ): Prestamo!
}
`;
module.exports = typeDefs;