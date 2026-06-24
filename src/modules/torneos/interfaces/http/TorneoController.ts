import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseTorneoRepository } from '../../infrastructure/SupabaseTorneoRepository';
import { TorneoMapper } from '../../infrastructure/TorneoMapper';
import { CreateTorneoUseCase } from '../../use-cases/CreateTorneoUseCase';
import { GetTorneosUseCase } from '../../use-cases/GetTorneosUseCase';
import { GetTorneoByIdUseCase } from '../../use-cases/GetTorneoByIdUseCase';
import { UpdateTorneoUseCase } from '../../use-cases/UpdateTorneoUseCase';
import { DeleteTorneoUseCase } from '../../use-cases/DeleteTorneoUseCase';
import { AppError } from '../../../../shared/errors/AppError';

function repo() {
  return new SupabaseTorneoRepository(getSupabaseClient());
}

export const TorneoController = {
  async list(req: Request, res: Response): Promise<void> {
    const estado = req.query.estado;
    const torneos = await new GetTorneosUseCase(repo()).execute({
      estado: estado === 'proximo' || estado === 'en_curso' || estado === 'finalizado' ? estado : undefined,
    });
    res.json(torneos.map(TorneoMapper.toDTO));
  },

  async getById(req: Request, res: Response): Promise<void> {
    const torneo = await new GetTorneoByIdUseCase(repo()).execute(req.params.id);
    if (!torneo) throw new AppError('El torneo no existe.', 404);
    res.json(TorneoMapper.toDTO(torneo));
  },

  async create(req: Request, res: Response): Promise<void> {
    const torneo = await new CreateTorneoUseCase(repo()).execute(req.body);
    res.status(201).json(TorneoMapper.toDTO(torneo));
  },

  async update(req: Request, res: Response): Promise<void> {
    const torneo = await new UpdateTorneoUseCase(repo()).execute(req.params.id, req.body);
    res.json(TorneoMapper.toDTO(torneo));
  },

  async remove(req: Request, res: Response): Promise<void> {
    await new DeleteTorneoUseCase(repo()).execute(req.params.id);
    res.status(204).send();
  },
};
