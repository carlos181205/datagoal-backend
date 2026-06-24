import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { OKRController } from './OKRController';

export const okrRouter = Router();

/**
 * @swagger
 * /okr:
 *   get:
 *     tags: [OKR]
 *     summary: Listar objetivos OKR con sus resultados clave
 *     responses:
 *       200: { description: Lista de objetivos }
 *   post:
 *     tags: [OKR]
 *     summary: Crear o actualizar un objetivo OKR
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, tipo]
 *             properties:
 *               id: { type: string, nullable: true }
 *               titulo: { type: string }
 *               descripcion: { type: string, nullable: true }
 *               tipo: { type: string, enum: [Club, Categoria, Personal] }
 *               periodo: { type: string, nullable: true }
 *     responses:
 *       200: { description: Objetivo actualizado }
 *       201: { description: Objetivo creado }
 */
okrRouter.get('/', asyncHandler(OKRController.list));
okrRouter.post('/', asyncHandler(OKRController.upsert));

/**
 * @swagger
 * /okr/{id}:
 *   delete:
 *     tags: [OKR]
 *     summary: Eliminar un objetivo OKR
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 */
okrRouter.delete('/:id', asyncHandler(OKRController.remove));

/**
 * @swagger
 * /okr/{objetivoId}/kr:
 *   post:
 *     tags: [OKR]
 *     summary: Agregar un resultado clave (KR) a un objetivo
 *     parameters:
 *       - in: path
 *         name: objetivoId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, valorMeta]
 *             properties:
 *               nombre: { type: string }
 *               valorActual: { type: number }
 *               valorMeta: { type: number }
 *               unidad: { type: string }
 *               kpiSlug: { type: string, nullable: true }
 *     responses:
 *       201: { description: KR agregado }
 */
okrRouter.post('/:objetivoId/kr', asyncHandler(OKRController.addKR));
