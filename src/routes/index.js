const {Router }=require('express')
const router=Router();
const {getUsers, insertData, getUsersByUsername}=require('../controllers/index.contoller');



router.get('/user', getUsers);
router.post('/user/:username', getUsersByUsername);
router.post('/user', insertData)


module.exports=router;