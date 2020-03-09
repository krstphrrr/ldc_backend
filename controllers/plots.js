const Header = require('../models/dataHeader')
const GeoInd = require('../models/geoIndicators')
const GeoSpe = require('../models/geoSpecies')
// const db = require('./config/database')
const Sequelize = require('sequelize')

const paginate = ({ page, pageSize }) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};


exports.getPlots = (req, res, next) =>{
  const pageSize = +req.query.pageSize
  const currentPage = +req.query.page
  let plotCount 
  let plotData
  if(pageSize && currentPage){
    Header.findAll({
      limit:pageSize,
      offset:currentPage * pageSize,
      
      where:{ 
        // USE DATA
      }
      
    }).then(document =>{
      this.plotData = document
      return Header.count()
    }).then(count=>{
      plotCount = count
    })
      .then(item =>{
        res.status(200).json({
          plts:this.plotData,
          maxPlots: plotCount
        })
      })
      .catch(err =>{
        console.log(err)
      })
  }
}

exports.getGeoInd = (req, res, next)=>{
  // let paramsArray = req.params
  // needs an array of filters in req, first pull are all public 
  // later observables will filter and re-pull with modified filter array
  // 

  const test = Header.findAll({
    include:[
      {
        model:GeoInd,
        where:{
          Public:true
        }
      }
    ],
    limit:100,
    where:{
      // Public:true
    }
  })
  // test.getGeoIndicators()
    // 
    .then((data)=>{
     res.status(200).json(data)
    })
    
//   .then()
//   .catch(err => {
//   console.log(err)
// })
  // headerGeo.then(data=>console.log(data))

  // const model = Header
  //   for (let assoc of Object.keys(model.associations)) {
  //     for (let accessor of Object.keys(model.associations[assoc].accessors)) {
  //       console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
  //     }
  //   }
  // H.getGeoIndicators().then(data=>{console.log(data)})


//  console.log(headerGeo)
  // const geoHeader = headerGeo.getGeoIndicators()
  // console.log(geoHeader)
  //   .then(data=>console.log(data))
  // geoHeader
  //   .then(data =>{
  //     console.log(data.wkbGeometry)
  //   })
}

exports.testGeo = (req, res, next)=>{
  let envelope = 
    Sequelize.fn("json_build_object",
      Sequelize.literal("'type'"), Sequelize.literal("'FeatureCollection'"),
      Sequelize.literal("'features'"),
        Sequelize.fn('json_agg',
        
          Sequelize.fn("ST_AsGeoJSON", Sequelize.literal('"wkb_geometry"')) ))
  
  let bounds = [-107.16613769531251, 32.06861044112201, -106.2975311279297, 32.57459147232343]
  let env = Sequelize.fn("ST_MakeEnvelope", ...bounds, 4326)
  let inter = Sequelize.fn("ST_Intersects", Sequelize.col("wkb_geometry"), env)
  let fun_1 = Sequelize.fn("ST_AsGeoJSON", Sequelize.literal(' SELECT'+' "ogc_fid" '+ 'WHERE "PUBLIC"= \'true\''))
  GeoInd.findAll({
    raw:true,
    logging:console.log,
    limit:1,
    // where: inter,
    attributes:[fun_1]
  })
    .then(result=>{
      console.log(bounds)
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
}
`
'SELECT "wkb_geometry" 
from "geoIndicators" a 
WHERE ST_Intersects(
  a.wkb_geometry, 
  ST_MakeEnvelope(' + 
  tmpData.bounds._southWest.lng + ', '  + 
  tmpData.bounds._southWest.lat + ', ' + 
  tmpData.bounds._northEast.lng + ', ' + 
  tmpData.bounds._northEast.lat + ", 4326)) = 't';"
`

