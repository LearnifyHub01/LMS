"use client";
import React, { FC, useState, useEffect, use } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(5);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });


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
    <div className="flex mx-auto  ">
  
        <div className="w-full h-full bg-transparent  ">
          <ProfileInfo user={user} />
        </div>
  
    </div>
  );
};

export default Profile;
