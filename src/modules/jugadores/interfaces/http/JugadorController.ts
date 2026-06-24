import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseJugadorRepository } from '../../infrastructure/SupabaseJugadorRepository';
import { JugadorMapper } from '../../infrastructure/JugadorMapper';
import { GetJugadoresUseCase } from '../../use-cases/GetJugadoresUseCase';
import { GetJugadorByIdUseCase } from '../../use-cases/GetJugadorByIdUseCase';
import { CreateJugadorUseCase } from '../../use-cases/CreateJugadorUseCase';
import { UpdateJugadorUseCase } from '../../use-cases/UpdateJugadorUseCase';
import { DeleteJugadorUseCase } from '../../use-cases/DeleteJugadorUseCase';
import { TransferirJugadorUseCase } from '../../use-cases/TransferirJugadorUseCase';

function repo() {
  return new SupabaseJugadorRepository(getSupabaseClient());
}

export const JugadorController = {
  async list(req: Request, res: Response): Promise<void> {
    const categoriaId = typeof req.query.categoriaId === 'string' ? req.query.categoriaId : undefined;
    const jugadores = await new GetJugadoresUseCase(repo()).execute(categoriaId);
    res.json(jugadores.map(JugadorMapper.toDTO));
  },

  async getById(req: Request, res: Response): Promise<void> {
    const jugador = await new GetJugadorByIdUseCase(repo()).execute(req.params.id);
    res.json(JugadorMapper.toDTO(jugador));
  },

  async create(req: Request, res: Response): Promise<void> {
    const jugador = await new CreateJugadorUseCase(repo()).execute(req.body);
    res.status(201).json(JugadorMapper.toDTO(jugador));
  },

  async update(req: Request, res: Response): Promise<void> {
    const jugador = await new UpdateJugadorUseCase(repo()).execute(req.params.id, req.body);
    res.json(JugadorMapper.toDTO(jugador));
  },

  async remove(req: Request, res: Response): Promise<void> {
    await new DeleteJugadorUseCase(repo()).execute(req.params.id);
    res.status(204).send();
  },

  async transferir(req: Request, res: Response): Promise<void> {
    const jugador = await new TransferirJugadorUseCase(repo()).execute(req.params.id, req.body.categoriaId);
    res.json(JugadorMapper.toDTO(jugador));
  },
};
