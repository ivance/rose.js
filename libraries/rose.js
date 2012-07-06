var Rose = function(){
	this.env = process.env.NODE_ENV || 'development';
	this.config = require('../config');
	this.database = require('./database.js');
	this.session = require('./session.js');
	this.cache = require('./cache.js');
	this.response = require('./response.js');
	this.uri = require('./uri.js');

	this.init = function(req,res){
		this.response.init(res);
		this.database.set('host',this.config[this.env]['db_host']);
		this.database.set('user',this.config[this.env]['db_user']);
		this.database.set('password',this.config[this.env]['db_password']);
		this.database.set('database',this.config[this.env]['db_database']);
		this.database.init();
		this.uri.init(req);
		this.session.init(req);
		this.cache.init(this.config['public']['cache_path'],this.config['public']['encoding']);
	}

	this.destructor = function(){
		this.database.close();
	}

	this.validate = function(input){
		var type = typeof(input);
		if(type == 'string'){
			return input.length>0?true:false;
		}else if(type == 'object'){
			return input.isEmpty()?false:true;
		}else if(type == 'undefined'){
			return false;
		}else{
			return true;
		}
	}

	this.numval = function(input){
		var type = typeof(input);
		if(type == 'number' || type == 'string' || type == 'boolean'){
			return input-0;
		}else{
			return 0;
		}
	}

	this.strval = function(input){
		var type = typeof(input);
		if(type == 'number' || type == 'string' || type == 'boolean'){
			return input+'';
		}else{
			return '';
		}
	}
}

module.exports = new Rose();

Object.prototype.each =function(fn) {
	var me = this;
	for(var key in me) {
		if(me.hasOwnProperty(key)){
			fn(key,me[key]);
		}
	}
}

Object.prototype.isEmpty =function() {
	var me = this;
	for(var key in me) {
		if(me.hasOwnProperty(key)){
			return false;
		}
	}
	return true;
}