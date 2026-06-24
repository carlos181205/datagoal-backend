import { PartidoEntity } from '../domain/entities/PartidoEntity';
import { IPartidoRepository } from '../domain/ports/IPartidoRepository';

export class GetHistorialRendimientoEquipoUseCase {
  constructor(private readonly repo: IPartidoRepository) {}

  execute(equipo: string): Promise<PartidoEntity[]> {
    return this.repo.getByEquipo(equipo);
  }
}
