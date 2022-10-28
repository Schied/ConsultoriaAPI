const {Router} = require('express');
const router = Router();
const fechaCtrl = require('../../controllers/procesos/fechaCtrl');


router.put('/', fechaCtrl.update);



module.exports = router;

