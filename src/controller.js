import {pool} from './database.js';

class LibroController{

    /* async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    } */

    //funcionalidad para consulta y ver todos los campos de la tabla
    async getAll(req, res) {
      try {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
      } catch (error) {
        console.log('Error al obtener los libros:', error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }


// agregar libro 
async add(req, res) {
      const libro = req.body;
  
      // guarda los atributos validos
      const atributosRequeridos = ['nombre', 'autor', 'categoria', 'añoPublicacion', 'ISBN'];
      //compara los atributos con los de atributosRequeridos
      const atributosExtra = Object.keys(libro).filter(attr => !atributosRequeridos.includes(attr));
  
      try{ 
        //si tiene más atributos o menos atributos
      if ((atributosExtra.length > 0) ){
        return res.json({ error: `Atributos invalido: ${atributosExtra.join(' , ')}` });
      }
     
        const [result] = await pool.query(
          `INSERT INTO libros(nombre, autor, categoria, añoPublicacion, ISBN) VALUES(?, ?, ?, ?, ?)`,
          [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN]
        );
        res.json({ "Id insertado": result.insertId });
      }catch (error) {
      console.log('Error al añadir el libro:', error);
    }
  }


async delete(req, res){
    const libro = req.body; 
    const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libro.id]); 
    res.json({"Registros eliminados": result.affectedRows});
}


/* async update(req, res){
    const libro = req.body;
    const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añoPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, libro.id]);
    res.json({"Registros modificados": result.changedRows});

}  */

async update(req, res){
  try {
      const libro = req.body;
      const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añoPublicacion=(?), ISBN=(?) WHERE id=(?)`,[libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, libro.id]);
      if (result.changedRows === 0) {
          throw new Error('No se encontró un libro con el ID proporcionado o los datos proporcionados ya existen.');
      }
      res.json({"Registros Actualizados": result.changedRows});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al actualizar el libro, compruebe los campos requeridos.' });
  }
}



 async getOne(req, res) {
        try {
                const libro = req.body
                const id = parseInt(libro.id);

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


   //async deleteISBN(req, res){
        /* const libro = req.body; 
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]); 
        res.json({"Registros eliminados": result.affectedRows});
} */

async deleteISBN(req, res){
    const libro = req.body; 
    const ISBN = parseInt(libro.ISBN);

    try{ 
    if ([ISBN] != undefined) {
        return res.json({ error: `Atributos invalido: No se encontro libro con el ISBN especificado` });
    }
    const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [ISBN]);
        res.json({"Registros eliminados": result.affectedRows});

    } catch (e) {
        console.log(e);
               }
   }
}




export const libro = new LibroController();