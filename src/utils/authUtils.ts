import { jwtDecode, JwtPayload } from "jwt-decode";

export const getDecodedToken = (token: string | null) => {
  if (!token) {
    return { error: "No se ha encontrado el token" };
  }

  try {
    const decoded = jwtDecode<JwtPayload & { sub: number }>(token);
    return { decoded };
  } catch {
    return { error: "Error al decodificar el token" };
  }
};
