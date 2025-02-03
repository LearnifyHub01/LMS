"use client";
import React, { FC, useEffect, useState } from "react";
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

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [editProfile, { isSuccess, error }] = useEditProfileMutation();
  const [updateAvatar, { isSuccess: success, error: updateError }] =
    useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useLoadUserQuery(undefined, { skip: !loadUser });

  const [logout, setLogout] = useState(false);
  const { data, isLoading: logoutLoading, isSuccess: logoutSuccess, error: logoutError } =
    useLogOutQuery(undefined, {
      skip: !logout, 
    });

  const handleLogOut = () => {
    setLogout(true);
  };

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        updateAvatar(fileReader.result);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      setIsLoading(true); 
      await editProfile({ name });
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-6 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 md:gap-2 max-w-full w-full py-6 md:py-10 flex-1 overflow-hidden">
        {/* Left Side: Profile Card */}
        <div className="w-full md:w-1/3 bg-white dark:bg-[#1e1e2e] shadow-lg rounded-lg p-6 text-center border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center space-y-4">
          {/* Avatar Section */}
          <div className="relative w-32 h-32 mx-auto mt-6">
            <Image
              src={user?.avatar?.url || avtarIcon}
              alt="Profile Picture"
              width={500}
              height={500}
              className="w-full h-full object-cover border-4 border-[#37a39a] rounded-full shadow-md"
            />
            {/* Avatar Upload Button */}
            <label htmlFor="avatar">
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-[#37a39a] rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition">
                <AiOutlineCamera size={18} className="text-white" />
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
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
              {user?.name
                ? user?.name
                    .split(" ")
                    .map(
                      (word: any) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")
                : "User Name"}
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
              {user?.email || "email@example.com"}
            </p>
          </div>
          <div>
            <Link href="/profile/changepassword" passHref>
              <button className="w-full py-3 text-white transition bg-[#37a39a] hover:bg-[#2b8277] flex items-center justify-center space-x-2 rounded-md shadow-md">
                <span className="font-Poppins">Change Password</span>
              </button>
            </Link>
          </div>
          <div>
            <Link href="/profile/viewcourses" passHref>
              <button className="w-full py-3 text-white transition bg-[#37a39a] hover:bg-[#2b8277] flex items-center justify-center space-x-2 rounded-md shadow-md">
                <span className="font-Poppins">View Courses</span>
              </button>
            </Link>
          </div>
          <div>
            <button
              className="w-full py-3 text-white transition bg-[#37a39a] hover:bg-[#2b8277] flex items-center justify-center space-x-2 rounded-md shadow-md"
              onClick={handleLogOut} 
            >
              logout
            </button>
          </div>
        </div>

        {/* Right Side: Edit Profile Form */}
        <div className="bg-gray-100 dark:bg-[#2a2e38] shadow-lg rounded-lg p-6 border border-gray-300 dark:border-gray-700 w-full md:w-2/3 flex-1 overflow-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-white mb-4 text-center">
            Edit Profile
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="relative">
              <label className="block text-gray-700 dark:text-white mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 dark:text-white focus:ring-2 focus:ring-[#37a39a] transition"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
              />
              <FiEdit3 className="absolute right-4 top-10 md:top-11 text-gray-500" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#37a39a] text-white py-3 rounded-md hover:bg-[#2b8277] transition shadow-lg"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <FaSpinner className="animate-spin text-white" size={20} />
                </div>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
