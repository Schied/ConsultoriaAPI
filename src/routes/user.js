const {Router} = require('express');
const router = Router();
const userCtrl = require('../controllers/userCtrl');

router.get('/', userCtrl.getUsers);
router.get('/:codigo', userCtrl.getUser)
router.post('/', userCtrl.create);
module.exports = router;