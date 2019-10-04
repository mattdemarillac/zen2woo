const keyMapModelSchema = require('../schema/keyMap');
const mongoose = require('mongoose');

const keyMapModel = mongoose.model('keyMap', keyMapModelSchema);
const attrTermKeyMapModel = mongoose.model('attrKeyMap', keyMapModelSchema);
const attrKeyMapModel = mongoose.model('attrKeyMap', keyMapModelSchema);

module.exports = [keyMapModel, attrKeyMapModel, attrTermKeyMapModel];
