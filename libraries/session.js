var Session = function(){

	this.session = null;

	this.init = function(req){
		this.session = req.session;
	}

	this.get = function(index){
		if(this.session.hasOwnProperty(index)){
			return this.session[index];
		}else{
			return false;
		}
	}

	this.set = function(index,value){
		this.session[index] = value;
	}

	this.unset = function(index){
		if(this.session.hasOwnProperty(index)){
			delete this.session[index];
		}
	}

	this.empty = function(){
		this.session.destroy();
	}
}

module.exports  = new Session();