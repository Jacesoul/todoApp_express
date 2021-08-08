import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express'
import { nextTick } from "process";

const dotenv = require('dotenv');
dotenv.config();

const app = express()
const routes = require('./routes')
const cors = require('cors')

const port = process.env.MAINPORT;

app.use(routes)
app.use(cors())
app.use((err, req, res, next) =>{
    res.status(400).send(err.message)
})


createConnection().then(async connection => {
    app.listen(port,()=> console.log(`Server up at http://localhost:${port}`))
}).catch(error => console.log(error))

module.exports = app;