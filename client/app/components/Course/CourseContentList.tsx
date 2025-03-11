import React, { FC, useState } from "react";
import {
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: (index: number) => void;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Find unique video sections
  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection) || []),
  ];
  console.log(props.data)

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !props.isDemo && "ml-[-30px] min-h-screen"
      }`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        // Filter section by videos
        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) =>
            totalLength + (Number(item.videoLength) || 0),
          0
        );

        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;
        const videoSectionLengthMinut = Math.floor(sectionVideoLength/60)
        const sectionContentHours: number = Math.floor(sectionVideoLength / 3600);

        return (
          <div
            className={`${!props.isDemo && "border-b border-black pb-2"}`}
            key={section}
          >
            <div className="w-full flex">
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[22px] text-black dark:text-white">
                  {section}
                </h2>
                <button
                  className="text-black dark:text-white mr-4 cursor-pointer"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons{" "}
              {sectionVideoLength < 3600
                ? `${videoSectionLengthMinut || 0} minutes`
                : `${sectionContentHours} hours`}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const videoLength:number = Number(item.videoLength)
                  const videoLengthMinut = Math.floor(videoLength/60)
                  const videoLengthSec = videoLength % 60
                  const contentLength: number = (videoLengthMinut / 3600);
                  
                  
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === props.activeVideo ? "bg-slate-600" : ""
                      } cursor-pointer p-2 transition-all`}
                      key={item._id}
                      onClick={() =>
                        props.isDemo ? null : props?.setActiveVideo?.(videoIndex)
                      }
                    >
                      <div className="flex items-start">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <h1 className="text-black dark:text-white text-[18px] inline-block break-words">
                          {item.title}
                        </h1>
                      </div>
                      <h5 className="text-black dark:text-white pl-8">
                         {videoLength > 3600
                          ? `${contentLength.toFixed(0)} hours`
                          : `${videoLengthMinut}.${videoLengthSec} minutes`}      
                        
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;

// import React, { FC, useState } from "react";
// import {
//   BsChevronDown,
//   BsChevronUp,
// } from "react-icons/bs";
// import { MdOutlineOndemandVideo } from "react-icons/md";

// type Props = {
//   data: any;
//   activeVideo?: number;
//   setActiveVideo?: (index: number) => void;
//   isDemo?: boolean;
// };

// const CourseContentList: FC<Props> = (props) => {
//   const [visibleSections, setVisibleSections] = useState<Set<string>>(
//     new Set<string>()
//   );

//   // Find unique video sections
//   const videoSections: string[] = [
//     ...new Set<string>(props.data?.map((item: any) => item.videoSection) || []),
//   ];

//   let totalCount: number = 0;

//   const toggleSection = (section: string) => {
//     const newVisibleSections = new Set(visibleSections);
//     if (newVisibleSections.has(section)) {
//       newVisibleSections.delete(section);
//     } else {
//       newVisibleSections.add(section);
//     }
//     setVisibleSections(newVisibleSections);
//   };

//   return (
//     <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//       <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white">Course Content</h2>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//           {videoSections.length} sections • {props.data?.length || 0} lessons
//         </p>
//       </div>
      
//       <div className="overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar p-2">
//         {videoSections.map((section: string, sectionIndex: number) => {
//           const isSectionVisible = visibleSections.has(section);

//           // Filter section by videos
//           const sectionVideos: any[] = props.data.filter(
//             (item: any) => item.videoSection === section
//           );

//           const sectionVideoCount: number = sectionVideos.length;
//           const sectionVideoLength: number = sectionVideos.reduce(
//             (totalLength: number, item: any) =>
//               totalLength + (Number(item.videoLength) || 0),
//             0
//           );

//           const sectionStartIndex: number = totalCount;
//           totalCount += sectionVideoCount;
//           const videoSectionLengthMinut = Math.floor(sectionVideoLength/60);
//           const sectionContentHours: number = Math.floor(sectionVideoLength / 3600);

//           return (
//             <div
//               className="mb-2 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
//               key={section}
//             >
//               <div 
//                 className="p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
//                 onClick={() => toggleSection(section)}
//               >
//                 <div className="w-full flex justify-between items-center">
//                   <h3 className="font-medium text-gray-800 dark:text-white">
//                     {section}
//                   </h3>
//                   <button
//                     className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                     aria-label={isSectionVisible ? "Collapse section" : "Expand section"}
//                   >
//                     {isSectionVisible ? (
//                       <BsChevronUp size={18} />
//                     ) : (
//                       <BsChevronDown size={18} />
//                     )}
//                   </button>
//                 </div>
//                 <div className="flex justify-between items-center mt-1">
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     {sectionVideoCount} {sectionVideoCount === 1 ? "Lesson" : "Lessons"}
//                   </span>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     {sectionVideoLength < 3600
//                       ? `${videoSectionLengthMinut || 0} min`
//                       : `${sectionContentHours} hr ${videoSectionLengthMinut % 60} min`}
//                   </span>
//                 </div>
//               </div>
              
//               {isSectionVisible && (
//                 <div className="divide-y divide-gray-100 dark:divide-gray-700">
//                   {sectionVideos.map((item: any, index: number) => {
//                     const videoIndex: number = sectionStartIndex + index;
//                     const videoLength: number = Number(item.videoLength);
//                     const videoLengthMinut = Math.floor(videoLength/60);
//                     const videoLengthSec = videoLength % 60;
//                     const contentLength: number = (videoLengthMinut / 3600);
                    
//                     return (
//                       <div
//                         className={`p-3 transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
//                           videoIndex === props.activeVideo 
//                             ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500" 
//                             : ""
//                         }`}
//                         key={item._id}
//                         onClick={() =>
//                           props.isDemo ? null : props?.setActiveVideo?.(videoIndex)
//                         }
//                       >
//                         <div className="flex items-start gap-2">
//                           <div className="mt-0.5 text-blue-500">
//                             <MdOutlineOndemandVideo size={20} />
//                           </div>
//                           <div className="flex-1">
//                             <h4 className={`text-sm md:text-base break-words ${
//                               videoIndex === props.activeVideo 
//                                 ? "font-medium text-blue-700 dark:text-blue-400" 
//                                 : "text-gray-800 dark:text-white"
//                             }`}>
//                               {item.title}
//                             </h4>
//                             <div className="flex items-center justify-between mt-1">
//                               <span className="text-xs text-gray-500 dark:text-gray-400">
//                                 {videoLength > 3600
//                                   ? `${contentLength.toFixed(0)} hr ${videoLengthMinut % 60} min`
//                                   : `${videoLengthMinut}:${videoLengthSec < 10 ? '0' : ''}${videoLengthSec}`}
//                               </span>
//                               {videoIndex === props.activeVideo && (
//                                 <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
//                                   Current
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
      
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #c1c1c1;
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #a1a1a1;
//         }
        
//         @media (max-width: 768px) {
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 3px;
//           }
//         }
        
//         .dark .custom-scrollbar::-webkit-scrollbar-track {
//           background: #2d3748;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #4a5568;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #718096;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CourseContentList;