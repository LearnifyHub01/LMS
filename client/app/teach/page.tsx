"use client";
import React, { FC, useState } from "react";
import Protected from "@/app/hooks/useProtected";
import Heading from "@/app/utils/Heading";
import Header from "../profile/Header1";
import { useSelector } from "react-redux"; 
import Teacher from "../components/Teach/Teacher";

type Props = {};

const Page: FC<Props> = () => {
  // Corrected component name to start with uppercase
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  // Use the useSelector hook to get the user from Redux state
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name || "User"}'s profile`} // Dynamically setting profile name
          description="It is a good platform"
          keywords="programming,MERN"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Teacher user={user} />
      </Protected>
    </div>
  );
};

export default Page;
