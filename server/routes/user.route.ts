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
    updateProfilePicture,
    getSessionInfo,
    getCurrentCookie,
    getAllUsers,
    updateUserRole,
    deleteUser,
    forgotPassword,
    resetPassword
} from '../controllers/user.controllers'
import {authorizeRoles, isAuthenticated} from '../middleware/auth'
const userRouter = express.Router()

userRouter.post('/registration',registrationUser)
userRouter.post('/activate-user',activateUser)
userRouter.post('/login',loginUser)
userRouter.post('/forgot-password',forgotPassword)
userRouter.post('/reset-password/:id/:token',resetPassword)
userRouter.get('/logout',isAuthenticated,logoutUser)
userRouter.get('/logout-from-all',isAuthenticated,logoutFromAllDevice)
userRouter.get('/user-sessions',isAuthenticated,getSessionInfo)
userRouter.get('/get-current-cookie',isAuthenticated,getCurrentCookie)
userRouter.get('/refresh',updateAccessToken)
userRouter.get('/me',isAuthenticated,getUserInfo)
userRouter.post('/social-auth',socialAuth)
userRouter.put('/update-user-info',isAuthenticated,UpdateUserInfo)
userRouter.put('/update-user-password',isAuthenticated,updatePassword)
userRouter.put('/update-user-avatar',isAuthenticated,updateProfilePicture)
userRouter.get('/get-users',isAuthenticated,authorizeRoles('admin'),getAllUsers)
userRouter.put('/update-user-role', isAuthenticated, updateUserRole);
userRouter.delete('/delete-user/:id',isAuthenticated,deleteUser)

export default userRouter

// import express from 'express';
// import { 
//   registrationUser, activateUser, loginUser, logoutUser,
//   logoutFromAllDevice, updateAccessToken, getUserInfo,
//   socialAuth, UpdateUserInfo, updatePassword,
//   updateProfilePicture, getSessionInfo, getCurrentCookie,
//   getAllUsers, updateUserRole, deleteUser
// } from '../controllers/user.controllers';
// import { authorizeRoles, isAuthenticated } from '../middleware/auth';

// const userRouter = express.Router();

// userRouter.post('/registration', registrationUser);
// userRouter.post('/activate-user', activateUser);
// userRouter.post('/login', loginUser);
// userRouter.get('/logout', isAuthenticated, logoutUser);
// userRouter.get('/logout-from-all', isAuthenticated, logoutFromAllDevice);
// userRouter.get('/user-sessions', isAuthenticated, getSessionInfo);
// userRouter.get('/get-current-cookie', isAuthenticated, getCurrentCookie);
// userRouter.get('/refresh', updateAccessToken);
// userRouter.get('/me', updateAccessToken, isAuthenticated, getUserInfo);
// userRouter.post('/social-auth', socialAuth);
// userRouter.put('/update-user-info', updateAccessToken, isAuthenticated, UpdateUserInfo);
// userRouter.put('/update-user-password', updateAccessToken, isAuthenticated, updatePassword);
// userRouter.put('/update-user-avatar', updateAccessToken, isAuthenticated, updateProfilePicture);
// userRouter.get('/get-users', updateAccessToken, isAuthenticated, authorizeRoles('admin'), getAllUsers);
// userRouter.delete('/delete-user/:userId', updateAccessToken, isAuthenticated, deleteUser);
// userRouter.put('/update-user-role', updateAccessToken, isAuthenticated, updateUserRole);

// export default userRouter;