import emailjs from "emailjs-com";
import { ContactFormData, ApiResponse } from "../models/Contact";

const SERVICE_ID = "service_gr5x4kl";
const TEMPLATE_ID = "template_94ndqgi";
const USER_ID = "1EstNry0dbuiMiDwu";

export const sendEmail = async (
  formData: ContactFormData
): Promise<ApiResponse> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { ...formData },
      USER_ID
    );

    if (response.status === 200) {
      return { success: true, message: "¡Mensaje enviado con éxito!" };
    }
  } catch {
    return { success: false, message: "Error al enviar el mensaje" };
  }

  return { success: false, message: "Error inesperado" };
};
