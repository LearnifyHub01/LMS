// "use client";
// import React, { FC, useState } from "react";
// import Heading from "@/app/utils/Heading";
// import Header from "../components/Header";
// import { useSelector } from "react-redux"; 
// import AllCourses from "../components/AllCourses/AllCourses";


// type Props = {};

// const Page: FC<Props> = () => {
//   const [open, setOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(5);
//   const [route, setRoute] = useState("Login");

//   const { user } = useSelector((state: any) => state.auth);
//   return (
//     <div>
//         <Heading
//           title={`${user?.name || "User"}'s profile`} 
//           description="It is a good platform"
//           keywords="programming,MERN"
//         />
//         <Header
//           open={open}
//           setOpen={setOpen}
//           activeItem={activeItem}
//           setRoute={setRoute}
//           route={route}
//         />
//         <AllCourses/>
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { FC, useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "../profile/Header1";
import { useSelector } from "react-redux";
import AllCourses from "../components/AllCourses/AllCourses";
import Footer from "../components/Footer";

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Heading
        title={`${user?.name || "User"}'s profile`}
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
      <AllCourses />
      <Footer/>
    </div>
  );
};

export default Page;