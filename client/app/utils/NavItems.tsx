import React, { useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { MdSchool } from "react-icons/md";
import Image from "next/image";
import { MdLiveHelp, MdGavel, MdLogout } from "react-icons/md";
import { FaInfoCircle, FaUnlockAlt, FaChalkboardTeacher } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import avatar from "../../public/assests/download5.png";
import { useSelector } from "react-redux";
import { RiAdminFill } from "react-icons/ri";

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
  user: any;
  setOpen: (open: boolean) => void;
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
};

const NavItems: React.FC<Props> = ({
  activeItem,
  isMobile,
  user,
  setOpen,
  openSidebar,
  setOpenSidebar,
}) => {
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const storeUser = useSelector((state: any) => state.user.user);

  const handleUserIconClick = () => {
    setOpenSidebar(!openSidebar);
    setOpen(true);
  };
  const logOutHandler = async () => {
    await signOut({ redirect: false });
    setLogout(true);
    redirect("/");
  };

  return (
    <div>
      {user ? (
        <div className="hidden 800px:flex space-x-8">
          {NavItemsData.map((i, index) => (
            <Link href={i.url} key={index} passHref>
              <span
                className={`group relative flex items-center transition-all cursor-pointer text-[18px] font-Poppins font-[400] ${
                  activeItem === index
                    ? "text-red-600 dark:text-green-400"
                    : "text-black dark:text-white"
                }`}
              >
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 mr-1">
                    [
                  </span>
                  <span className="group-hover:text-[#2bd576] transition-all duration-300">
                    {i.name}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-1">
                    ]
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="hidden 800px:flex space-x-8">
          {NavItemsData.map((i, index) => (
            <Link href={i.url} key={index} passHref>
              <span
                className={`group relative flex items-center transition-all cursor-pointer text-[18px] font-Poppins font-[400] ${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                }`}
              >
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 mr-1">
                    [
                  </span>
                  <span className="group-hover:text-[#2bd576] transition-all duration-300">
                    {i.name}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-1">
                    ]
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}

      {isMobile &&
        /*when user is  logged in */
        (user ? (
          <div className="flex 800px:hidden mt-7 flex-col items-start scrollbar-hide">
            <div className="w-full text-center py-6">
              <Link href={"/"} passHref>
                <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                  LearnifyHub
                </span>
              </Link>
            </div>

            <details
              className="w-full bg-white dark:bg-slate-900 shadow-lg rounded-lg p-4 overflow-hidden no-scrollbar scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <summary
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                  activeItem === 1
                    ? "bg-blue-100 dark:bg-slate-800"
                    : "hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                <Image
                  src={storeUser?.avatar?.url || avatar}
                  alt="Profile Picture"
                  height={4000}
                  width={3000}
                  className="w-[50] h-[50] cursor-pointer border-[2px] border-[#37a39a] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {user?.name || "Guest"}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    My Account
                  </span>
                </div>
              </summary>

              <div className="pl-6">
                <ul
                  className="space-y-2  scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <Link href="/profile">
                    <li
                      className={`${
                        activeItem === 2
                          ? "text-[crimson] dark:text-[#2bd576]"
                          : "text-black dark:text-white"
                      } flex items-center p-2 rounded-lg cursor-pointer`}
                    >
                      <FaUser size={20} className="mr-2" />
                      Profile
                    </li>
                  </Link>
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

                  <Link href="/profile/changepassword">
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
                  </Link>
                  <Link href="/profile/sessioninformation">
                    <li
                      className={`${
                        activeItem === 2
                          ? "text-[crimson] dark:text-[#2bd576]"
                          : "text-black dark:text-white"
                      } flex items-center p-2 rounded-lg cursor-pointer`}
                    >
                        <RiAdminFill  size={20} className="mr-2" />
                      Device Info
                    </li>
                  </Link>

            
                  <li
                    className={`${
                      activeItem === 4
                        ? "text-[crimson] dark:text-[#2bd576]"
                        : "text-black dark:text-white"
                    } flex items-center p-2 rounded-lg cursor-pointer`}
                    onClick={logOutHandler}
                  >
                    <MdLogout size={20} className="mr-2" />
                    Log Out
                  </li>
                </ul>
              </div>
            </details>

            <Link href={"/"} passHref>
              <span
                className={`${
                  activeItem === 4
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
              >
                <AiFillHome
                  className="mr-3 group-hover:text-[#4CBB17]"
                  size={20}
                />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  Home
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
                </span>
              </span>
            </Link>

            <Link href={"/about"} passHref>
              <span
                className={`${
                  activeItem === 4
                    ? "dark:text-[#2bd576] text-[crimson]"
                    : "dark:text-white text-black"
                } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
              >
                <FaInfoCircle
                  className="mr-3 group-hover:text-[#4CBB17]"
                  size={20}
                />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  About
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
                </span>
              </span>
            </Link>

            <Link href={"/policy"} passHref>
              <span
                className={`${
                  activeItem === 4
                    ? "dark:text-[#2bd576] text-[crimson]"
                    : "dark:text-white text-black"
                } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
              >
                <MdGavel
                  className="mr-3 group-hover:text-[#4CBB17]"
                  size={20}
                />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  Policy
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
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
                <MdLiveHelp
                  className="mr-3 group-hover:text-[#4CBB17]"
                  size={20}
                />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  FAQ
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
                </span>
              </span>
            </Link>
          </div>
        ) : (
          /*when user is not logged in */
          <div className="flex 800px:hidden mt-7 flex-col items-start">
            <div className="w-full text-center py-6">
              <Link href={"/"} passHref>
                <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                  LearnifyHub
                </span>
              </Link>
            </div>

            <Link href={"/"} passHref>
              <span
                className={`${
                  activeItem === 4
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
              >
                <AiFillHome
                  className="mr-3 group-hover:text-[#4CBB17]"
                  size={20}
                />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  Home
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
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
                <MdGroupAdd className="mr-3 group-hover:text-[#4CBB17] " />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  Login to Learn
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
                </span>
              </span>
            </div>

            <Link href={"/about"} passHref>
              <span
                className={`${
                  activeItem === 4
                    ? "dark:text-[#2bd576] text-[crimson]"
                    : "dark:text-white text-black"
                } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
              >
                <FaInfoCircle
                  className="mr-3 group-hover:text-[#4CBB17]"
                  size={20}
                />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  About
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
                </span>
              </span>
            </Link>

            <Link href={"/policy"} passHref>
              <span
                className={`${
                  activeItem === 4
                    ? "dark:text-[#2bd576] text-[crimson]"
                    : "dark:text-white text-black"
                } flex items-center p-2 rounded-lg group text-center text-[20px] px-6 font-Poppins font-[100] mb-4`}
              >
                <MdGavel
                  className="mr-3 group-hover:text-[#4CBB17]"
                  size={20}
                />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  Policy
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
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
                <MdLiveHelp
                  className="mr-3 group-hover:text-[#4CBB17]"
                  size={20}
                />
                <span className="relative group-hover:text-[#4CBB17]">
                  <span className="absolute -left-2 group-hover:opacity-100 opacity-0 transition-all duration-300 mr-2">
                    [{" "}
                  </span>
                  FAQ
                  <span className="absolute -right-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    ]
                  </span>
                </span>
              </span>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NavItems;
