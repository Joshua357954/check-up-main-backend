require('dotenv').config()
const express=require('express')
const {users,messages,sequelize}=require('./models.js')
const bcrypt =require('bcrypt')
const asyncHandler=require('express-async-handler')
const ApiRoute=express.Router()
const {SALT} = process.env


// users.sync({force:true})

sequelize.authenticate()
	.then("Connected To Database")
	.catch((err)=>{
		console.log(err)
})



//  Logout
ApiRoute.get('/logout',(req,res)=>{
	res.status(200).send("LogOut")
})


// Login
ApiRoute.post('/login',(req,res)=>{
	const {username,password}=req.body
	
	// Check if password exists
	const checkUser= await users.findOne({where:{'username':username}})

	res.send("my Login route ...")

})


// Register User
ApiRoute.post('/register',asyncHandler(async(req,res)=>{
	const {username,password,phone}=(req.body)

	// Hash Password
	bcrypt.hash(password,12,async function(err,hashed){
		
		// Check if password exists
		const checkUser= await users.findOne({where:{'username':username}})

		if (checkUser)
			return res.send(`This user already exists : ${username}`)

		// Creeate new User
		const NewUser = await users.create({username,password:hashed,phone})

		return res.send(`You have Successfully Registered `)
	})
}))


//  Get Users 
ApiRoute.get('/getUsers',asyncHandler(async(req,res)=>{

	const ALL_USERS = await users.findAll({attributes: ['username']})

	if(!ALL_USERS)return ("error just dae worrri")

	return res.json(ALL_USERS)
}))



module.exports=ApiRoute