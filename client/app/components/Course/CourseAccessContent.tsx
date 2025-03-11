// import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
// import React, { FC, useState } from "react";
// import Loader from "../Loader/Loader";
// import Heading from "@/app/utils/Heading";
// import CourseContentMedia from "./CourseContentMedia";
// import Header1 from "@/app/profile/Header1";
// import CourseContentList from "./CourseContentList";

// type Props = {
//   id: string;
// };

// const CourseAccessContent: FC<Props> = ({ id }) => {
//   const { data: contentData, isLoading, error } = useGetCourseContentQuery(id);
//   const data = contentData?.content ;
//   const [activeVideo, setActiveVideo] = useState(0);
//   const [activeItem, setActiveItem] = useState(5);
//   const [open, setOpen] = useState(false);
//   const [route, setRoute] = useState('Login');

//   if (isLoading) return <Loader />;
//   if (error) {
//     const errorMessage = (error as any)?.data?.error || "Failed to load course content";
//     return <div>Error: {errorMessage}</div>;
//   }

//   return (
//     // <div className="w-full grid 800px:grid-cols-10">
//       // {data.length > 0 ? (
//         <>
//         <Header1
//           open={open}
//           setOpen={setOpen}
//           activeItem={activeItem}
//           setRoute={setRoute}
//           route={route}
//         />
//           <Heading
//             title={data[activeVideo]?.title + "- LearnifyHub"|| "No Title Available"}
//             description="anything"
//             keywords={data[activeVideo]?.tags || ""}
//           />

//           <div className="col-span-7">
//             <CourseContentMedia
//               data={data}
//               id={id}
//               activeVideo={activeVideo}
//               setActiveVideo={setActiveVideo}
//             />
//           </div>

//           <div className="hidden 800px:block 800px:col-span-3">
//             <CourseContentList
//               data={data}
//               activeVideo={activeVideo}
//               setActiveVideo={setActiveVideo}
//             />
//           </div>

//         </>
//       // ) : (
//       //   <div>No course content available.</div>
//       // )}
//     // </div>
//   );
// };
// // const CourseAccessContent: FC<Props> = ({ id }) => {
// //   const { data: contentData, isLoading, error } = useGetCourseContentQuery(id);
// //   const data = contentData?.content;
// //   const [activeVideo, setActiveVideo] = useState(0);

// //   if (isLoading) return <Loader />;
// //   if (error) {
// //     const errorMessage =
// //       (error as any)?.data?.message || "Failed to load course content";
// //     return <div>Error: {errorMessage}</div>;
// //   }

// //   if (!data || data.length === 0) {
// //     return <div>No course content available.</div>;
// //   }

// //   return (
// //     <div className="w-full grid 800px:grid-cols-10">
// //       <>
// //         <Heading
// //           title={data[activeVideo]?.title || "No Title Available"}
// //           description="anything"
// //           keywords={data[activeVideo]?.tags || ""}
// //         />
// //         <div className="col-span-7">
// //           <CourseContentMedia
// //             data={data}
// //             id={id}
// //             activeVideo={activeVideo}
// //             setActiveVideo={setActiveVideo}
// //           />
// //         </div>
// //       </>
// //     </div>
// //   );
// // };

// export default CourseAccessContent;

import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header1 from "@/app/profile/Header1";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseAccessContent: FC<Props> = ({ id, user }) => {
  const { data: contentData, isLoading, error,refetch } = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true});
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeItem, setActiveItem] = useState(5);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  if (isLoading) return <Loader />;
  if (error) {
    const errorMessage =
      (error as any)?.data?.error || "Failed to load course content";
    return (
      <div className="text-center py-10 text-red-500">
        Error: {errorMessage}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header1
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Heading
          title={
            data?.[activeVideo]?.title + " - LearnifyHub" ||
            "No Title Available"
          }
          description="Course content"
          keywords={data?.[activeVideo]?.tags || ""}
        />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4 order-1 md:order-1">
            <CourseContentMedia
              data={data}
              id={id}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              user={user}
              refetch={refetch}
            />
          </div>

          <div className="w-full md:w-1/4 order-2 md:order-2">
            <div className="sticky top-6">
              <CourseContentList
                data={data}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAccessContent;
