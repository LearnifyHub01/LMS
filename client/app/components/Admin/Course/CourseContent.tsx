// import { styles } from "@/app/styles/style";
// import React, { FC, useState } from "react";
// import toast from "react-hot-toast";
// import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
// import { BiSolidPencil } from "react-icons/bi";
// import { BsLink45Deg } from "react-icons/bs";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// type Props = {
//   active: number;
//   setActive: (active: number) => void;
//   courseContentData: any;
//   setCourseContentData: (courseContentData: any) => void;
//   handleSubmit: any;
// };

// const CourseContent: FC<Props> = ({
//   active,
//   setActive,
//   setCourseContentData,
//   courseContentData = [], // Default to empty array
//   handleSubmit: handleCourseSubmit,
// }) => {
//   const [isCollapsed, setIsCollapsed] = useState(
//     Array(courseContentData.length || 0).fill(false) // Fallback to 0
//   );
//   const [activeSection, setActiveSection] = useState(1);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//   };

//   const handleCollapsToggle = (index: number) => {
//     const updatedCollasped = [...isCollapsed];
//     updatedCollasped[index] = !updatedCollasped[index];
//     setIsCollapsed(updatedCollasped);
//   };

//   const handleRemoveLink = (index: number, linkIndex: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index] = {
//       ...updatedData[index],
//       links: updatedData[index].links.filter((_:any, i:any) => i !== linkIndex),
//     };
//     setCourseContentData(updatedData);
//   };

//   const handleAddLink = (index: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index] = {
//       ...updatedData[index],
//       links: [...updatedData[index].links, { title: "", url: "" }],
//     };
//     setCourseContentData(updatedData);
//   };

//   const addNewSection = () => {
//     if (
//       courseContentData.length > 0 &&
//       (courseContentData[courseContentData.length - 1].title === "" ||
//         courseContentData[courseContentData.length - 1].description === "" ||
//         courseContentData[courseContentData.length - 1].videoUrl === "" ||
//         courseContentData[courseContentData.length - 1].links[0].title === "" ||
//         courseContentData[courseContentData.length - 1].links[0].url === "")
//     ) {
//       toast.error("Please fill all the fields first");
//     } else {
//       setActiveSection(activeSection + 1);
//       const newContent = {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: `Untitled Section ${activeSection}`,
//         links: [{ title: "", url: "" }],
//       };
//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };

//   const newContentHandler = (item: any) => {
//     if (
//       item.title === "" ||
//       item.description === "" ||
//       item.videoUrl === "" ||
//       item.links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields first");
//     } else {
//       const newContent = {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: `Untitled Section ${activeSection}`,
//         links: [{ title: "", url: "" }],
//       };
//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };

//   const prevButton = () => {
//     setActive(active - 1);
//   };

//   const handleOptions = () => {
//     if (
//       courseContentData.length > 0 &&
//       (courseContentData[courseContentData.length - 1].title === "" ||
//         courseContentData[courseContentData.length - 1].description === "" ||
//         courseContentData[courseContentData.length - 1].videoUrl === "" ||
//         courseContentData[courseContentData.length - 1].links[0].title === "" ||
//         courseContentData[courseContentData.length - 1].links[0].url === "")
//     ) {
//       toast.error("Section can't be empty");
//     } else {
//       setActive(active + 1);
//       handleCourseSubmit();
//     }
//   };
// console.log(courseContentData)
//   return (
//     <div className="w-[100%] ml-2 p-2">
//       <form onSubmit={handleSubmit}>
//         {courseContentData.map((item: any, index: number) => {
//           const showSectionInput =
//             index === 0 ||
//             item.videoSection !== courseContentData[index - 1].videoSection;
//           return (
//             <div
//               key={index}
//               className={`w-full bg-[#cdc8c818] p-4 ${
//                 showSectionInput ? "mt-10" : "mb-0"
//               }`}
//             >
//               {showSectionInput && (
//                 <>
//                   <div className="flex w-full items-center">
//                     <input
//                       type="text"
//                       className={`text-[20px] ${
//                         item.videoSection === "Untitled Section"
//                           ? "w-[170px]"
//                           : "w-min"
//                       } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
//                       value={item.videoSection}
//                       onChange={(e) => {
//                         const updatedData = [...courseContentData];
//                         updatedData[index] = {
//                           ...updatedData[index],
//                           videoSection: e.target.value,
//                         };
//                         setCourseContentData(updatedData);
//                       }}
//                     />
//                     <BiSolidPencil className="cursor-pointer dark:text-white text-black" />
//                   </div>
//                   <br />
//                 </>
//               )}
//               <div className="flex w-full items-center justify-between my-0">
//                 {isCollapsed[index] ? (
//                   <>
//                     {item.title ? (
//                       <p className="font-Poppins dark:text-white text-black">
//                         {index + 1}. {item.title}
//                       </p>
//                     ) : (
//                       <></>
//                     )}
//                   </>
//                 ) : (
//                   <div></div>
//                 )}
//                 <div className="flex items-center">
//                   <AiOutlineDelete
//                     className={`dark:text-white text-[20px] mr-2 text-black ${
//                       index > 0 ? "cursor-pointer" : "cursor-no-drop"
//                     }`}
//                     onClick={() => {
//                       if (index > 0) {
//                         const updatedData = [...courseContentData];
//                         updatedData.splice(index, 1);
//                         setCourseContentData(updatedData);
//                       }
//                     }}
//                   />
//                   <MdOutlineKeyboardArrowDown
//                     fontSize="large"
//                     className="dark:text-white text-black"
//                     style={{
//                       transform: isCollapsed[index]
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                     }}
//                     onClick={() => handleCollapsToggle(index)}
//                   />
//                 </div>
//               </div>
//               {!isCollapsed[index] && (
//                 <>
//                   <div className="mb-3">
//                     <label className={styles.label}>Video Title</label>
//                     <input
//                       type="text"
//                       placeholder="Project Plan..."
//                       className={styles.input}
//                       value={item.title}
//                       onChange={(e) => {
//                         const updatedData = [...courseContentData];
//                         updatedData[index] = {
//                           ...updatedData[index],
//                           title: e.target.value,
//                         };
//                         setCourseContentData(updatedData);
//                       }}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className={styles.label}>Video Url</label>
//                     <input
//                       type="text"
//                       placeholder="Video URL..."
//                       className={styles.input}
//                       value={item.videoUrl || ""}
//                       onChange={(e) => {
//                         const updatedData = [...courseContentData];
//                         updatedData[index] = {
//                           ...updatedData[index],
//                           videoUrl: e.target.value,
//                         };
//                         setCourseContentData(updatedData);
//                       }}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className={styles.label}>Video Description</label>
//                     <textarea
//                       rows={4}
//                       cols={30}
//                       placeholder="Video description..."
//                       className={`${styles.input} !h-min py-2`}
//                       value={item.description}
//                       onChange={(e) => {
//                         const updatedData = [...courseContentData];
//                         updatedData[index] = {
//                           ...updatedData[index],
//                           description: e.target.value,
//                         };
//                         setCourseContentData(updatedData);
//                       }}
//                     />
//                   </div>

//                   {item?.links.map((link: any, linkIndex: number) => (
//                     <div className="mb-3 block" key={linkIndex}>
//                       <div className="w-full flex items-center justify-between">
//                         <label className={styles.label}>
//                           Link {linkIndex + 1}
//                         </label>
//                         <AiOutlineDelete
//                           className={`${
//                             linkIndex === 0
//                               ? "cursor-not-allowed"
//                               : "cursor-pointer"
//                           } text-black dark:text-white text-[20px]`}
//                           onClick={() =>
//                             linkIndex === 0
//                               ? null
//                               : handleRemoveLink(index, linkIndex)
//                           }
//                         />
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Source Code...(Link Title)"
//                         className={styles.input}
//                         value={link.title}
//                         onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index] = {
//                             ...updatedData[index],
//                             links: updatedData[index].links.map((l:any, i:any) =>
//                               i === linkIndex ? { ...l, title: e.target.value } : l
//                             ),
//                           };
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                       <input
//                         type="url"
//                         placeholder="Source Code Url...(Link URL)"
//                         className={`${styles.input} mt-6`}
//                         value={link.url}
//                         onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index] = {
//                             ...updatedData[index],
//                             links: updatedData[index].links.map((l:any, i:any) =>
//                               i === linkIndex ? { ...l, url: e.target.value } : l
//                             ),
//                           };
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                     </div>
//                   ))}

//                   <div className="inline-block mb-4">
//                     <p
//                       className="flex items-center text-[18px] dark:text-white cursor-pointer"
//                       onClick={() => handleAddLink(index)}
//                     >
//                       <BsLink45Deg className="mr-2" /> Add Link
//                     </p>
//                   </div>
//                 </>
//               )}
//               {index === courseContentData.length - 1 && (
//                 <div>
//                   <p
//                     className="flex items-center text-[18px] dark:text-white cursor-pointer"
//                     onClick={() => newContentHandler(item)}
//                   >
//                     <AiOutlinePlusCircle className="mr-2 text-black dark:text-white" /> Add New Content
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//         <br />
//         <div
//           className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
//           onClick={() => addNewSection()}
//         >
//           <AiOutlinePlusCircle className="mr-2" />
//           Add New Section
//         </div>
//       </form>
//       <br />
//       <div className="w-full flex items-center justify-between">
//         <button
//           className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => prevButton()}
//         >
//           Prev
//         </button>
//         <button
//           className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => handleOptions()}
//         >
//           Next
//         </button>
//       </div>
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// };

// export default CourseContent;



import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  setCourseContentData,
  courseContentData = [],
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length || 0).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapsToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const addNewSection = () => {
    if (
      courseContentData.length > 0 &&
      (courseContentData[courseContentData.length - 1].title === "" ||
        courseContentData[courseContentData.length - 1].description === "" ||
        courseContentData[courseContentData.length - 1].videoUrl === "" ||
        courseContentData[courseContentData.length - 1].links[0].title === "" ||
        courseContentData[courseContentData.length - 1].links[0].url === "")
    ) {
      toast.error("Please fill all the fields first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection + 1}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
      setIsCollapsed([...isCollapsed, false]);
    }
  };

  const addNewContent = (index: number) => {
    const sectionItems = courseContentData[index];
    if (
      sectionItems.title === "" ||
      sectionItems.description === "" ||
      sectionItems.videoUrl === "" ||
      sectionItems.links[0].url === ""
    ) {
      toast.error("Please fill all the fields in the current content first");
      return;
    }

    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: sectionItems.videoSection, // Use same section title
      links: [{ title: "", url: "" }],
    };

    const updatedData = [...courseContentData];
    updatedData.splice(index + 1, 0, newContent); // Insert after current index
    setCourseContentData(updatedData);
    setIsCollapsed([...isCollapsed.slice(0, index + 1), false, ...isCollapsed.slice(index + 1)]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData.length > 0 &&
      (courseContentData[courseContentData.length - 1].title === "" ||
        courseContentData[courseContentData.length - 1].description === "" ||
        courseContentData[courseContentData.length - 1].videoUrl === "" ||
        courseContentData[courseContentData.length - 1].links[0].title === "" ||
        courseContentData[courseContentData.length - 1].links[0].url === "")
    ) {
      toast.error("Section can't be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[100%] ml-2 p-2">
      <form onSubmit={handleSubmit}>
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c818] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
            >
              {showSectionInput && (
                <>
                  <div className="flex w-full items-center">
                    <input
                      type="text"
                      className={`text-[20px] ${
                        item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-min"
                      } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                      value={item.videoSection}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoSection = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                    <BiSolidPencil className="cursor-pointer dark:text-white text-black" />
                  </div>
                  <br />
                </>
              )}
              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] ? (
                  <>
                    {item.title ? (
                      <p className="font-Poppins dark:text-white text-black">
                        {index + 1}. {item.title}
                      </p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div></div>
                )}
                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                        setIsCollapsed(isCollapsed.filter((_, i) => i !== index));
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className="dark:text-white text-black"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapsToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="mb-3">
                    <label className={styles.label}>Video Title</label>
                    <input
                      type="text"
                      placeholder="Project Plan..."
                      className={styles.input}
                      value={item.title}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].title = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Video Url</label>
                    <input
                      type="text"
                      placeholder="Video URL..."
                      className={styles.input}
                      value={item.videoUrl || ""}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoUrl = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Video Description</label>
                    <textarea
                      rows={4}
                      cols={30}
                      placeholder="Video description..."
                      className={`${styles.input} !h-min py-2`}
                      value={item.description}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {item?.links.map((link: any, linkIndex: number) => (
                    <div className="mb-3 block" key={linkIndex}>
                      <div className="w-full flex items-center justify-between">
                        <label className={styles.label}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${
                            linkIndex === 0
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          } text-black dark:text-white text-[20px]`}
                          onClick={() =>
                            linkIndex === 0
                              ? null
                              : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Source Code...(Link Title)"
                        className={styles.input}
                        value={link.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="url"
                        placeholder="Source Code Url...(Link URL)"
                        className={`${styles.input} mt-6`}
                        value={link.url}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}

                  <div className="inline-block mb-4">
                    <p
                      className="flex items-center text-[18px] dark:text-white cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" /> Add Link
                    </p>
                  </div>

                  {/* Add New Content button for each item */}
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white cursor-pointer"
                      onClick={() => addNewContent(index)}
                    >
                      <AiOutlinePlusCircle className="mr-2 text-black dark:text-white" /> Add New Content
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" />
          Add New Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <button
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </button>
        <button
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </button>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;