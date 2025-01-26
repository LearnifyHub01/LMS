import React from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { MdLiveHelp } from "react-icons/md";
import { MdGavel } from "react-icons/md";

export const NavItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      {/* <div className="hidden 800px:flex">
        {NavItemsData.map((i, index) => (
          <Link href={i.url} key={index} passHref>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-[400]`}
            >
              {i.name}
            </span>
          </Link>
        ))}
      </div> */}
      <div className="hidden 800px:flex space-x-8">
        {NavItemsData.map((i, index) => (
          <Link href={i.url} key={index} passHref>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              } relative text-[18px] font-Poppins font-[400] cursor-pointer transition-all ease-in-out
        before:content-[''] before:absolute before:h-[2px] before:w-0 before:bottom-0 before:left-0 before:bg-[#2bd576]
        before:transition-all before:ease-in-out before:duration-300 hover:before:w-full`}
              style={i.name === "FAQ" ? { marginRight: "20px" } : {}}
            >
              {i.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      {/* {isMobile && (
        <div className="flex 800px:hidden mt-7 flex-col items-start">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                LearnifyHub
              </span>
            </Link>
          </div>
          {NavItemsData.map((i, index) => (
            <Link href={i.url} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white group text-center text-[20px] px-6 font-Poppins font-[400] mb-4`}
              >
                {i.name}
              </span>
            </Link>
          ))}
        </div>
      )} */}

      {isMobile && (
        <div className="flex 800px:hidden mt-7 flex-col items-start">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                LearnifyHub
              </span>
            </Link>
          </div>

          <Link href={"/"} passHref>
            <span
              className={`${
                activeItem === 1
                  ? "dark:text-[#2bd576] text-[crimson]"
                  : "dark:text-white text-black"
              } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
            >
              <AiFillHome className="mr-2" size={20} />
              <span className="relative">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2bd576] group-hover:w-full transition-all duration-300"></span>
              </span>
            </span>
          </Link>

          <Link href={"/courses"} passHref>
            <span
              className={`${
                activeItem === 1
                  ? "dark:text-[#2bd576] text-[crimson]"
                  : "dark:text-white text-black"
              } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
            >
              <MdSchool className="mr-2" size={20} />
              <span className="relative">
                Courses
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2bd576] group-hover:w-full transition-all duration-300"></span>
              </span>
            </span>
          </Link>

          <Link href={"/about"} passHref>
            <span
              className={`${
                activeItem === 2
                  ? "dark:text-[#2bd576] text-[crimson]"
                  : "dark:text-white text-black"
              } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
            >
              <FaInfoCircle className="mr-2" size={20} />
              <span className="relative">
                About
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2bd576] group-hover:w-full transition-all duration-300"></span>
              </span>
            </span>
          </Link>

          <Link href={"/policy"} passHref>
            <span
              className={`${
                activeItem === 3
                  ? "dark:text-[#2bd576] text-[crimson]"
                  : "dark:text-white text-black"
              } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
            >
              <MdGavel className="mr-2" size={20} />
              <span className="relative">
                Policy
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2bd576] group-hover:w-full transition-all duration-300"></span>
              </span>
            </span>
          </Link>

          <Link href={"/faq"} passHref>
            <span
              className={`${
                activeItem === 4
                  ? "dark:text-[#2bd576] text-[crimson]"
                  : "dark:text-white text-black"
              } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
            >
              <MdLiveHelp className="mr-2" size={20} />
              <span className="relative">
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2bd576] group-hover:w-full transition-all duration-300"></span>
              </span>
            </span>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavItems;
