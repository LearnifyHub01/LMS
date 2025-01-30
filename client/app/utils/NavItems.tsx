import React, { useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { MdSchool } from "react-icons/md";
 import Image from "next/image";
 import { MdLiveHelp, MdGavel, MdLogout } from "react-icons/md";
 import  avatarDefault  from  "../../public/assests/download5.png"; 
 import { FaInfoCircle, FaUnlockAlt, FaChalkboardTeacher } from "react-icons/fa";

export const NavItemsData = [
  { name: "Home", url: "/" },
  { name: "My Account", url: "/profile" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  user: any;
  setOpen: (open: boolean) => void;
  openSidebar: boolean,
  setOpenSidebar: (open: boolean) => void 
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile, user, setOpen,openSidebar,setOpenSidebar }) => {
  
  const handleUserIconClick = () => {
    setOpenSidebar(!openSidebar);
    setOpen(true);
  };
  return (
    <>
      {user ? (
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
      ) : (
        <div className="hidden 800px:flex space-x-8">
          {NavItemsData.filter((i) => !(i.name === "My Account")).map(
            (i, index) => (
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
            )
          )}
        </div>
      )}

      {isMobile &&
      /*when user is  logged in */
        (user ? (
          
          <div className="flex 800px:hidden mt-7 flex-col items-start">
          {/* LearnifyHub section */}
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                LearnifyHub
              </span>
            </Link>
          </div>
        
          {/* My Account Section */}
          <div className="group w-full">
            <summary
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                activeItem === 1
                  ? "bg-blue-100 dark:bg-slate-800"
                  : "hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <Image
                src={user?.avatar?.url || avatarDefault}
                alt="User Avatar"
                width={20}
                height={20}
                className="w-[30px] h-[30px] rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {user?.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">My Account</span>
              </div>
            </summary>
        
            {/* Dropdown content will show on hover */}
            <div className="pl-6 max-h-[250px] overflow-auto group-hover:block hidden">
              <ul className="space-y-2">
                <li
                  className={`${
                    activeItem === 2
                      ? "text-[crimson] dark:text-[#2bd576]"
                      : "text-black dark:text-white"
                  } flex items-center p-2 rounded-lg cursor-pointer`}
                >
                  <FaUnlockAlt size={20} className="mr-2" />
                  Change Password
                </li>
                <li
                  className={`${
                    activeItem === 3
                      ? "text-[crimson] dark:text-[#2bd576]"
                      : "text-black dark:text-white"
                  } flex items-center p-2 rounded-lg cursor-pointer`}
                >
                  <FaChalkboardTeacher size={20} className="mr-2" />
                  Enrolled Courses
                </li>
                <li
                  className={`${
                    activeItem === 4
                      ? "text-[crimson] dark:text-[#2bd576]"
                      : "text-black dark:text-white"
                  } flex items-center p-2 rounded-lg cursor-pointer`}
                >
                  <MdLogout size={20} className="mr-2" />
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        </div>
        ) : (
          /*when user is not logged in */
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
            <div onClick={handleUserIconClick}>
              <span
                className={`${
                  activeItem === 1
                    ? "dark:text-[#2bd576] text-[crimson]"
                    : "dark:text-white text-black"
                } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4 cursor-pointer`}
              >
                <MdSchool className="mr-2" size={20} />
                <span className="relative">
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2bd576] group-hover:w-full transition-all duration-300"></span>
                </span>
              </span>
            </div>

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
        ))}
    </>
  );
};

 export default NavItems;
