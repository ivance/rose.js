var URI = function(){

	this.route = null;
	this.action = null;
	this.primRoute = null;
	this.primAction = null;
	this.params = null;
	this.request = {};

	this.init = function(req,default_route){
		var params = req.params.toString().split('/');
		var key = [];
		
		for(var i in params){
			if(params.hasOwnProperty(i) && params[i] != '') key.push(params[i]);
		}

		if(key.length==0){
			this.route = default_route;
			this.primRoute = false;
		}else{
			this.route = key[0];
			this.primRoute = key[0];
		}
		if(key.length<2){
			this.action = 'index';
			this.primAction = false;
		}else{
			this.action = key[1];
			this.primAction = key[1];
		}
		this.params = key.slice(2);

		this.request = req.body;
	}
}

module.exports  = new URI();