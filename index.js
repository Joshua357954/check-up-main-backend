const express=require("express")
const helmet=require("helmet")
const cors=require("cors")
const ApiRoute=require("./api/api.js")
const app=express()
const PORT= process.env.PORT || 3009

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/v1/',ApiRoute)

app.get('/api',(req,res)=>{

	res.send("Hello From CheckUp")

})


app.listen(PORT,()=> {console.log(`App is running on Port ${PORT}`)})

