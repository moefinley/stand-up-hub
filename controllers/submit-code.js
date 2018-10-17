const mongoose = require('mongoose');
const CodeExampleModel = require('../models/CodeExample');

exports.showForm = (req, res) => {
  res.render('submit-code/submit-code', {
    title: 'File upload'
  });
};

exports.submitCode = (req, res) => {
  const codeExample = new CodeExampleModel({ description: req.body.description, fileName: req.file.filename });

  codeExample.save();

  res.render('submit-code/submit-code', {
    title: 'Hello'
  });
};
