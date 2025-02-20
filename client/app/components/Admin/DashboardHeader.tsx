
'use client'
import React, { FC, useState, useRef, useEffect } from "react";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { IoNotificationsOutline } from "react-icons/io5";
import Header from './Header'

type Props = {};

const DashboardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current && 
        !notificationRef.current.contains(event.target as Node) && 
        notificationButtonRef.current && 
        !notificationButtonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex items-center justify-end p-1 fixed top-6 right-8">
    {/* Left Side (Header) */}
   
  
    {/* Right Side (ThemeSwitcher & Notifications) */}
    <div className="flex items-center gap-4">
      <ThemeSwitcher />
      <div
        ref={notificationButtonRef}
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)} 
      >
        <IoNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-blue-600 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
    </div>
  
    {/* Notifications Dropdown */}
    {open && (
      <div
        ref={notificationRef}
        className="w-[350px] h-[50vh] shadow-xl top-16 z-10 absolute right-0 bg-white dark:bg-gray-800 rounded-lg p-4"
      >
        <h5 className="text-center text-[20px] font-Poppins font-semibold p-3 text-gray-700 dark:text-white border-b border-gray-300 dark:border-gray-600">
          Notifications
        </h5>
        <div className="mt-3 space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-800 dark:text-gray-300">
              New Question Received
            </p>
            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Mark as read
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default DashboardHeader;
