const express = require('express')
const bodyParser = require('body-parser')

const feedRoutes = require('./routes/feed')
// const db = require('./config/database')

// db.authenticate()
//     .then(() => console.log('database connected...'))
//     .catch(err => console.log('error:'+err));


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

// db
//   .sync({logging:true}) //force in dev
//   .then(result =>{
    
//     const server = app.listen(process.env.PORT || 5000)

//     })
//   .catch(err =>{
//     console.log(err)
//   })
app.listen(process.env.PORT || 5000)