import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { EstadisticaController } from './EstadisticaController';

export const estadisticaRouter = Router();

/**
 * @swagger
 * /estadisticas/jugadores:
 *   get:
 *     tags: [Estadisticas]
 *     summary: Estadísticas de todos los jugadores
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema: { type: string }
 *       - in: query
 *         name: equipoId
 *         schema: { type: string }
 *       - in: query
 *         name: soloActivos
 *         schema: { type: boolean }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de estadísticas de jugadores }
 */
estadisticaRouter.get('/jugadores', asyncHandler(EstadisticaController.jugadores));

/**
 * @swagger
 * /estadisticas/jugadores/{jugadorId}:
 *   get:
 *     tags: [Estadisticas]
 *     summary: Estadísticas de un jugador
 *     parameters:
 *       - in: path
 *         name: jugadorId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Estadísticas del jugador }
 */
estadisticaRouter.get('/jugadores/:jugadorId', asyncHandler(EstadisticaController.jugadorPorId));

/**
 * @swagger
 * /estadisticas/usuarios/{userId}:
 *   get:
 *     tags: [Estadisticas]
 *     summary: Estadísticas del jugador asociado a un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Estadísticas del jugador }
 */
estadisticaRouter.get('/usuarios/:userId', asyncHandler(EstadisticaController.jugadorPorUsuario));

/**
 * @swagger
 * /estadisticas/goleadores:
 *   get:
 *     tags: [Estadisticas]
 *     summary: Tabla de goleadores
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de goleadores }
 */
estadisticaRouter.get('/goleadores', asyncHandler(EstadisticaController.goleadores));

/**
 * @swagger
 * /estadisticas/equipo:
 *   get:
 *     tags: [Estadisticas]
 *     summary: Estadísticas por equipo
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema: { type: string }
 *       - in: query
 *         name: equipoId
 *         schema: { type: string }
 *     responses:
 *       200: { description: Estadísticas de equipos }
 */
estadisticaRouter.get('/equipo', asyncHandler(EstadisticaController.equipo));

/**
 * @swagger
 * /estadisticas/goles-por-mes:
 *   get:
 *     tags: [Estadisticas]
 *     summary: Goles agrupados por mes
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema: { type: string }
 *     responses:
 *       200: { description: Goles por mes }
 */
estadisticaRouter.get('/goles-por-mes', asyncHandler(EstadisticaController.golesPorMes));

/**
 * @swagger
 * /estadisticas/resumen-temporada:
 *   get:
 *     tags: [Estadisticas]
 *     summary: Resumen general de la temporada
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema: { type: string }
 *       - in: query
 *         name: equipoId
 *         schema: { type: string }
 *     responses:
 *       200: { description: Resumen de temporada }
 */
estadisticaRouter.get('/resumen-temporada', asyncHandler(EstadisticaController.resumenTemporada));
