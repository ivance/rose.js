var URI = function(){

	this.route = null;
	this.action = null;
	this.primRoute = null;
	this.primAction = null;
	this.params = null;

	this.init = function(req){
		var params = req.params.toString().split('/');
		var key = [];
		
		params.each(function(i,item){
			if(item != '') key.push(item);
		});
		if(key.length==0){
			this.route = 'index';
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
	}
}

module.exports  = new URI();