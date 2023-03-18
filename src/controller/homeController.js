import pool from "../configs/connectDB"

let getHomepage = async (req, res) => {

    const [rows, fields] = await pool.execute('select * from `users`')

    return res.render('index.ejs', { dataUser: rows })    
}

let getDetailPage = async (req, res) => {
    let userId = req.params.userId
    let [user] = await pool.execute('select * from `users` where id = ?', [userId])
    return res.send(JSON.stringify(user[0]))
}

let createNewUser = async (req, res) => {
    console.log('>>> check req:', req.body)
    let {firstName, lastName, age, email } = req.body
    await pool.execute(`insert into users(firstName, lastName, age, email) values(?, ?, ?, ?)`, [firstName, lastName, age, email])
    
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId
    await pool.execute('delete from users where id = ?', [userId])
    return res.redirect('/')
}

let editPage = async (req, res) => {
    let id = req.params.id
    let [user] = await pool.execute('select * from users where id =?', [id])
    return res.render('update.ejs', { dataUser: user[0] })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, age, email, id } = req.body
    await pool.execute('update users set firstName =?, lastName = ?, age = ?, email = ? where id =?',
    [firstName, lastName, age, email, id])
    return res.send('Update success')
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editPage,
    updateUser   
}