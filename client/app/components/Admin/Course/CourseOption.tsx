import React, { FC } from "react";

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

  // Calculate progress percentage
  const progress = ((active) / options.length) * 100;

  return (
    <div className=" top-0 z-50 p-4">
      {/* Progress Bar */}
      <div className="mt-4 flex justify-between">
        {options.map((option, index) => (
          <p
            key={index}
            className={`text-sm font-semibold ${
              active-1 >= index ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {option}
          </p>
        ))}
      </div>
      <div className=" w-full bg-gray-300 h-3 rounded-lg overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress Percentage */}
      <p className="text-right text-sm font-medium text-[#70d8bd]">
        {progress}% Complete
      </p>

      {/* Steps (Without Circles) */}

    </div>
  );
};

export default CourseOption;

