// import React, { FC, useState } from "react";
// import {
//   BsChevronDown,
//   BsChevronUp,
// } from "react-icons/bs";
// import { MdOutlineOndemandVideo } from "react-icons/md";

// type Props = {
//   data: any;
//   activeVideo?: number;
//   setActiveVideo?: (index: number) => void; // Fixed typo here
//   isDemo?: boolean;
// };

// const CourseContentList: FC<Props> = (props) => {
//   const [visibleSections, setVisibleSections] = useState<Set<string>>(
//     new Set<string>()
//   );

//   // Find unique video sections
//   const videoSections: string[] = [
//     ...new Set<string>(props.data?.map((item: any) => item.videoSection)), // Fixed typo: videoSections -> videoSection
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
//     <div
//       className={`mt-[15px] w-full ${
//         !props.isDemo && "ml-[-30px] min-h-screen"
//       }`}
//     >
//       {videoSections.map((section: string, sectionIndex: number) => {
//         const isSectionVisible = visibleSections.has(section); // Fixed: Use visibleSections instead of videoSections

//         // Filter section by videos
//         const sectionVideos: any[] = props.data.filter(
//           (item: any) => item.videoSection === section
//         );

//         const sectionVideoCount: number = sectionVideos.length;
//         const sectionVideoLength: number = sectionVideos.reduce(
//           (totalLength: number, item: any) => totalLength + item.videoLength,
//           0 // Added initial value to reduce
//         );

//         const sectionStartIndex: number = totalCount;
//         totalCount += sectionVideoCount;

//         const sectionContentHours: number = sectionVideoLength / 60;

//         return (
//           <div
//             className={`${!props.isDemo && "border-b border-black pb-2"}`}
//             key={section}
//           >
//             <div className="w-full flex">
//               {/* Render video section */}
//               <div className="w-full flex justify-between items-center">
//                 <h2 className="text-[22px] text-black dark:text-white">
//                   {section}
//                 </h2>
//                 <button
//                   className="text-black dark:text-white mr-4 cursor-pointer"
//                   onClick={() => toggleSection(section)}
//                 >
//                   {isSectionVisible ? (
//                     <BsChevronUp size={20} />
//                   ) : (
//                     <BsChevronDown size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <h5 className="text-black dark:text-white">
//               {sectionVideoCount} Lessons{" "}
//               {sectionVideoLength < 60
//                 ? sectionVideoLength
//                 : sectionContentHours.toFixed(2)}{" "}
//               {sectionVideoLength > 60 ? "hours" : "minutes"}
//             </h5>
//             <br />
//             {isSectionVisible && (
//               <div className="w-full">
//                 {sectionVideos.map((item: any, index: number) => {
//                   const videoIndex: number = sectionStartIndex + index;
//                   const contentLength: number = item.videoLength / 60;
//                   return (
//                     <div
//                       className={`w-full ${
//                         videoIndex === props.activeVideo ? "bg-slate-600" : ""
//                       } cursor-pointer p-2 transition-all`}
//                       key={item._id}
//                       onClick={() =>
//                         props.isDemo ? null : props?.setActiveVideo?.(videoIndex)
//                       }
//                     >
//                       <div className="flex items-start">
//                         <div>
//                           <MdOutlineOndemandVideo
//                             size={25}
//                             className="mr-2"
//                             color="#1cdada"
//                           />
//                         </div>
//                         <h1 className="text-black dark:text-white text-[18px] inline-block break-words">
//                           {item.title}
//                         </h1>
//                       </div>
//                       <h5 className="text-black dark:text-white pl-8">
//                         {item.videoLength > 60
//                           ? contentLength.toFixed(2)
//                           : item.videoLength}{" "}
//                         {item.videoLength > 60 ? "hours" : "minutes"}
//                       </h5>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CourseContentList;

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