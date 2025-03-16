"use client";
import React, { useState, useEffect, useRef } from "react";
import CourseCard from "../Course/CourseCard";
import {
  useGetUsersCoursesQuery,
  useSearchCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { useSearchParams } from "next/navigation";
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

  const { data: allCoursesData, isLoading: allLoading } = useGetUsersCoursesQuery(
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
          (course:any) => course.category?.toLowerCase() === selectedCategory
        );
      }

      setCourses(filteredCourses);
      setPage(1);
      setVisibleCourses(filteredCourses.slice(0, coursesPerPage));
    }
  }, [allCoursesData, searchData, searchTitle, selectedCategory]);

  const handleCategoryClick = (categoryId:any) => {
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
