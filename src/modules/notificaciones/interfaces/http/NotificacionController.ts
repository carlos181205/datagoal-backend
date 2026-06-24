import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseNotificacionRepository } from '../../infrastructure/SupabaseNotificacionRepository';
import { GetNotificacionesDelUsuarioUseCase } from '../../use-cases/GetNotificacionesDelUsuarioUseCase';
import { EnviarNotificacionAUsuariosUseCase } from '../../use-cases/EnviarNotificacionAUsuariosUseCase';

function repo() {
  return new SupabaseNotificacionRepository(getSupabaseClient());
}

export const NotificacionController = {
  async porUsuario(req: Request, res: Response): Promise<void> {
    const data = await new GetNotificacionesDelUsuarioUseCase(repo()).execute(req.params.userId);
    res.json(data);
  },

  async enviar(req: Request, res: Response): Promise<void> {
    const result = await new EnviarNotificacionAUsuariosUseCase(repo()).execute(req.body);
    res.status(201).json(result);
  },
};
