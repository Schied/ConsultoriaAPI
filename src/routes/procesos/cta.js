const {Router} = require('express');
const router = Router();
const ctaCtrl = require('../../controllers/procesos/ctaCtrl');


router.get('/', ctaCtrl.getCtas);
router.get('/Id/:id', ctaCtrl.getCtaById);
router.get('/Name/:name', ctaCtrl.getCtaByName);
router.get('/Empresa/:id', ctaCtrl.getCtaByIdEmpresa);
router.post('/', ctaCtrl.create, ctaCtrl.relation);




module.exports = router;

