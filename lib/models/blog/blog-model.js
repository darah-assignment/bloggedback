'use strict';

const schema= require('./blog-schema.js');
const BaseModel= require('../base-model.js');

class Blog extends BaseModel{
    constructor(){
        super(schema);
    }
}

module.exports= new Blog;