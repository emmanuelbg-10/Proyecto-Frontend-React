import { Book } from "./Book"; // Adjust the path as needed

export interface CopyBook {
  id: number;
  disponible: boolean;
  libro: Book; // Hace referencia al libro original completo
}
