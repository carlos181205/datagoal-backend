import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseUsuarioRepository } from '../../infrastructure/SupabaseUsuarioRepository';
import { SupabaseAuthAdminRepository } from '../../infrastructure/SupabaseAuthAdminRepository';
import { UsuarioMapper } from '../../infrastructure/UsuarioMapper';
import { CreateUsuarioUseCase } from '../../use-cases/CreateUsuarioUseCase';
import { UpdateUsuarioUseCase } from '../../use-cases/UpdateUsuarioUseCase';
import { GetPerfilesUseCase } from '../../use-cases/GetPerfilesUseCase';
import { GetPerfilByIdUseCase } from '../../use-cases/GetPerfilByIdUseCase';
import { GetPerfilesByRolUseCase } from '../../use-cases/GetPerfilesByRolUseCase';
import { GetPerfilesCountUseCase } from '../../use-cases/GetPerfilesCountUseCase';
import { SyncPerfilesUseCase } from '../../use-cases/SyncPerfilesUseCase';
import { AppError } from '../../../../shared/errors/AppError';

function repo() {
  return new SupabaseUsuarioRepository(getSupabaseClient());
}

function authAdminRepo() {
  return new SupabaseAuthAdminRepository(getSupabaseClient());
}

export const UsuarioController = {
  async list(req: Request, res: Response): Promise<void> {
    const onlyInactivos = req.query.onlyInactivos === 'true';
    const usuarios = await new GetPerfilesUseCase(repo()).execute(onlyInactivos);
    res.json(usuarios.map(UsuarioMapper.toDTO));
  },

  async getById(req: Request, res: Response): Promise<void> {
    const usuario = await new GetPerfilByIdUseCase(repo()).execute(req.params.id);
    if (!usuario) throw new AppError('Usuario no encontrado.', 404);
    res.json(UsuarioMapper.toDTO(usuario));
  },

  async porRol(req: Request, res: Response): Promise<void> {
    const usuarios = await new GetPerfilesByRolUseCase(repo()).execute(req.params.rol);
    res.json(usuarios.map(UsuarioMapper.toDTO));
  },

  async count(_req: Request, res: Response): Promise<void> {
    const count = await new GetPerfilesCountUseCase(repo()).execute();
    res.json({ count });
  },

  async create(req: Request, res: Response): Promise<void> {
    const usuario = await new CreateUsuarioUseCase(authAdminRepo(), repo()).execute(req.body);
    res.status(201).json(UsuarioMapper.toDTO(usuario));
  },

  async update(req: Request, res: Response): Promise<void> {
    const usuario = await new UpdateUsuarioUseCase(repo()).execute(req.params.id, req.body);
    res.json(UsuarioMapper.toDTO(usuario));
  },

  async sync(_req: Request, res: Response): Promise<void> {
    const result = await new SyncPerfilesUseCase(authAdminRepo(), repo()).execute();
    res.json(result);
  },
};
