import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { AuthController } from './AuthController';

export const authRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión y obtener token JWT de Supabase
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Login exitoso. Retorna el token de acceso y la información del perfil del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 expiresIn:
 *                   type: integer
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                       nullable: true
 *                     nombre:
 *                       type: string
 *                       nullable: true
 *                     apellido:
 *                       type: string
 *                       nullable: true
 *                     nombreCompleto:
 *                       type: string
 *                     rol:
 *                       type: string
 *                     telefono:
 *                       type: string
 *                       nullable: true
 *                     fechaNacimiento:
 *                       type: string
 *                       nullable: true
 *                     posicion:
 *                       type: string
 *                       nullable: true
 *                     categoria:
 *                       type: string
 *                       nullable: true
 *                     genero:
 *                       type: string
 *                       nullable: true
 *                     documento:
 *                       type: string
 *                       nullable: true
 *                     activo:
 *                       type: boolean
 *       401:
 *         description: Credenciales inválidas.
 *       403:
 *         description: Usuario inactivo o sin perfil asociado.
 */
authRouter.post('/login', asyncHandler(AuthController.login));
