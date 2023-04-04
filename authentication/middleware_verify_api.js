import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()
const verifyToken =  (token) =>{
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET
		);
      } catch(error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
      }
}
const Auth_admin =  async(req, res, next) => {
	try {
		const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).json({
			error  : 1,
			message: 'không tìm thấy access token!'
		});
	}
	const verified = verifyToken(accessTokenFromHeader);
	req.user = verified
	if(verified) {
		if(verified.role !=='admin')	
	{
		return res.status(401).json({
			error  : 1,
			message: 'Bạn không có quyền truy cập tính năng này!'
		})
	}
	}else{
		return res.status(401).json({
			error  : 1,
			message: 'Có lỗi xảy ra trong xác thực token!'
		})
	}
	} catch (error) {
		console.log(error)
	}
	return next();
};
const Auth_user =  async(req, res, next) => {
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).json({
			error  : 1,
			message: 'Không tìm thấy access token!'
		});
	}
	const verified = verifyToken(accessTokenFromHeader);
	
	if(!verified){
		return res.status(401).json({
			error  : 1,
			message: 'Bạn không có quyền truy cập tính năng này!'
		});
	}
	req.user = verified
	return next();
};
export {Auth_admin,Auth_user}


