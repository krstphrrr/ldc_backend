let io;

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer, {path:'/ws2'})
    // console.log(io) DEV
    return io;
  },
  getIO:()=>{
    if(!io){
      throw new Error('no io')
    }
    return io;
  }
}