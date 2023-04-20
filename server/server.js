'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


import userRouter from './routes/user-routes.js'



dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.use('/api', userRouter);






const port = process.env.PORT;

app.listen(port, () => console.log('App is listening on url http://localhost:' + port));













