import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseEstadisticaRepository } from '../../infrastructure/SupabaseEstadisticaRepository';
import { EstadisticaMapper } from '../../infrastructure/EstadisticaMapper';
import { GetEstadisticasJugadoresUseCase } from '../../use-cases/GetEstadisticasJugadoresUseCase';
import { GetEstadisticasJugadorUseCase } from '../../use-cases/GetEstadisticasJugadorUseCase';
import { GetEstadisticasJugadorPorUsuarioUseCase } from '../../use-cases/GetEstadisticasJugadorPorUsuarioUseCase';
import { GetGoleadoresUseCase } from '../../use-cases/GetGoleadoresUseCase';
import { GetEstadisticasEquipoUseCase } from '../../use-cases/GetEstadisticasEquipoUseCase';
import { GetGolesPorMesUseCase } from '../../use-cases/GetGolesPorMesUseCase';
import { GetResumenTemporadaUseCase } from '../../use-cases/GetResumenTemporadaUseCase';

function repo() {
  return new SupabaseEstadisticaRepository(getSupabaseClient());
}

function parseBool(value: unknown): boolean | undefined {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

export const EstadisticaController = {
  async jugadores(req: Request, res: Response): Promise<void> {
    const { categoria, equipoId, soloActivos, limit } = req.query;
    const data = await new GetEstadisticasJugadoresUseCase(repo()).execute({
      categoria: typeof categoria === 'string' ? categoria : undefined,
      equipoId: typeof equipoId === 'string' ? equipoId : undefined,
      soloActivos: parseBool(soloActivos),
      limit: typeof limit === 'string' ? Number(limit) : undefined,
    });
    res.json(data.map(EstadisticaMapper.toDTO));
  },

  async jugadorPorId(req: Request, res: Response): Promise<void> {
    const data = await new GetEstadisticasJugadorUseCase(repo()).execute(req.params.jugadorId);
    res.json(data ? EstadisticaMapper.toDTO(data) : null);
  },

  async jugadorPorUsuario(req: Request, res: Response): Promise<void> {
    const data = await new GetEstadisticasJugadorPorUsuarioUseCase(repo()).execute(req.params.userId);
    res.json(data ? EstadisticaMapper.toDTO(data) : null);
  },

  async goleadores(req: Request, res: Response): Promise<void> {
    const limit = typeof req.query.limit === 'string' ? Number(req.query.limit) : undefined;
    const data = await new GetGoleadoresUseCase(repo()).execute(limit);
    res.json(data.map(EstadisticaMapper.toDTO));
  },

  async equipo(req: Request, res: Response): Promise<void> {
    const { categoria, equipoId } = req.query;
    const data = await new GetEstadisticasEquipoUseCase(repo()).execute({
      categoria: typeof categoria === 'string' ? categoria : undefined,
      equipoId: typeof equipoId === 'string' ? equipoId : undefined,
    });
    res.json(data);
  },

  async golesPorMes(req: Request, res: Response): Promise<void> {
    const categoria = typeof req.query.categoria === 'string' ? req.query.categoria : undefined;
    const data = await new GetGolesPorMesUseCase(repo()).execute({ categoria });
    res.json(data);
  },

  async resumenTemporada(req: Request, res: Response): Promise<void> {
    const { categoria, equipoId } = req.query;
    const data = await new GetResumenTemporadaUseCase(repo()).execute({
      categoria: typeof categoria === 'string' ? categoria : undefined,
      equipoId: typeof equipoId === 'string' ? equipoId : undefined,
    });
    res.json(data);
  },
};
