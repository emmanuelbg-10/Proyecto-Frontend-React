// Usuario.service.ts
import { Usuario } from "../models/Usuario";
import { API_USERS } from "./apiUrl";

export async function getUsuario(usuarioId: number): Promise<Usuario> {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  const response = await fetch(`${API_USERS}/${usuarioId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error al obtener los datos del usuario: ${response.statusText}`
    );
  }

  return await response.json();
}

export async function updateUsuario(
  usuarioId: number,
  updatedData: Usuario
): Promise<Usuario> {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  const response = await fetch(`${API_USERS}/${usuarioId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(
      `Error al actualizar los datos del usuario: ${response.statusText}`
    );
  }

  return await response.json();
}
