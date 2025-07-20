import { pool } from "./database.js";


class LibroController {
    /* SELECT */
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result)
        } catch (error) {
            res.status(500).json({
                error: 'No se pudo obtener la lista de libros.',
                code: 500,
                detalle: error.message
            })
        }
    }
    /* INSERT */
    async add(req, res) {
        try {
            const { nombre, autor, categoría, año_publicación, ISBN } = req.body
            
            if (!nombre || !autor || !categoría || !año_publicación || !ISBN) {
                return res.status(400).json({
                    error: "Faltan campos requerídos",
                    code: 400,
                    details: error.message
                })
            }

            const [result] = await pool.query(
                `INSERT  INTO libros(nombre, autor, categoría, año_publicación, ISBN) VALUES (?, ?, ?, ?, ?)`,
                [libro.nombre, libro.autor, libro.categoría, libro.año_publicación, libro.ISBN]
            );

            res.status(201).json({
                mensaje: 'Libro creado',
                id: result.insertId,
                nombre,
                autor,
                categoría,
                año_publicación,
                ISBN
            });
        } catch {
            res.status(500).json({
                error: 'Error al crear el libro',
                code: 500,
                details: error.message
            })
        }
    }
}

export const libro = new LibroController();