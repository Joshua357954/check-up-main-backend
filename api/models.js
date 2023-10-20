require('dotenv').config()
const { Sequelize,Model,DataTypes}=require('sequelize')

const sequelize = new Sequelize({
	dialect:'sqlite',
	storage:'../database.sqlite'
})



const users=sequelize.define('users',{
	userid:{
	    type: DataTypes.UUID,
	    defaultValue:DataTypes.UUIDV4
 	},
  	username:{
  		type:DataTypes.STRING(1234),
  		allowNull:false
  	},
  	password:{
  		type:DataTypes.STRING(1234),
  		allowNull:false
  	},
  	phone:{
  		type:DataTypes.STRING(1234),
  		allowNull:false
  	}

})


class messages extends Model{}

messages.init(
	{
	ownerid:{ type: DataTypes.STRING(1234),allowNull:false },
	messages:{ type: DataTypes.STRING(1234),allowNull:false },
	password:{ type: DataTypes.STRING(1234),allowNull:false }
	},
{
	sequelize,
	updatedAt:false

})



// async function kola (){ 
// 	await messages.sync({force:true}) 
// } 
// kola()


messages.hasOne(messages);
users.belongsTo(messages, {
  foreignKey: "userid",
})





// async function buildIt(){
// 	const solo= await Users.build({username:"solomon",password:"1234567"})
// 	solo.save()
// }
	
// buildIt()	
	
// console.log(`User has been saved ${solo.name}`)

  
module.exports={users,messages,sequelize}
