import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodejsbasic'
})

// connection.connect(function(err) {
// 	if (err) throw err;
// 	console.log("Connected!");
// })

// connection.query(
// 	'select * from `users` ',
// 	function(err, results, fields) {
// 		console.log('>>> check mysql')
// 		let rows = results.map((row) => { return row })
// 		console.log(rows)
// 	}
// )

export default connection