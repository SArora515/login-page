const express =  require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var nodemailer = require('nodemailer');

const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "500MB", extended: true, parameterLimit: 5000000 }))



app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'ASHlm10@',
    database: 'sanya_testing',
    port:'3306'
});

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'onworkai@gmail.com', // generated ethereal user
        pass: 'zcuk lyuv lywk kafc', // generated ethereal password
    },
  });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace * with your domain for better security
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/', async (req, res) => {
    res.render('index');
})

app.get('/login', async (req, res) => {
    res.render('login');
})

app.get('/register', async (req, res) => {
    let [options] = await pool.query('CALL `sanya_testing`.selectCategoryOptions();');
    console.log(options)
    res.render('register', {options});

})

app.get('/otpgen', async (req, res) => {
    res.render('otpgen');
})






// app.get('/', function(req, res){
//     // res.sendFile(__dirname + '/views/index.ejs');
//     res.render('index');
// })

// app.post('/', async function(req, res){
//     var email = req.body.email;
//     // console.log(req.body)
//     var password = req.body.password;
//     var category = req.body.category;
//     var age = req.body.age;
//     // let [con]= await pool.query(`SELECT * FROM users WHERE email = "${email}"`) // checks the database for the email 
//     let [con]= await pool.query("CALL `sanya_testing`.checkUserEmail(?)", [email]) // checks the database for the email 
//     console.log(con)
    
//     if (con[0].length !== 0){
//         //let [con1]= await pool.query(`SELECT * FROM users WHERE password = "${password}"`)
//         let [con1]= await pool.query("CALL `sanya_testing`.checkUserPassword(?)", [password]) // checks the database for the password
//         console.log(con1)
//         if(con1[0].length === 0){
//             console.log('Incorrect Password!');
//             res.status(500).redirect('/');
//             }
//             else{
//                 console.log('Successfully Logged In!');
//                 // res.status(200).send('Successful!');
//             //     res.render('dashboard', {
//             //         "loggedinUserID": 12,
//             // });
//             }
             
//         }
            
//     else{
//         //let [con2]= await pool.query(`INSERT INTO users (email, password) VALUES ("${email}", "${password}")`)
//             // if (con2.length === 0) {
//                 let [con2]= await pool.query("CALL `sanya_testing`.createNewUser(?,?,?,?)", [email, password, category, age]) // Creates a new user
//                 //console.log(con2)
//                 if(con2[0] === 0){
//                 //registering new user failed
//                 res.status(500).send('Insertion Failed');
//                 console.log("Insertion Failed!")
//                 }
//                 else {
//                 //registering new user successful 
//                 // res.status(200).send('Insertion Successful');
//                 res.status(200).redirect('/views/dashboard.ejs');
//                 console.log("Insertion Successful!")
//                 }
//         }
        
        
    
// })

var otp="";
var attempts = 0;
var lastlogin = new Date();
var regTime = new Date();

// var name = '';
//     var email = '';
//     var password = '';
//     var category = '';
//     var age = '';

app.post('/register', async function(req, res){
     var name = req.body.name;
     var email = req.body.email;
    console.log(req.body)
     var password = req.body.password;
     var category = req.body.category;
     age = req.body.age;
    lastlogin = '';
    regTime = '';

    let [con2]= await pool.query("CALL `sanya_testing`.createNewUser(?,?,?,?,?)", [name,email, password, category, age]) // Creates a new user
    console.log(con2)
    for (var i = 0; i < 4; i++){
    otp += Math.floor(Math.random()* 10);
    }

    var mailOptions = {
        from: `${email}`,
        to: 'sanya.arora@allfriends.studio',
        subject: 'Sending Email using Node.js',
        text: ` Your otp for verification : ${otp}`
      };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
    });


    // console.log(otp);



    let [q4] = await pool.query("CALL `sanya_testing`.showRegistationTime(?)", [email]);
        console.log(q4);
        regTime = q4[0][0].currentDate;
        // let [con2]= await pool.query("CALL `sanya_testing`.createNewUser(?,?,?,?,?)", [name,email, password, category, age]) // Creates a new user
        // console.log(con2)

    res.status(200).redirect('/otpgen');

})

app.post('/otpgen', async function(req, res){
    console.log(otp)
    var checkotp = req.body.otp;
    if (checkotp == otp){
        console.log('OTP is correct');
        otp = "";
        
        // console.log(lastlogin);
        res.status(200).redirect('/dashboard');
    }
    else{
        console.log('OTP is incorrect');
        res.redirect('/register');
    }
    
    
})





app.post('/login', async function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    let [con]= await pool.query("CALL `sanya_testing`.checkUserEmail(?)", [email]) // checks the database for the email 
    // console.log(con)
    if (con[0].length !== 0){
            regTime = '';

         //let [con1]= await pool.query(`SELECT * FROM users WHERE password = "${password}"`)
        let [con1]= await pool.query("CALL `sanya_testing`.checkUserPassword(?)", [password]) // checks the database for the password
        // console.log(con1)
        if(con1[0].length === 0){
            console.log('Incorrect Password!');
            attempts += 1;
            // console.log(attempts);
            res.redirect('/login');
        }
        else{
            lastlogin = '';
            console.log('Successfully Logged In!');
            lastlogin = '';
            let [q3] = await pool.query("CALL `sanya_testing`.updateLastLoginDate(?)", [email]);
            console.log(q3);
            lastlogin = q3[0][0].lastLogin;
            console.log(lastlogin);

            res.status(200).redirect('/dashboard');
            // res.render('dashboard', {lastlogin});

        // res.status(200).send('Successful!');
     //     res.render('dashboard', {
 //         "loggedinUserID": 12,
        // });
        }
    }
    else{
        console.log('Email not found!');
        res.redirect('/register');
    }
})

app.get('/dashboard', async function(req, res) {
    // Respond with the dashboard HTML file
    // res.sendFile(__dirname + '/dashboard.ejs');
    // console.log('Your no of attempts are:', attempts)
    res.render('dashboard',{attempts, lastlogin, regTime});

});
// app.get('/', async function(req, res) {
//     let [options] = await pool.query('CALL `sanya_testing`.selectCategoryOptions();');
//     res.render('views/index.ejs', { options: options });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
