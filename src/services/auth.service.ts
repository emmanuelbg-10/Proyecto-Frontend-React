import { API_AUTH, API_USERS } from "./apiUrl";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../models/Auth";

export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await fetch(API_AUTH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return await response.json();
}

export async function registerUser(
  credentials: RegisterCredentials
): Promise<void> {
  const response = await fetch(`${API_USERS}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
}
