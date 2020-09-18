'use strict';

const schema= require('./role-schema.js');
const BaseModel= require('../base-model.js');

class Role extends BaseModel{
    constructor(){
        super(schema);
    }
}

module.exports= new Role;