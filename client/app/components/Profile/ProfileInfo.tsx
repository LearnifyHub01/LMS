// import React, { FC, useEffect, useState } from "react";
// import Image from "next/image";
// import avatarPlaceholder from "../../../public/assests/download5.png";
// import { AiOutlineCamera } from "react-icons/ai";
// import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import toast from "react-hot-toast";

// interface Props {
//   avatar: string | null;
//   user: any;
// }

// const ProfileInfo: FC<Props> = ({ avatar, user }) => {
//   const [name, setName] = useState(user?.name || "");
//   const [editProfile, { isSuccess, error }] = useEditProfileMutation();
//   const [updateAvatar, { isSuccess: avatarSuccess, error: avatarError }] = useUpdateAvatarMutation();
//   const [loadUser, setLoadUser] = useState(false);

//   useLoadUserQuery(undefined, { skip: !loadUser });

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);

//     fileReader.onload = async () => {
//       if (fileReader.readyState === 2) {
//         const avatar = fileReader.result as string;
//         updateAvatar({ avatar });
//       }
//     };
//   };

//   useEffect(() => {
//     if (isSuccess || avatarSuccess) {
//       setLoadUser(true);
//       toast.success("Profile Updated Successfully!");
//     }
//     if (error || avatarError) {
//       console.error(error || avatarError);
//       toast.error("Something went wrong!");
//     }
//   }, [isSuccess, avatarSuccess, error, avatarError]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (name.trim()) {
//       await editProfile({ name });
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center bg-white dark:bg-gray-900 p-10 rounded-xl shadow-lg max-w-lg mx-auto">
//       {/* Avatar Section */}
//       <div className="relative mb-6">

//         <Image
//           src={user?.avatar?.url || avatar || avatarPlaceholder}
//           alt="Profile Avatar"
//           height={130}
//           width={130}
//           className="w-[130px] h-[130px] rounded-full border-4 border-[#37a39a] shadow-xl hover:scale-110 transition-transform"

//         />

//         <input
//           type="file"
//           id="avatarUpload"
//           className="hidden"
//           onChange={handleImageUpload}
//           accept="image/png,image/jpeg,image/jpg,image/webp"
//         />
//         <label htmlFor="avatarUpload">
//           <div className="w-9 h-9 bg-[#37a39a] rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer shadow-md hover:bg-[#2d8f7b] transition">
//             <AiOutlineCamera size={22} className="text-white" />
//           </div>
//         </label>
//       </div>

//       {/* Profile Form Section */}
//       <div className="w-full px-6 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Full Name Field */}
//           <div>
//             <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">
//               Full Name
//             </label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white dark:border-gray-600"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">
//               Email Address
//             </label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:text-white dark:border-gray-600"
//               readOnly
//               required
//               value={user?.email}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center mt-6">
//             <button
//               className="w-full sm:w-48 h-12 bg-[#37a39a] text-white rounded-lg text-lg font-semibold cursor-pointer transition-all hover:bg-[#2d8f7b] shadow-md focus:outline-none"
//               type="submit"
//             >
//               Update Profile
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>

//   );
// };

// export default ProfileInfo;
"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import avtarIcon from "../../../public/assests/download5.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

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
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const file = e.target.files[0]; // Correct property access
    if (!file) {
      console.log("No file selected");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar); // Pass the avatar to the mutation
      }
    };
    fileReader.readAsDataURL(file);
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
    console.log(user?.url);
  };

  return (
    <div className="w-full flex flex-col items-center p-10">
      {/* Avatar Section */}
      <div className="relative">
        <Image
          src={user?.avatar?.url}
          alt="Profile Picture"
          height={4000}
          width={3000}
          className="w-[150px] h-[150px] cursor-pointer border-[3px] border-[#37a39a] rounded-full object-cover"
        />

        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png,image/jpeg,image/jpg,image/webp"
        />
        <label htmlFor="avatar">
          <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className="text-white" />
          </div>
        </label>
      </div>

      {/* Profile Form Section */}
      <div className="w-full px-6 800px:px-10 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            {/* Full Name Field */}
            <div className="w-full">
              <label className="block pb-2 text-black dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div className="w-full pt-2">
              <label className="block pb-2 text-black dark:text-white">
                Email Address
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                readOnly
                required
                value={user?.email}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center mt-8">
              <input
                className="mx-auto block w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"
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
