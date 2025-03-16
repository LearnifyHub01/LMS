import React, { useState, useEffect } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetUsersCoursesQuery } from "@/redux/features/courses/coursesApi";
import Link from "next/link";

const Courses = () => {
  const { data, isLoading } = useGetUsersCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <div className="bg-[#DDE6ED] dark:bg-[#27374D] min-h-screen py-1">
      <div className="w-[90%] 800px:w-[80%] mx-auto">
        {/* Header */}
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black 800px:!leading-[60px] font-[700] tracking-tight">
          Expand Your Career{" "}
          <span className="text-gradient">
            Opportunity <br />
          </span>
          with our courses
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#526D82]"></div>
          </div>
        ) : (
          <>
            <div className="h-[40px]" />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12">
              {courses.length > 0 ? (
                courses.slice(0, 6).map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-600 dark:text-gray-300">
                  No courses available at the moment.
                </p>
              )}
            </div>
          </>
        )}

        {courses.length > 6 && (
          <div className="flex justify-center mt-6">
            <Link
              href="/courses"
              className="text-[clamp(1rem,1.5vw,2rem)] px-[clamp(1rem,2vw,3rem)] py-[clamp(0.5rem,1vw,2rem)] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              Explore More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

