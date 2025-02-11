"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import avtarIcon from "../../../public/assests/download5.png";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";
import { setUser } from "@/redux/features/user/userSlice";
import { MdVerified } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "next-auth/react";

type Props = {
  user: any;
};

const ProfileInfo: FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const storeUser = useSelector((state: RootState) => state.user.user);
  console.log(storeUser);

  const [name, setName] = useState(storeUser?.name || "");
  const [avatar, setAvatar] = useState(storeUser?.avatar?.url || avtarIcon);
  const [editProfile, { isSuccess, error }] = useEditProfileMutation();
  const [updateAvatar, { isSuccess: success, error: updateError }] =
    useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useLoadUserQuery(undefined, { skip: !loadUser });
  const [logout, setLogout] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    // Automatically close the sidebar on larger screens
    const handleResize = () => {
      if (window.innerWidth > 800 && openSidebar) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar]);

  const {
    data,
    isLoading: logoutLoading,
    isSuccess: logoutSuccess,
    error: logoutError,
  } = useLogOutQuery(undefined, {
    skip: !logout,
  });

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    setLogout(true);
  };

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    console.log("file", fileReader);
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const updateUrl = await updateAvatar(fileReader.result).unwrap();
        dispatch(setUser(updateUrl.user));
        setAvatar(updateUrl.user.avatar.url);
      }
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
      toast.success("Profile Updated Successfully!");
      setIsLoading(false);
    }
  }, [isSuccess, success]);

  useEffect(() => {
    if (logoutSuccess) {
      toast.success("Logged out successfully!");
    } else if (logoutError) {
      toast.error("Logout failed. Please try again.");
    }
  }, [logoutSuccess, logoutError]);

  useEffect(() => {
    if (storeUser?.name) {
      setName(storeUser.name);
    }
  }, [storeUser?.name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || name === storeUser?.name) return; // Prevent unnecessary updates

    try {
      const updatedUser = await editProfile({ name }).unwrap();

      dispatch(setUser(updatedUser.user));
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className=" flex-col min-h-screen overflow-hidden bg-white dark:bg-[#27374D] flex items-center justify-center">
      {/* Main Box Container */}
      <div className="max-w-[1400px] top-0 w-full border border-gray-300 dark:border-gray-700  bg-white dark:bg-[#27374D] flex">
        {/* Left Side: Profile Card (Full Height) */}
        <div className="w-[30%] border-r border-gray-300 dark:border-gray-700 p-4 flex flex-col h-full">
          <div className="w-full text-center flex flex-col items-center justify-start space-y-4">
            {/* Avatar Section */}
            <div className="relative w-20 top-2 h-20 mx-auto">
              <Image
                src={avatar || avtarIcon}
                alt="Profile Picture"
                width={500}
                height={500}
                className="w-full h-full object-cover border-2 border-[black] rounded-full shadow-lg"
              />
              {/* Avatar Upload Button */}
              <label htmlFor="avatar">
                <div
                  className="absolute bottom-1 right-1 w-6 h-6 bg-gradient-to-br from-[#37a39a] to-[#2b8277] 
             rounded-full flex items-center justify-center cursor-pointer shadow-md 
             hover:scale-110 hover:shadow-lg transition duration-300 ease-in-out transform active:scale-95"
                >
                  <AiOutlineCamera size={16} className="text-white" />
                </div>
              </label>
              <input
                type="file"
                id="avatar"
                className="hidden"
                onChange={imageHandler}
                accept="image/*"
              />
            </div>

            {/* Profile Information */}
            <div className="text-center space-y-2">
              {/* Name + Verified Icon */}
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-xl md:text-2xl font-semibold text-black">
                  {storeUser?.name
                    ? storeUser?.name
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    : "User Name"}
                </h2>
                {user.role === "admin" && (
                  <MdVerified className="text-blue-500 text-xl md:text-2xl" />
                )}
              </div>

              {/* Email */}
            </div>

            {/* Links & Buttons */}
            {/* Links & Buttons */}
            <div className="flex flex-col w-full space-y-6">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="group flex mt-6 items-center gap-1 px-0 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
                >
                  <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
                    Admin Dashboard
                  </span>
                </Link>
              )}
              <Link
                href="/profile/viewcourses"
                className="group flex -mt-1 items-center gap-1 px-0 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
              >
                <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
                  Enrolled Courses
                </span>
              </Link>
              <Link
                href="/profile/changepassword"
                className="group flex mt-0 items-center gap-1 px-0 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
              >
                <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
                  Change Password
                </span>
              </Link>

              <Link
                href="/profile/sessioninformation"
                className="group flex mt-0 items-center gap-1 px-0 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
              >
                <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
                  Device Info
                </span>
              </Link>

              <button
                className="w-full flex rounded-md items-center justify-center gap-3 px-6 py-3 hover:bg-gray-400 text-white bg-gray-700 hover:bg--gray-400 hover:shadow-xl active:scale-95"
                onClick={handleLogOut}
              >
                {logoutLoading ? (
                  <FaSpinner className="animate-spin text-lg" />
                ) : (
                  <>
                    <div className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </>
                )}
              </button>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>

        {/* Right Side: Edit Profile (Upper Part) & Full Name (Lower Part) */}
        <div className="w-full flex flex-col">
          {/* Upper Part: Edit Profile */}
          <div className="border-b mt-4 border-gray-300 dark:border-gray-700 p-4 text-center w-full">
            <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-white">
              Profile
            </h3>
            <p className="text-gray-700 dark:text-white">
              Add information about yourself
            </p>
          </div>

          {/* Lower Part: Full Name Input & Update Button */}
          <div className="p-6 w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div className="relative flex flex-col ">
                <label className="block ml-20 font-bold text-gray-700 dark:text-white mb-1">
                  Basics:
                </label>
                <input
                  type="text"
                  className="w-[80%] mt-2 items-center mx-auto justify-center bg-white border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 focus:ring-1 focus:outline-dotted transition"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                />
                <FiEdit3 className="absolute ml-[880px] mt-2 md:top-11 text-gray-500" />
                <input
                  type="text"
                  className="cursor-not-allowed w-[80%] mt-2 mx-auto bg-gray-200 dark:bg-gray-600 border border-gray-400 rounded-md p-3 text-gray-500 focus:outline-none transition"
                  placeholder="Email Address"
                  value={user?.email || "email@example.com"}
                  readOnly
                />
              </div>

              <button
                type="submit"
                className="w-[15%] ml-20 mt-[20%] rounded-md bg-gray-700 text-white py-3 hover:bg-gray-400 shadow-lg"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin text-white" size={20} />
                ) : (
                  "SAVE"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
