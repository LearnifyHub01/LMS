

"use client";
import React, { FC, useState, useEffect } from "react";
import SideBarProfile from "./SideBarProfile";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null); // Updated state type for avatar
  const [active, setActive] = useState(1);

  const logOutHandler = async () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  useEffect(() => {
    // Set avatar if user.avatar.url is available
    if (user?.avatar?.url) {
      setAvatar(user.avatar.url);
    }

    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user]); // Re-run when user changes

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-gray-800 bg-opacity-90 dark:border-[#ffffff1d]  rounded-[5px] shadow-sm mt-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar} // Pass avatar to SideBarProfile
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
    </div>
  );
};

export default Profile;
