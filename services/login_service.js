import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import bcrypt from "bcrypt";
import connection from '../connectDB/connectDB.js';
dotenv.config()
const auth_login_controller = (data) =>{
    return new Promise(async (resolve, reject) =>{
       try {
        if(!data.username){
            resolve({
                status_http:400,
                status:false,
                massage:"username is required",
            })
        }
        if(!data.password){
            resolve({
                status_http:400,
                status:false,
                massage:"password is required",
            })
        }
        let check_data = await connection.query(`SELECT * From users where username = '${data.username}'`);
        if(check_data.rows.length === 0 || !check_data.rows ){
            resolve({
                status_http:400,
                massage:"username is not exist",
            })
         }else{         
            let check_password = await bcrypt.compare(data.password,check_data.rows[0].password);
            if(check_password === true){
                let token = generateAccessToken(check_data.rows[0].id_user,check_data.rows[0].username,check_data.rows[0].id_major,check_data.rows[0].role);
                 resolve({
                    status_http:200,
                    massage:"Login Success",
                    token:token,
                })
            }else{
                resolve({
                    status_http:400,
                    massage:"Password is not matching",
                })
            }
         }
       } catch (error) {
        reject(error)
       }
    })
  
}

let  generateAccessToken = (id,username,id_major,role) =>{
    return jwt.sign({id_user:id,username:username,id_major:id_major,role:role}, process.env.ACCESS_TOKEN_SECRET,{
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
  }
export default auth_login_controller