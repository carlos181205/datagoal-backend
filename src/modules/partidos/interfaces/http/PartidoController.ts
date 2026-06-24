import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabasePartidoRepository } from '../../infrastructure/SupabasePartidoRepository';
import { SupabaseEventoPartidoRepository } from '../../infrastructure/SupabaseEventoPartidoRepository';
import { SupabaseEstadisticasEventoRepository } from '../../infrastructure/SupabaseEstadisticasEventoRepository';
import { PartidoMapper } from '../../infrastructure/PartidoMapper';
import { EventoPartidoMapper } from '../../infrastructure/EventoPartidoMapper';
import { CreatePartidoUseCase } from '../../use-cases/CreatePartidoUseCase';
import { GetPartidoByIdUseCase } from '../../use-cases/GetPartidoByIdUseCase';
import { GetPartidosUseCase } from '../../use-cases/GetPartidosUseCase';
import { UpdatePartidoUseCase } from '../../use-cases/UpdatePartidoUseCase';
import { RegistrarEventoPartidoUseCase } from '../../use-cases/RegistrarEventoPartidoUseCase';
import { GetEventosPartidoUseCase } from '../../use-cases/GetEventosPartidoUseCase';
import { EliminarEventoPartidoUseCase } from '../../use-cases/EliminarEventoPartidoUseCase';
import { AppError } from '../../../../shared/errors/AppError';

function partidoRepo() {
  return new SupabasePartidoRepository(getSupabaseClient());
}

function eventoRepo() {
  return new SupabaseEventoPartidoRepository(getSupabaseClient());
}

function estadisticasEventoRepo() {
  return new SupabaseEstadisticasEventoRepository(getSupabaseClient());
}

export const PartidoController = {
  async list(req: Request, res: Response): Promise<void> {
    const { categoria, incluirCancelados } = req.query;
    const partidos = await new GetPartidosUseCase(partidoRepo()).execute({
      categoria: typeof categoria === 'string' ? categoria : undefined,
      incluirCancelados: incluirCancelados === 'false' ? false : undefined,
    });
    res.json(partidos.map(PartidoMapper.toDTO));
  },

  async getById(req: Request, res: Response): Promise<void> {
    const partido = await new GetPartidoByIdUseCase(partidoRepo()).execute(req.params.id);
    if (!partido) throw new AppError('El partido no existe.', 404);
    res.json(PartidoMapper.toDTO(partido));
  },

  async create(req: Request, res: Response): Promise<void> {
    const partido = await new CreatePartidoUseCase(partidoRepo()).execute(req.body);
    res.status(201).json(PartidoMapper.toDTO(partido));
  },

  async update(req: Request, res: Response): Promise<void> {
    const partido = await new UpdatePartidoUseCase(partidoRepo()).execute(req.params.id, req.body);
    res.json(PartidoMapper.toDTO(partido));
  },

  async eventos(req: Request, res: Response): Promise<void> {
    const eventos = await new GetEventosPartidoUseCase(eventoRepo()).execute(req.params.id);
    res.json(eventos.map(EventoPartidoMapper.toDTO));
  },

  async registrarEvento(req: Request, res: Response): Promise<void> {
    const useCase = new RegistrarEventoPartidoUseCase(partidoRepo(), eventoRepo(), estadisticasEventoRepo());
    const evento = await useCase.execute(req.body);
    res.status(201).json(EventoPartidoMapper.toDTO(evento));
  },

  async eliminarEvento(req: Request, res: Response): Promise<void> {
    const useCase = new EliminarEventoPartidoUseCase(eventoRepo(), estadisticasEventoRepo());
    const evento = await useCase.execute(req.params.id);
    res.json(EventoPartidoMapper.toDTO(evento));
  },
};
