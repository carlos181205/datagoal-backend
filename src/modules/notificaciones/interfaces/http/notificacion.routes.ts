import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { NotificacionController } from './NotificacionController';

export const notificacionRouter = Router();

/**
 * @swagger
 * /notificaciones/usuario/{userId}:
 *   get:
 *     tags: [Notificaciones]
 *     summary: Notificaciones de un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Lista de notificaciones }
 */
notificacionRouter.get('/usuario/:userId', asyncHandler(NotificacionController.porUsuario));

/**
 * @swagger
 * /notificaciones/enviar:
 *   post:
 *     tags: [Notificaciones]
 *     summary: Enviar una notificación a varios usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userIds, titulo]
 *             properties:
 *               userIds: { type: array, items: { type: string } }
 *               titulo: { type: string }
 *               descripcion: { type: string, nullable: true }
 *               tipo: { type: string, nullable: true }
 *               prioridad: { type: string, nullable: true }
 *     responses:
 *       201: { description: Notificaciones enviadas }
 */
notificacionRouter.post('/enviar', asyncHandler(NotificacionController.enviar));
