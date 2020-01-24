const express = require('express')
const bodyParser = require('body-parser')

const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')
const db = require('./config/database')

db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('error:'+err));


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


app.use('/api', feedRoutes)
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500;
  const message = error.message 
  const data = error.data 
  res.status(status).json({message:message, data:data})
})

db
  .sync({logging:console.log})  
    .catch(err=>{
    console.log(err)
  })
//   .sync({logging:true}) //force in dev
//   .then(result =>{
    
//     const server = app.listen(process.env.PORT || 5000)

//     })
//   .catch(err =>{
//     console.log(err)
//   })
app.listen(process.env.PORT || 5000)