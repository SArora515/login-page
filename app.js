/*const express =  require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "ASHlm10@",
	database: "sanya_testing",
    port: 3306
})

const app= express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function(request, response) {
	// Capture the input fields
    console.log(request.body)
	let email = request.body.email;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified email and password
		connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.email = email;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect email and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter email and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});
app.listen(3306);


*/

// connection.query(query, [email, password], (err, results) => {
    //     if (err) {
    //         console.error('Error executing query: ' + err.stack);
    //         return res.status(500).send('Internal Server Error');
    //     }

    //     // If user exists, redirect to dashboard
    //     if (results.length > 0) {
    //         res.status(200).send('Successful');
    //     } else {
    //         res.status(400).send('Invalid email or password');
    //     }
    // });
	 // const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    /*var con = connection.query(query,[email, password],async function (error, results, fields){
        if (await results.length > 0){
            res.status(200).send(" Successful!");
        }
        else{
            res.status(500).send("Try Again");
        }
    })*/
	
// connection.connect(function(error){
//     if (error) throw error
//     else console.log("Conected!")
// });
// const connection = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "ASHlm10@",
// 	database: "sanya_testing",
//     port: 3306
// });
// app.set('trust proxy', true); 
//Coorected Code
//let [con1]= await pool.query(`SELECT * FROM users WHERE (email = ? AND password != ?) OR (email != ? AND password = ?) OR (email != ? AND password != ?);`, [email, password, email, password, email, password])
        // if(con1.length !== 0){
        //     //Login of the exisiting user Failed
        //     res.status(500).send("Try Again");
        //     console.log("Kindly check your credentials")
        // }
        // else{
        //     let [con]= await pool.query(`SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`)
        //     console.log(con)
        //     if (con.length === 0){
        //          // res.status(500).send('Fail');
        //         // console.log('No results found');
        //         let [q1] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
        //         if (q1.length === 0) {
        //             //registering new user failed
        //             res.status(500).send('Insertion Failed');
        //             console.log("Insertion Failed!")
        //         }
        //         else {
        //             //registering new user successful 
        //             res.status(200).send('Insertion Successful');
        //             console.log("Insertion Successful!")
        //         }
        
        //     }
        //     else{
        //         //Login already existing user
        //         res.redirect('/success.html');
        //         res.status(200).send('Successful');
        //         console.log('results found');
        //     }
        // }
        // console.log(con1);
        // let [con]= await pool.query(`SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`)
        // // let [con1]= await pool.query(`SELECT * FROM users WHERE (email = ? AND password != ?) OR (email != ? AND password = ?) OR (email != ? AND password != ?);`, [email, password, email, password, email, password])
        // console.log(con)
        // if(con.length === 0){
        //     let [q1] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
        // }
        // // else if(email === con.email && password !== con.password){
        // //     console.log("Kindly check your password");
        // // }
        // // else if(email !== con.email && password === con.password){
        // //     console.log("Kindly check your email");
        // // }
        // else{
        //     res.status(200).send("Successfully Logged In")
        // }