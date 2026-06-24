import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { LesionController } from './LesionController';

export const lesionRouter = Router();

/**
 * @swagger
 * /lesiones:
 *   get:
 *     tags: [Lesiones]
 *     summary: Listar lesiones registradas
 *     responses:
 *       200: { description: Lista de lesiones }
 *   post:
 *     tags: [Lesiones]
 *     summary: Registrar una lesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jugadorId, fechaLesion]
 *             properties:
 *               jugadorId: { type: string }
 *               fechaLesion: { type: string }
 *               fechaRetorno: { type: string, nullable: true }
 *               descripcion: { type: string, nullable: true }
 *               estado: { type: string }
 *     responses:
 *       201: { description: Lesión registrada }
 */
lesionRouter.get('/', asyncHandler(LesionController.list));
lesionRouter.post('/', asyncHandler(LesionController.registrar));

/**
 * @swagger
 * /lesiones/{id}:
 *   delete:
 *     tags: [Lesiones]
 *     summary: Eliminar una lesión
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Resultado de la eliminación }
 */
lesionRouter.delete('/:id', asyncHandler(LesionController.eliminar));
