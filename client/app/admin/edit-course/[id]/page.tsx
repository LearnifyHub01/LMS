'use client'
import React, { use } from 'react' // Import use from React
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import EditCourse from '../../../components/Admin/Course/EditCourse'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'

// Define the props type correctly
type Props = {
  params: Promise<{ id: string }> // params is a Promise in client components
}

const Page = ({ params }: Props) => {
  const resolvedParams = use(params); // Unwrap the params Promise
  const id = resolvedParams.id;      // Safely access id

  return (
    <div className='dark:bg-[#151632]'>
      <Heading
        title='LearnifyHub-Admin'
        description='LearnifyHub is a platform for students to learn and get help from teachers'
        keywords='Programming,MERN,Redux,MachineLearning'
      />
      <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  )
}

export default Page
