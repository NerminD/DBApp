var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/baza';

var userSchema = mongoose.Schema({
	name:String,
	surname:String,
	dateOfBirth:{ type:Date, default:Date.now},
	city:String
});

var User = mongoose.model('User',userSchema);

var users = [];

function SaveUsers(){
	for (var i = 0; i < users.length; i++) {
		users[i].save(function(err){
			if(err) return console.error(err);
			console.log('saved');
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

var db = mongoose.createConnection(dbUrl);
db.on('error',function (cb){
	console.log('Error');
});
db.once('open',function (cb) {
	console.log('Connected');
	SaveUsers();
});

/*db.close();

var dbRead = mongoose.createConnection(dbUrl);
dbRead.on('error',function (cb){
	console.log('Error');
});
dbRead.once('open',function (cb) {
	console.log('Connected');
	User.find(function (err,users){
		if (err) return console.log('Error');
		console.log(users);
	});
});*/