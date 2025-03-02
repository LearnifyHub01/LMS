import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { FC } from "react";
import Ratings from "@/app/utils/Ratings";
import {
  IoCheckboxOutline,
  IoCheckmark,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";
import CreateCourse from "./CreateCourse";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[100%] ml-2 p-2">
      {/* Video Player Section (Full Width) */}
      <div className="w-full">
        <CoursePlayer
          videoUrl={courseData?.demoUrl}
          title={courseData?.title}
          thumnail={courseData?.thumbnail}
        />
      </div>

      {/* Price Section (Below Video) */}
      <div className="w-full mt-4 ml-3 text:black dark:text-white flex items-center gap-6">
        {/* Price */}
        <h1 className="text-2xl font-semibold">
          {courseData?.price === 0 ? "Free" : `₹ ${courseData.price}`}
        </h1>

        {/* Estimated Price (Strikethrough) */}
        <h5 className="text-xl text-gray-500 line-through opacity-80">
          ₹ {courseData?.estimatedPrice}
        </h5>

        {/* Discount Percentage */}
        <h4 className="text-xl text-green-600 font-semibold">
          {discountPercentagePrice}% off
        </h4>
      </div>

      {/* Buy Now Button (Below Price Section) */}
      {/* <div className="w-[180px] mt-3  ml-3 font-Poppins text-white px-4 py-2 rounded-md shadow-md cursor-not-allowed bg-red-700">
        Buy Now {courseData.price} ₹
      </div> */}
      <div className="w-[140px] mt-3 ml-3 font-Poppins text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all duration-200 cursor-not-allowed">
        Buy Now {courseData.price} ₹
      </div>

      <div className="flex items-center">
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Discount Code"
          className={`${styles.input} !1500px:!w-[50%] 1100px:w-[60%] !mt-0 ml-3`}
        />
        <div className="!w-[120px] h-10 justify-items-center text-center pt-2 my-3 ml-4 font-Poppinsr rounded-xl cursor-pointer bg-blue-500">
          Apply
        </div>
      </div>
      <p className="pb-1 ml-3  text:black dark:text-white">
        -Source code included
      </p>
      <p className="pb-1 ml-3  text:black dark:text-white">
        -Full lifetime access
      </p>
      <p className="pb-1 ml-3  text:black dark:text-white">
        -Certificate of Completion
      </p>
      <p className="pb-3 ml-3 800px:pb-1  text:black dark:text-white">
        -Premium Support
      </p>
      <div className="w-full ml-3">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]  text:black dark:text-white">
            {courseData.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5 className="text:black dark:text-white">0 Reviews</h5>
            </div>
            <h5 className="text:black dark:text-white">0 Students</h5>
          </div>
          <br />
          <h1 className="text:[25px] font-Poppins font-[600] text:black dark:text-white">
            What you will learn from this course
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: any) => (
          <div
            className="w-full flex 800px:items-center text:black dark:text-white py-2 "
            key={index}
          >
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2  text:black dark:text-white">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full  text:black dark:text-white">
          <h1 className="text-[25px] font-Poppins font-[600]  text:black dark:text-white">
            Course Details
          </h1>
          {courseData?.description}
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between ml-3">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#27a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#27a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
          {isEdit ? "Update" : "Create"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
