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

module.exports = {
    getHomepage,
    getDetailPage   
}