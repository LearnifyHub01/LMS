"use client";
import CourseAccessContent from "@/app/components/Course/CourseAccessContent";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { use, useState, useEffect } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  const [isPurchased, setPurchased] = useState(false);

  useEffect(() => {
    if (data && data.user) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      setPurchased(!!isPurchased);
      if (!isPurchased) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data, error, id]);

  if (isLoading || !data || !data.user || !isPurchased) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <CourseAccessContent id={id} user={data.user} />
      </div>
    </>
  );
};

export default Page;
