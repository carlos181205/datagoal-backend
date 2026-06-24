import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { PartidoController } from './PartidoController';

export const partidoRouter = Router();

/**
 * @swagger
 * /partidos:
 *   get:
 *     tags: [Partidos]
 *     summary: Listar partidos
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema: { type: string }
 *       - in: query
 *         name: incluirCancelados
 *         schema: { type: boolean }
 *         description: "Si es 'false', excluye partidos cancelados (solo activos)."
 *     responses:
 *       200: { description: Lista de partidos }
 *   post:
 *     tags: [Partidos]
 *     summary: Crear partido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [equipoLocal, equipoVisitante, fecha]
 *             properties:
 *               equipoLocal: { type: string }
 *               equipoVisitante: { type: string }
 *               fecha: { type: string }
 *               hora: { type: string, nullable: true }
 *               lugar: { type: string, nullable: true }
 *               categoria: { type: string, nullable: true }
 *               descripcion: { type: string, nullable: true }
 *     responses:
 *       201: { description: Partido creado }
 */
partidoRouter.get('/', asyncHandler(PartidoController.list));
partidoRouter.post('/', asyncHandler(PartidoController.create));

/**
 * @swagger
 * /partidos/eventos:
 *   post:
 *     tags: [Partidos]
 *     summary: Registrar un evento de partido (gol, tarjeta, cambio)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [partidoId, minuto, tipo, equipo]
 *             properties:
 *               partidoId: { type: string }
 *               jugadorId: { type: string, nullable: true }
 *               minuto: { type: integer }
 *               tipo: { type: string, enum: [gol, tarjeta_amarilla, tarjeta_roja, cambio] }
 *               equipo: { type: string, enum: [local, visitante] }
 *               descripcion: { type: string, nullable: true }
 *     responses:
 *       201: { description: Evento registrado }
 */
partidoRouter.post('/eventos', asyncHandler(PartidoController.registrarEvento));

/**
 * @swagger
 * /partidos/eventos/{id}:
 *   delete:
 *     tags: [Partidos]
 *     summary: Eliminar un evento de partido y revertir su impacto estadístico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Evento eliminado }
 */
partidoRouter.delete('/eventos/:id', asyncHandler(PartidoController.eliminarEvento));

/**
 * @swagger
 * /partidos/{id}:
 *   get:
 *     tags: [Partidos]
 *     summary: Obtener partido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Partido }
 *       404: { description: No existe }
 *   put:
 *     tags: [Partidos]
 *     summary: Actualizar partido (incluye marcador y estado)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Partido actualizado }
 */
partidoRouter.get('/:id', asyncHandler(PartidoController.getById));
partidoRouter.put('/:id', asyncHandler(PartidoController.update));

/**
 * @swagger
 * /partidos/{id}/eventos:
 *   get:
 *     tags: [Partidos]
 *     summary: Listar eventos de un partido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Lista de eventos }
 */
partidoRouter.get('/:id/eventos', asyncHandler(PartidoController.eventos));
