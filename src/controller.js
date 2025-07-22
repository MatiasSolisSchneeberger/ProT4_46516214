import { pool } from './database.js';


class LibroController {
    /* SELECT */
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: 'No se pudo obtener la lista de todos los libros.',
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
                    code: 400,
                    error: 'Faltan campos requerídos'
                })
            }

            const [result] = await pool.query(
                `INSERT  INTO libros(nombre, autor, categoría, año_publicación, ISBN) VALUES (?, ?, ?, ?, ?)`,
                [nombre, autor, categoría, año_publicación, ISBN]
            );

            res.status(201).json({
                code: 201,
                mensaje: 'Libro creado exitosamente',
                detalles: {
                    id: result.insertId,
                    nombre,
                    autor,
                    categoría,
                    año_publicación,
                    ISBN
                }
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: 'Error al crear el libro',
                details: error.message
            })
        }
    }

    /* UPDATE */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, autor, categoría, año_publicación, ISBN } = req.body;

            if (!id || !nombre || !autor || !categoría || !año_publicación || !ISBN) {
                return res.status(400).json({
                    code: 400,
                    error: 'Faltan campos requeridos'
                });
            }


            const [result] = await pool.query(`SELECT * FROM libros WHERE id = ?`, [id]);

            if (result.length === 0) {
                return res.status(404).json({
                    code: 404,
                    error: 'Libro no encontrado'
                });
            }

            await pool.query(
                `UPDATE libros SET nombre = ?, autor = ?, categoría = ?, año_publicación = ?, ISBN = ? WHERE id = ?`,

                [nombre, autor, categoría, año_publicación, ISBN, id]
            )

            res.status(200).json({
                code: 200,
                mensaje: 'Libro actualizado correctamente',
                filas_afectadas: result.affectedRows,
                detalles: {
                    id: result.insertId,
                    nombre,
                    autor,
                    categoría,
                    año_publicación,
                    ISBN
                }
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                error: 'Error al actualizar el libro',
                details: error.message
            })
        }
    }

    /* DELETE */
    async delete(req, res) {
        try {
            const { ISBN } = req.params;

            if (!ISBN) {
                return res.status(400).json({
                    code: 400,
                    error: 'Debe proporcionar un ISBN'
                });
            }

            const [libro] = await pool.query('SELECT * FROM libros WHERE ISBN = ?', [ISBN]);

            if (libro.length === 0) {
                return res.status(404).json({
                    code: 404,
                    error: 'Libro no encontrado con ese ISBN'
                });
            }
            
            const libroEliminado = libro[0];

            const [result] = await pool.query('DELETE FROM libros WHERE ISBN = ?', [ISBN]);


            res.status(200).json({
                code: 200,
                mensaje: 'Libro eliminado correctamente',
                filas_afectadas: result.affectedRows,
                detalles: libroEliminado
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: 'Error al eliminar el libro',
                details: error.message
            })
        }
    }
}

export const libro = new LibroController();