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
