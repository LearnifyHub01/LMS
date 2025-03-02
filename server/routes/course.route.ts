import express from 'express'
import { editCourse, uploadCourse,getSingleCourse, getAllCourses, getCourseByUser, addQuestion, addAnswer, addReview, addReplyToReview, getAllCoursesForAdmin, deleteCourse, generateVideoUrl } from '../controllers/course.controller'
import { authorizeRoles, isAuthenticated } from '../middleware/auth'
const courseRouter = express.Router()


courseRouter.post('/create-course',uploadCourse)
courseRouter.put('/edit-course/:id',isAuthenticated,authorizeRoles("admin"),editCourse)
courseRouter.get('/get-course/:id',getSingleCourse)
courseRouter.get('/get-courses',getAllCourses)
courseRouter.get('/get-courses-content/:id',isAuthenticated,getCourseByUser)
courseRouter.put('/add-question',isAuthenticated,addQuestion)
courseRouter.put('/add-answer',isAuthenticated,addAnswer)
courseRouter.put('/add-review/:id',isAuthenticated,addReview)
courseRouter.put('/add-reply/:id',isAuthenticated,authorizeRoles("admin"),addReplyToReview)
courseRouter.get('/get-all-courses',isAuthenticated,authorizeRoles("admin"),getAllCoursesForAdmin)
courseRouter.post('/getVdoCipherOTP',generateVideoUrl)
courseRouter.delete('/delete-course/:id',isAuthenticated,authorizeRoles("admin"),deleteCourse)

export default courseRouter
