import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import avtarIcon from "../../../public/assests/download5.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [editProfile, { isSuccess, error }] = useEditProfileMutation();
  const [updateAvatar, { isSuccess: success, error: updateError }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string;
        updateAvatar({ avatar });
      }
    };
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (isSuccess) {
      toast.success("Profile Updated Successfully!");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
      {/* Avatar Section */}
      <div className="relative mb-6">
        <Image
          src={user?.avatar?.url || avatar || avtarIcon}
          alt="Profile Avatar"
          height={120}
          width={120}
          className="w-[120px] h-[120px] rounded-full border-4 border-[#37a39a] shadow-lg hover:scale-105 transition-all"
        />
        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png,image/jpeg,image/jpg,image/webp"
        />
        <label htmlFor="avatar">
          <div className="w-[35px] h-[35px] bg-[#37a39a] rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className="text-white" />
          </div>
        </label>
      </div>

      {/* Profile Form Section */}
      <div className="w-full max-w-md px-6 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Email Address
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                readOnly
                required
                value={user?.email}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <input
                className="w-full sm:w-[250px] h-[45px] bg-[#37a39a] text-white rounded-md text-lg font-semibold cursor-pointer transition-all hover:bg-[#2d8f7b] focus:outline-none"
                type="submit"
                value="Update"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;