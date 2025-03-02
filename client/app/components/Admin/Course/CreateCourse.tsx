"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import { useRouter } from "next/navigation";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import Header from '../Header'


type Props = {};
const CreateCourse = (props: Props) => {
  const [createCourse , {isLoading , isSuccess ,error }]=useCreateCourseMutation()
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
      setTimeout(() => {
        router.push("/admin/live-courses");
   }, 0);
}
  
    if (error) {
      // console.log("Error Object:", error); 
      if ("data" in error) {
        const errorMessage = typeof error.data === "string" ? error.data : JSON.stringify(error.data);
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, error]);
  
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    //formate benefits  array
    const formattedBenifits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    //formate prereq. array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    //formare course contetn array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        videoLength:'0',
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
      })
    );
    console.log('formatted',formattedCourseContentData)

    //prepate our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenifits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
   
  return data
  };
  const handleCourseCreate = async(e:any) => {
    const data = courseData
    console.log("📤 Sending Data to Backend:", data); 
    if(!isLoading){
      await createCourse(data)
    }
  }
  
  return (
    <div className="w-full flex min-h-screen dark:bg-[#151632]">
  
      {/* Main Content */}
      <div className="w-[80%]">
      <Header title="Create Course" subtitle="Welcome to dashboard"/>
        <CourseOption active={active} setActive={setActive} />
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {
          active === 3 && (
            <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={false}
            />
          )
        }
      </div>
   
    </div>
  );
};

export default CreateCourse;
