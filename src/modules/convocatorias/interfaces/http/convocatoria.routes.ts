import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { ConvocatoriaController } from './ConvocatoriaController';

export const convocatoriaRouter = Router();

/**
 * @swagger
 * /convocatorias/partido/{partidoId}:
 *   get:
 *     tags: [Convocatorias]
 *     summary: Jugadores disponibles y convocados para un partido
 *     parameters:
 *       - in: path
 *         name: partidoId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Jugadores y convocatoria actual }
 */
convocatoriaRouter.get('/partido/:partidoId', asyncHandler(ConvocatoriaController.getParaPartido));

/**
 * @swagger
 * /convocatorias:
 *   post:
 *     tags: [Convocatorias]
 *     summary: Guardar la convocatoria de un partido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [partidoId, jugadorIds]
 *             properties:
 *               partidoId: { type: string }
 *               jugadorIds: { type: array, items: { type: string } }
 *               notas: { type: string, nullable: true }
 *     responses:
 *       201: { description: Convocatoria guardada }
 */
convocatoriaRouter.post('/', asyncHandler(ConvocatoriaController.guardar));
