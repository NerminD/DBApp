var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/baza';
var db = mongoose.connection;


var userSchema = mongoose.Schema({
	name:String,
	surname:String,
	dateOfBirth:{ type:Date, default:Date.now},
	city:String
});

var User = mongoose.model('User',userSchema);

var users = [];

function ReadUsers(cb){
	User.find(function (err,users){
				if (err) return console.error('Error');

				for (var i = 0; i < users.length; i++) {
					console.log('');
					console.log(users[i].name + ' '
					 + users[i].surname);
					console.log(users[i].dateOfBirth);
					console.log(users[i].city);
				};

				if(cb) cb();
			});
}

function SaveUsers(cb){
	var counter = users.length;

	for (var i = 0; i < users.length; i++) {
		users[i].save(function(err){
			if(err) return console.error(err);

			console.log('User saved');

			counter--;
			if (cb && counter==0) cb();
		});
	};	
}

function createUser (name,surname,dateOfBirth,city){
	return new User({
	name:name,
	surname:surname,
	dateOfBirth:dateOfBirth,
	city:city
	});
}

function disconnect (cb){
	db.close(function(){
		if(cb) cb();
	});	
}

function clear(cb){
	User.remove({},function(err){
			if (err) return console.error('Error');

			console.log('Cleared');
			
			if(cb) cb();
		})
}

function connect(URL,cb){
	mongoose.connect(URL);

	db.on('error',function (c){
		console.error('Error');
	});
	db.once('open',function (c) {
		console.log('Connected');

		if(cb) cb();
	});
}

users[0] = createUser(
		'Nermin',
		'Demir',
		new Date(95,0,30),
		'Kakanj');
users[1] = createUser(
		'Said',
		'Sikira',
		new Date(95,2,19),
		'Kakanj');
users[2] = createUser(
		'Amel',
		'Sisic',
		new Date(95,1,8),
		'Kakanj');

connect(dbUrl,function(){
	clear(function(){
		SaveUsers(function(){
			ReadUsers(function(){
				disconnect(console.log('Disconnected'));
			});
		});
	})
});