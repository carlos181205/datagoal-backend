import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { FinanzaController } from './FinanzaController';

export const finanzaRouter = Router();

/**
 * @swagger
 * /finanzas/eficacia-recaudacion:
 *   get:
 *     tags: [Finanzas]
 *     summary: Porcentaje de facturas pagadas sobre el total
 *     responses:
 *       200:
 *         description: Porcentaje de eficacia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 porcentaje: { type: integer }
 */
finanzaRouter.get('/eficacia-recaudacion', asyncHandler(FinanzaController.eficaciaRecaudacion));
