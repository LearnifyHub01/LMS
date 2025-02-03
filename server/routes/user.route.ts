import express from 'express'
import { registrationUser,
    activateUser, 
    loginUser,  
    logoutUser,
    logoutFromAllDevice,
    updateAccessToken, 
    getUserInfo,socialAuth, 
    UpdateUserInfo, 
    updatePassword, 
    updateProfilePicture
} from '../controllers/usercontrollers'
import {isAuthenticated} from '../middleware/auth'
const userRouter = express.Router()

userRouter.post('/registration',registrationUser)
userRouter.post('/activate-user',activateUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',isAuthenticated,logoutUser)
userRouter.get('/logout-from-all',isAuthenticated,logoutFromAllDevice)
userRouter.get('/refresh',updateAccessToken)
userRouter.get('/me',isAuthenticated,getUserInfo)
userRouter.post('/social-auth',socialAuth)
userRouter.put('/update-user-info',isAuthenticated,UpdateUserInfo)
userRouter.put('/update-user-password',isAuthenticated,updatePassword)
userRouter.put('/update-user-avatar',isAuthenticated,updateProfilePicture)

export default userRouter