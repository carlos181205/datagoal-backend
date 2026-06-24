import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseConvocatoriaRepository } from '../../infrastructure/SupabaseConvocatoriaRepository';
import { SupabaseJugadorRepository } from '../../../jugadores/infrastructure/SupabaseJugadorRepository';
import { SupabasePartidoRepository } from '../../../partidos/infrastructure/SupabasePartidoRepository';
import { JugadorMapper } from '../../../jugadores/infrastructure/JugadorMapper';
import { GetJugadoresParaConvocatoriaUseCase } from '../../use-cases/GetJugadoresParaConvocatoriaUseCase';
import { GuardarConvocatoriaUseCase } from '../../use-cases/GuardarConvocatoriaUseCase';

export const ConvocatoriaController = {
  async getParaPartido(req: Request, res: Response): Promise<void> {
    const supabase = getSupabaseClient();
    const useCase = new GetJugadoresParaConvocatoriaUseCase(
      new SupabasePartidoRepository(supabase),
      new SupabaseJugadorRepository(supabase),
      new SupabaseConvocatoriaRepository(supabase),
    );
    const result = await useCase.execute(req.params.partidoId);
    res.json({
      jugadores: result.jugadores.map(JugadorMapper.toDTO),
      convocadosIds: result.convocadosIds,
      notas: result.notas,
      convocatoriaId: result.convocatoriaId ?? null,
    });
  },

  async guardar(req: Request, res: Response): Promise<void> {
    const useCase = new GuardarConvocatoriaUseCase(new SupabaseConvocatoriaRepository(getSupabaseClient()));
    const result = await useCase.execute(req.body);
    res.status(201).json(result);
  },
};
