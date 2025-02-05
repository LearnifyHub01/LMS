// import { styles } from "@/app/styles/style";
// import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
// import React, { FC, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"; // Import Eye Icons

// type Props = {
//   user: any;
// };

// const ChangePassword: FC<Props> = ({ user }) => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPasword] = useState("");
//   const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const passwordChangeHandler = async (e: any) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//     } else {
//       await updatePassword({ oldPassword, newPassword });
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Password changed successfully");
//     }
//     if (error) {
//       if ("data" in error) {
//         const erroData = error as any;
//         toast.error(erroData.data.message);
//       }
//     }
//   }, [isSuccess, error]);

//   return (
//     <div className="w-full px-6 py-8 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md mt-5">
//       <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
//         Change Password
//       </h1>
//       <form onSubmit={passwordChangeHandler} className="flex flex-col gap-6">
//         {/* Old Password Field */}
//         <div className="flex flex-col gap-2 relative">
//           <label className="text-lg font-medium text-gray-800 dark:text-white">
//             Enter your old Password
//           </label>
//           <input
//             type={showOldPassword ? "text" : "password"} // Toggle password visibility
//             className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             required
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//           />
//           {/* Eye icon to toggle visibility */}
          // {showOldPassword ? (
          //   <AiOutlineEye
          //     className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
          //     size={20}
          //     onClick={() => setShowOldPassword(!showOldPassword)}
          //   />
          // ) : (
          //   <AiOutlineEyeInvisible
          //     className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
          //     size={20}
          //     onClick={() => setShowOldPassword(!showOldPassword)}
          //   />
          // )}
//         </div>

//         {/* New Password Field */}
//         <div className="flex flex-col gap-2 relative">
//           <label className="text-lg font-medium text-gray-800 dark:text-white">
//             Enter your new Password
//           </label>
//           <input
//             type={showNewPassword ? "text" : "password"} // Toggle password visibility
//             className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             required
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           {/* Eye icon to toggle visibility */}
//           {showNewPassword ? (
//             <AiOutlineEye
//               className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
//               size={20}
//               onClick={() => setShowNewPassword(!showNewPassword)}
//             />
//           ) : (
//             <AiOutlineEyeInvisible
//               className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
//               size={20}
//               onClick={() => setShowNewPassword(!showNewPassword)}
//             />
//           )}
//         </div>

//         {/* Confirm New Password Field */}
//         <div className="flex flex-col gap-2 relative">
//           <label className="text-lg font-medium text-gray-800 dark:text-white">
//             Confirm your new Password
//           </label>
//           <input
//             type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
//             className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             required
//             value={confirmPassword}
//             onChange={(e) => setConfirmPasword(e.target.value)}
//           />
//           {/* Eye icon to toggle visibility */}
//           {showConfirmPassword ? (
//             <AiOutlineEye
//               className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
//               size={20}
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             />
//           ) : (
//             <AiOutlineEyeInvisible
//               className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
//               size={20}
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             />
//           )}
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center mt-6">
//           <input
//             type="submit"
//             className="w-full py-3 bg-[#37a39a] text-white rounded-md hover:bg-[#2d8f7b] transition duration-300 focus:outline-none"
//             value="Update"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;
'use client'
import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"; // Import Eye Icons
import Image from "next/image";
import avtarIcon from "@/public/assests/download5.png";
import { FaChalkboardTeacher, FaSignOutAlt, FaSpinner } from "react-icons/fa"
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { motion } from "framer-motion";
import { RiAdminFill } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import { signOut } from "next-auth/react";

type Props = {
  user: any;
};

const TARGET_TEXT = "Change Password";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

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
      className="group relative px-4 w-full py-2 font-medium dark: text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300"
    >
      <div className="relative z-10 flex items-center gap-2">
        <FiLock/>
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

const ChangePassword: FC<Props> = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading,setLoading] = useState(false)
  const [logout, setLogout] = useState(false);
  const [openSidebar,setOpenSidebar] = useState(false)


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



  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      setLoading(true);
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
      setLoading(false);
    }
    if (error) {
      if ("data" in error) {
        const erroData = error as any;
        toast.error(erroData.data.message);
        setLoading(false)
      }
    }
  }, [isSuccess, error]);

  return (
<div className="flex flex-col min-h-screen overflow-hidden bg-gray-100 dark:bg-[#121212]">
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 max-w-full w-full md:py-0 flex-1">
        {/* Profile Section */}
        <div
          className={`w-full md:w-[300px] bg-gray-700 dark:bg-[#1e1e2e] shadow-xl p-6 text-center border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-start space-y-4 ${
            openSidebar ? "block" : "hidden md:block"
          }`}
        >
          {/* Avatar Section */}
          <div className="relative w-20 h-20 mx-auto">
            <Image
              src={user.avatar.url || avtarIcon}
              alt="Profile Picture"
              width={500}
              height={500}
              className="w-full h-full object-cover border-2 border-[#37a39a] rounded-full shadow-lg"
            />
          </div>

          {/* Profile Information */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-1">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-1000 text-white">
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
              {user.role == "admin" && (
                <MdVerified className="text-blue-500 text-lg md:text-xl " />
              )}
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              {user?.email || "email@example.com"}
            </p>
            <br />
          </div>

          {/* Links */}
          <div className="flex w-full mt-4">
            {user.role === "admin" && (
              <Link href="/admin" passHref>
                <button className="group relative flex items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                  <RiAdminFill size={20} />
                  <span>Admin Dashboard</span>
                </button>
              </Link>
            )}
          </div>

          <div className="flex w-full mt-4">
            <Link href="/profile/viewcourses" passHref>
              <button className="group relative flex items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                <FaChalkboardTeacher size={20} />
                <span>Enrolled Courses</span>
              </button>
            </Link>
          </div>

          <div>
            <Link href="/profile/changepassword" passHref>
              <EncryptButton />
            </Link>
          </div>

          <div className="flex w-full mt-4">
            <Link href="/profile/sessioninformation" passHref>
              <button className="group relative flex jus items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                <RiAdminFill size={20} />
                <span>Device Info</span>
              </button>
            </Link>
          </div>

          <div>
            <button
              className="w-full flex items-center justify-center gap-3 px-6 py-3 text-white bg-[#37a39a] rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-[#2b8277] hover:scale-105 hover:shadow-xl active:scale-95"
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

        {/* Password Change Section */}
        <div className="bg-gray-100 dark:bg-[#2a2e38] shadow-xl p-6 border border-gray-300 dark:border-gray-700 w-full md:w-2/3 flex-1 overflow-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-white mb-4 text-center">
            Change Password
          </h3>
          <form onSubmit={passwordChangeHandler} className="space-y-4">
            {/* Old Password Field */}
            <div className="relative">
              <label className="block text-gray-700 dark:text-white mb-1">
                Enter old password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 dark:text-white focus:ring-2 focus:ring-[#37a39a] transition"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Your old password"
              />
              {showOldPassword ? (
                <AiOutlineEye
                  className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
                  size={20}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
                  size={20}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                />
              )}
            </div>

            {/* New Password Field */}
            <div className="relative">
              <label className="block text-gray-700 dark:text-white mb-1">
                Enter new password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 dark:text-white focus:ring-2 focus:ring-[#37a39a] transition"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Your new password"
              />
              {showNewPassword ? (
                <AiOutlineEye
                  className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
                  size={20}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
                  size={20}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-gray-700 dark:text-white mb-1">
                Enter confirm password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 dark:text-white focus:ring-2 focus:ring-[#37a39a] transition"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPasword(e.target.value)}
                placeholder="Your confirm password"
              />
              {showConfirmPassword ? (
                <AiOutlineEye
                  className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
                  size={20}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
                  size={20}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#37a39a] text-white py-3 rounded-md hover:bg-[#2b8277] transition shadow-lg"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <FaSpinner className="animate-spin text-white" size={20} />
                </div>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  
  
  );
};

export default ChangePassword;
