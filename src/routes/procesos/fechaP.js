const {Router} = require('express');
const router = Router();
const fechaCtrl = require('../../controllers/procesos/fechaCtrl');

router.get('/', fechaCtrl.getFechas)
router.put('/', fechaCtrl.update);



module.exports = router;

