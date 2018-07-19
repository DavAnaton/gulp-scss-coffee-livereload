var express = require('express'),
	ejs = require('ejs'),
	app = express();
app.set('view engine', 'ejs')
.use(express.static('public'))

.get('/', function(req, res){
	res.render('index');
})

.listen(8787);