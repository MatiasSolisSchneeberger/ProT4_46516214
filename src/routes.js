import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

router.get('/libros', libro.getAll);			// Obtener todos los libros
router.post('/libros', libro.add);				// Agregar un nuevo libro
router.put('/libros/:id', libro.update);		// Actualizar un libro específico
router.delete('/libros/isbn/:ISBN', libro.delete);		// Eliminar un libro específico