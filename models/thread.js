var Thread = function(){

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
				_rose.response.setDetail(_rose.language['error_get']);
			}
		 	callback();
		});
	}

	this.createThread = function(info,callback){
		_rose.database.insert('ft_thread',info,function(res){
			if(res.success){
				_rose.response.setSuccess(true);
				_rose.response.setDetail(_rose.language['succ_update']);
			}else{
				_rose.response.setSuccess(false);
				_rose.response.setDetail(_rose.language['error_update']);
			}
		 	callback();
		});
	}

	this.validateCreateThreadInfo = function(input,callback){
		var result = [];
		var succ = true;
		var user = _rose.session.get('user');
		user = [];user['user_id'] = 1;//todo
		if(user === false){
			_rose.response.setSuccess(false);
			_rose.response.setDetail(_rose.language['error_update']);
			succ = false;
		}else if(input.project_id === undefined || !_rose.validate(input.project_id)){
			_rose.response.setSuccess(false);
			_rose.response.setDetail(_rose.language['error_update']);
			succ = false;
		}else if(input.thread_priority === undefined || !_rose.validate(input.thread_priority)){
			_rose.response.setSuccess(false);
			_rose.response.setDetail(_rose.language['error_update']);
			succ = false;
		}else if(input.thread_content === undefined || !_rose.validate(input.thread_content)){
			_rose.response.setSuccess(false);
			_rose.response.setDetail(_rose.language['error_update']);
			succ = false;
		}else{
			result.push({
				'project_id':_rose.numval(input.project_id),
				'thread_priority':_rose.numval(input.thread_priority),
				'thread_content':_rose.strval(input.thread_content),
				'thread_summary':_rose.strval(input.thread_content).substring(0,3),
				'thread_status':_rose.define.THREAD_STATUS_NEW,
				'thread_user_create':user.user_id,
				'thread_user_modified':user.user_id,
				'thread_time_create':_rose.now()
			});
		}
		callback(succ,result);
	}
}

module.exports  = new Thread();