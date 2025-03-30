import { API_USERS } from "./apiUrl";

export const createBook = async (userId: number, formData: FormData) => {
  const response = await fetch(`${API_USERS}/${userId}/libros`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error al crear el libro");
  }

  return data;
};

// Función para crear las copias de libros
export const createCopies = async (bookId: number, copies: number) => {
  for (let i = 0; i < copies; i++) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/copiaLibros/${bookId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Error al crear la copia del libro", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud de creación de copia", error);
    }
  }
};
