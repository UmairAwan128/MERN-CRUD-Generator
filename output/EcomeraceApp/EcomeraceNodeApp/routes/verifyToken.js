const jwt = require('jsonwebtoken');
var config = require('../config')

module.exports =  function(req, res, next) {
   const token = req.header('auth-token');  
   if(!token)
     return res.status(401).send('Access Denied.');

   try{
     const verified = jwt.verify(token, config.TOKKEN_SECRET); 
     req.user = verified; 
     next(); 
   }
   catch(err){
     res.status(400).send('Invalid Token');
   }

}