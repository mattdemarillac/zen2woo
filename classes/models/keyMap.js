const keyMapModelSchema = require('../schema/keyMap');
const mongoose = require('mongoose');

const keyMapModel = mongoose.model('keyMap', keyMapModelSchema);
const attrKeyMapModel = mongoose.model('attrKeyMap', keyMapModelSchema);

module.exports = [keyMapModel, attrKeyMapModel];
