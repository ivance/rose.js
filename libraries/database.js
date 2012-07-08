var Database = function(){

	this._client = null;

	this.host = '127.0.0.1';
	this.user = 'root';
	this.password = '';
	this.database = 'test';
	this.port = 3306;

	this.init = function(host,user,password,database,port){
		var Client = require('mysql').Client;
		var client = new Client();

		client.host = host===undefined?this.host:host;
		client.user = user===undefined?this.user:user;
		client.password = password===undefined?this.password:password;
		client.database = database===undefined?this.database:database;
		client.port = port===undefined?this.port:port;

		this._client = client;
	}

	this.set = function(property,value){
		if(this.hasOwnProperty(property)){
			this[property] = value;
		}
	}

	this.get_list = function(sql,params,callback){
		this._client.query(sql,params,function(err,rows,fields) {
			if(err){
				console.log(err);
				rows = false;
			}
			callback(rows);
		});
	}

	this.get_record = function(sql,params,callback){
		this._client.query(sql,params,function(err,rows,fields) {
			if(err){
				console.log(err);
				rows = [];
			}
			if(rows.length>0){
				rows = rows[0];
			}
			callback(rows);
		});
	}

	this.query = function(sql,params,callback){
		this._client.query(sql,params,function(err,rows,fields) {
			var result = [];
			if(err){
				console.log(err);
				result['success'] = false;
			}else{
				result['affectedRows'] = rows['affectedRows'];
				result['insertId'] = rows['insertId'];
				result['success'] = true;
			}
			callback(result);
		});
	}

	this.insert = function(table,params,callback){
		var sql = 'INSERT INTO '+table+'(';
		for(var key in params[0]){
			if(params[0].hasOwnProperty(key)){
				sql += '`'+key+'`,';
			}
		}
		sql = sql.substring(0,sql.length-1);
		sql += ') VALUES';
		for(var index in params){
			if(params.hasOwnProperty(index)){
				sql += '(';
				var record = params[index];
				for(var key in record){
					if(record.hasOwnProperty(key)){
						if(typeof(record[key]) == 'number'){
							sql += record[key];	
						}else{
							sql += '"'+record[key]+'"'
						}
						sql += ',';
					}
				}
				sql = sql.substring(0,sql.length-1);
				sql += '),';
			}
		}
		sql = sql.substring(0,sql.length-1);
		
		this.query(sql,[],callback);
	}

	this.delete = function(table,params,callback){
		var sql = 'DELETE FROM '+table+' WHERE ';
		var and = false;
		for(var index in params){
			if(params.hasOwnProperty(index)){
				record = params[index];
				for(var key in record){
					if(record.hasOwnProperty(key)){
						value = record[key];
						if(and) sql += ' AND ';
						sql += '`'+key+'`=';
						if(typeof(value) == 'number'){
							sql += value;	
						}else{
							sql += '"'+value+'"'
						}
						and = true;
					}
				}
			}
		}

		this.query(sql,[],callback);
	}

	this.update = function(table,inquiry,params,callback){
		var sql = 'UPDATE '+table+' SET ';
		var where = '';

		for(var index in params){
			if(params.hasOwnProperty(index)){
				record = params[index];
				for(var key in record){
					if(record.hasOwnProperty(key)){
						value = record[key];
						if(key != inquiry){
							sql += '`'+key+'`=';
							if(typeof(value) == 'number'){
								sql += value;
							}else{
								sql += '"'+value+'"'
							}
							sql += ',';
						}else{
							where = 'WHERE `'+inquiry+'` = ';
							if(typeof(value) == 'number'){
								where += value;
							}else{
								where += '"'+value+'"'
							}
						}
					}
				}
			}
		}
		sql = sql.substring(0,sql.length-1);
		sql += ' '+where;

		this.query(sql,[],callback);
	}

	this.close = function(){
		this._client.end();
	}
}

module.exports  = new Database();