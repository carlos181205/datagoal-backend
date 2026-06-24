import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Datagoal Backend API',
      version: '0.1.0',
      description:
        'API REST del backend de Datagoal Patriotas (Clean Architecture). Cada endpoint expone un caso de uso existente en src/modules/*/use-cases.',
    },
    servers: [{ url: '/api', description: 'Servidor actual' }],
    tags: [
      { name: 'Jugadores' },
      { name: 'Categorias' },
      { name: 'Convocatorias' },
      { name: 'Entrenamientos' },
      { name: 'Estadisticas' },
      { name: 'Finanzas' },
      { name: 'Lesiones' },
      { name: 'Notificaciones' },
      { name: 'OKR' },
      { name: 'Partidos' },
      { name: 'Torneos' },
      { name: 'Usuarios' },
    ],
    components: {
      schemas: {
        Jugador: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            nombreCompleto: { type: 'string' },
            posicion: { type: 'string', nullable: true },
            categoriaId: { type: 'string' },
            equipoId: { type: 'string', nullable: true },
            numeroCamiseta: { type: 'integer', nullable: true },
            goles: { type: 'integer' },
            asistencias: { type: 'integer' },
            tarjetasAmarillas: { type: 'integer' },
            tarjetasRojas: { type: 'integer' },
            activo: { type: 'boolean' },
          },
        },
        CreateJugador: {
          type: 'object',
          required: ['nombre', 'apellido', 'categoriaId'],
          properties: {
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            posicion: { type: 'string', nullable: true },
            categoriaId: { type: 'string' },
            equipoId: { type: 'string', nullable: true },
            numeroCamiseta: { type: 'integer', nullable: true },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../../modules/**/interfaces/http/*.routes.{ts,js}').split(path.sep).join('/')],
});
