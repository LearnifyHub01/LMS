"use client";
import React, { FC, useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "../profile/Header1";
import { useSelector } from "react-redux"; 
import About from "../components/About/About";

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
        <About/>
    </div>
  );
};

export default Page;
