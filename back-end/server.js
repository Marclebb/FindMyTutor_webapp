const express=require('express')
const db=require('./models')
const usersrouter=require('./routes/users')
const cors=require('cors')


const app=express()
app.use(express.json())
app.use(cors())
app.use('/users',usersrouter)

db.sequelize.sync().then(()=>{
    app.listen(3001)
})