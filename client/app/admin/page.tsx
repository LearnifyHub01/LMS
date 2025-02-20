"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/DashboardHero";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="overflow-hidden dark:bg-[#151632]">
      <AdminProtected>
        <Heading
          title="Admin"
          description="It is a good platform"
          keywords="programming,MERN"
        />
        <div className="flex h-screen "> {/* This ensures full height */}
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] ">
            <DashboardHero/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;