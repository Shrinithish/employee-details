const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


app.use(cors());
app.use(express.json());

//ROUTES//
app.post('/create',async(req,res) => {
	try {
		const {username,dob,city,state,address1,address2,zip,phone,email}=req.body;
		const createuser= await pool.query("INSERT INTO users (username,dob,city,state,address1,address2,zip,phone,email) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",[username,dob,city,state,address1,address2,zip,phone,email]); 
		res.json(createuser.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

app.get('/users',async(req,res) => {
	try {
		const allusers= await pool.query("SELECT * FROM users");
		res.json(allusers.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.put('/update/:id',async(req,res) => {
	try {
		const {id} = req.params;
		const {username,dob,city,state,address1,address2,zip,phone,email}=req.body;
		const updateuser= await pool.query("UPDATE users SET username=$1,dob=$2,city=$3,state=$4,address1=$5,address2=$6,zip=$7,phone=$8,email=$9 WHERE id=$10",[username,dob,city,state,address1,address2,zip,phone,email,id]);
		res.json("User was updated");
	} catch (err) {
		console.error(err.message);
	}
});

app.delete('/delete/:id',async(req,res) => {
	try{
	const {id}=req.params;
	const deleteuser= await pool.query("DELETE FROM users WHERE id=$1",[id]);		
	res.json("User was deleted");
	}
	catch(err){
		console.error(err.message);
	}
});




app.listen(3000, () => {
  console.log('Server is running on port 3000');
})


