'use strict';

const cors= require('cors');
const morgan= require('morgan');
const express= require('express');
const apiRouter= require('../lib/api/api-v1.js');
const authRouter= require('./authentication/router.js');
const app= express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/', authRouter);
app.use('/api/v1', apiRouter);

module.exports= {
    server: app,
    start: (port) => {
        const PORT= port || 3000;
        app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
    },
};