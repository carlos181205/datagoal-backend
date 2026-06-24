import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseLesionRepository } from '../../infrastructure/SupabaseLesionRepository';
import { GetLesionesUseCase } from '../../use-cases/GetLesionesUseCase';
import { RegistrarLesionUseCase } from '../../use-cases/RegistrarLesionUseCase';
import { EliminarLesionUseCase } from '../../use-cases/EliminarLesionUseCase';

function repo() {
  return new SupabaseLesionRepository(getSupabaseClient());
}

export const LesionController = {
  async list(_req: Request, res: Response): Promise<void> {
    const lesiones = await new GetLesionesUseCase(repo()).execute();
    res.json(lesiones);
  },

  async registrar(req: Request, res: Response): Promise<void> {
    await new RegistrarLesionUseCase(repo()).execute(req.body);
    res.status(201).send();
  },

  async eliminar(req: Request, res: Response): Promise<void> {
    const result = await new EliminarLesionUseCase(repo()).execute(req.params.id);
    res.json(result);
  },
};
