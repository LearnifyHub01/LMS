"use client";
import Image from "next/image";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import Image1 from "../../../public/assests/f993a37eb635feef43e96323100d5fa5.png";
import { FaBook } from "react-icons/fa";
import Marquee from "react-fast-marquee";
type Props = {};

const Hero: FC<Props> = () => {
  return (
    <>
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-[#DDE6ED] dark:bg-[#27374D] relative overflow-hidden">
      {/* Marquee Background Text */}
      <div className="absolute top-0 left-0 w-full z-0">
        <Marquee gradient={false} speed={50} direction="left" loop={0} className="marquee-no-scrollbar">
          <span className="select-none whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
            grow daily&nbsp;grow daily&nbsp;grow daily&nbsp;grow daily&nbsp;
          </span>
        </Marquee>
      </div>
      <div className="absolute top-[170px] left-0 w-full z-0">
        <Marquee gradient={false} speed={50} direction="right" loop={0} className="marquee-no-scrollbar">
          <span className="select-none whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
             Stay Focused&nbsp;Stay Focused&nbsp;Stay Focused&nbsp;Stay Focused&nbsp;
          </span>
        </Marquee>
      </div>
      <div className="absolute top-[355px] left-0 w-full z-0">
        <Marquee gradient={false} speed={50} direction="left" loop={0} className="marquee-no-scrollbar">
          <span className="select-none whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
             Master Skills&nbsp;Master Skills&nbsp;Master Skills&nbsp;Master Skills&nbsp;
          </span>
        </Marquee>
      </div>
      <div className="absolute top-[530px] left-0 w-full z-0">
        <Marquee gradient={false} speed={50} direction="right" loop={0} className="marquee-no-scrollbar">
          <span className="select-none whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
             Unlock Potential&nbsp;Unlock Potential&nbsp;Unlock Potential&nbsp;Unlock Potential&nbsp;
          </span>
        </Marquee>
      </div>
   

      {/* Left Side - Image */}
      <div className="image-container z-10">
        <Image
          src={Image1}
          alt="Hero Image"
          className="object-cover select-none w-full h-full rounded-full"
          layout="intrinsic"
          priority
        />
      </div>  

      {/* Right Side - Text & Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left space-y-8 z-10">
        {/* Heading Section */}
        <h1 className="text-4xl select-none lg:text-5xl font-thin text-gray-800 dark:text-white relative">
          Welcome to <span className="relative">LearnifyHub</span>
        </h1>

        {/* Subheading */}
        <p className="lg:text-xl text-gray-600 dark:text-white">
          Elevate your skills, master your goals - start learning now.
        </p>

        {/* Search Bar */}
        <form className="flex w-full items-center max-w-lg">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaBook className="w-5 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ width: "400px" }}
              placeholder="Search Courses..."
              required
            />
          </div>
          <button
            type="submit"
            className="ml-2 mr-16 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FaSearch className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* Trust Statement */}
        <div className="text-center lg:text-left">
          <h5 className="text-lg text-gray-700 dark:text-gray-300">
            500k+ people already trust us.{" "}
            <a
              href="/courses"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              View Courses
            </a>
          </h5>
        </div>
      </div>
    </div>
    </>
  );
};

export default Hero;
