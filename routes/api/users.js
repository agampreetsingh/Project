const route=require('express').Router();
const User = require('../../db/models').User;

route.get('/',(req,res)=>{

  //get all users
  User.findAll({
        attributes: ['id', 'username', 'email']
    }).then((users) => {
        res.status(200).send(users)
    })
});

route.get('/me', (req, res) => {
    User.findOne({
        where: {
            id: req.user.id
         },
    }).then((user) => {
        res.status(200).send(user)
     })
 });

route.get('/:id',(req,res)=>{
  //get user where id
  if (isNaN(parseInt(req.params.id))) {
        return res.status(404).send({
            error: 'User id should be integer'
        })
    }
    User.findOne({
        where: {
            id: req.params.id
        },
         attributes: ['id', 'username', 'email']
    }).then((user) => {
        res.status(200).send(user)
     })
 });

module.exports=route;
