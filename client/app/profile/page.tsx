"use client";
import React, { FC, useState } from "react";
import Protected from "@/app/hooks/useProtected";
import Heading from "@/app/utils/Heading";
import Header1 from "./Header1";
import { useSelector } from "react-redux"; // Corrected import (useSelector, not UseSelector)
import { usePathname } from "next/navigation";
import Profile from "@/app/components/Profile/Profile";
import SideBarProfile from "../components/Profile/SideBarProfile";
// import ShiftingCountdown from './ShiftingCountdown';
type Props = {};

const Page: FC<Props> = () => {
  // Corrected component name to start with uppercase
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  // Use the useSelector hook to get the user from Redux state
  const storeUser = useSelector((state: any) => state.user.user);

  return (
    <div>
      <Protected>
        <Heading
          title={`${storeUser?.name || "User"}'s profile`} // Dynamically setting profile name
          description="It is a good platform"
          keywords="programming,MERN"
        />
        {/* <ShiftingCountdown/> */}

        <Header1
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        {/* Pass the `user` prop to the Profile component */}
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;
