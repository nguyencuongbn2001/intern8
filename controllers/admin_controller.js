import * as admin_service from '../services/admin_service.js';
const admin_register_user_controller = async (req,res) => {
    const reponse  = await admin_service.register_user(req.body);
    return res.status(reponse.status_http).json(reponse);
}
const admin_create_subject_controller = async (req, res) =>{
   const reponse  = await admin_service.create_subject(req.body);
   return res.status(reponse.status_http).json(reponse);
}
const admin_create_major_controller = async (req, res) =>{
   const reponse  = await admin_service.create_major(req.body);
   return res.status(reponse.status_http).json(reponse);
}
const update_diem_user_controller = async (req, res) => {
   const reponse  = await admin_service.update_diem_user(req.body);
   return res.status(reponse.status_http).json(reponse);
}
const delete_subject_user_controller = async (req, res) =>{
   const reponse  = await admin_service.delete_subject_user(req.params);
   return res.status(reponse.status_http).json(reponse);
}
export {admin_register_user_controller,admin_create_subject_controller,admin_create_major_controller,update_diem_user_controller,delete_subject_user_controller}