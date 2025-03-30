export interface Prestamo {
  id: number;
  fechaInicio: string;
  fechaVencimiento: string;
  fechaDevolucion: string | null;
  devuelto: boolean;
}
