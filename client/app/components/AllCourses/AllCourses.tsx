// // // "use client";
// // // import React, { useState, useEffect } from "react";
// // // import CourseCard from "../Course/CourseCard";
// // // import { useGetAllCoursesQuery, useSearchCoursesQuery } from "@/redux/features/courses/coursesApi";
// // // import { useSearchParams } from "next/navigation";

// // // const categories = [
// // //   { id: "all", name: "All Courses" },
// // //   { id: "web", name: "Web Development" },
// // //   { id: "mobile", name: "Mobile Development" },
// // //   { id: "design", name: "Design" },
// // //   { id: "data", name: "Data Science" },
// // // ];

// // // const AllCourses = () => {
// // //   const searchParams = useSearchParams();
// // //   const searchTitle = searchParams?.get("title");

// // //   const [selectedCategory, setSelectedCategory] = useState("all");
// // //   const [courses, setCourses] = useState<any[]>([]);

// // //   const { data: allCoursesData, isLoading: allLoading } = useGetAllCoursesQuery({}, {
// // //     skip: !!searchTitle,
// // //   });

// // //   const { data: searchData, isLoading: searchLoading } = useSearchCoursesQuery(searchTitle, {
// // //     skip: !searchTitle,
// // //   });

// // //   useEffect(() => {
// // //     const courseData = searchTitle ? searchData?.courses : allCoursesData?.courses;

// // //     if (courseData) {
// // //       if (selectedCategory === "all") {
// // //         setCourses(courseData);
// // //       } else {
// // //         const filteredCourses = courseData.filter((course: any) =>
// // //           course.category?.toLowerCase() === selectedCategory
// // //         );
// // //         setCourses(filteredCourses);
// // //       }
// // //     }
// // //   }, [allCoursesData, searchData, searchTitle, selectedCategory]);

// // //   return (
// // //     <div className="bg-[#DDE6ED] dark:bg-[#27374D] min-h-screen py-1">
// // //       <div className="w-[90%] 800px:w-[80%] mx-auto">
// // //         {/* Header */}
// // //         <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black 800px:!leading-[60px] font-[700] tracking-tight">
// // //           Discover a World of Knowledge{" "}
// // //           <span className="text-gradient">
// // //             Learn, Grow, Succeed <br />
// // //           </span>
// // //           with Our Expert-Led Courses
// // //         </h1>

// // //         {/* Category Filter */}
// // //         <div className="mt-8 flex justify-center flex-wrap gap-4">
// // //           {categories.map((category) => (
// // //             <button
// // //               key={category.id}
// // //               onClick={() => setSelectedCategory(category.id)}
// // //               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// // //                 selectedCategory === category.id
// // //                   ? "bg-blue-600 text-white"
// // //                   : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
// // //               }`}
// // //             >
// // //               {category.name}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {(allLoading || searchLoading) ? (
// // //           <div className="flex justify-center items-center h-[50vh]">
// // //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#526D82]"></div>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="h-[40px]" />
// // //             <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12">
// // //               {courses && courses.length > 0 ? (
// // //                 courses.map((item: any, index: number) => (
// // //                   <CourseCard item={item} key={index} />
// // //                 ))
// // //               ) : (
// // //                 <p className="text-center col-span-full text-gray-600 dark:text-gray-300">
// // //                   No courses found matching your criteria.
// // //                 </p>
// // //               )}
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AllCourses;
// // // "use client";
// // // import React, { useState, useEffect } from "react";
// // // import CourseCard from "../Course/CourseCard";
// // // import { useGetAllCoursesQuery, useSearchCoursesQuery } from "@/redux/features/courses/coursesApi";
// // // import { useSearchParams } from "next/navigation";

// // // const categories = [
// // //   { id: "all", name: "All Courses" },
// // //   { id: "web", name: "Web Development" },
// // //   { id: "mobile", name: "Mobile Development" },
// // //   { id: "design", name: "Design" },
// // //   { id: "data", name: "Data Science" },
// // // ];

// // // const AllCourses = () => {
// // //   const searchParams = useSearchParams();
// // //   const searchTitle = searchParams?.get("title");

// // //   const [selectedCategory, setSelectedCategory] = useState("all");
// // //   const [courses, setCourses] = useState<any[]>([]);

// // //   const { data: allCoursesData, isLoading: allLoading } = useGetAllCoursesQuery({}, {
// // //     skip: !!searchTitle,
// // //   });

// // //   const {
// // //     data: searchData,
// // //     isLoading: searchLoading,
// // //     error: searchError
// // //   } = useSearchCoursesQuery(searchTitle, {
// // //     skip: !searchTitle,
// // //   });

// // //   useEffect(() => {
// // //     console.log("Search Title:", searchTitle);
// // //     console.log("All Courses Data:", allCoursesData);
// // //     console.log("Search Data:", searchData);
// // //     console.log("Search Error:", searchError);

// // //     const courseData = searchTitle ? searchData?.courses : allCoursesData?.courses;

// // //     if (courseData) {
// // //       console.log("Raw Course Data:", courseData);
// // //       let filteredCourses = courseData;

// // //       if (selectedCategory !== "all") {
// // //         filteredCourses = courseData.filter((course: any) =>
// // //           course.category?.toLowerCase() === selectedCategory
// // //         );
// // //       }

// // //       console.log("Filtered Courses:", filteredCourses);
// // //       setCourses(filteredCourses);
// // //     }
// // //   }, [allCoursesData, searchData, searchTitle, selectedCategory]);

// // //   return (
// // //     <div className="bg-[#DDE6ED] dark:bg-[#27374D] min-h-screen py-1">
// // //       <div className="w-[90%] 800px:w-[80%] mx-auto">
// // //         <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black 800px:!leading-[60px] font-[700] tracking-tight">
// // //           Discover a World of Knowledge{" "}
// // //           <span className="text-gradient">
// // //             Learn, Grow, Succeed <br />
// // //           </span>
// // //           with Our Expert-Led Courses
// // //         </h1>

// // //         <div className="mt-8 flex justify-center flex-wrap gap-4">
// // //           {categories.map((category) => (
// // //             <button
// // //               key={category.id}
// // //               onClick={() => setSelectedCategory(category.id)}
// // //               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// // //                 selectedCategory === category.id
// // //                   ? "bg-blue-600 text-white"
// // //                   : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
// // //               }`}
// // //             >
// // //               {category.name}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {(allLoading || searchLoading) ? (
// // //           <div className="flex justify-center items-center h-[50vh]">
// // //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#526D82]"></div>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="h-[40px]" />
// // //             <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12">
// // //               {courses && courses.length > 0 ? (
// // //                 courses.map((item: any, index: number) => (
// // //                   <CourseCard item={item} key={index} />
// // //                 ))
// // //               ) : (
// // //                 <p className="text-center col-span-full text-gray-600 dark:text-gray-300">
// // //                   {searchTitle
// // //                     ? "No courses found matching your search."
// // //                     : "No courses available at the moment."}
// // //                 </p>
// // //               )}
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AllCourses;

// // //-------------------------------------------------------------------------------------------//
// // // "use client";
// // // import React, { useState, useEffect } from "react";
// // // import CourseCard from "../Course/CourseCard";
// // // import { useGetAllCoursesQuery, useSearchCoursesQuery } from "@/redux/features/courses/coursesApi";
// // // import { useSearchParams } from "next/navigation";
// // // import { motion } from "framer-motion";

// // // const categories = [
// // //   { id: "all", name: "All Courses" },
// // //   { id: "web", name: "Web Development" },
// // //   { id: "mobile", name: "Mobile Development" },
// // //   { id: "design", name: "Design" },
// // //   { id: "data", name: "Data Science" },
// // // ];

// // // const AllCourses = () => {
// // //   const searchParams = useSearchParams();
// // //   const searchTitle = searchParams?.get("title");

// // //   const [selectedCategory, setSelectedCategory] = useState("all");
// // //   const [courses, setCourses] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   const { data: allCoursesData, isLoading: allLoading } = useGetAllCoursesQuery({}, {
// // //     skip: !!searchTitle,
// // //   });

// // //   const {
// // //     data: searchData,
// // //     isLoading: searchLoading,
// // //     error: searchError
// // //   } = useSearchCoursesQuery(searchTitle, {
// // //     skip: !searchTitle,
// // //   });

// // //   useEffect(() => {
// // //     const courseData = searchTitle ? searchData?.courses : allCoursesData?.courses;

// // //     if (courseData) {
// // //       let filteredCourses = courseData;

// // //       if (selectedCategory !== "all") {
// // //         filteredCourses = courseData.filter((course) =>
// // //           course.category?.toLowerCase() === selectedCategory
// // //         );
// // //       }

// // //       setCourses(filteredCourses);
// // //       setIsLoading(false);
// // //     }
// // //   }, [allCoursesData, searchData, searchTitle, selectedCategory]);

// // //   const fadeIn = {
// // //     hidden: { opacity: 0 },
// // //     visible: { opacity: 1, transition: { duration: 0.6 } }
// // //   };

// // //   const staggerContainer = {
// // //     hidden: { opacity: 0 },
// // //     visible: {
// // //       opacity: 1,
// // //       transition: {
// // //         staggerChildren: 0.1
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen py-12">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <motion.div
// // //           initial="hidden"
// // //           animate="visible"
// // //           variants={fadeIn}
// // //           className="text-center mb-16"
// // //         >
// // //           <h1 className="font-Poppins text-4xl md:text-5xl lg:text-6xl dark:text-white text-gray-900 font-bold tracking-tight">
// // //             Discover a World of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Knowledge</span>
// // //           </h1>
// // //           <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
// // //             Learn, grow, and succeed with our expert-led courses tailored to help you achieve your goals
// // //           </p>
// // //         </motion.div>

// // //         <div className="relative mb-12">
// // //           <div className="absolute inset-0 flex items-center" aria-hidden="true">
// // //             <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
// // //           </div>
// // //           <div className="relative flex justify-center">
// // //             <span className="px-3 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-lg font-medium text-gray-900 dark:text-white">
// // //               Browse Categories
// // //             </span>
// // //           </div>
// // //         </div>

// // //         <motion.div
// // //           variants={fadeIn}
// // //           initial="hidden"
// // //           animate="visible"
// // //           className="flex justify-center flex-wrap gap-4 mb-12"
// // //         >
// // //           {categories.map((category) => (
// // //             <button
// // //               key={category.id}
// // //               onClick={() => setSelectedCategory(category.id)}
// // //               className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
// // //                 selectedCategory === category.id
// // //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white transform scale-105"
// // //                   : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
// // //               }`}
// // //             >
// // //               {category.name}
// // //             </button>
// // //           ))}
// // //         </motion.div>

// // //         {(allLoading || searchLoading || isLoading) ? (
// // //           <div className="flex flex-col justify-center items-center h-64">
// // //             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
// // //             <p className="mt-4 text-gray-600 dark:text-gray-300">Loading amazing courses for you...</p>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             {courses && courses.length > 0 ? (
// // //               <motion.div
// // //                 variants={staggerContainer}
// // //                 initial="hidden"
// // //                 animate="visible"
// // //                 className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
// // //               >
// // //                 {courses.map((item, index) => (
// // //                   <motion.div
// // //                     key={index}
// // //                     variants={fadeIn}
// // //                     className="transform transition-all duration-300 hover:scale-105"
// // //                   >
// // //                     <CourseCard item={item} />
// // //                   </motion.div>
// // //                 ))}
// // //               </motion.div>
// // //             ) : (
// // //               <motion.div
// // //                 variants={fadeIn}
// // //                 initial="hidden"
// // //                 animate="visible"
// // //                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center"
// // //               >
// // //                 <div className="text-6xl mb-4">🔍</div>
// // //                 <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
// // //                   {searchTitle ? "No matching courses found" : "No courses available"}
// // //                 </h3>
// // //                 <p className="text-gray-600 dark:text-gray-300">
// // //                   {searchTitle
// // //                     ? "We couldn't find any courses matching your search criteria. Try different keywords or browse our categories."
// // //                     : "Check back soon! We're working on adding new courses to our catalog."}
// // //                 </p>
// // //               </motion.div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AllCourses;

// // //-----------------------------------------------------------------------------------------------------//

// // "use client";
// // import React, { useState, useEffect, useRef } from "react";
// // import CourseCard from "../Course/CourseCard";
// // import { useGetAllCoursesQuery, useSearchCoursesQuery } from "@/redux/features/courses/coursesApi";
// // import { useSearchParams } from "next/navigation";
// // import Image from "next/image";

// // const categories = [
// //   { id: "all", name: "All Courses" },
// //   { id: "web", name: "Web Development" },
// //   { id: "mobile", name: "Mobile Development" },
// //   { id: "design", name: "Design" },
// //   { id: "data", name: "Data Science" },
// // ];

// // const AllCourses = () => {
// //   const searchParams = useSearchParams();
// //   const searchTitle = searchParams?.get("title");
// //   const [selectedCategory, setSelectedCategory] = useState("all");
// //   const [courses, setCourses] = useState([]);
// //   const [visibleCourses, setVisibleCourses] = useState(6);
// //   const courseRef = useRef(null);

// //   const { data: allCoursesData, isLoading: allLoading } = useGetAllCoursesQuery({}, {
// //     skip: !!searchTitle,
// //   });

// //   const {
// //     data: searchData,
// //     isLoading: searchLoading
// //   } = useSearchCoursesQuery(searchTitle, {
// //     skip: !searchTitle,
// //   });

// //   useEffect(() => {
// //     const courseData = searchTitle ? searchData?.courses : allCoursesData?.courses;

// //     if (courseData) {
// //       let filteredCourses = courseData;

// //       if (selectedCategory !== "all") {
// //         filteredCourses = courseData.filter((course) =>
// //           course.category?.toLowerCase() === selectedCategory
// //         );
// //       }

// //       setCourses(filteredCourses);
// //     }
// //   }, [allCoursesData, searchData, searchTitle, selectedCategory]);

// //   const handleCategoryClick = (categoryId) => {
// //     setSelectedCategory(categoryId);
// //     setVisibleCourses(6); // Reset pagination when changing category

// //     // Scroll to courses section
// //     if (courseRef.current) {
// //       courseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //     }
// //   };

// //   const loadMoreCourses = () => {
// //     setVisibleCourses(prev => prev + 6);
// //   };

// //   return (
// //     <div className="bg-white dark:bg-gray-900">
// //       {/* Hero Section */}
// //       <div className="relative bg-blue-700 dark:bg-blue-900">
// //         <div className="absolute inset-0 overflow-hidden">
// //           <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800 opacity-90"></div>
// //           <div className="absolute inset-0 bg-[url('/pattern-dots.png')] opacity-10"></div>
// //         </div>

// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
// //           <div className="md:w-2/3">
// //             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
// //               Unlock Your Potential With Expert-Led Courses
// //             </h1>
// //             <p className="text-xl text-blue-100 mb-8 max-w-2xl">
// //               Join thousands of students learning new skills and advancing their careers with our premium online courses.
// //             </p>
// //             <div className="flex flex-wrap gap-4">
// //               <button className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
// //                 Browse Top Courses
// //               </button>
// //               <button className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all">
// //                 View Learning Paths
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Stats Bar */}
// //       <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
// //             <div>
// //               <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">5000+</p>
// //               <p className="text-gray-600 dark:text-gray-300">Students</p>
// //             </div>
// //             <div>
// //               <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">200+</p>
// //               <p className="text-gray-600 dark:text-gray-300">Courses</p>
// //             </div>
// //             <div>
// //               <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</p>
// //               <p className="text-gray-600 dark:text-gray-300">Instructors</p>
// //             </div>
// //             <div>
// //               <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">4.8</p>
// //               <p className="text-gray-600 dark:text-gray-300">Avg. Rating</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //         {/* Category Navigation */}
// //         <div className="mb-12">
// //           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
// //             {searchTitle ? `Search Results for "${searchTitle}"` : "Explore Our Courses"}
// //           </h2>

// //           <div className="flex flex-nowrap overflow-x-auto pb-4 md:flex-wrap md:overflow-visible space-x-3 md:space-x-4">
// //             {categories.map((category) => (
// //               <button
// //                 key={category.id}
// //                 onClick={() => handleCategoryClick(category.id)}
// //                 className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
// //                   selectedCategory === category.id
// //                     ? "bg-blue-600 text-white shadow-md"
// //                     : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
// //                 }`}
// //               >
// //                 {category.name}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Course Grid */}
// //         <div ref={courseRef}>
// //           {(allLoading || searchLoading) ? (
// //             <div className="flex flex-col justify-center items-center h-96">
// //               <div className="relative w-20 h-20">
// //                 <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
// //                 <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
// //               </div>
// //               <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading courses...</p>
// //             </div>
// //           ) : (
// //             <>
// //               {courses && courses.length > 0 ? (
// //                 <>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {courses.slice(0, visibleCourses).map((item, index) => (
// //                       <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
// //                         <CourseCard item={item} />
// //                       </div>
// //                     ))}
// //                   </div>

// //                   {visibleCourses < courses.length && (
// //                     <div className="mt-12 text-center">
// //                       <button
// //                         onClick={loadMoreCourses}
// //                         className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
// //                       >
// //                         Load More Courses
// //                       </button>
// //                     </div>
// //                   )}
// //                 </>
// //               ) : (
// //                 <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-10 text-center shadow">
// //                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //                     </svg>
// //                   </div>
// //                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
// //                     {searchTitle ? "No matching courses found" : "No courses available"}
// //                   </h3>
// //                   <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
// //                     {searchTitle
// //                       ? "We couldn't find any courses matching your criteria. Try adjusting your search or browse other categories."
// //                       : "We're working on adding new courses to this category. Please check back soon or explore other categories."}
// //                   </p>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       </div>

// //     </div>
// //   );
// // };

// // export default AllCourses;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import CourseCard from "../Course/CourseCard";
// import {
//   useGetAllCoursesQuery,
//   useSearchCoursesQuery,
// } from "@/redux/features/courses/coursesApi";
// import { useSearchParams } from "next/navigation";
// import WebIcon from "@mui/icons-material/Web";
// import { FaLaptopCode } from 'react-icons/fa';
// const categories = [
//   { id: "all", name: "All Courses" },
//   { id: "web", name: "Web Development" },
//   { id: "mobile", name: "Mobile Development" },
//   { id: "design", name: "Design" },
//   { id: "data", name: "Data Science" },
// ];

// const AllCourses = () => {
//   const searchParams = useSearchParams();
//   const searchTitle = searchParams?.get("title");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [courses, setCourses] = useState([]);
//   const [visibleCourses, setVisibleCourses] = useState([]);
//   const [page, setPage] = useState(1);
//   const coursesPerPage = 6;
//   const courseRef = useRef(null);

//   const { data: allCoursesData, isLoading: allLoading } = useGetAllCoursesQuery(
//     {},
//     {
//       skip: !!searchTitle,
//     }
//   );

//   const { data: searchData, isLoading: searchLoading } = useSearchCoursesQuery(
//     searchTitle,
//     {
//       skip: !searchTitle,
//     }
//   );

//   useEffect(() => {
//     const courseData = searchTitle
//       ? searchData?.courses
//       : allCoursesData?.courses;

//     if (courseData) {
//       let filteredCourses = courseData;

//       if (selectedCategory !== "all") {
//         filteredCourses = courseData.filter(
//           (course) => course.category?.toLowerCase() === selectedCategory
//         );
//       }

//       setCourses(filteredCourses);
//       setPage(1);
//       setVisibleCourses(filteredCourses.slice(0, coursesPerPage));
//     }
//   }, [allCoursesData, searchData, searchTitle, selectedCategory]);

//   const handleCategoryClick = (categoryId) => {
//     setSelectedCategory(categoryId);

//     // Scroll to courses section
//     if (courseRef.current) {
//       courseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   const loadMoreCourses = () => {
//     const nextPage = page + 1;
//     const nextCourses = courses.slice(0, nextPage * coursesPerPage);
//     setVisibleCourses(nextCourses);
//     setPage(nextPage);
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900">
//       {/* Hero Section - Redesigned with a clean, modern look */}
//       <div className="relative bg-gradient-to-br from-indigo-800 via-blue-700 to-blue-600 overflow-hidden">
//         {/* Abstract background pattern */}
//         <div className="absolute inset-0 opacity-20">
//           <svg
//             className="w-full h-full"
//             viewBox="0 0 100 100"
//             preserveAspectRatio="none"
//           >
//             <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)" />
//           </svg>
//           <defs>
//             <pattern
//               id="grid-pattern"
//               width="10"
//               height="10"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M10,0 L0,0 L0,10"
//                 fill="none"
//                 stroke="white"
//                 strokeWidth="0.5"
//               />
//             </pattern>
//           </defs>
//         </div>

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
//           <div className="lg:max-w-xl">
//             <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-6 border border-white/20">
//               <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
//               <span className="text-sm font-medium text-white">
//                 {searchTitle ? "Search Results" : "Explore Courses"}
//               </span>
//             </div>

//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
//               {searchTitle ? (
//                 `Results for "${searchTitle}"`
//               ) : (
//                 <span>
//                   Take your skills to the{" "}
//                   <span className="text-blue-300">next level</span>
//                 </span>
//               )}
//             </h1>

//             <p className="text-lg text-blue-100 mb-8 max-w-2xl">
//               Access expert-led courses designed to accelerate your career and
//               help you master in-demand skills.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <button
//                 onClick={() => handleCategoryClick("all")}
//                 className="px-6 py-3 bg-white text-blue-700 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all hover:bg-gray-50 focus:ring-4 focus:ring-white/30 focus:outline-none"
//               >
//                 Browse All Courses
//               </button>
//               <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all hover:bg-blue-700 focus:ring-4 focus:ring-white/30 focus:outline-none">
//                 Get Started Free
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Categories Section - Redesigned with cards */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//             <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
//   <FaLaptopCode className="h-6 w-6 text-blue-600 dark:text-blue-400" />
// </div>
//               <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
//                 40+ Courses
//               </span>
//             </div>
//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//               Web Development
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//               Master modern frameworks and technologies
//             </p>
//             <button
//               onClick={() => handleCategoryClick("web")}
//               className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center"
//             >
//               Explore category
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 ml-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
//                 25+ Courses
//               </span>
//             </div>
//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//               Mobile Development
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//               Build iOS and Android applications
//             </p>
//             <button
//               onClick={() => handleCategoryClick("mobile")}
//               className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center"
//             >
//               Explore category
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 ml-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-purple-600 dark:text-purple-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
//                 30+ Courses
//               </span>
//             </div>
//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//               Design
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//               Learn UI/UX and graphic design
//             </p>
//             <button
//               onClick={() => handleCategoryClick("design")}
//               className="text-purple-600 dark:text-purple-400 text-sm font-medium flex items-center"
//             >
//               Explore category
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 ml-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-lg">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-teal-600 dark:text-teal-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                   />
//                 </svg>
//               </div>
//               <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
//                 20+ Courses
//               </span>
//             </div>
//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//               Data Science
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//               Analyze and visualize data
//             </p>
//             <button
//               onClick={() => handleCategoryClick("data")}
//               className="text-teal-600 dark:text-teal-400 text-sm font-medium flex items-center"
//             >
//               Explore category
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 ml-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content - Course List */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         {/* Filter & Category Tabs */}
//         <div className="mb-10" ref={courseRef}>
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
//               {selectedCategory === "all"
//                 ? "All Courses"
//                 : `${categories.find((c) => c.id === selectedCategory)?.name}`}
//             </h2>

//             <div className="flex items-center space-x-4">
//               <div className="inline-flex items-center">
//                 <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
//                   Sort:
//                 </span>
//                 <select className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
//                   <option>Most Popular</option>
//                   <option>Newest</option>
//                   <option>Highest Rated</option>
//                   <option>Price: Low to High</option>
//                   <option>Price: High to Low</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="flex overflow-x-auto space-x-2 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryClick(category.id)}
//                 className={`flex-none whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
//                   selectedCategory === category.id
//                     ? "bg-indigo-600 text-white shadow-md"
//                     : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Course Grid - Changed to 3 columns per row */}
//         <div>
//           {allLoading || searchLoading ? (
//             <div className="flex flex-col justify-center items-center h-64 md:h-96">
//               <div className="relative w-16 h-16">
//                 <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
//                 <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
//               </div>
//               <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">
//                 Loading courses...
//               </p>
//             </div>
//           ) : (
//             <>
//               {courses && courses.length > 0 ? (
//                 <>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {visibleCourses.map((item, index) => (
//                       <div
//                         key={index}
//                         className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col transform hover:-translate-y-1"
//                       >
//                         <div className="relative">
//                           {/* Featured badge */}
//                           {index % 5 === 0 && (
//                             <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-md z-10">
//                               Featured
//                             </div>
//                           )}
//                           {/* New badge */}
//                           {index % 7 === 0 && (
//                             <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-md z-10">
//                               New
//                             </div>
//                           )}
//                         </div>
//                         <CourseCard item={item} />
//                       </div>
//                     ))}
//                   </div>

//                   {/* Load More Button - Redesigned */}
//                   {visibleCourses.length < courses.length && (
//                     <div className="flex justify-center mt-12">
//                       <button
//                         onClick={loadMoreCourses}
//                         className="group bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-200"
//                       >
//                         <span>Load More Courses</span>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5 group-hover:translate-y-1 transition-transform"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-md border border-gray-100 dark:border-gray-700">
//                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-8 w-8 text-gray-500 dark:text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
//                     {searchTitle
//                       ? "No matching courses found"
//                       : "No courses available"}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
//                     {searchTitle
//                       ? "We couldn't find any courses matching your criteria. Try adjusting your search or browse other categories."
//                       : "We're working on adding new courses to this category. Please check back soon or explore other categories."}
//                   </p>
//                   <button
//                     onClick={() => handleCategoryClick("all")}
//                     className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium"
//                   >
//                     Browse all courses
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 ml-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M14 5l7 7m0 0l-7 7m7-7H3"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllCourses;

"use client";
import React, { useState, useEffect, useRef } from "react";
import CourseCard from "../Course/CourseCard";
import {
  useGetAllCoursesQuery,
  useSearchCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { useSearchParams } from "next/navigation";
// Material-UI Icons
import LaptopIcon from "@mui/icons-material/Laptop";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import BrushIcon from "@mui/icons-material/Brush";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const categories = [
  { id: "all", name: "All Courses" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Development" },
  { id: "design", name: "Design" },
  { id: "data", name: "Data Science" },
];

const AllCourses = () => {
  const searchParams = useSearchParams();
  const searchTitle = searchParams?.get("title");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [page, setPage] = useState(1);
  const coursesPerPage = 6;
  const courseRef = useRef(null);

  const { data: allCoursesData, isLoading: allLoading } = useGetAllCoursesQuery(
    {},
    {
      skip: !!searchTitle,
    }
  );

  const { data: searchData, isLoading: searchLoading } = useSearchCoursesQuery(
    searchTitle,
    {
      skip: !searchTitle,
    }
  );

  useEffect(() => {
    const courseData = searchTitle
      ? searchData?.courses
      : allCoursesData?.courses;

    if (courseData) {
      let filteredCourses = courseData;

      if (selectedCategory !== "all") {
        filteredCourses = courseData.filter(
          (course) => course.category?.toLowerCase() === selectedCategory
        );
      }

      setCourses(filteredCourses);
      setPage(1);
      setVisibleCourses(filteredCourses.slice(0, coursesPerPage));
    }
  }, [allCoursesData, searchData, searchTitle, selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);

    if (courseRef.current) {
      courseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const loadMoreCourses = () => {
    const nextPage = page + 1;
    const nextCourses = courses.slice(0, nextPage * coursesPerPage);
    setVisibleCourses(nextCourses);
    setPage(nextPage);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-800 via-blue-700 to-blue-600 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="lg:max-w-xl">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-6 border border-white/20">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
              <span className="text-sm font-medium text-white">
                {searchTitle ? "Search Results" : "Explore Courses"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {searchTitle ? (
                `Results for "${searchTitle}"`
              ) : (
                <span>
                  Take your skills to the{" "}
                  <span className="text-blue-300">next level</span>
                </span>
              )}
            </h1>

            <p className="text-lg text-blue-100 mb-8 max-w-2xl">
              Access expert-led courses designed to accelerate your career and
              help you master in-demand skills.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleCategoryClick("all")}
                className="px-6 py-3 bg-white text-blue-700 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all hover:bg-gray-50 focus:ring-4 focus:ring-white/30 focus:outline-none"
              >
                Browse All Courses
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all hover:bg-blue-700 focus:ring-4 focus:ring-white/30 focus:outline-none">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                <LaptopIcon className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                40+ Courses
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Web Development
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Master modern frameworks and technologies
            </p>
            <button
              onClick={() => handleCategoryClick("web")}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center"
            >
              Explore category
              <ChevronRightIcon className="ml-1" fontSize="small" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                <PhoneIphoneIcon className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                25+ Courses
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Mobile Development
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Build iOS and Android applications
            </p>
            <button
              onClick={() => handleCategoryClick("mobile")}
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center"
            >
              Explore category
              <ChevronRightIcon className="ml-1" fontSize="small" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg">
                <BrushIcon className="text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                30+ Courses
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Design
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Learn UI/UX and graphic design
            </p>
            <button
              onClick={() => handleCategoryClick("design")}
              className="text-purple-600 dark:text-purple-400 text-sm font-medium flex items-center"
            >
              Explore category
              <ChevronRightIcon className="ml-1" fontSize="small" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-lg">
                <BarChartIcon className="text-teal-600 dark:text-teal-400" />
              </div>
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                20+ Courses
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Data Science
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Analyze and visualize data
            </p>
            <button
              onClick={() => handleCategoryClick("data")}
              className="text-teal-600 dark:text-teal-400 text-sm font-medium flex items-center"
            >
              Explore category
              <ChevronRightIcon className="ml-1" fontSize="small" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Course List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-10" ref={courseRef}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              {selectedCategory === "all"
                ? "All Courses"
                : `${categories.find((e) => e.id === selectedCategory)?.name}`}
            </h2>

            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center">
                <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                  Sort:
                </span>
                <select className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto space-x-2 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex-none whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          {allLoading || searchLoading ? (
            <div className="flex flex-col justify-center items-center h-64 md:h-96">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">
                Loading courses...
              </p>
            </div>
          ) : (
            <>
              {courses && courses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleCourses.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col transform hover:-translate-y-1"
                      >
                        <div className="relative">
                          {index % 3 === 0 && (
                            <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-md z-10">
                              Featured
                            </div>
                          )}
                          {index % 7 === 0 && (
                            <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-md z-10">
                              New
                            </div>
                          )}
                        </div>
                        <CourseCard item={item} />
                      </div>
                    ))}
                  </div>

                  {visibleCourses.length < courses.length && (
                    <div className="flex justify-center mt-12">
                      <button
                        onClick={loadMoreCourses}
                        className="group bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-200"
                      >
                        <span>Load More Courses</span>
                        <ArrowDownwardIcon className="group-hover:translate-y-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-md border border-gray-100 dark:border-gray-700">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                    <WarningIcon
                      className="text-gray-500 dark:text-gray-400"
                      sx={{ fontSize: 32 }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {searchTitle
                      ? "No matching courses found"
                      : "No courses available"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                    {searchTitle
                      ? "We couldn't find any courses matching your criteria. Try adjusting your search or browse other categories."
                      : "We're working on adding new courses to this category. Please check back soon or explore other categories."}
                  </p>
                  <button
                    onClick={() => handleCategoryClick("all")}
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium"
                  >
                    Browse all courses
                    <ArrowForwardIcon className="ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
