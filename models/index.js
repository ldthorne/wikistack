var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Schema = mongoose.Schema;

var pageSchema = new mongoose.Schema({
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
  	date: { type: Date, default: Date.now},
  	status: {type: boolean, enum: ["open","closed"]},
  	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

pageSchema.virtual("route").get(function(){
	return "/wiki/"+this.urlTitle;
});

var userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true}
});

var Page = mongoose.model("Page", pageSchema);
var Page = mongoose.model("User", userSchema);

module.exports = {
  Page: Page,
  User: User
};