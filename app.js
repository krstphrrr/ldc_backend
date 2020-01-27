const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')
const db = require('./config/database')


db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('error:'+ err));


const app = express();

// app.use(bodyParser.urlencoded())
app.use(bodyParser.json()) //app/json headerss


// headers for cross origin resource sharing errors!
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  next()
})
// move later into  utils so routes can be 
// guarded with authCheck by just importing

// or set it at locals!


app.use('/auth', authRoutes)
app.use('/api', feedRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500;
  const message = error.message 
  const data = error.data 
  res.status(status).json({message:message, data:data})
})

db
  .sync({logging:false})  
    .catch(err=>{
    console.log(err)
  })

app.listen(process.env.PORT || 5000)