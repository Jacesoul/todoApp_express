import {createConnection} from "typeorm";
import express from 'express'

const app = express()
const routes = require('./routes')
app.use(routes)

createConnection().then(async connection => {
    app.listen(5000,()=> console.log('Server up at http://localhost:5000'))
}).catch(error => console.log(error))

module.exports = app
