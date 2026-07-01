import { IAuthCredentialsRepository } from '../domain/ports/IAuthCredentialsRepository';
import { IUsuarioRepository } from '../domain/ports/IUsuarioRepository';
import { LoginDTO, LoginResponseDTO } from '../dtos/AuthResponseDTO';
import { UsuarioMapper } from '../infrastructure/UsuarioMapper';
import { AppError } from '../../../shared/errors/AppError';

export class LoginUseCase {
  constructor(
    private readonly authCredentialsRepo: IAuthCredentialsRepository,
    private readonly usuarioRepo: IUsuarioRepository
  ) {}

  async execute(dto: LoginDTO): Promise<LoginResponseDTO> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!dto.email || !emailRegex.test(dto.email.trim())) {
      throw new AppError('Credenciales inválidas.', 401);
    }

    if (!dto.password || !dto.password.trim()) {
      throw new AppError('Credenciales inválidas.', 401);
    }

    const { userId, accessToken, refreshToken, expiresIn } = await this.authCredentialsRepo.login(
      dto.email.trim(),
      dto.password
    );

    const usuario = await this.usuarioRepo.getById(userId);
    if (!usuario) {
      throw new AppError('El usuario no tiene un perfil asociado.', 403);
    }

    if (usuario.activo === false) {
      throw new AppError('Tu cuenta está inactiva. Contacta a un administrador.', 403);
    }

    return {
      accessToken,
      refreshToken,
      expiresIn,
      usuario: UsuarioMapper.toDTO(usuario),
    };
  }
}
