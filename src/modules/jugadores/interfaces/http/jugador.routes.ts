import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { JugadorController } from './JugadorController';

export const jugadorRouter = Router();

/**
 * @swagger
 * /jugadores:
 *   get:
 *     tags: [Jugadores]
 *     summary: Listar jugadores
 *     parameters:
 *       - in: query
 *         name: categoriaId
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Lista de jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Jugador' }
 *   post:
 *     tags: [Jugadores]
 *     summary: Crear jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateJugador' }
 *     responses:
 *       201:
 *         description: Jugador creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Jugador' }
 */
jugadorRouter.get('/', asyncHandler(JugadorController.list));
jugadorRouter.post('/', asyncHandler(JugadorController.create));

/**
 * @swagger
 * /jugadores/{id}:
 *   get:
 *     tags: [Jugadores]
 *     summary: Obtener jugador por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Jugador encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Jugador' }
 *       404: { description: No existe }
 *   put:
 *     tags: [Jugadores]
 *     summary: Actualizar jugador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateJugador' }
 *     responses:
 *       200:
 *         description: Jugador actualizado
 *   delete:
 *     tags: [Jugadores]
 *     summary: Eliminar jugador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 */
jugadorRouter.get('/:id', asyncHandler(JugadorController.getById));
jugadorRouter.put('/:id', asyncHandler(JugadorController.update));
jugadorRouter.delete('/:id', asyncHandler(JugadorController.remove));

/**
 * @swagger
 * /jugadores/{id}/transferir:
 *   post:
 *     tags: [Jugadores]
 *     summary: Trasladar jugador a otra categoría
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
 *             required: [categoriaId]
 *             properties:
 *               categoriaId: { type: string }
 *     responses:
 *       200:
 *         description: Jugador trasladado
 */
jugadorRouter.post('/:id/transferir', asyncHandler(JugadorController.transferir));
