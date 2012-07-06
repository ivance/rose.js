/**
 * rose.js
 *
 * a Rapid Response Api Service
 *
 * @package		rose.js
 * @author		Ivance
 * @email		ivanceyong@gmail.com
 */

var express = require('express')
var path = require('path');
var rose = require('./libraries/rose.js');
var app = express.createServer();

// Configuration
app.configure(function(){
	app.set('views', __dirname + rose.config['public']['view_folder']);
	app.set('view engine', rose.config['public']['view_engine']);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({secret:rose.config['public']['session_secret']}));
	app.use(app.router);
	app.use(express.static(__dirname + rose.config['public']['static_folder']));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes
app.all('*', function(req,res,next){
	rose.init(req,res);
	path.exists('./routes/'+rose.uri.route+'.js', function (exists) {
		if(exists){
			var routeObj = require('./routes/'+rose.uri.route+'.js');
			exists = routeObj.hasOwnProperty(rose.uri.action);
			if(exists){
				routeObj[rose.uri.action](rose,function(){
					rose.destructor();
				});
			}
		}

		if(!exists){
			rose.response.notFound();
			rose.destructor();
		}
	});
});

app.listen(rose.config['public']['port'], function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});