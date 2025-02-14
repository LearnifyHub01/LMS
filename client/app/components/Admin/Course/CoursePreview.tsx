import CoursePlayer from '@/app/utils/CoursePlayer'
import React,{FC} from 'react'

type Props={
    active:number,
    setActive:(active:number)=>void
    courseData:any
    handleCourseCreate:any
}

const CoursePreview:FC<Props> = ({active,setActive,courseData,handleCourseCreate}) => {
  return (
    <div className="w-[82%] m-auto mt-24 p-3">
        <div className='w-full relative'>
            <div className='w-full mt-10'>
                <CoursePlayer
                videoUrl={courseData?.demoUrl}
                title={courseData?.title}/>

            </div>
        </div>
    </div>
  )
}

export default CoursePreview
