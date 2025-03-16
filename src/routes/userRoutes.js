const {Router} = require('express');
const router = Router(); 
const {register, login} = require('../controllers/userController')
const {getNotes, createNote, deleteNote, updateNote} = require('../controllers/notesController')
const verifyToken = require('../middlewares/verifyToken')

router.post('/register', register)
router.post('/login', login)

router.get('/notes',verifyToken, getNotes)
router.post('/add/notes',verifyToken, createNote)
router.delete('/delete/notes/:id',verifyToken, deleteNote)
router.patch('/update/notes/:id',verifyToken,  updateNote)

module.exports = router