const express = require('express')
const router = express.Router()
const Login = require('../middleware/isLogin')
const Answer = require('../controllers/answerController')

router.post('/', Login.isLogin, Answer.createAnswer)
router.get('/', Answer.findAllAnswer)
router.get('/:id', Answer.answerByid)
router.delete('/:id', Answer.destroyAnswer)

module.exports = router