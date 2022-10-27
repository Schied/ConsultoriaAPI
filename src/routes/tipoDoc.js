const {Router} = require('express');
const router = Router();
const tipoDocCtrl = require('../controllers/tipoDocCtrl');

router.get('/', tipoDocCtrl.getTDocs);
router.get('/:doc', tipoDocCtrl.getTDoc);
router.post('/', tipoDocCtrl.createTDoc);
router.put('/', tipoDocCtrl.updateTDoc);
router.delete('/', tipoDocCtrl.deleteTDoc);

module.exports = router;