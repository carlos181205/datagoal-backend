import { RolUsuario } from '../domain/entities/UsuarioEntity';
import { UsuarioResponseDTO } from './UsuarioResponseDTO';

export type RolRegistro = 'admin' | 'entrenador' | 'jugador';

export interface AuthUserResponseDTO {
  id: string;
  email: string;
  rol: RolUsuario;
  activo: boolean;
}

export interface RegisterUsuarioDTO {
  rol: RolRegistro;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono: string;
  fechaNacimiento: string;
  posicion?: string;
  categoria?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  usuario: UsuarioResponseDTO;
}

