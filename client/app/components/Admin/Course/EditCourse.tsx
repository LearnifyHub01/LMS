"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useRouter } from "next/navigation";
import { 
  useGetAllCoursesQuery,
  useEditCourseMutation 
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import Header from '../Header';

// Define interfaces for better type safety
interface CourseContentData {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  links: { title: string; url: string }[];
  suggestion?: string;
}

interface CourseInfo {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
}

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const router = useRouter();
  // Fixed mutation hook syntax
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const editCourseData = data?.courses.find((i: any) => i._id === id);
  console.log(editCourseData)

  // State declarations
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
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
  const [courseContentData, setCourseContentData] = useState<CourseContentData[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  // Success/Error handling
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated Successfully");
      setTimeout(() => {
        router.push("/admin/live-courses");
      }, 1000); // Added delay for better UX
    }
    if (error) {
      console.log("Error Object:", error);
      let errorMessage = "An error occurred while updating the course";
      if (error && "data" in error) {
        errorMessage = typeof error.data === "string" 
          ? error.data 
          : (error.data as any)?.message || JSON.stringify(error.data);
      }
      toast.error(errorMessage);
    }
  }, [isSuccess, error, router]);

  // Populate form with existing course data
  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name || "",
        description: editCourseData.description || "",
        price: editCourseData.price || "",
        estimatedPrice: editCourseData.estimatedPrice || "",
        tags: editCourseData.tags || "",
        thumbnail: editCourseData?.thumbnail?.url || "",
        level: editCourseData.level || "",
        demoUrl: editCourseData.demoUrl || "",
      });
      setBenefits(editCourseData.benefits || [{ title: "" }]);
      setPrerequisites(editCourseData.prerequisites || [{ title: "" }]);
      setCourseContentData(editCourseData.courseData || [{
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled section",
        links: [{ title: "", url: "" }],
        suggestion: "",
      }]);
    }
  }, [editCourseData]);

  const handleSubmit = () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    // Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Format course content array
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    // Prepare data object
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
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData, // Adjusted to match typical API naming
    };
    setCourseData(data);
    return data;
  };

  const handleCourseCreate = async (e: React.FormEvent) => {
    const data = handleSubmit()
    console.log(editCourseData._id)
    if (editCourseData?._id) {
      await editCourse({ courseId: editCourseData._id, data });
    }
  };

  return (
    <div className="w-full flex min-h-screen dark:bg-[#151632]">
      {/* Main Content */}
      <div className="w-[80%]">
        <Header title="Edit Course" subtitle="Update your course details" />
        {/* <CourseOption active={active} setActive={setActive} /> */}
        
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

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
    </div>
  );
};

export default EditCourse;