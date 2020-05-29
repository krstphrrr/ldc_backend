const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


// routes + sequelize 
// const feedRoutes = require('./routes/feed')
// const authRoutes = require('./routes/auth')
const db = require('./config/database')



//models
// const Header = require('./models/dataHeader')
// const GeoInd = require('./models/geoIndicators')
// const GeoSpe = require('./models/geoSpecies')

// // sequelize set up
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('error:'+ err));

   
const app = express();


app.use(bodyParser.json()) //app/json headerss


// headers for cross origin resource sharing errors!
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200','https://landscapedatacommons.org', 'https://test.landscapedatacommons.org')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('set-cookie',[
    'same-site-cookie=bar; SameSite=None; Secure'
  ])
  next()
})



// routes (controllers within)
// app.use('/auth', authRoutes)
// app.use('/api', feedRoutes)
app.use('/api', (req, res, next)=>{
  res.send('<h1>LDC node server v.2 up!</h1><p style="color:blue;">Listening for queries...</p>')
});

// app.use('/', (req, res, next)=>{
//   console.log('localhost @ port was hit')
//   res.send('<h1>LDC node server v.2 up!</h1><p style="color:blue;">Listening for queries...</p>')
// });

// model relationships!
// Header.hasMany(GeoInd, {
//   foreignKey: "PrimaryKey"
// })
// GeoInd.belongsTo(Header,{
//   foreignKey: "PrimaryKey"
// })

// Header.hasMany(GeoSpe,{
//   foreignKey: "PrimaryKey"
// })
// GeoSpe.belongsTo(Header,{
//   foreignKey: "PrimaryKey"
// })


// error handler
// app.use((error, req, res, next) => {
//   console.log(error)
//   const status = error.statusCode || 500;
//   const message = error.message 
//   const data = error.data 
//   res.status(status).json({message:message, data:data})
// })


const{ QueryTypes } = require('sequelize')

// webserver set up + associating with socket
db
// the request thru socket does not use samesite cookie..
  .sync({logging:false})  
    .catch(err=>{
    console.log(err)
  }).then(result =>{
      const server = app.listen(process.env.PORT || 5000)
      const io = require('./socket').init(server)
      // console.log(io)
      io.on('connection', socket=>{

        console.log('connected!')
      
        socket.on('fetchpoints', tmpData=>{
          // socket.io.opts = {
          //   path : '/ws_website2'
          // }
          // console.log(tmpData.params)
          let existingIds = new Set()
          let whereResults;
          // 
          paramList = "SELECT "
          let testList = ["one", "two","three", "four"]
          for(let i in testList){
            // if length is one: no comma
            if(testList.length===1){
              paramList+=`"${testList[i]}" `
            // if is larger: comma after each
            } else {
              // until it reaches end of array! then no comma
              if (i==testList.indexOf(testList[testList.length-1])){
                paramList+=`"${testList[i]}" `
              } else {
                paramList+=`"${testList[i]}", `
              }
            }
          }
          
          // let [a,b] = testList
          //  let whereSelect = `SELECT ${}`
          console.log(paramList)
         //(float xmin, float ymin, float xmax, float ymax, integer srid=unknown);

         // xmin
          let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + ", 4326)) = 't'",{
              nest:true,
              logging:console.log,
              type:QueryTypes.SELECT,
              raw:true
            }).then(points=>{
              let resList = []
              let tmpKeys
              let tmpJSON = {"type":"FeatureCollection", "features":[]}
              for(let i in points){
                resList.push(points[i])
                if(points[i]){

                  
                  tmpKeys = Object.keys(points[i])
                  // console.log(tmpKeys)
                  resList.forEach(row=>{
                    tmpProps = {}
                    tmpKeys.forEach(key=>{
                      // console.log(key)
                      tmpProps[key] = row[key]
                    })
                    // console.log(row)
                    
                    // existingIds.push(row.ogc_fid)
                    // console.log(existingIds,"cannot add")
                    
                    if (!existingIds.has(row.ogc_fid)){
                        tmpJSON.features.push({
                          "type":"Feature",
                          "id":row.ogc_fid, 
                          "properties": tmpProps,
                          "geometry":row.wkb_geometry})
                        existingIds.add(row.ogc_fid)
                      }
                    
                    // console.log(tmpJSON)
                    
                  })
                  // console.log(points[i])
                  
                }
                
              }
              
              socket.emit('pointssend', tmpJSON)

            })
        })

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
          console.log(paramList)



          
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

        socket.on('fetchpublic', tmpData=>{

          let existingIds = new Set()
          // console.log(tmpData.param)
          let choice;
          let wherePubtrue = ", 4326)) = 't' AND \"Public\"=true; "
          let wherePubfalse = ", 4326)) = 't'"
          if(tmpData.param.public===true){
            choice = wherePubtrue
            // console.log(choice)
          } else if (tmpData.param.public===false){
            choice = wherePubfalse
            // console.log(choice)
          }
         
          let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + choice,{
              nest:true,
              logging:console.log,
              type:QueryTypes.SELECT,
              raw:true
            }).then(points=>{
              let resList = []
              let tmpKeys
              let tmpJSON = {"type":"FeatureCollection", "features":[]}
              for(let i in points){
                resList.push(points[i])
                if(points[i]){

                  
                  tmpKeys = Object.keys(points[i])
                  // console.log(tmpKeys)
                  resList.forEach(row=>{
                    tmpProps = {}
                    tmpKeys.forEach(key=>{
                      // console.log(key)
                      tmpProps[key] = row[key]
                    })
                    // console.log(row)
                    
                    // existingIds.push(row.ogc_fid)
                    // console.log(existingIds,"cannot add")
                    
                    if (!existingIds.has(row.ogc_fid)){
                        tmpJSON.features.push({
                          "type":"Feature",
                          "id":row.ogc_fid, 
                          "properties": tmpProps,
                          "geometry":row.wkb_geometry})
                        existingIds.add(row.ogc_fid)
                      }
                    
                    // console.log(tmpJSON)
                    
                  })
                  // console.log(points[i])
                  
                }
                
              }
              
              socket.emit('pointssend', tmpJSON)

            })
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
