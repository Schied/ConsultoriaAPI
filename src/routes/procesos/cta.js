const {Router} = require('express');
const router = Router();
const ctaCtrl = require('../../controllers/procesos/ctaCtrl');


router.get('/', ctaCtrl.getCtas);
router.get('/:id', ctaCtrl.getCta);
router.post('/', ctaCtrl.create, ctaCtrl.relation);




module.exports = router;

