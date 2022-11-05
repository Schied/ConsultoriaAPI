const {Router} = require('express');
const router = Router();
const dsrlloCtrl = require('../../controllers/procesos/dsrlloCtrl');



router.get('/:id', dsrlloCtrl.getDesarrollo, dsrlloCtrl.getAliados , dsrlloCtrl.getImpactos);
router.post('/', dsrlloCtrl.create, dsrlloCtrl.insertAliado, dsrlloCtrl.insertImpacto);



module.exports = router;