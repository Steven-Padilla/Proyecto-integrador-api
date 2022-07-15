const {Router }=require('express')
const router=Router();
const {getUsers}=require('../controllers/index.contoller');


router.get('/user', getUsers);


module.exports=router;