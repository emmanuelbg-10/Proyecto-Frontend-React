import { API_LIBROS } from "../services/apiUrl";
import { Book } from "../models/Book";

export const fetchBooks = async (): Promise<{
  books: Book[];
  shuffledBooks: Book[];
  error?: string;
}> => {
  try {
    const response = await fetch(API_LIBROS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los libros: ${response.statusText}`);
    }

    const data: Book[] = await response.json();

    if (!data.length) {
      return { books: [], shuffledBooks: [] };
    }

    // Últimos tres libros agregados (ordenados por ID descendente)
    const sortedBooks = [...data].sort((a, b) => b.id - a.id).slice(0, 3);

    // Mezclar libros aleatoriamente
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 3);

    return { books: sortedBooks, shuffledBooks: shuffled };
  } catch (err) {
    return { books: [], shuffledBooks: [], error: (err as Error).message };
  }
};
