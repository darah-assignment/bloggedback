'use strict';

const express= require('express');
const basic_auth= require('../../lib/middleware/basic-auth.js');
const user_model = require('../../lib/models/user/user-model.js');
const router = express.Router();

router.get('/login', basic_auth, loginHandler);
router.post('/signup', signupHandler);

function loginHandler(req, res, next){
    res.json({
        token: req.token,
    });
}

function signupHandler(req, res, next){
    user_model.createNewUser(req.body).then(token=>{
        res.json({token});
    }).catch(err=>{
        res.status(403).send(err);
    });
}
module.exports= router;