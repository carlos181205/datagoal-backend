import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { TorneoController } from './TorneoController';

export const torneoRouter = Router();

/**
 * @swagger
 * /torneos:
 *   get:
 *     tags: [Torneos]
 *     summary: Listar torneos
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema: { type: string, enum: [proximo, en_curso, finalizado] }
 *     responses:
 *       200: { description: Lista de torneos }
 *   post:
 *     tags: [Torneos]
 *     summary: Crear torneo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, categoria, fechaInicio, estado]
 *             properties:
 *               nombre: { type: string }
 *               categoria: { type: string }
 *               fechaInicio: { type: string }
 *               fechaFin: { type: string, nullable: true }
 *               estado: { type: string, enum: [proximo, en_curso, finalizado] }
 *               descripcion: { type: string, nullable: true }
 *               logoUrl: { type: string, nullable: true }
 *               resultado: { type: string, nullable: true }
 *     responses:
 *       201: { description: Torneo creado }
 */
torneoRouter.get('/', asyncHandler(TorneoController.list));
torneoRouter.post('/', asyncHandler(TorneoController.create));

/**
 * @swagger
 * /torneos/{id}:
 *   get:
 *     tags: [Torneos]
 *     summary: Obtener torneo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Torneo }
 *       404: { description: No existe }
 *   put:
 *     tags: [Torneos]
 *     summary: Actualizar torneo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Torneo actualizado }
 *   delete:
 *     tags: [Torneos]
 *     summary: Eliminar torneo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 */
torneoRouter.get('/:id', asyncHandler(TorneoController.getById));
torneoRouter.put('/:id', asyncHandler(TorneoController.update));
torneoRouter.delete('/:id', asyncHandler(TorneoController.remove));
