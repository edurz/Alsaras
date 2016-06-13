var express = require('express');
var path = require('path');
var app = express();
app.get('/',function(req,res){
	res.render("ngRoute");
});

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');
app.listen(8080,function(){
	console.log("funciona ql!!");
});