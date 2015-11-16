var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan")
var swig = require("swig");
var routes = require("./routes/wiki");


var port = 3000;
var app = express();

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false})

app.use(morgan("dev"));

app.use(express.static(__dirname+"/public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
	res.render("index");
})

app.listen(port, function(){
	console.log("we're listening at port "+ port)
})