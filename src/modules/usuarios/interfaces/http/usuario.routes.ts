import { Router } from 'express';
import { asyncHandler } from '../../../../shared/http/asyncHandler';
import { UsuarioController } from './UsuarioController';

export const usuarioRouter = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags: [Usuarios]
 *     summary: Listar usuarios/perfiles
 *     parameters:
 *       - in: query
 *         name: onlyInactivos
 *         schema: { type: boolean }
 *     responses:
 *       200: { description: Lista de usuarios }
 *   post:
 *     tags: [Usuarios]
 *     summary: Crear usuario (crea también su cuenta de autenticación)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, rol, nombre, apellido]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               rol: { type: string, enum: [admin, entrenador, jugador, auxiliar, coordinador] }
 *               nombre: { type: string }
 *               apellido: { type: string }
 *               telefono: { type: string, nullable: true }
 *               fechaNacimiento: { type: string, nullable: true }
 *               posicion: { type: string, nullable: true }
 *               categoria: { type: string, nullable: true }
 *     responses:
 *       201: { description: Usuario creado }
 */
usuarioRouter.get('/', asyncHandler(UsuarioController.list));
usuarioRouter.post('/', asyncHandler(UsuarioController.create));

/**
 * @swagger
 * /usuarios/count:
 *   get:
 *     tags: [Usuarios]
 *     summary: Cantidad total de usuarios
 *     responses:
 *       200: { description: Conteo de usuarios }
 */
usuarioRouter.get('/count', asyncHandler(UsuarioController.count));

/**
 * @swagger
 * /usuarios/sync:
 *   post:
 *     tags: [Usuarios]
 *     summary: Sincronizar perfiles desde el sistema de autenticación
 *     responses:
 *       200: { description: Resultado de la sincronización }
 */
usuarioRouter.post('/sync', asyncHandler(UsuarioController.sync));

/**
 * @swagger
 * /usuarios/rol/{rol}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Listar usuarios por rol
 *     parameters:
 *       - in: path
 *         name: rol
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Usuarios con ese rol }
 */
usuarioRouter.get('/rol/:rol', asyncHandler(UsuarioController.porRol));

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Usuario }
 *       404: { description: No existe }
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualizar usuario (como administrador)
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
 *             required: [rol]
 *             properties:
 *               nombre: { type: string, nullable: true }
 *               apellido: { type: string, nullable: true }
 *               rol: { type: string, enum: [admin, entrenador, jugador, auxiliar, coordinador] }
 *               telefono: { type: string, nullable: true }
 *               fechaNacimiento: { type: string, nullable: true }
 *               posicion: { type: string, nullable: true }
 *               categoria: { type: string, nullable: true }
 *     responses:
 *       200: { description: Usuario actualizado }
 */
usuarioRouter.get('/:id', asyncHandler(UsuarioController.getById));
usuarioRouter.put('/:id', asyncHandler(UsuarioController.update));
