const Header = require('../models/dataHeader')

exports.getPlots = (req, res, next) =>{
Header.findAll({
  where:{ 
    PlotID: "Mal-389"}
})
  .then(item =>{
    res.status(200).json(item)
  })
  .catch(err =>{
    console.log(err)
  })
}