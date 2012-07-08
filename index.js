/**
 * rose.js
 *
 * a Rapid Response Api Service
 *
 * @package		rose.js
 * @author		Ivance
 * @email		ivanceyong@gmail.com
 */

var express = require('express');
var fs = require('fs');
var rose = require('./libraries/rose.js');
var app = express.createServer();

// Configuration
app.configure(function(){
	app.set('views', __dirname + rose.config['public']['view_folder']);
	app.set('view engine', rose.config['public']['view_engine']);
	app.disable('jsonp callback');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({secret:rose.config['public']['session_secret']}));
	app.use(app.router);
	app.use(express.static(__dirname + rose.config['public']['static_folder']));

	// disable layout
	app.set("view options", {layout: false});

	// make a custom html template
	app.register('html', {
		compile: function(str, options){
			return function(locals){
				return str;
			};
		}
	});
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
	fs.exists('./routes/'+rose.uri.route+'.js', function (exists) {
		if(exists){
			var routeObj = require('./routes/'+rose.uri.route+'.js');
			routeObj.init(rose);
			exists = routeObj.hasOwnProperty(rose.uri.action);
			if(exists){
				routeObj[rose.uri.action]();
			}
		}

		if(!exists){
			return;
			//rose.response.notFound();
		}
	});
});

app.listen(rose.config['public']['port'], function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
