var Api = function(){

	var _rose = null;

	this.init = function(rose){
		rose.load('models','project','m_project');
		rose.load('models','thread','m_thread');
		rose.m_project.init(rose);
		rose.m_thread.init(rose);
		_rose = rose;
	}

	this.getActiveProjectList = function(){
		_rose.m_project.getActiveProjectList(function(){
			_rose.response.echo();
		});
	};

	this.createThread = function(){
		_rose.m_thread.validateCreateThreadInfo(_rose.uri.request,function(succ,info){
			if(succ){
				_rose.m_thread.createThread(info,function(){
					_rose.response.echo();
				});
			}else{
				_rose.response.echo();
			}
		});
	};
}

module.exports  = new Api();