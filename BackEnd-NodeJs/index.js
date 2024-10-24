import express from 'express';
import mongoose from 'mongoose';
import dbConnection from './database/dbConnection.js';
import multer from 'multer';
import newRouter from './src/modules/New/new.router.js';
import cors from 'cors'
const app =express();
const port=3000;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/news',newRouter)

const upload = multer({ dest: 'uploads/' })

app.get('/',(req,res)=>res.send('Hello World!'))
app.listen(port,()=>console.log(`Example app listening on port ${port}`))