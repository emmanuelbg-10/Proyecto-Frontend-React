import { API_USERS } from "./apiUrl";

export const createReview = async (
  userId: number,
  bookId: string,
  calificacion: number,
  comentario: string,
  token: string
): Promise<void> => {
  const url = `${API_USERS}/${userId}/libros/${bookId}/resenas`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ calificacion, comentario }),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar la reseña");
  }
};
