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
  const [editProfile ,{isSuccess,error}] = useEditProfileMutation()
  const [updateAvatar ,{isSuccess:success,error:updateError}] = useUpdateAvatarMutation()
  const [loadUser,setLoadUser] = useState(false)
  const {} = useLoadUserQuery(undefined , {
    skip:loadUser  ?  false : true 
  })

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
  
  useEffect(()=>{
    if(isSuccess || success){
        setLoadUser(true)
    }
    if(error || updateError){
        console.log(error)
    }
    if(isSuccess){
        toast.success("Profile Updated Successfully!")
    }
  },[isSuccess,error,success,updateError])

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if(name !== ''){
        await editProfile({
            name:name,

        })
    }
    
  };

  return (
    <div className="w-full flex flex-col items-center p-10">
      {/* Avatar Section */}
      <div className="relative">
        <Image
          src={user?.avatar?.url || avatar || avtarIcon}
          alt=""
          height={120}
          width={120}
          className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
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
