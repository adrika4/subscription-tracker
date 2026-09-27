import {Router} from 'express';
const authRouter = Router();
authRouter.post('/sign-up',(req,res)=> res.send({title:'Sign Up route'}));
authRouter.post('/sign-in',(req,res)=> res.send({title:'Sign in route'}));
authRouter.post('/sign-out',(req,res)=> res.send({title:'Sign Out route'}));

export default authRouter;