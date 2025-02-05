// "use client";
// import React, { FC, useEffect, useState } from "react";
// import Image from "next/image";
// import { AiOutlineCamera } from "react-icons/ai";
// import { FiEdit3 } from "react-icons/fi";
// import avtarIcon from "../../../public/assests/download5.png";
// import {
//   useEditProfileMutation,
//   useUpdateAvatarMutation,
// } from "@/redux/features/user/userApi";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import toast from "react-hot-toast";
// import { FaSpinner } from "react-icons/fa";
// import Link from "next/link";
// import { useLogOutQuery } from "@/redux/features/auth/authApi";

// type Props = {
//   avatar: string | null;
//   user: any;
// };

// const ProfileInfo: FC<Props> = ({ avatar, user }) => {
//   const [name, setName] = useState(user?.name || "");
//   const [editProfile, { isSuccess, error }] = useEditProfileMutation();
//   const [updateAvatar, { isSuccess: success, error: updateError }] =
//     useUpdateAvatarMutation();
//   const [loadUser, setLoadUser] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   useLoadUserQuery(undefined, { skip: !loadUser });

//   const [logout, setLogout] = useState(false);
//   const { data, isLoading: logoutLoading, isSuccess: logoutSuccess, error: logoutError } =
//     useLogOutQuery(undefined, {
//       skip: !logout,
//     });

//   const handleLogOut = () => {
//     setLogout(true);
//   };

//   const imageHandler = async (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const fileReader = new FileReader();
//     fileReader.onload = () => {
//       if (fileReader.readyState === 2) {
//         updateAvatar(fileReader.result);
//       }
//     };
//     fileReader.readAsDataURL(file);
//   };

//   useEffect(() => {
//     if (isSuccess || success) {
//       setLoadUser(true);
//       toast.success("Profile Updated Successfully!");
//       setIsLoading(false);
//     }
//   }, [isSuccess, success]);

//   useEffect(() => {
//     if (logoutSuccess) {
//       toast.success("Logged out successfully!");
//     } else if (logoutError) {
//       toast.error("Logout failed. Please try again.");
//     }
//   }, [logoutSuccess, logoutError]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (name !== "") {
//       setIsLoading(true);
//       await editProfile({ name });
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen px-6 overflow-hidden">
//       <div className="flex flex-col md:flex-row gap-6 md:gap-2 max-w-full w-full py-6 md:py-10 flex-1 overflow-hidden">
//         {/* Left Side: Profile Card */}
//         <div className="w-full md:w-1/3 bg-white dark:bg-[#1e1e2e] shadow-lg rounded-lg p-6 text-center border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center space-y-4">
//           {/* Avatar Section */}
//           <div className="relative w-32 h-32 mx-auto mt-6">
//             <Image
//               src={user?.avatar?.url || avtarIcon}
//               alt="Profile Picture"
//               width={500}
//               height={500}
//               className="w-full h-full object-cover border-4 border-[#37a39a] rounded-full shadow-md"
//             />
//             {/* Avatar Upload Button */}
//             <label htmlFor="avatar">
//               <div className="absolute bottom-2 right-2 w-8 h-8 bg-[#37a39a] rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition">
//                 <AiOutlineCamera size={18} className="text-white" />
//               </div>
//             </label>
//             <input
//               type="file"
//               id="avatar"
//               className="hidden"
//               onChange={imageHandler}
//               accept="image/*"
//             />
//           </div>

//           {/* Profile Information */}
//           <div className="text-center space-y-2">
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
//               {user?.name
//                 ? user?.name
//                     .split(" ")
//                     .map(
//                       (word: any) =>
//                         word.charAt(0).toUpperCase() + word.slice(1)
//                     )
//                     .join(" ")
//                 : "User Name"}
//             </h2>
//             <p className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
//               {user?.email || "email@example.com"}
//             </p>
//           </div>
//           <div>
//             <Link href="/profile/changepassword" passHref>
//               <button className="w-full py-3 text-white transition bg-[#37a39a] hover:bg-[#2b8277] flex items-center justify-center space-x-2 rounded-md shadow-md">
//                 <span className="font-Poppins">Change Password</span>
//               </button>
//             </Link>
//           </div>
//           <div>
//             <Link href="/profile/viewcourses" passHref>
//               <button className="w-full py-3 text-white transition bg-[#37a39a] hover:bg-[#2b8277] flex items-center justify-center space-x-2 rounded-md shadow-md">
//                 <span className="font-Poppins">View Courses</span>
//               </button>
//             </Link>
//           </div>
//           <div>
//             <button
//               className="w-full py-3 text-white transition bg-[#37a39a] hover:bg-[#2b8277] flex items-center justify-center space-x-2 rounded-md shadow-md"
//               onClick={handleLogOut}
//             >
//               logout
//             </button>
//           </div>
//         </div>

//         {/* Right Side: Edit Profile Form */}
//         <div className="bg-gray-100 dark:bg-[#2a2e38] shadow-lg rounded-lg p-6 border border-gray-300 dark:border-gray-700 w-full md:w-2/3 flex-1 overflow-auto">
//           <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-white mb-4 text-center">
//             Edit Profile
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Full Name Field */}
//             <div className="relative">
//               <label className="block text-gray-700 dark:text-white mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 dark:text-white focus:ring-2 focus:ring-[#37a39a] transition"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Your Full Name"
//               />
//               <FiEdit3 className="absolute right-4 top-10 md:top-11 text-gray-500" />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-[#37a39a] text-white py-3 rounded-md hover:bg-[#2b8277] transition shadow-lg"
//             >
//               {isLoading ? (
//                 <div className="flex justify-center items-center">
//                   <FaSpinner className="animate-spin text-white" size={20} />
//                 </div>
//               ) : (
//                 "Update Profile"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;
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
import { FaSpinner, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";
import {setUser} from '@/redux/features/user/userSlice'
import { MdVerified } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const TARGET_TEXT = "Change Password";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

type Props = {
  user: any;
};

const EncryptButton = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join(" ");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group relative px-4 py-2 w-full font-medium dark: text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300"
    >
      <div className="relative z-10 flex items-center gap-2">
        <FiLock />
        <span>{text}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

const ProfileInfo: FC<Props> = ({user}) => {
  const dispatch = useDispatch()
  const storeUser = useSelector((state: RootState) => state.user.user);
  console.log(storeUser)

  const [name, setName] = useState(storeUser?.name || "");
  const [avatar,setAvatar]= useState(storeUser?.avatar?.url || avtarIcon )
  const [editProfile, { isSuccess, error }] = useEditProfileMutation();
  const [updateAvatar, { isSuccess: success, error: updateError }] =useUpdateAvatarMutation();
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

  const handleLogOut = async() => {
     await signOut({redirect:false});
      setLogout(true);
  };

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    console.log('file',fileReader)
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
         const updateUrl = await updateAvatar(fileReader.result).unwrap(); 
         dispatch(setUser(updateUrl.user))
         setAvatar(updateUrl.user.avatar.url)
        
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
      
      dispatch(setUser(updatedUser.user)); // ✅ Update Redux state only on submit
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen  overflow-hidden bg-gray-100 dark:bg-[#121212]">
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 max-w-full w-full md:py-0 flex-1">
        {/* Left Side: Profile Card */}
        <div
          className={`w-full md:w-[300px] bg-gray-700 dark:bg-[#1e1e2e] shadow-xl p-6 text-center border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-start space-y-4 ${
            openSidebar ? "block" : "hidden md:block"
          }`}
        >
          {/* Avatar Section */}
          <div className="relative w-20 h-20 mx-auto">
            <Image
              src={avatar || avtarIcon}
              alt="Profile Picture"
              width={500}
              height={500}
              className="w-full h-full object-cover border-2 border-[#37a39a] rounded-full shadow-lg"
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
            <div className="flex items-center justify-center gap-1">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-1000 text-white">
                {storeUser?.name
                  ? storeUser?.name
                      .split(" ")
                      .map(
                        (word: any) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  : "User Name"}
              </h2>
              {user.role == "admin" && (
                <MdVerified className="text-blue-500 text-lg md:text-xl " />
              )}
            </div>
            <p className="  text-gray-300 text-sm md:text-base">
              {user?.email || "email@example.com"}
            </p>
            <br />
          </div>

          <div className="flex w-full  mt-4">
            {user.role === "admin" && (
              <Link href="/admin" passHref>
                <button className="group relative flex items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                  <RiAdminFill size={20} />
                  <span>Admin Dashboard</span>
                </button>
              </Link>
            )}
          </div>
          <div className="flex  w-full  mt-4">
            <Link href="/profile/viewcourses" passHref>
              <button className="group relative flex items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                <FaChalkboardTeacher size={20} />
                <span>Enrolled Courses</span>

                {/* Hover Borders (Only visible on hover) */}
              </button>
            </Link>
          </div>
          <div>
            <Link href="/profile/changepassword" passHref>
              <EncryptButton />
            </Link>
          </div>
         
          <div className="flex w-full   mt-4">
           
              <Link href="/profile/sessioninformation" passHref>
                <button className="group relative  flex jus items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                  <RiAdminFill size={20} />
                  <span>Device Info</span>
                </button>
              </Link>
           
          </div>
          

          <div>
            <button
              className="w-full flex items-center justify-center gap-3 px-6 py-3 
               text-white bg-[#37a39a] rounded-lg shadow-lg transition 
               duration-300 ease-in-out transform hover:bg-[#2b8277] 
               hover:scale-105 hover:shadow-xl active:scale-95"
              onClick={handleLogOut}
            >
              {logoutLoading ? (
                <FaSpinner className="animate-spin text-lg" />
              ) : (
                <>
                  <FaSignOutAlt className="text-lg" />
                  <span className="font-medium">Logout</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Edit Profile Form */}
      
        <div className="bg-gray-100 dark:bg-[#2a2e38] shadow-xl p-6 border border-gray-300 dark:border-gray-700 w-full md:w-2/3 flex-1 overflow-auto">
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
                className="w-full bg-white  border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700  focus:ring-2 focus:ring-[#37a39a] transition"
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
              className="w-full bg-[#37a39a] text-white py-3 rounded-md hover:bg-[#2b8277] transition shadow-lg mt-4"
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

export default ProfileInfo;
