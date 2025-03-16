const {Router} = require('express');
const router = Router(); 
const {register, login} = require('../controllers/userController')
const {getNotes, createNote, deleteNote, updateNote} = require('../controllers/notesController')

router.post('/register', register)
router.post('/login', login)

router.get('/notes/:id_user', getNotes)
router.post('/notes/add/:id_user', createNote)
router.delete('/notes/delete/:id', deleteNote)
router.patch('/notes/update/:id', updateNote)

module.exports = router