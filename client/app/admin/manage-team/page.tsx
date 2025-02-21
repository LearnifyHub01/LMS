"use client";
import AllUsers from "@/app/components/Admin/Course/AllUsers";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className="overflow-hidden">
      <AdminProtected>
        <Heading
          title="Admin"
          description="It is a good platform"
          keywords="programming,MERN"
        />
        <div className="flex h-screen"> 
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero/>
            <AllUsers isTeam={true}/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;