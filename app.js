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

app.use(bodyParser.json()) //app/json headerss


// headers for cross origin resource sharing errors!
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})




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
  }).then(result =>{
      const server = app.listen(process.env.PORT || 5000)
      const socketio = require('socket.io')
      const io = socketio(server)
      // app.set('socketio',io)
      io.on('connection', (socket)=>{
        console.log('you are connected')
  
        socket.on('disconnect', function(){
          console.log('user disconnected');
        });
        
        socket.emit('test event', 'here is some data')
        socket.on('test2', (data)=>{
          console.log(data)
        })
      })
    })
// app.listen(process.env.PORT || 5000)
