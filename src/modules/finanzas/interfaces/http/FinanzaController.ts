import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseFacturaRepository } from '../../infrastructure/SupabaseFacturaRepository';
import { CalcularEficaciaRecaudacionUseCase } from '../../use-cases/CalcularEficaciaRecaudacionUseCase';

export const FinanzaController = {
  async eficaciaRecaudacion(_req: Request, res: Response): Promise<void> {
    const repo = new SupabaseFacturaRepository(getSupabaseClient());
    const porcentaje = await new CalcularEficaciaRecaudacionUseCase(repo).execute();
    res.json({ porcentaje });
  },
};
