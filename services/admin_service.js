import bcrypt from "bcrypt";
import connection from "../connectDB/connectDB.js";
const saltRounds = 10;
const register_user = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.username ||
        !data.password ||
        !data.id_major ||
        !data.address ||
        !data.phone ||
        !data.name
      ) {
        resolve({
          status_http:400,
          status: false,
          message: "data is required",
        });
      }
      if(data.password.length < 6){
        resolve({
            status_http:400,
            status:false,
            massage:"password quá ngắn",
        })
    }
    else{
      let check_data = await connection.query(
        `SELECT * From users where username = '${data.username}'`
      );
      if (!check_data.rows || check_data.rows.length === 0) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordhash = bcrypt.hashSync(data.password, salt);
        await connection.query(
          `insert into users (username, password,name,id_major,address,phone,role) values ('${data.username}','${passwordhash}','${data.name}','${data.id_major}','${data.address}','${data.phone}','student')`
        );
        resolve({
          status_http:200,
          status: true,
          message: "User registered successfully",
        });
      } else {
        resolve({
          status_http:400,
          status: false,
          message: "Username already exists",
        });
      }
    }
      
    } catch (error) {
      reject(error);
    }
  });
};
const create_subject = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.name || !data.id_major) {
          resolve({
            status_http:400,
            status: false,
            message: "data is required",
          });
        }
        let check_data = await connection.query(
          `SELECT * From subjects where name = '${data.name}'`
        );
        if (!check_data.rows || check_data.rows.length === 0) {
            let check_major = await connection.query(
                `SELECT * From major where id_major = '${data.id_major}'`
              );
            if(check_major.rows.length !== 0 )
              {     
                await connection.query(
                    `insert into subjects (name,id_major) values ('${data.name}','${data.id_major}')`
                  );
                  resolve({
                    status_http:200,
                    status: true,
                    message: "Create subject successfully",
                  });
              }else{
                resolve({
                    status_http:400,
                    status: false,
                    message: "Major not found",
                  });
              }
          
        } else {
          resolve({
            status_http:400,
            status: false,
            message: "subject already exists",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
const create_major = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          status_http:400,
          status: false,
          message: "data is required",
        });
      }
      let check_data = await connection.query(
        `SELECT * From major where name = '${data.name}'`
      );
      if (!check_data.rows || check_data.rows.length === 0) {
        await connection.query(
          `insert into major (name) values ('${data.name}')`
        );
        resolve({
          status_http:200,
          status: true,
          message: "Create major successfully",
        });
      } else {
        resolve({
          status_http:400,
          status: false,
          message: "Major already exists",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const update_diem_user = (data) =>{
  return new Promise(async (resolve, reject)=>{
    try {   
   if (!data.id_dkihoc || !data.diem_qt || !data.diem_thi || !data.diem_quy_doi)
      {
        resolve({
          status_http:400,
          status: false,
          message: "data is required",
        });
     }
      let check_user = await connection.query(
        `SELECT * From dki_hoc where id = '${data.id_dkihoc}'`
     
      );
      if (!check_user.rows || check_user.rows.length === 0){
        resolve({
          status_http:400,
          status: false,
          message: "không tìm thấy môn học",  
        });
      }else{
        await connection.query(
          `UPDATE dki_hoc set diem_qt = '${data.diem_qt}',diem_thi= '${data.diem_thi}',
           diem_quy_doi= '${data.diem_quy_doi}' where id = '${data.id_dkihoc}' `
        );
        resolve({
          status_http:200,
          status: true,
          message: "successfully updated",
        });
      }

    } catch (error) {
      reject(error)
    }
      
  })
}
const delete_subject_user = (id) =>{
  return new Promise(async (resolve, reject)=>{
    try {
      if (!id.id_dkihoc || !id.id )
      {
        resolve({
          status_http:400,
          status: false,
          message: "data is required",
        });
     }
     let check_user = await connection.query(`SELECT * From dki_hoc where id_user = '${id.id}' and id = '${id.id_dkihoc}'`);
     if (!check_user.rows || check_user.rows.length === 0){
      resolve({
        status_http:400,
        status: false,
        message: "không tìm thấy môn học",
      })}
      else{
        await connection.query(
          `DELETE from dki_hoc where id = '${id.id_dkihoc}' `
        );
        resolve({
          status_http:400,
          status: true,
          message: "successfully updated",
        });
      }
    } catch (error) {
      reject(error)
    }
  })
}
export { register_user, create_subject, create_major,update_diem_user,delete_subject_user };
