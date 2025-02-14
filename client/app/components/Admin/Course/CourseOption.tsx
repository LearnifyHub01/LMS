import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOption: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Option",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="relative flex items-start">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-[35px] h-[35px] rounded-full flex items-center justify-center text-white 
                ${active >= index ? "bg-blue-600" : "bg-gray-500"} relative`}
            >
              <IoMdCheckmark className="text-[20px]" /> 
            </div>

            {/* Progress Line (Only if not the last step) */}
            {/* {index !== options.length - 1 && (
              <div
                className="w-[3px] h-[40px]"
                style={{
                  backgroundColor: active > index ? "#2563EB" : "#384766",
                }}
              ></div>
            )} */}
            {index !== options.length - 1 && (
              <div
                className={` h-[30px] w-1 ${
                    active+1>index ? "bg-blue-600": "bg-[#384766]"
                }` }
                
              ></div>
            )}
          </div>

          {/* Step Title */}
          <h5
            className={`pl-3 text-lg font-semibold ${
              active >= index ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOption;
