import mysql from 'mysql2/promise';

// create the connection to database
console.log("Creating the connection pool...")
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodejsbasic'
})

export default pool