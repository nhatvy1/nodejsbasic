import pool from "../configs/connectDB"

let getHomepage = async (req, res) => {

    const [rows, fields] = await pool.execute('select * from `users`')

    return res.render('index.ejs', { dataUser: rows })    
}

let getDetailPage = async (req, res) => {
    let userId = req.params.userId
    let [user] = await pool.execute('select * from `users` where id = ?', [userId])
    console.log('check request params:', user)
    return res.send(JSON.stringify(user[0]))
}

let createNewUser = async (req, res) => {
    console.log('>>> check req:', req.body)
    let {firstName, lastName, age, email } = req.body
    await pool.execute(`insert into users(firstName, lastName, age, email) values(?, ?, ?, ?)`, [firstName, lastName, age, email])
    
    return res.redirect('/')
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser   
}