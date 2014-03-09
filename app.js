var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
var redis = require("redis"),
        client = redis.createClient();

client.on("error", function (err) {
        console.log("Error " + err);
});


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/lie/:id', function(req,res){

});

app.get('/rand',function(req,res){
  	client.srandmember("lies", function (err, lie) {
		res.render('rand',{"lie":lie, "title":lie});	
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Listening on port " + app.get('port'));
});
