var Response = function(){

	this._res = null;

	this.resp = {
		"items":[],
		"totalCount":0,
		"detail":"",
		"success":true,
		"addon":[],
	};

	this.init = function(res){
		this._res = res;
		this.resp = {
			"items":[],
			"totalCount":0,
			"detail":"",
			"success":true,
			"addon":[],
		};
	}

	this.setItems = function(input){
		this.resp["items"] = input;
	}

	this.setTotalCount = function(input){
		if(input.constructor === Number && input>=0){
			this.resp["totalCount"] = input;
		}
	}

	this.setDetail = function(input){
		if(input.constructor === String){
			this.resp["detail"] = input;
		}
	}

	this.setSuccess = function(input){
		if(input.constructor === String){
			this.resp["success"] = input;
		}
	}

	this.setAddon = function(input){
		this.resp["addon"] = input;
	}

	this.echo = function(){
		if(this._res != null){
			this._res.json(this.resp);
		}
	}

	this.notFound = function(){
		if(this._res != null){
			this.resp["success"] = false;
			this.resp["detail"] = 'Resource Not Found.';
			this._res.json(this.resp);
		}
	}
}

module.exports  = new Response();