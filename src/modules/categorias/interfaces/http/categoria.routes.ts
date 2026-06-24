import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { CategoriaController } from './CategoriaController';

export const categoriaRouter = Router();

/**
 * @swagger
 * /categorias/selectores:
 *   get:
 *     tags: [Categorias]
 *     summary: Categorías maestras y equipos activos para selectores de UI
 *     responses:
 *       200:
 *         description: Categorías maestras y equipos
 */
categoriaRouter.get('/selectores', asyncHandler(CategoriaController.selectores));

/**
 * @swagger
 * /categorias/maestras:
 *   post:
 *     tags: [Categorias]
 *     summary: Crear o actualizar una categoría maestra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               id: { type: string, nullable: true }
 *               nombre: { type: string }
 *               edades: { type: string, nullable: true }
 *               modalidad: { type: string, nullable: true }
 *     responses:
 *       200: { description: Actualizada }
 *       201: { description: Creada }
 */
categoriaRouter.post('/maestras', asyncHandler(CategoriaController.upsertMaestra));

/**
 * @swagger
 * /categorias/equipos:
 *   post:
 *     tags: [Categorias]
 *     summary: Crear o actualizar un equipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [equipo, categoriaId]
 *             properties:
 *               id: { type: string, nullable: true }
 *               equipo: { type: string }
 *               tecnicoId: { type: string, nullable: true }
 *               sede: { type: string, nullable: true }
 *               fundacion: { type: integer, nullable: true }
 *               categoriaId: { type: string }
 *               color: { type: string, nullable: true }
 *               horario: { type: string, nullable: true }
 *     responses:
 *       200: { description: Actualizado }
 *       201: { description: Creado }
 */
categoriaRouter.post('/equipos', asyncHandler(CategoriaController.upsertEquipo));
