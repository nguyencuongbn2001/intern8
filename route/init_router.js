import express from 'express';
import auth_login_controller from'../controllers/auth_login_controller.js';
import * as admin_controller from '../controllers/admin_controller.js';
import * as user_controller from '../controllers/user_controller.js';
import {Auth_admin,Auth_user} from '../authentication/middleware_verify_api.js';
let router = express.Router();
let init_router =(app) =>{
    // đăng nhập
    router.post('/api/login_user',auth_login_controller);                                          
   
    // admin tạo tài khoản cho sinh viên
    router.post('/api/register_user',Auth_admin,admin_controller.admin_register_user_controller);  
    // admin tạo môn học
    router.post('/api/create_subject',Auth_admin,admin_controller.admin_create_subject_controller);
   
    // admin tạo chuyên ngành học
    router.post('/api/create_major',Auth_admin,admin_controller.admin_create_major_controller);    
    
    // sinh viên đăng kí học
    router.post('/api/user_register_class',Auth_user,user_controller.register_class_controller);  
   
    // sinh viên xem môn học thuộc chuyên ngành
    router.get('/api/user_get_subject/major/:id',Auth_user,user_controller.get_subject_controller);         

    // admin cập nhật điểm cho sinh viên
    router.put('/api/update_diem_user',Auth_admin,admin_controller.update_diem_user_controller);   
    
    // admin hủy đăng kí học cho sinh viên 
    router.delete('/api/delete_subject_user/user/:id/dki_hoc/:id_dkihoc',Auth_admin,admin_controller.delete_subject_user_controller);
        
    
    return app.use('/',router)
}
export default init_router;
