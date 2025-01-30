import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"; // Import Eye Icons

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

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const erroData = error as any;
        toast.error(erroData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full px-6 py-8 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md mt-5">
      <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Change Password
      </h1>
      <form onSubmit={passwordChangeHandler} className="flex flex-col gap-6">
        {/* Old Password Field */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-lg font-medium text-gray-800 dark:text-white">
            Enter your old Password
          </label>
          <input
            type={showOldPassword ? "text" : "password"} // Toggle password visibility
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {/* Eye icon to toggle visibility */}
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
        <div className="flex flex-col gap-2 relative">
          <label className="text-lg font-medium text-gray-800 dark:text-white">
            Enter your new Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"} // Toggle password visibility
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {/* Eye icon to toggle visibility */}
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

        {/* Confirm New Password Field */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-lg font-medium text-gray-800 dark:text-white">
            Confirm your new Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPasword(e.target.value)}
          />
          {/* Eye icon to toggle visibility */}
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
        <div className="flex justify-center mt-6">
          <input
            type="submit"
            className="w-full py-3 bg-[#37a39a] text-white rounded-md hover:bg-[#2d8f7b] transition duration-300 focus:outline-none"
            value="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
