const mongoose = require('mongoose');
const CodeExampleModel = require('../models/CodeExample');
const NamePickModel = require('../models/NamePicker');
const NamePickerQuery = NamePickModel.find().sort({ _id: -1 }).limit(1);

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  let codeExample;
  let teamMembers;
  let lastSelectedName;
  const codeExamplesQuery = CodeExampleModel.find().sort({ _id: -1 }).limit(5);

  const codeExamplesQueryPromise = codeExamplesQuery.exec();
  const namePickerQueryPromise = NamePickerQuery.exec();

  codeExamplesQueryPromise.then((codeExamples) => {
    codeExample = {
      filename: codeExamples[0].get('fileName'),
      description: codeExamples[0].get('description')
    };
  });

  namePickerQueryPromise.then((namePicker) => {
    lastSelectedName = namePicker[0].get('lastSelectedName');
    teamMembers = namePicker[0].get('teamMembers');
  });

  Promise.all([codeExamplesQueryPromise, namePickerQueryPromise]).then(() => {
    res.render('home', {
      title: 'Home',
      codeExample,
      lastSelectedName,
      teamMembers
    });
  });
};

exports.updateUser = (req, res) => {

};
