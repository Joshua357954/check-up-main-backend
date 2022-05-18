require('dotenv').config()
const express=require('express')
const {users,messages,sequelize}=require('./models.js')
const bcrypt =require('bcrypt')
const asyncHandler=require('express-async-handler')
const ApiRoute=express.Router()
const {SALT} = process.env


// users.sync({force:true})

sequelize.authenticate()

	.then("connected to database ohh..")

	.catch((err)=>{
		console.log(err)
})




ApiRoute.get('/logout',(req,res)=>{
	res.status(200).json("my logout route ...")

})


ApiRoute.post('/login',(req,res)=>{
	const {username,password}=req.body
	res.send("my Login route ...")

})

// conda case NewWorld NewWORLD
ApiRoute.post('/register',asyncHandler(async(req,res)=>{
	const {username,password,phone}=(req.body)
	let hashedPassword=''

	// Hash Password
	bcrypt.hash(password,12,async function(err,hashed){
		
		// Check if password exists
		const checkUser= await users.findOne({where:{'username':username}})

		if (checkUser)
			return res.send(`This user already exists : ${username}`)

		// Creeate new User
		const NewUser=await users.build({username,password:hashed,phone})
		NewUser.save()
		return res.send(`You have Successfully Registered `)

	})
}))

ApiRoute.get('/getUsers',asyncHandler(async(req,res)=>{

	const ALL_USERS = await users.findAll({attributes: ['username']})

	if(!ALL_USERS)return ("error just dae worrri")

	res.json(ALL_USERS)
}))

	
	




module.exports=ApiRoute