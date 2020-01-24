const User = require('../models/ng_user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.signup = (req, res , next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    const error = new Error('validation failed')
    error.statusCode = 422 
    error.data = errors.array()
    throw error
  }
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password
  bcrypt.hash(password, 12)
    .then(hashedPw =>{
      const user = new User({
        email: email, 
        password: hashedPw,
        name:name,
        status:1
      })
      return user.save()
    })
    .then(result=>{
      res.status(201).json({message:'usercreated', userId: result.id})
    })
    .catch(err => {
      if(!err.statusCode){
        err.statusCode = 500
      }
      next(err)
    })
}

exports.login = (req, res, next) => {
  User.findOne({
    where:{
      email:req.body.email
    }
  }).then(user =>{
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      })
    }
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: "Auth failed"
      }) 
    } 
    const token = jwt.sign({
      email: user.email, 
      userId:user.id}, 
      'short_secretX2020', 
      {expiresIn:"1h"}
      )
      res.status(200).json({
        token: token
      })
  }).catch(
    err => {
      return res.status(401).json({
        message: "Auth failed"
      }
      )
    }
  )
}