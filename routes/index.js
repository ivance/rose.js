var Index = function(){

	var _rose = null;

	this.init = function(rose){
		_rose = rose;
	}

	this.index = function(){
		_rose.response.render("index.html");
	};
}

module.exports  = new Index();