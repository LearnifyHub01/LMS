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

import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"; // Import Eye Icons
import Image from "next/image";
import avtarIcon from "@/public/assests/download5.png";
import { FaSpinner } from "react-icons/fa"

type Props = {
  user: any;
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
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] dark:from-[#111827] dark:to-[#1f2937] px-6 overflow-auto">
    <div className="flex flex-col md:flex-row gap-6 md:gap-2 max-w-full w-full py-6 md:py-10 flex-1 overflow-auto"> {/* Make this section scrollable */}
  
      {/* Profile Section */}
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
      </div>
  
      {/* Password Change Section */}
      <div className="bg-gray-100 dark:bg-[#2a2e38] shadow-lg rounded-lg p-6 border border-gray-300 dark:border-gray-700 w-full md:w-2/3 flex-1 overflow-auto">
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
