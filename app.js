const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const{ QueryTypes } = require('sequelize')

// routes + sequelize 
// const feedRoutes = require('./routes/feed')
// const authRoutes = require('./routes/auth')
const db = require('./config/database')

// // sequelize set up
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('error:'+ err));

   
const app = express();
app.use(helmet())
app.use(cors())

app.use('/api', (req, res, next)=>{
  res.send('<h1>LDC node server v.2 up!</h1><p style="color:blue;">Listening for queries...</p>')
});

// webserver set up + associating with socket
db
  .sync({logging:false})  
    .catch(err=>{
    console.log(err)
  }).then(result =>{
      const server = app.listen(process.env.PORT || 5000)
      const io = require('./socket').init(server)
      // console.log(io)
      io.on('connection', socket=>{

        console.log('connected!')

        socket.on('drawing', tmpData=>{
          let existingIds = new Set()
          let whereResults;
          // 
          let paramList = ''
          let subParams = ''
          let startPoint = ''
          for(let i in tmpData){
            // if length is one: no comma
            if(tmpData.length===1){
              for(let j in tmpData[i]){
                subParams+=tmpData[i][j]
              }
              paramList+=`${subParams} `
              
              subParams = ''
            // if is larger: comma after each
            } else {
              //getting start point//
              if (i==0){
                for(let j in tmpData[i]){
 
                  if(j==tmpData[i].indexOf(tmpData[i][tmpData[i].length-1])){
                    subParams+=`${tmpData[i][j]} `
                  } else {
                    subParams+=`${tmpData[i][j]} `
                  }                
                }
                startPoint+=`${subParams} `
                subParams = ''
              }
              //else capture the rest: if its large add comma to each appended coordset, except for the last
              if (i==tmpData.indexOf(tmpData[tmpData.length-1])){
                for(let j in tmpData[i]){
 
                  if(j==tmpData[i].indexOf(tmpData[i][tmpData[i].length-1])){
                    subParams+=`${tmpData[i][j]} `
                  } else {
                    subParams+=`${tmpData[i][j]} `
                  }                
                }
                paramList+=`${subParams}`
                subParams = ''
              } else {
                for(let j in tmpData[i]){
                  if(j==tmpData[i].indexOf(tmpData[i][tmpData[i].length-1])){
                    subParams+=`${tmpData[i][j]} `
                  } else {
                    subParams+=`${tmpData[i][j]} `
                  } 
                }
                paramList+=`${subParams}, `
                subParams = ''
                // paramList+=`"${tmpData[i]}", `
              }
            }
          }
          // console.log(paramList)

          let whereQuery = db.query(`select * from geojson_polygon(true,'${paramList}')`,{
            nest:true,
            logging:console.log,
            type:QueryTypes.SELECT,
            raw:true
          }).then(points=>{
            // console.log(points[0])
            let geojsonobj = points[0].geojson_polygon
            socket.emit('pointssend',geojsonobj)
          })
          // console.log(paramList)
        })

        socket.on('fetchpublic2', tmpData=>{

          db.query(`select * from test_geojson(${tmpData.param.public},
            ${tmpData.bounds._southWest.lng},
            ${tmpData.bounds._southWest.lat},
            ${tmpData.bounds._northEast.lng},
            ${tmpData.bounds._northEast.lat})`,{
            nest:true,
            logging:console.log,
            type:QueryTypes.SELECT,
            raw:true
          }).then(points=>{
            let geojsonobj = points[0].test_geojson
            socket.emit('pointssend',geojsonobj)
          })
         })
      })
  })
// app.listen(process.env.PORT || 5000)
