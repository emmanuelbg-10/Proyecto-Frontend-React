import { Book } from "../models/Book";
import { Review } from "../models/Review";
import { API_LIBROS } from "./apiUrl";

// Función para obtener un libro por su ID
export const fetchBook = async (bookId: number): Promise<Book> => {
  const response = await fetch(`${API_LIBROS}/${bookId}`);
  if (!response.ok) {
    throw new Error("Error fetching book");
  }
  const data: Book = await response.json();
  return data;
};

// Función para obtener las reseñas de un libro por su ID
export const fetchReviews = async (bookId: number): Promise<Review[]> => {
  const response = await fetch(`${API_LIBROS}/${bookId}/resenas`);
  if (!response.ok) {
    throw new Error("Error fetching reviews");
  }
  const data: Review[] = await response.json();
  return data;
};

export const fetchBookCopy = async (idLibro: number): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_LIBROS}/${idLibro}/copias-disponibles`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) return []; // Si no hay copias, retorna un array vacío
    return data; // Devuelve todas las copias disponibles
  } catch (error) {
    console.error("Error al obtener las copias del libro:", error);
    return [];
  }
};

export const createLoan = async (idUsuario: number, idCopiaLibro: number) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(
      `http://localhost:8080/api/v1/usuarios/${idUsuario}/prestamos/${idCopiaLibro}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al realizar el préstamo del libro.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al realizar el préstamo:", error);
    throw error;
  }
};
