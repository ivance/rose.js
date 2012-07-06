exports.db = function(rose,callback){
	var result = [];
	var info = [
		{"title":'123',"status":2}
	];
	rose.database.get_list('select * from aa_test',[],function(rows){
		rose.response.setItems(rows);
	 	rose.response.echo();
	 	callback();
	});
}; 