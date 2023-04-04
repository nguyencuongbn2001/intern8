import pkg from 'pg';
const {Client} = pkg;
import * as dotenv from 'dotenv';
dotenv.config()
const connection = new Client({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    port: process.env.PORT_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB
})
connection.connect(function(err) {
    if (err) throw err;
    console.log("Kết nối thành công đến database");
  });

export default connection