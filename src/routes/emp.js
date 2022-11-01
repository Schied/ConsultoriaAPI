const {Router} = require('express');
const router = Router();
const empCtrl = require('../controllers/empCtrl');

router.get('/relation/:id', empCtrl.getRelation);
router.get('/', empCtrl.getEmps);
router.get('/:id', empCtrl.getEmp)
router.post('/', empCtrl.isEmpresa, empCtrl.create);
module.exports = router;