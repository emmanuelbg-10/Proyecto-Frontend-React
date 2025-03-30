// src/models/Book.ts
import { Usuario } from "./Usuario";
import { Review } from "./Review";

export interface Book {
  id: number;
  titulo: string;
  genero: string;
  imagenUrl: string;
  usuario: Usuario;
  resenas?: Review[]; // Relacionamos las reseñas con el libro
}
