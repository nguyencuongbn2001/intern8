import auth_login_service from '../services/login_service.js';
const auth_login_controller = async (req,res) => {
   const reponse  = await auth_login_service(req.body);
   return res.status(reponse.status_http).json(reponse);
}
export default auth_login_controller