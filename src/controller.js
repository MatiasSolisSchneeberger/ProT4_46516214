import {pool} from "./database.js";

class LibroController{
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result)
    }
}

export const libro = new LibroController();