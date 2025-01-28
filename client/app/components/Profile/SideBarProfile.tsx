
"use client";
import { FaUnlockAlt } from "react-icons/fa";
import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assests/download5.png"; 
import { SiCoursera } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

type Props = {
  user: any;
  active: number;
  avatar: string | null; // Add avatar prop
  setActive: (active: number) => void;
  logOutHandler: () => void;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full ">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer  ${
          active === 1 ? "dark:bg-slate-800 bg-slate-900" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        {/* Display the user's avatar or a default image */}
        <Image
          src={avatar || avatarDefault}
          alt="User Avatar"
          width={20}
          height={20}
          className="w-[30px] h-[30px] rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-white">
        My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer  ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <FaUnlockAlt size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer  ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <FaChalkboardTeacher size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={logOutHandler}
      >
        <MdLogout size={20} fill="#fff" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
