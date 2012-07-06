var Cache = function(){

	var fs = require('fs');
	var path = require('path');
	var cache_type = 'file';
	var cache_path = '';
	var encoding = 'utf8';
	this.default_cache_time = 1800;

	this.init = function(path,encoding){
		cache_path = path;
		encoding = encoding;
	}

	this.get = function(index,callback){
		path.exists(cache_path+index,function (exists) {
			if(exists){
				fs.readFile(cache_path+index,encoding,function(err,data){
					var pos = data.indexOf('|');
					if(pos != -1){
						var seconds = data.substring(0,pos);
						seconds -=0;
						var d = new Date();
						var now = d.getTime();
						now = Math.floor(now/1000);
					}
					if(pos == -1 || seconds<now){
						fs.unlink(cache_path+index,function(){
							callback(false);
						});
					}
					callback(data);
				});
			}else{
				callback(false);
			}
		});
	}

	this.set = function(index,value,time){
		var d = new Date();
		var seconds = d.getTime();
		seconds = Math.floor(seconds/1000);
		seconds += time;
		fs.writeFileSync(cache_path+index,seconds+'|'+value);
	}
}

module.exports  = new Cache();