const {Router} = require('express');
const router = Router();
const userCtrl = require('../controllers/userCtrl');

router.get('/tipo/:codigo', userCtrl.getUserTipo);
router.get('/', userCtrl.getUsers);
router.get('/:codigo', userCtrl.getUser)
router.post('/', userCtrl.create);
module.exports = router;