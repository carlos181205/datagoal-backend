import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { EntrenamientoController } from './EntrenamientoController';

export const entrenamientoRouter = Router();

/**
 * @swagger
 * /entrenamientos:
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Listar entrenamientos
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema: { type: string }
 *     responses:
 *       200: { description: Lista de entrenamientos }
 *   post:
 *     tags: [Entrenamientos]
 *     summary: Crear entrenamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, fecha, categoria]
 *             properties:
 *               titulo: { type: string }
 *               fecha: { type: string }
 *               hora: { type: string, nullable: true }
 *               lugar: { type: string, nullable: true }
 *               categoria: { type: string }
 *               descripcion: { type: string, nullable: true }
 *               activo: { type: boolean }
 *               tipo: { type: string, nullable: true }
 *               duracion: { type: integer, nullable: true }
 *               objetivos: { type: string, nullable: true }
 *     responses:
 *       201: { description: Entrenamiento creado }
 */
entrenamientoRouter.get('/', asyncHandler(EntrenamientoController.list));
entrenamientoRouter.post('/', asyncHandler(EntrenamientoController.create));

/**
 * @swagger
 * /entrenamientos/reportes-asistencia:
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Reporte agregado de asistencia por jugador
 *     responses:
 *       200: { description: Reporte de asistencia }
 */
entrenamientoRouter.get('/reportes-asistencia', asyncHandler(EntrenamientoController.reportesAsistencia));

/**
 * @swagger
 * /entrenamientos/asistencias/raw:
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Asistencias sin procesar de todos los entrenamientos
 *     responses:
 *       200: { description: Lista de asistencias }
 */
entrenamientoRouter.get('/asistencias/raw', asyncHandler(EntrenamientoController.rawAsistencias));

/**
 * @swagger
 * /entrenamientos/jugadores-registrados/count:
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Cantidad de jugadores con asistencia registrada
 *     responses:
 *       200: { description: Conteo }
 */
entrenamientoRouter.get('/jugadores-registrados/count', asyncHandler(EntrenamientoController.jugadoresRegistradosCount));

/**
 * @swagger
 * /entrenamientos/jugadores/{jugadorId}/asistencias:
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Historial de asistencias de un jugador
 *     parameters:
 *       - in: path
 *         name: jugadorId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Asistencias del jugador }
 */
entrenamientoRouter.get('/jugadores/:jugadorId/asistencias', asyncHandler(EntrenamientoController.asistenciasPorJugador));

/**
 * @swagger
 * /entrenamientos/{id}:
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Obtener entrenamiento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Entrenamiento }
 *       404: { description: No existe }
 *   put:
 *     tags: [Entrenamientos]
 *     summary: Actualizar entrenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Entrenamiento actualizado }
 *   delete:
 *     tags: [Entrenamientos]
 *     summary: Eliminar entrenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 */
entrenamientoRouter.get('/:id', asyncHandler(EntrenamientoController.getById));
entrenamientoRouter.put('/:id', asyncHandler(EntrenamientoController.update));
entrenamientoRouter.delete('/:id', asyncHandler(EntrenamientoController.remove));

/**
 * @swagger
 * /entrenamientos/{id}/jugadores-asistencia:
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Jugadores con su estado de asistencia para un entrenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Jugadores con asistencia }
 */
entrenamientoRouter.get('/:id/jugadores-asistencia', asyncHandler(EntrenamientoController.jugadoresConAsistencia));

/**
 * @swagger
 * /entrenamientos/{id}/asistencias:
 *   post:
 *     tags: [Entrenamientos]
 *     summary: Guardar asistencias en bloque para un entrenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [asistencias]
 *             properties:
 *               asistencias:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [jugadorId, presente]
 *                   properties:
 *                     jugadorId: { type: string }
 *                     presente: { type: boolean }
 *                     excusa: { type: string, nullable: true }
 *                     horaLlegada: { type: string, nullable: true }
 *                     notas: { type: string, nullable: true }
 *     responses:
 *       204: { description: Asistencias guardadas }
 */
entrenamientoRouter.post('/:id/asistencias', asyncHandler(EntrenamientoController.guardarAsistencias));
