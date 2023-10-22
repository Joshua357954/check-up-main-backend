require('dotenv').config()
const { Sequelize,Model,DataTypes}=require('sequelize')

const sequelize = new Sequelize({
	dialect:'sqlite',
	storage:'../database.sqlite'
})


//  Users Model
const users = sequelize.define('user',{

  	username:{
  		type:DataTypes.STRING,
  		allowNull:false
  	},
  	password:{
  		type:DataTypes.STRING,
  		allowNull:false
  	},
  	phone:{
  		type:DataTypes.STRING,
  		allowNull:false
  	}

})

const messages = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});

// //  Message Model
// class messages extends Model{}

// messages.init(
// 	{
// 	message:{ type: DataTypes.STRING(1234),allowNull:false },
// 	password:{ type: DataTypes.STRING(1234),allowNull:false }
// 	},
// {
// 	sequelize,
// 	updatedAt:false

// })



users.hasMany(messages)
messages.belongsTo(users,{foreignKey:'userId'})


// async function kola (){ 
// 	await sequelize.sync({force:true}) 
// } 
// kola()


// async function buildIt(){
// 	const solo= await users.build({username:"solomon",password:"1234567"})
// 	solo.save()
// }
	
// buildIt()	
	
// console.log(`User has been saved ${solo.name}`)

  
module.exports={users,messages,sequelize}
