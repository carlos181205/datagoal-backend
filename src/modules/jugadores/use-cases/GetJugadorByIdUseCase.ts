import { IJugadorRepository } from '../domain/ports/IJugadorRepository';
import { JugadorEntity } from '../domain/entities/JugadorEntity';
import { AppError } from '../../../shared/errors/AppError';

export class GetJugadorByIdUseCase {
  constructor(private readonly repo: IJugadorRepository) {}

  async execute(id: string): Promise<JugadorEntity> {
    const jugador = await this.repo.getById(id);
    if (!jugador) {
      throw new AppError('El jugador solicitado no existe.', 404);
    }
    return jugador;
  }
}
