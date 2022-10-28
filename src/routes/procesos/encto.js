const {Router} = require('express');
const router = Router();
const enctoCtrl = require('../../controllers/procesos/enctoCtrl');


router.get('/', enctoCtrl.getEncuentros);
router.get('/:id', enctoCtrl.getEncuentro);


