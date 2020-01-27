const Header = require('../models/dataHeader')

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
        // PlotID: "Mal-389"
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