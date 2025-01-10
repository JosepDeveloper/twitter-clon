// Importamos la librería 'zod' para la validación de esquemas
import { z } from 'zod';

/**
 * Esquema de validación para un usuario.
 * 
 * Este esquema define la estructura y las reglas de validación para un objeto que representa un usuario.
 * Utiliza la librería 'zod' para garantizar que los datos cumplan con las expectativas definidas.
 * 
 * @property {string} username - El nombre de usuario, debe ser una cadena de texto.
 * @property {string} imageURL - La URL de la imagen del usuario, debe ser una cadena de texto y una URL válida.
 */
const userSchema = z.object({
  username: z.string(), // Valida que el campo 'username' sea una cadena de texto
  imageURL: z.string().url() // Valida que el campo 'imageURL' sea una cadena de texto y una URL válida
});

// Exportamos el esquema para que pueda ser utilizado en otros módulos
export { userSchema };