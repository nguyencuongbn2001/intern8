import * as dotenv from 'dotenv';
import connection from '../connectDB/connectDB.js';
dotenv.config()
const register_class_service  = (data,user) =>{
    return new Promise( async(resolve, reject) =>{
        try {
                if(!data.id_subject ){
                    resolve({
                        status_http:400,
                        status:false,
                        massage:"data is required"
                    })
                }
                let  reponse =  await connection.query(`select subjects.name from subjects where id  = '${data.id_subject}'`);
                if(!reponse.rows || reponse.rows.length === 0)
                {
                    resolve({
                        status_http:400,
                        status:false,
                        massage:"subject is not found"
                    })
                }
                else{
                    await connection.query(`insert into dki_hoc (name,id_major,id_user,id_subject) values('${reponse.rows[0].name}', '${user.id_major}','${user.id_user}','${data.id_subject}')`)
                    resolve({
                        status_http:200,
                        status:true,
                        massage:"register class is successfully"
                    })
                }
           
        } catch (error) {
            reject(error)
        }
    })
}
const get_subject_service  = (data) =>{
    return new Promise( async(resolve, reject) =>{
        try {
            let check =  await connection.query(`select * from subjects where id   = '${data}'`)
            if(!check.rows || check.rows.length === 0)
            {
                resolve({
                    status_http:400,
                    status:false,
                    subject:"subject is not found"
                })
            }else{
                let  reponse = await connection.query(`select subjects.id   ,subjects.name from subjects inner join major on subjects.id_major = major.id_major where major.id_major='${data}'`)
                resolve({
                    status_http:200,
                    status:true,
                    subject:reponse.rows
                })
            }
            
        } catch (error) {
            reject(error)
        }
    })
}
export {register_class_service,get_subject_service}