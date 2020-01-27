exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts:[
      {
        _id:"1",
        title:'test title', 
        content:"plot content",
        imageUrl:'images',
        creator:{
          name:"test@test.com"
        },
        createdAt: new Date()
      }
    ]
  })
}

exports.createPost = (req, res, next) => {
  const title = req.body.title
  const content = req.body.content
  // create plot in db
  res.status(201).json({
    message:'post created',
    post: {
      _id: new Date().toISOString(), 
      title: title, 
      content: content,
    creator:{
      name:"creatorname"
    },
  createdAt:new Date()}
  })
}

exports.socketTest = (req, res, next) => {
  console.log('llego alguien')
  let io = req.app.get('socketio')

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


}