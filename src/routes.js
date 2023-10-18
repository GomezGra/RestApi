import {Router} from 'express';
import {libro} from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);

//Tipo de solicitud para insertar usamos post
router.post('/libro',libro.add);

//Solicitud para eliminar
router.delete('/libro', libro.delete);

//Solicitud para modificar
router.put('/libro', libro.update);

//Solicitud para mostrar un libro según su id
router.get('/libro', libro.getOne);