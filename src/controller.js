import {pool} from './database.js';

class LibroController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }



async add(req, res){
    const libro = req.body;
    const[result] = await pool.query(`INSERT INTO libros(nombre,autor,categoria,añoPublicacion,ISBN)VALUES(?,?,?,?,?)`, [libro.nombre,libro.autor,libro.categoria,libro.añoPublicacion,libro.ISBN]);
    res.json({"Id insertado": result.insertId});
}

async delete(req, res){
    const libro = req.body; 
    const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libro.id]); 
    res.json({"Registros eliminados": result.affectedRows});
}

async update(req, res){
    const libro = req.body;
    const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añoPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, libro.id]);
    res.json({"Registros modificados": result.changedRows});

} 

 async getOne(req, res) {
        try {
                const libro = req.body
                const id=parseInt(libro.id);

            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
            if (result [0]!= undefined) {
                res.json(result);
            } else {
                res.json({"error": "No se encontro libro con el id especificado"}); 
            }
            } catch (e) {
      console.log(e);

    }
  
   } 
   async deleteISBN(req, res){
    const libro = req.body; 
    const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]); 
    res.json({"Registros eliminados": result.affectedRows});
}


}

export const libro = new LibroController();