// "use client";
// import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
// import React, { FC, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"; // Import Eye Icons
// import Image from "next/image";
// import avtarIcon from "@/public/assests/download5.png";
// import { FaSpinner } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";
// import Link from "next/link";

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
//   const [loading, setLoading] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);

//   useEffect(() => {
//     // Automatically close the sidebar on larger screens
//     const handleResize = () => {
//       if (window.innerWidth > 800 && openSidebar) {
//         setOpenSidebar(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [openSidebar]);

//   const passwordChangeHandler = async (e: any) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//     } else {
//       setLoading(true);
//       await updatePassword({ oldPassword, newPassword });
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPasword("");
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Password changed successfully");
//       setLoading(false);
//     }
//     if (error) {
//       if ("data" in error) {
//         const erroData = error as any;
//         toast.error(erroData.data.message);
//         setLoading(false);
//       }
//     }
//   }, [isSuccess, error]);

//   return (
//     <div className=" flex-col min-h-screen overflow-hidden bg-white dark:bg-[#27374D] flex items-center justify-center">
//       {/* Main Box Container */}
//       <div className="max-w-[1400px] top-0 w-full border border-gray-300 dark:border-gray-700  bg-white dark:bg-[#27374D] flex">
//         {/* Left Side: Profile Card (Full Height) */}
//         <div className="w-[30%] border-r bg-blue-300 border-gray-300 dark:border-gray-700 p-4 flex flex-col h-full">
//           <div className="w-full text-center flex flex-col items-center justify-start space-y-4">
//             {/* Avatar Section */}
//             <div className="relative w-20 top-2 h-20 mx-auto">
//               <Image
//                 src={user?.avatar?.url || avtarIcon}
//                 alt="Profile Picture"
//                 width={500}
//                 height={500}
//                 className="w-full h-full object-cover border-2 border-[black] rounded-full shadow-lg"
//               />
//             </div>

//             {/* Profile Information */}
//             <div className="text-center space-y-2">
//               <div className="flex items-center justify-center gap-1">
//                 <h2 className="text-xl md:text-2xl font-semibold text-gray-1000 text-black">
//                   {user?.name
//                     ? user?.name
//                         .split(" ")
//                         .map(
//                           (word: any) =>
//                             word.charAt(0).toUpperCase() + word.slice(1)
//                         )
//                         .join(" ")
//                     : "User Name"}
//                 </h2>
//                 {user.role == "admin" && (
//                   <MdVerified className="text-blue-500 text-lg md:text-xl " />
//                 )}
//               </div>
//             </div>

//             {/* Links & Buttons */}
//             <div className="flex flex-col w-full space-y-3">
//               <Link
//                 href="/profile"
//                 className="group flex mt-6 items-center gap-1 px-0 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//               >
//                 <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                   Profile
//                 </span>
//               </Link>

//               {user.role === "admin" && (
//                 <Link
//                   href="/admin"
//                   passHref
//                   className="group flex items-center gap-1 px-0 py-2 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//                 >
//                   <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                     Admin Dashboard
//                   </span>
//                 </Link>
//               )}

//               <Link
//                 href="/profile/viewcourses"
//                 passHref
//                 className="group flex items-center gap-1 px-0 py-2 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//               >
//                 <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                   Enrolled Courses
//                 </span>
//               </Link>

//               <Link
//                 href="/profile/changepassword"
//                 passHref
//                 className="group flex items-center gap-1 px-0 py-2 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//               >
//                 <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                   Change password
//                 </span>
//               </Link>

//               <Link
//                 href="/profile/sessioninformation"
//                 passHref
//                 className="group flex items-center gap-1 px-0 py-2 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//               >
//                 <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                   Device Info.
//                 </span>
//               </Link>
//             </div>
//             <br />
//             <br />
//             <br />
//             <br />
//           </div>
//         </div>

//         {/* Right Side: Change Password Form */}
//         <div className="w-full flex flex-col">
//           {/* Header Section */}
//           <div className="border-b mt-4 border-gray-300 dark:border-gray-700 p-4 text-center w-full">
//             <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-white">
//               Change Password
//             </h3>
//             Update your password securely
//           </div>

//           {/* Form Section */}
//           <div className="p-6 w-full">
//             <form onSubmit={passwordChangeHandler} className="space-y-4">
//               {/* Old Password Field */}
//               <div className="relative flex flex-col ">
//                 <label className="block ml-20 font-bold text-gray-700 dark:text-white mb-1">
//                   Enter current Password:
//                 </label>
//                 <input
//                   type={showOldPassword ? "text" : "password"}
//                   className="w-[80%] mt-2 mx-auto bg-white border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 focus:ring-1 focus:outline-dotted transition"
//                   required
//                   value={oldPassword}
//                   onChange={(e) => setOldPassword(e.target.value)}
//                   placeholder="Your current password"
//                 />
//                 {showOldPassword ? (
//                   <AiOutlineEye
//                     className="absolute ml-[890px] mt-2 top-10 md:top-11 text-gray-500 cursor-pointer"
//                     onClick={() => setShowOldPassword(!showOldPassword)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className="absolute ml-[890px] mt-2 top-10 md:top-11 text-gray-500 cursor-pointer"
//                     onClick={() => setShowOldPassword(!showOldPassword)}
//                   />
//                 )}
//               </div>
//               <div className="relative flex flex-col ">
//                 <label className="block ml-20 font-bold text-gray-700 dark:text-white mb-1">
//                   Enter New Password:
//                 </label>
//                 <input
//                   type={showNewPassword ? "text" : "password"}
//                   className="w-[80%] mt-2 items-center mx-auto justify-center bg-white border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 focus:ring-1 focus:outline-dotted transition"
//                   required
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="Your new password"
//                 />
//                 {showNewPassword ? (
//                   <AiOutlineEye
//                     className="absolute ml-[890px] mt-2 top-10 md:top-11 text-gray-500 cursor-pointer"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className="absolute ml-[890px] mt-2 top-10 md:top-11 text-gray-500 cursor-pointer"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                   />
//                 )}
//               </div>
//               <div className="relative flex flex-col ">
//                 <label className="block ml-20 font-bold text-gray-700 dark:text-white mb-1">
//                   Confirm New Password:
//                 </label>
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   className="w-[80%] mt-2 items-center mx-auto justify-center bg-white border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-700 focus:ring-1 focus:outline-dotted transition"
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPasword(e.target.value)}
//                   placeholder="Confirm new password"
//                 />
//                 {showConfirmPassword ? (
//                   <AiOutlineEye
//                     className="absolute ml-[890px] mt-2 top-10 md:top-11 text-gray-500 cursor-pointer"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className="absolute ml-[890px] mt-2 top-10 md:top-11 text-gray-500 cursor-pointer"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   />
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-[20%] ml-20 rounded-md bg-gray-700 text-white py-3 hover:bg-gray-400 shadow-lg mt-4 flex items-center justify-center"
//               >
//                 {loading ? (
//                   <FaSpinner className="animate-spin text-white" size={20} />
//                 ) : (
//                   "Update"
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
"use client";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"; // Import Eye Icons
import Image from "next/image";
import avtarIcon from "@/public/assests/download5.png";
import { FaSpinner } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import {
  HomeOutlined,
  Dashboard,
  School,
  Memory,
  Face,
} from "@mui/icons-material";

type Props = {
  user: any;
};

const Menu: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`w-[28%] bg-[#D1D1D1] dark:bg-[#2C2C2C] dark:text-[#C4C7CA] text-[#1D3C6A] overflow-y-auto p-4 flex flex-col items-center transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);
// Sidebar Menu Item Component
const MenuItem: FC<{ icon: React.ReactNode; title: string; to: string }> = ({
  icon,
  title,
  to,
}) => (
  <Link
    href={to}
    className="flex items-center gap-3 w-full mt-6 p-2 rounded-md hover:bg-[#5A86C5] dark:hover:bg-[#3A5E9E]"
  >
    {icon}
    {title}
  </Link>
);

const ChangePassword: FC<Props> = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      setLoading(true);
      await updatePassword({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setConfirmPasword("");
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
        setLoading(false);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side: Profile Card (Full Height) */}
      <Menu className={`${openSidebar ? "block" : "hidden"} md:flex w-[28%]`}>
        {/* Profile Picture & Name in Sidebar */}
        <div className="flex flex-col items-center mt-8">
          <div className="relative w-[100%] h-[100%]">
            <Image
              src={user?.avatar?.url || avtarIcon}
              alt="Profile"
              width={140}
              height={140}
              className="rounded-full border-2 border-gray-300"
              style={{height:'100px', width:'102px'}}
            />
          </div>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 pt-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-1000 dark:text-[#9E9E9E] text-[#003366]">
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
                <MdVerified className="text-blue-500  text-lg md:text-xl " />
              )}
            </div>
          </div>

          <p className="text-[#6A7F4D] dark:text-[#AABFCC] pt-2 mr-[20%]">{user?.role}</p>
        </div>

        {/* Sidebar Navigation */}
        <div className="mt-4 w-full">
          <MenuItem icon={<HomeOutlined />} title="Home" to="/" />
          <MenuItem icon={<Face />} title="Profile" to="/profile" />
          {user.role === "admin" && (
            <MenuItem
              icon={<Dashboard />}
              title="Admin Dashboard"
              to="/admin"
            />
          )}
          <MenuItem
            icon={<School />}
            title="Enrolled Courses"
            to="/profile/viewcourses"
          />

          <MenuItem
            icon={<Memory />}
            title="Device Info"
            to="/profile/sessioninformation"
          />
        </div>
      </Menu>

      {/* Right Side: Change Password Form */}
      <div className="w-full flex flex-col bg-[#FAF9F6] dark:bg-[#383838]">
        <div className="border-b-2 mt-4 border-gray-300 p-4 text-center w-full">
          <h3 className="text-lg md:text-xl font-bold text-gray-700  dark:text-[#E3E6EB]">
            Change Password
          </h3>
          <p className="text-gray-700 dark:text-[#B6BBC2]">
            Update Your password securely{" "}
          </p>{" "}
        </div>

        <div className="p-6 w-full">
          <form onSubmit={passwordChangeHandler} className="space-y-4">
            <div className="relative flex flex-col ">
              <label className="block ml-[10%] font-bold text-gray-700 dark:text-[#C4C7CA] mb-1">
                Enter current Password:
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                className="text-gray-700 dark:text-[#C4C7CA] bg-white dark:bg-gray-600  border-gray-300 dark:border-[#7A7E85] w-[80%] mt-2 mx-auto border rounded-md p-3 focus:ring-1 focus:outline-dotted transition"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Your current password"
              />
              {showOldPassword ? (
                <AiOutlineEye
                  className="absolute right-[12%] mt-2 top-10 md:top-11 text-gray-500  dark:text-white cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-[12%] mt-2 top-10 md:top-11 text-gray-500 dark:text-white cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                />
              )}
            </div>
            <div className="relative flex flex-col ">
              <label className="block ml-[10%] font-bold text-gray-700 dark:text-[#C4C7CA] mb-1">
                Enter New Password:
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                className="text-gray-700 dark:text-[#C4C7CA] bg-white dark:bg-gray-600  border-gray-300 dark:border-[#7A7E85] w-[80%] mt-2 mx-auto border rounded-md p-3 focus:ring-1 focus:outline-dotted transition"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Your new password"
              />
              {showNewPassword ? (
                <AiOutlineEye
                  className="absolute right-[12%] mt-2 top-10 md:top-11 text-gray-500 dark:text-white cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-[12%] mt-2 top-10 md:top-11 text-gray-500 dark:text-white cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              )}
            </div>
            <div className="relative flex flex-col ">
              <label className="block ml-[10%] font-bold text-gray-700 dark:text-[#C4C7CA] mb-1">
                Confirm New Password:
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="text-gray-700 dark:text-[#C4C7CA] bg-white dark:bg-gray-600  border-gray-300 dark:border-[#7A7E85] w-[80%] mt-2 mx-auto border rounded-md p-3 focus:ring-1 focus:outline-dotted transition"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPasword(e.target.value)}
                placeholder="Confirm new password"
              />
              {showConfirmPassword ? (
                <AiOutlineEye
                  className="absolute right-[12%] mt-2 top-10 md:top-11 text-gray-500 dark:text-white cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-[12%] mt-2 top-10 md:top-11 text-gray-500 dark:text-white cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-[20%] ml-[10%] rounded-md bg-gray-500 dark:bg-[#2D5F8F] text-white py-3 hover:bg-gray-400 dark:hover:bg-[#366DA2] shadow-lg mt-4 flex items-center justify-center"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-white" size={20} />
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
