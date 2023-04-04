import express from 'express';
import * as dotenv from 'dotenv';
import connection from './connectDB/connectDB.js';
import bodyParser from 'body-parser';
import init_router from './route/init_router.js';
const app = express()
dotenv.config()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
connection
const port = process.env.PORT;
init_router(app)
app.listen(port, () => {
  console.log(`Server đang chạy trên port:${port}`)
})