import pool from "../configs/connectDB"

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('select * from users')
    return res.status(200).json({
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let {firstName, lastName, age, email } = req.body
    
    if (!firstName || !lastName || !age || !email) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }

    await pool.execute(`insert into users(firstName, lastName, age, email) values(?, ?, ?, ?)`, 
        [firstName, lastName, age, email])

    return res.status(200).json({
        message: 'OK'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, age, email, id } = req.body

    if (!firstName || !lastName || !age || !email || !id) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }

    await pool.execute('update users set firstName =?, lastName = ?, age = ?, email = ? where id =?',
    [firstName, lastName, age, email, id])

    return res.status(200).json({
        message: 'OK'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id

    if (!userId) {
        return res.status(200).json({
            message: 'OK'
        })
    }

    await pool.execute('delete from users where id = ?', [userId])

    return res.status(200).json({
        message: 'OK'
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser, 
    deleteUser
}