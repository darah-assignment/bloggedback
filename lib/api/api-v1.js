'use strict';

const express = require('express');
const router = express.Router();

const modelPicker = require('../middleware/model-picker.js');
const bearerAuth= require('../middleware/bearer-auth.js');
const permissions= require('../middleware/permission-auth.js');

router.param('model', modelPicker);
router.get('/:model', getHandler);
router.get('/:model/:id', getHandler);
router.post('/:model', bearerAuth, postHandler);
router.put('/:model/:id', bearerAuth, permissions('update'), updateHandler);
router.delete('/:model/:id', bearerAuth, permissions('delete'), deleteHandler);

function getHandler(req, res, next) {
    req.model
    .readAllRecords(req.params.id)
    .then(records => {
      let total = records.length;
      res.json({ total, records });
    })
    .catch(err => {
      next(err.message);
    });
}

function postHandler(req, res, next) {
  req.model
    .createRecord(req.body)
    .then(post => {
      res.json({ post });
    })
    .catch(err => {
      next(err.message);
    });
}

function updateHandler(req, res, next) {
    req.model
    .updateRecord(req.params.id, req.body)
    .then(update => {
      res.json({update});
    })
    .catch(err => {
      next(err.message);
    });
}

function deleteHandler(req, res, next) {
  req.model
    .deleteRecord(req.params.id)
    .then(deletion => {
      res.json({ deletion });
    })
    .catch(err => {
      next(err.message);
    });
}

module.exports = router;
