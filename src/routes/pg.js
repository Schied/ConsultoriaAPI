const {Router} = require('express');
const router = Router();
const pgCtrl = require('../controllers/pgCtrl');

router.get('/', pgCtrl.getPgs);
router.get('/:pg', pgCtrl.getPg);
router.post('/', pgCtrl.createPg);
router.put('/', pgCtrl.updatePg);
router.delete('/', pgCtrl.deletePg);

module.exports = router;