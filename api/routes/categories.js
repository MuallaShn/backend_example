const express =require("express");
const router = express.Router();

router.all("*", (req,res,next) => {
    if(isAuthenticated()){
        next();
    }else{
        res.json({success:false, error:"Not authenticated"})
    }
})
/*GET users listing */
router.get('/', function(req,res,next){
    res.json({success:true});
});
   

module.exports=router;