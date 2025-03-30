import { API_LIBROS } from "../services/apiUrl";
import { Book } from "../models/Book";

export const fetchBooks = async (): Promise<{
  books: Book[];
  error: string | null;
}> => {
  try {
    const response = await fetch(`${API_LIBROS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los libros");
    }

    const data: Book[] = await response.json();
    return { books: data, error: null };
  } catch {
    return { books: [], error: "No se pudieron cargar los libros" };
  }
};
