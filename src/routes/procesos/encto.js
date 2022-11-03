const {Router} = require('express');
const router = Router();
const enctoCtrl = require('../../controllers/procesos/enctoCtrl');



router.get('/:id', enctoCtrl.getEncuentro, enctoCtrl.getEpps , enctoCtrl.getEquipos, enctoCtrl.getParametros, enctoCtrl.getActividades);
router.post('/', enctoCtrl.create, enctoCtrl.insertEpp, enctoCtrl.insertEquipo, enctoCtrl.insertParametro, enctoCtrl.insertActividad);



module.exports = router;