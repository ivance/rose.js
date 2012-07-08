var Project = function(){

	var _rose = null;

	this.init = function(rose){
		_rose = rose;
	}

	this.getActiveProjectList = function(callback){
		var sql = 'SELECT project_id,project_name from ft_project WHERE project_status=1 order by project_id';
		var params = [];
		_rose.database.get_list(sql,params,function(rows){
			if(rows !== false){
				_rose.response.setSuccess(true);
				_rose.response.setItems(rows);
				_rose.response.setTotalCount(rows.length);
				_rose.response.setDetail(_rose.language['succ_get']);
			}else{
				_rose.response.setSuccess(false);
				_rose.response.setItems([]);
				_rose.response.setTotalCount(0);
				_rose.response.setDetail(_rose.language['error_get']);
			}
		 	callback();
		});
	}
}

module.exports  = new Project();