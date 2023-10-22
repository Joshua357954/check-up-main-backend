require('dotenv').config()
const { Sequelize,Model,DataTypes}=require('sequelize')

// const sequelize = new Sequelize({
// 	dialect:'sqlite',
// 	storage:'../database.sqlite'
// })

const connectionString = "postgres://myuni_db_user:flOjE6Ojcc5TUg0RouVKla7phlqrsOt2@dpg-cjgupdj6fquc73b0igug-a.singapore-postgres.render.com/myuni_db"+"?sslmode=require"

const sequelize = new Sequelize(connectionString, {
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


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


async function kola (){ 
	await sequelize.sync({force:true}) 
} 
kola()


// async function buildIt(){
// 	const solo= await users.build({username:"solomon",password:"1234567"})
// 	solo.save()
// }
	
// buildIt()	
	
// console.log(`User has been saved ${solo.name}`)

  
module.exports={users,messages,sequelize}
