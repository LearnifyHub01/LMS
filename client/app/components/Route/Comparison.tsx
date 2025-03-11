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

// import React from "react";
// import FitbitIcon from '@mui/icons-material/Fitbit';
// import StarIcon from '@mui/icons-material/Star';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// type Props = {};

// const Comparison: React.FC<Props> = (props) => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-16 px-4">
//       <div className="max-w-6xl w-full">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-700 dark:text-indigo-300 font-semibold text-sm mb-4">PLATFORM COMPARISON</div>
//           <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             Experience the Difference
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             See why leading organizations are switching to LearnifyHub for their learning needs
//           </p>
//         </div>
        
//         {/* Comparison Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           {/* Feature Column */}
//           <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-300">
//             <div className="bg-gray-100 dark:bg-gray-700 py-8 px-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-600">
//               <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Features</h3>
//             </div>
            
//             <div className="p-6 space-y-8">
//               {["Content", "Learning Style", "Engagement", "Accessibility", "Speed", "Effectiveness", "Tracking", "Adaptability"].map((feature, index) => (
//                 <div key={index} className="flex items-center">
//                   <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4">
//                     <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{index + 1}</span>
//                   </div>
//                   <span className="text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* LearnifyHub Column */}
//           <div className="rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 border-2 border-indigo-500 relative z-10">
//             <div className="absolute -top-5 inset-x-0 flex justify-center">
//               <div className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
//                 <StarIcon className="mr-1 text-yellow-300" fontSize="small" />
//                 RECOMMENDED
//               </div>
//             </div>
            
//             <div className="bg-indigo-600 py-8 px-6 flex flex-col items-center justify-center border-b border-indigo-500">
//               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3">
//                 <FitbitIcon className="text-indigo-600" fontSize="medium" />
//               </div>
//               <h3 className="text-2xl font-bold text-white">LearnifyHub</h3>
//               <div className="mt-2 bg-indigo-800 px-3 py-1 rounded-full text-white text-xs">Premium Solution</div>
//             </div>
            
//             <div className="p-6 space-y-8">
//               {[
//                 "Creator-driven, dynamic",
//                 "Interactive, peer-driven",
//                 "95% completion rate",
//                 "Open to all, expert-led",
//                 "Learn in minutes",
//                 "91% skill improvement",
//                 "Real-time insights",
//                 "Continuously updated"
//               ].map((feature, index) => (
//                 <div key={index} className="flex items-center">
//                   <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
//                     <CheckCircleIcon className="text-green-600 dark:text-green-400" />
//                   </div>
//                   <span className="text-gray-800 dark:text-white font-medium">{feature}</span>
//                 </div>
//               ))}
//             </div>
            
//             <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 flex flex-col items-center">
//               <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
//                 Get Started Now
//                 <ArrowForwardIcon className="ml-2" fontSize="small" />
//               </button>
//               <p className="mt-4 text-indigo-700 dark:text-indigo-300 text-sm">30-day free trial, no credit card required</p>
//             </div>
//           </div>
          
//           {/* Traditional LMS Column */}
//           <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-300">
//             <div className="bg-gray-100 dark:bg-gray-700 py-8 px-6 flex flex-col items-center justify-center border-b border-gray-200 dark:border-gray-600">
//               <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Traditional LMS</h3>
//               <div className="mt-2 bg-gray-300 dark:bg-gray-600 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 text-xs">Legacy Solution</div>
//             </div>
            
//             <div className="p-6 space-y-8">
//               {[
//                 "Predefined, static",
//                 "Passive, top-down",
//                 "20% completion rate",
//                 "Limited to L&D teams",
//                 "Takes weeks",
//                 "Hard to measure impact",
//                 "Limited analytics",
//                 "Fixed, outdated content"
//               ].map((feature, index) => (
//                 <div key={index} className="flex items-center">
//                   <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mr-4">
//                     <RemoveCircleIcon className="text-red-500 dark:text-red-400" />
//                   </div>
//                   <span className="text-gray-600 dark:text-gray-400 font-medium">{feature}</span>
//                 </div>
//               ))}
//             </div>
            
//             <div className="p-6 bg-gray-50 dark:bg-gray-700 flex flex-col items-center">
//               <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300">
//                 Learn More
//               </button>
//               <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">Traditional approach, limited results</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Testimonial */}
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-16">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-2xl font-bold mb-4 md:mb-0 md:mr-6">
//               "
//             </div>
//             <div>
//               <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-4">
//                 After switching to LearnifyHub, our team's skill acquisition rate increased by 87% and our training completion rates nearly quintupled. The platform's dynamic content and real-time tracking capabilities have transformed our learning culture.
//               </p>
//               <div className="font-bold text-gray-900 dark:text-white">Sarah Johnson</div>
//               <div className="text-gray-600 dark:text-gray-400 text-sm">Director of Learning & Development, TechCorp</div>
//             </div>
//           </div>
//         </div>        
//       </div>
//     </div>
//   );
// };

// export default Comparison;