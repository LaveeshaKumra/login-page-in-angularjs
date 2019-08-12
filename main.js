var express = require('express');
var routes = require('routes');
var http = require('http');
var url = require('url');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
var mysql = require('mysql');

app.set('port',process.env.PORT || 4300);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.json());
var con = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'userdata'
	});
	
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, "js")));

app.get('/',function(req,res){
	res.render('index');
});

app.post('/check',function(req,res){
	var sql="select * from data where username=?";
	con.query(sql,[req.body.name],function(err,result){
		if(result.length>0){
		res.send("user already exsist");
		}
		else{
			res.send("no user exsist");
		}
	});
});

app.post('/login',function(req,res){
	var sql="select * from data where username=? and password=?";
	console.log(req.body.pass);
	con.query(sql,[req.body.name,req.body.pass],function(err,result){
		console.log(sql);
		console.log(result);
		if(result.length>0){
		res.send("login successful");
		}
		else{
			res.send("login unsuccessful , try again !");
		}
	});
});

http.createServer(app).listen(app.get('port'),function(){
	console.log('Express Server listening on Port '+app.get('port'));
});
