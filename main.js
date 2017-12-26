const express = require('express');
var mysql = require('mysql');
const app = express();
var path = require('path');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"taskDB"
});


var taskarr = ['a','b','c','d','e'];
console.log(taskarr.toString());

var tasks = {
	Name:"Rahul",
	Email:"rahulgore34@gmail.com",
	Tasks:taskarr.toString()
};

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
   var sql = `insert into Tasks(Name,Email,Tasks) values("rahul","rahul@gmail.com","${taskarr.toString()}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));



app.listen(3000, function() {
  console.log('listening');
});