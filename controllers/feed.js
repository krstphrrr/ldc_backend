exports.getPosts = (req, res, next) => {
  res.status(200).json({
    plots:[
      {
        title:1, 
        content:"plot content", 
        imageUrl:'images'
      }
    ]
  })
}

exports.createPost = (req, res, next) => {
  const title = req.body.title
  const content = req.body.content
  // create plot in db
  res.status(201).json({
    message:'plot created',
    plot: {id: new Date().toISOString(), title: title, content: content}
  })
}