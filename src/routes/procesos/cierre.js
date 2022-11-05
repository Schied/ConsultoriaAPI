const {Router} = require('express');
const router = Router();
const cierreCtrl = require('../../controllers/procesos/cierreCtrl');



router.get('/:id', cierreCtrl.getCierre, cierreCtrl.getRevision , cierreCtrl.getFase);
router.post('/', cierreCtrl.create, cierreCtrl.insertRevision, cierreCtrl.insertFase);



module.exports = router;