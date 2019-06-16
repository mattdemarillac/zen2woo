const keyMapModelSchema = require('../schema/keyMap');
const mongoose = require('mongoose');

const keyMapModel = mongoose.model('keyMap', keyMapModelSchema);

module.exports = keyMapModel;
