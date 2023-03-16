import connection from "../configs/connectDB"

let getHomepage = (req, res) => {
    // logic
    let data = []

    connection.query(
    'select * from `users` ',
    function(err, results, fields) {
        console.log('>>> check mysql')
        results.map((row) => { data.push({
            id: row.id,
            email: row.email,
            age: row.age,
            firstName: row.firstName,
            lastName: row.lastName
        })})

        return res.render('test/index.ejs', { dataUser: JSON.stringify(data) })
    })
}

module.exports = {
    getHomepage
}