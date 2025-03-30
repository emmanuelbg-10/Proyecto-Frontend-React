export interface AuthResponse {
  token: string;
  userId: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  correo: string;
  password: string;
  telefono: string;
  rol: "USUARIO" | "AUTOR"; // Solo acepta "USUARIO" o "AUTOR"
}
