const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


// routes + sequelize 
const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')
const db = require('./config/database')

//models
const Header = require('./models/dataHeader')
const GeoInd = require('./models/geoIndicators')
const GeoSpe = require('./models/geoSpecies')

// sequelize set up
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('error:'+ err));


const app = express();

app.use(bodyParser.json()) //app/json headerss


// headers for cross origin resource sharing errors!
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})



// routes (controllers within)
app.use('/auth', authRoutes)
app.use('/api', feedRoutes)

// model relationships!
Header.hasMany(GeoInd, {
  foreignKey: "PrimaryKey"
})
Header.hasMany(GeoSpe,{
  foreignKey: "PrimaryKey"
})



// error handler
app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500;
  const message = error.message 
  const data = error.data 
  res.status(status).json({message:message, data:data})
})


// webserver set up + associating with socket
db
  .sync({logging:false})  
    .catch(err=>{
    console.log(err)
  }).then(result =>{
      const server = app.listen(process.env.PORT || 5000)
      const io = require('./socket').init(server)
      io.on('connection', socket=>{
        console.log('connected!')
        socket.on('test3',message=>console.log(message))
      })
  })
// app.listen(process.env.PORT || 5000)
