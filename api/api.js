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
ApiRoute.post('/login',async(req,res)=>{
	
	const {username,password}=req.body
	
	console.log('Loging In')
	// Check if password exists
	const user= await users.findOne({where:{'username':username}})

	// Check if the user exists
	if (!user) {
	return res.status(401).json({ message: 'Authentication Failed' });
	}

	// Compare the provided password with the hashed password
	const isPasswordCorrect = await bcrypt.compare(password, user.password)

	if (isPasswordCorrect) 
		return res.status(200).json({ id:user.id,username, valid:true });
	
	else 
		return res.status(401).json({ message: 'Authentication Failed' });

})


// Register User
ApiRoute.post('/register',asyncHandler(async(req,res)=>{
	
	const {username,password,phone} = (req.body)
	console.log("Registering User ...")
	
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


//  Get UserBy Id
ApiRoute.post('/getUsersById',asyncHandler(async(req,res) =>{
	const id = req.body.id
	console.log("Getting User", id)

	const foundUser = await users.findOne({where:{id}})
	// delete foundUser.password

	if (!foundUser) 
		return res.status(401).json({ message: 'User Search Failed' });	
	else
		return res.send({data:foundUser})
}))	

//  Get Users 
ApiRoute.get('/getUsers',asyncHandler(async(req,res)=>{
	console.log("Getting Users")

	const ALL_USERS = await users.findAll({attributes:['username']})

	if(!ALL_USERS) return res.send("Error just dae worrri")

	return res.json(ALL_USERS)
}))


// send message
ApiRoute.post('/sendMessage',async(req,res) => {
	
	const {msg,user} = req.body

	var {id} = await users.findOne({where:{username:user}},{attributes:['id']})

	const receiver = await messages.create({message:msg,userId:id})

	return res.send('Message Sent ')

})

//  Feedbacks
// get messages

ApiRoute.post('/userMessages',async(req,res) => {
	const userId = req.body.id
	const msgs = await messages.findAll({where:{userId}})
	return res.send(msgs)

})



module.exports=ApiRoute