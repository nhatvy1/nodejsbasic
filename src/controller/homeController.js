import pool from "../configs/connectDB"
import multer from 'multer'
import path from 'path'

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

let uploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

const upload = multer().single('profile_pic')
// const uploadMutiple = multer().array('mutiple_images')

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    // let upload = multer({ storage: storage, fileFilter: imageFilter}).single('profile_pic')
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

let handleUploadMutipleFile = async (req, res, err) => {
    console.log('>>> check error')
    console.log(err)
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editPage,
    updateUser,
    uploadFilePage,
    handleUploadFile,
    handleUploadMutipleFile
}