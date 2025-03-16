import React from "react";
import FitbitIcon from '@mui/icons-material/Fitbit';

type Props = {};

const Comparison: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#DDE6ED] dark:bg-[#27374D] py-12">
      <div className="max-w-4xl w-full px-6">
        {/* Comparison Table */}
        <div className="grid grid-cols-3 gap-0 text-lg">
          {/* First Column: Labels */}
          <div className="flex flex-col">
            <div className="py-6 px-6 text-xl font-bold text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              <br />
            </div>
            <div className="py-4 px-6 text-base font- dark:text-white text-gray-600 border-b border-dashed border-gray-300">
              Content
            </div>
            <div className="py-4 px-6 text-base font- dark:text-white text-gray-600 border-b border-dashed border-gray-300">
              Learning Style
            </div>
            <div className="py-4 px-6 text-base font- dark:text-white text-gray-600 border-b border-dashed border-gray-300">
              Engagement
            </div>
            <div className="py-4 px-6 text-base font- dark:text-white text-gray-600 border-b border-dashed border-gray-300">
              Accessibility
            </div>
            <div className="py-4 px-6 text-base font- dark:text-white text-gray-600 border-b border-dashed border-gray-300">
              Speed
            </div>
            <div className="py-4 px-6 text-base font- dark:text-white text-gray-600 border-b border-dashed border-gray-300">
              Effectiveness
            </div>
            <div className="py-4 px-6 text-base font- dark:text-white text-gray-600 border-b border-dashed border-gray-300">
              Tracking
            </div>
            <div className="py-4 px-6 text-base font- dark:text-white text-gray-600  border-gray-300">
              Adaptability
            </div>
          </div>

          {/* Second Column: LearnifyHub (White Card Background) */}
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="py-6 px-6 text-xl font-bold text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
            <span className="w-6 h-6 mr-2 mt-1 bg-indigo-500 dark:bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  <FitbitIcon/>
                </span>
              LearnifyHub
            </div>
            <div className="py-4 px-6 text-base font-medium text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              <span>Creator-driven, dynamic</span>
            </div>
            <div className="py-4 px-6 text-base font-medium text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              <span>Interactive, peer-driven</span>
            </div>
            <div className="py-4 px-6 text-base font-medium text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              <span>95% completion rate</span>
            </div>
            <div className="py-4 px-6 text-base font-medium text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              <span>Open to all, expert-led</span>
            </div>
            <div className="py-4 px-6 text-base font-medium text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              <span>Learn in minutes</span>
            </div>
            <div className="py-4 px-6 text-base font-medium text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              <span>91% skill improvement</span>
            </div>
            <div className="py-4 px-6 text-base font-medium text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              <span>Real-time insights</span>
            </div>
            <div className="py-4 px-6 text-base font-medium text-gray-800  border-gray-300 flex justify-center">
              <span>Continuously updated</span>
            </div>
          </div>

          {/* Third Column: Traditional LMS */}
          <div className="flex flex-col">
            <div className="py-6 px-6 text-xl font-bold dark:text-white text-gray-800 border-b border-dashed border-gray-300 flex justify-center">
              Traditional LMS
            </div>
            <div className="py-4 px-6 text-base font-medium dark:text-white text-gray-600 border-b border-dashed border-gray-300 flex justify-center">
              <span>Predefined, static</span>
            </div>
            <div className="py-4 px-6 text-base font-medium dark:text-white text-gray-600 border-b border-dashed border-gray-300 flex justify-center">
              <span>Passive, top-down</span>
            </div>
            <div className="py-4 px-6 text-base font-medium dark:text-white text-gray-600 border-b border-dashed border-gray-300 flex justify-center">
              <span>20% completion rate</span>
            </div>
            <div className="py-4 px-6 text-base font-medium dark:text-white text-gray-600 border-b border-dashed border-gray-300 flex justify-center">
              <span>Limited to L&D teams</span>
            </div>
            <div className="py-4 px-6 text-base font-medium dark:text-white text-gray-600 border-b border-dashed border-gray-300 flex justify-center">
              <span>Takes weeks</span>
            </div>
            <div className="py-4 px-6 text-base font-medium dark:text-white text-gray-600 border-b border-dashed border-gray-300 flex justify-center">
              <span>Hard to measure impact</span>
            </div>
            <div className="py-4 px-6 text-base font-medium dark:text-white text-gray-600 border-b border-dashed border-gray-300 flex justify-center">
              <span>Limited analytics</span>
            </div>
            <div className="py-4 px-6 text-base font-medium dark:text-white text-gray-600  border-gray-300 flex justify-center">
              <span>Fixed, outdated content</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;