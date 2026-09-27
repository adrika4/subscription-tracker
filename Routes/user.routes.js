import {Router} from 'express';
const userRouter = Router();

//get /users -> get all users
//get /users/:id-> get user by id
userRouter.get('/',(req,res)=> res.send({title:'GET all users'}));
userRouter.get('/:id',(req,res)=> res.send({title:'GET user details'}));
userRouter.post('/',(req,res)=> res.send({title:'Create new users'}));
userRouter.put('/:id',(req,res)=> res.send({title:'update user'}));
userRouter.delete('/:id',(req,res)=> res.send({title:'delete user'}));

export default userRouter;