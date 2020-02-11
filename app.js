const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// get rid of
// const { GraphQLSchema } = require('graphql');
const graphqlHttp = require('express-graphql')


// routes + sequelize 
const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')
const db = require('./config/database')



//models
const Header = require('./models/dataHeader')
const GeoInd = require('./models/geoIndicators')
const GeoSpe = require('./models/geoSpecies')

// // sequelize set up
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
GeoInd.belongsTo(Header,{
  foreignKey: "PrimaryKey"
})

Header.hasMany(GeoSpe,{
  foreignKey: "PrimaryKey"
})
GeoSpe.belongsTo(Header,{
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


const{ QueryTypes } = require('sequelize')

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

        socket.on('fetchpoints', tmpData=>{
          // tmpBounds
          let existingIds = new Set()
          let whereResults;
          let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + ", 4326)) = 't' AND \"Public\"= true;",{
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

        socket.on('onpublic', tmpData=>{
          let existingIds = new Set()
          let whereQ;
          if(tmpData.public===true){
            whereQ = "AND \"Public\"= true;"
            let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + ", 4326)) = 't'"+whereQ,{
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
                  resList.forEach(row=>{
                    tmpProps = {}
                    tmpKeys.forEach(key=>{
                      tmpProps[key] = row[key]
                    })
                    // console.log(row)
                    if (!existingIds.has(row.ogc_fid)){
                      let fuzzPoint = {'type':'Point', 'coordinates':[]}
                      let ranCoord = (Math.random()*0.01)
                      let fuzzLng = (row.wkb_geometry.coordinates[0]+ranCoord)
                      let fuzzLat = (row.wkb_geometry.coordinates[1]+ranCoord)
                      
                      console.log(fuzzPoint)
                      // console.log(row.wkb_geometry.coordinates, [fuzzLng, fuzzLat])
                      if(row.Public===false){
                        // push new fuzzed coords into geometry object
                      }
                      // console.log(fuzzPoint)
                      tmpJSON.features.push({
                        "type":"Feature",
                        "id":row.ogc_fid, 
                        "properties": tmpProps,
                        "geometry":row.wkb_geometry})
                      existingIds.add(row.ogc_fid)
                    }
                    // console.log(tmpJSON.features)
                  })
                }
              }
              socket.emit('pointssend', tmpJSON)

            })
            // console.log(tmpData)
          } else {
            whereQ = ";"
            let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + ", 4326)) = 't'"+whereQ,{
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
                  resList.forEach(row=>{
                    tmpProps = {}
                    tmpKeys.forEach(key=>{
                      tmpProps[key] = row[key]
                    })
                    // console.log(row)
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
                }
              }
              socket.emit('pointssend', tmpJSON)

            })
          }
          
          // let whereQuery = db.query(
          //     'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          // + tmpData.bounds._southWest.lng + ', '  
          // + tmpData.bounds._southWest.lat + ', ' 
          // + tmpData.bounds._northEast.lng + ', ' 
          // + tmpData.bounds._northEast.lat + ", 4326)) = 't' AND \"Public\"= true;",{
          //     nest:true,
          //     logging:console.log,
          //     type:QueryTypes.SELECT,
          //     raw:true
          //   }).then(points=>{
          //     let resList = []
          //     let tmpKeys
          //     let tmpJSON = {"type":"FeatureCollection", "features":[]}
          //     for(let i in points){
          //       resList.push(points[i])
          //       if(points[i]){

                  
          //         tmpKeys = Object.keys(points[i])
          //         resList.forEach(row=>{
          //           tmpProps = {}
          //           tmpKeys.forEach(key=>{
          //             tmpProps[key] = row[key]
          //           })
          //           // console.log(row)
          //           tmpJSON.features.push({
          //             "type":"Feature",
          //             "id":row.ogc_fid, 
          //             "properties": tmpProps,
          //             "geometry":row.wkb_geometry})
          //           // console.log(tmpJSON)
                    
          //         })
          //         // console.log(points[i])
                  
          //       }
                
          //     }
          //     // console.log()
          //     // console.log(JSON.stringify(points))
          //     // socket.emit('pointssend', points)
          //     socket.emit('pointssend', tmpJSON)

          //   })
        })
      })
  })
// app.listen(process.env.PORT || 5000)
