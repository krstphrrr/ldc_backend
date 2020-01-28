const Header = require('../models/dataHeader')
const GeoInd = require('../models/geoIndicators')
const GeoSpe = require('../models/geoSpecies')

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
  Header.findOne({
    include:[
      {
        model:GeoInd, 
        where:{
          Public:true
        }
      }
    ],
    where:{
      // Public:true
    }
  })
    .then(
    data =>{
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