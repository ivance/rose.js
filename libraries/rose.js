var Rose = function(){
	var fs = require('fs');

	this.env = process.env.NODE_ENV || 'development';
	this.config = require('../config');
	this.define = require('../define');
	this.language = require('../languages/'+this.config['public']['default_language']+'/message.json');
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
		this.database.set('port',this.config[this.env]['db_port']);
		this.database.init();
		this.uri.init(req,this.config['public']['default_route']);
		this.session.init(req);
		this.cache.init(this.config['public']['cache_path'],this.config['public']['encoding']);
	}

	this.load = function(type,name,code){
		if(!this.hasOwnProperty(code)){
			var file = './'+type+'/'+name+'.js';

			if(fs.existsSync(file)){
				this[code] = require('../'+type+'/'+name+'.js');
			}
		}
	}

	this.now = function(){
		var d = new Date();
		var now = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
		return now;
	}

	this.validate = function(input){
		var type = typeof(input);
		if(type == 'string'){
			return (input.length>0 && input !='undefined')?true:false;
		}else if(type == 'object'){
			return this.isEmpty(input)?false:true;
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

	this.each = function(input,callback){
		var type = typeof(input);
		if(type == 'object'){
			for(var key in input){
				if(input.hasOwnProperty(key)){
					callback(key,input[key]);
				}
			}
		}else{
			callback(0,input);
		}
	}

	this.isEmpty = function(input){
		var type = typeof(input);
		if(type == 'object'){
			for(var key in input){
				if(input.hasOwnProperty(key)){
					return false;
				}
			}
		}
		return true;
	}
}

module.exports = new Rose();