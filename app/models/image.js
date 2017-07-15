'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create')


var Image = new Schema({
	owner : {type : String, required : true},
	url : {type : String, required : true},
	title : String
});
Image.plugin(findOrCreate)

module.exports = mongoose.model('Image', Image);
