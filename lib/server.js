'use strict';

const express= require('express');
const cors= require('cors');

const app= express();
app.use(express.json());
app.use(cors());

module.exports= {
    server: app,
    start: (port) => {
        const PORT= port || 3000;
        app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
    },
};