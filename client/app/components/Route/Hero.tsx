import Image from "next/image";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import Image1 from "../../../public/assests/f993a37eb635feef43e96323100d5fa5.png";
import { FaBook } from "react-icons/fa";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-gray-100 dark:bg-gray-900 relative">
      {/* Left Side - Image */}
      <div className="image-container">
        <Image
          src={Image1}
          alt="Hero Image"
          className="object-cover w-full h-full rounded-full"
          layout="intrinsic"
          priority 
        />
      </div>

      {/* Right Side - Text and Search Bar */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-thin text-gray-800 dark:text-white mb-6">
          Welcome to LearnifyHub
        </h1>
        <p className="lg:text-xl text-gray-600 dark:text-white mb-6">
          Elevate your skills, master your goals -  start learning now
        </p>

        <form className="flex w-full items-center max-w-sm mx-auto">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaBook className="w-5 h-6 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            <input
              type="text"
              id="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Courses..."
              required
            />
          </div>
          <button
            type="submit"
            className=" items-center p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FaSearch className="w-3 h-4 dark:text-gray-200" />

            <span className="sr-only">Search</span>
          </button>
        </form>
        <br />
        <div>
          <h5></h5>
        </div>
      </div>
    </div>
  );
};

export default Hero;
