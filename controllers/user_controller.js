import * as user_service from '../services/user_service.js';
const register_class_controller = async (req,res) => {
   const reponse  = await user_service.register_class_service(req.body,req.user);
   return res.status(reponse.status_http).json(reponse);
}

const get_subject_controller = async (req,res) => {
   if(!req.params.id){
      return res.status(400).json({ status:false,
         subject:"id_major is required"});
  }
   const reponse  = await user_service.get_subject_service(req.params.id);
   return res.status(reponse.status_http).json(reponse);
}
export {register_class_controller,get_subject_controller}