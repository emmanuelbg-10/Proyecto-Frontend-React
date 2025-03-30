// src/services/createCopyBook.service.ts

export const createCopyBook = async (bookId: number, copies: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/copiaLibros/${bookId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ copies }), // Pasa el número de copias
      }
    );

    return response;
  } catch {
    throw new Error("Error al crear las copias del libro.");
  }
};
