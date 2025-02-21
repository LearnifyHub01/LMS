// import React, { FC, useState, useEffect } from "react";
// import Link from "next/link";
// import NavItems from "../utils/NavItems";
// import { ThemeSwitcher } from "../utils/ThemeSwitcher";
// import CustomModel from "../utils/CustomModel";
// import Login from "./Auth/Login";
// import SignUp from "./Auth/SignUp";
// import Verification from "./Auth/Verification";
// import { useSelector } from "react-redux";
// import { FiUser } from "react-icons/fi";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import { useSession } from "next-auth/react";
// import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
// import toast from "react-hot-toast";
// import avatar from "../../public/assests/download5.png";
// import Image from "next/image";
// import Marquee from "react-fast-marquee";
// //import MarqueeButton from "../styles/MarqueeButton";
// type Props = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeItem: number;
//   route: string;
//   setRoute: (route: string) => void;
// };

// const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
//   const [active, setActive] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const { user } = useSelector((state: any) => state.auth);
//   const { data } = useSession();
//   const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

//   //this is only use for image bcz when i update image need one refresh for update reflacte solve this issue
//   const storeUser = useSelector((state: any) => state.user.user);

//   useEffect(() => {
//     if (!user) {
//       if (data) {
//         socialAuth({
//           email: data?.user?.email,
//           name: data?.user?.name,
//           avatar: data?.user?.image,
//         });
//       }
//     }
//     if (isSuccess) {
//       toast.success("Login Successfully");
//     }
//   }, [data, user]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setActive(window.scrollY > 85);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     // Automatically close the sidebar on larger screens
//     const handleResize = () => {
//       if (window.innerWidth > 800 && openSidebar) {
//         setOpenSidebar(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [openSidebar]);

//   const handleClose = (e: any) => {
//     if (e.target.id === "screen") {
//       setOpenSidebar(!openSidebar);
//     }
//   };

//   const handleUserIconClick = () => {
//     setOpenSidebar(false);
//     setOpen(true);
//   };

//   return (
//     <div className="w-full bg-[#DDE6ED] dark:bg-[#27374D] relative py-0">
//       <div
//         className={`${
//           active
//             ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[70px] z-[80] border-b border-gray-400 dark:border-[#ffffff1c] shadow-xl transition duration-500"
//             : "w-full border-b border-gray-400 dark:border-[#ffffff1c] h-[70px] z-[80]"
//         }`}
//       >
//         <div className="w-[95%] 800px:w-[92%] m-auto py-1 h-full">
//           <div className="w-full h-[70px] flex items-center justify-between p-3">
//             {/* Logo Section  */}

//             <div>
//               <Link
//                 href={"/"}
//                 className="text-[25px] hidden 800px:block font-mono font-[500] text-black dark:text-white"
//               >
//                 LearnifyHub
//               </Link>
//             </div>
//             {/* Desktop Nav Items  */}
//             <div className="flex items-center">
//               <NavItems
//                 activeItem={activeItem}
//                 isMobile={false}
//                 user={user}
//                 setOpen={setOpen}
//                 openSidebar={openSidebar}
//                 setOpenSidebar={setOpenSidebar}
//               />
//               <ThemeSwitcher />

//               {/* sidebar Menu for Mobile  */}
//               <div className="800px:hidden ml-4">
//                 <HiOutlineMenuAlt3
//                   size={25}
//                   className="cursor-pointer dark:text-white text-black"
//                   onClick={() => setOpenSidebar(!openSidebar)}
//                 />
//               </div>

//               {user ? (
//                 <Link href={"/profile"}>
//                   <Image
//                     src={storeUser?.avatar?.url || avatar}
//                     alt="Profile Picture"
//                     height={4000}
//                     width={3000}
//                     className="w-[30px] h-[30px] rounded-full ml-5 hidden 800px:block cursor-pointer object-cover"
//                     style={{
//                       border: activeItem === 5 ? "2px solid #37a39a" : "none",
//                     }}
//                   />
//                 </Link>
//               ) : (
//                 <div className="ml-4" onClick={handleUserIconClick}>
//                   <button className="relative hidden 800px:block items-center px-6 py-3 overflow-hidden font-medium transition-all bg-gray-500 rounded-md group">
//                     <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-700 rounded group-hover:-mr-4 group-hover:-mt-4">
//                       <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
//                     </span>
//                     <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-700 rounded group-hover:-ml-4 group-hover:-mb-4">
//                       <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
//                     </span>
//                     <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-gray-700 rounded-md group-hover:translate-x-0"></span>
//                     <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
//                       LOGIN
//                     </span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Sidebar  */}
//         {openSidebar && (
//           <div
//             className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#0000024]"
//             onClick={handleClose}
//             id="screen"
//           >
//             <div className="w-[60%] fixed h-screen top-0 right-0 z-[999999999] bg-white dark:bg-slate-900 dark:bg-opacity-90 overflow-y-auto transition-all duration-300 ease-in-out ">
//               <NavItems
//                 activeItem={activeItem}
//                 isMobile={true}
//                 user={user}
//                 setOpen={setOpen}
//                 openSidebar={openSidebar}
//                 setOpenSidebar={setOpenSidebar}
//               />

//               <br />
//               <p className="text-[16px] px-2 py-5 text-black dark:text-white">
//                 CopyRight
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Authentication Modals  */}
//       {route === "Login" && open && (
//         <CustomModel
//           open={open}
//           setOpen={setOpen}
//           setRoute={setRoute}
//           activeItem={activeItem}
//           component={Login}
//         />
//       )}
//       {route === "Sign-Up" && open && (
//         <CustomModel
//           open={open}
//           setOpen={setOpen}
//           setRoute={setRoute}
//           activeItem={activeItem}
//           component={SignUp}
//         />
//       )}
//       {route === "Verification" && open && (
//         <CustomModel
//           open={open}
//           setOpen={setOpen}
//           setRoute={setRoute}
//           activeItem={activeItem}
//           component={Verification}
//         />
//       )}
//     </div>
//   );
// };

// export default Header;
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import CustomModel from "../utils/CustomModel";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import TeachModal from "../utils/TechModel"; // Import the new modal
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import avatar from "../../public/assests/download5.png";
import Image from "next/image";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [teachModalOpen, setTeachModalOpen] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();

  const storeUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    if (!user && data) {
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image,
      });
    }
    if (isSuccess) {
      toast.success("Login Successfully");
    }
  }, [data, user, socialAuth, isSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && openSidebar) {
        setOpenSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSidebar(!openSidebar);
    }
  };

  const handleUserIconClick = () => {
    setOpenSidebar(false);
    setOpen(true);
  };

  return (
    <div className="w-full bg-[#DDE6ED] dark:bg-[#27374D] relative py-0">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[70px] z-[80] border-b border-gray-400 dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b border-gray-400 dark:border-[#ffffff1c] h-[70px] z-[80]"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-1 h-full">
          <div className="w-full h-[70px] flex items-center justify-between p-3">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-[25px] hidden 800px:block font-mono font-[500] text-black dark:text-white"
              >
                LearnifyHub
              </Link>
              <button
                onClick={() => setTeachModalOpen(true)}
                className="ml-4 hidden 800px:block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Teach With Us
              </button>
            </div>
            <div className="flex items-center justify-center gap-0 mr-10">
              <NavItems
                activeItem={activeItem}
                isMobile={false}
                user={user}
                setOpen={setOpen}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
              <ThemeSwitcher />
              <div className="800px:hidden ml-4">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>
              {user ? (
                <Link href="/profile">
                  <Image
                    src={storeUser?.avatar?.url || avatar}
                    alt="Profile Picture"
                    height={4000}
                    width={3000}
                    className="w-[30px] h-[30px] rounded-full ml-5 hidden 800px:block cursor-pointer object-cover"
                    style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                  />
                </Link>
              ) : (
                <div className="ml-4" onClick={handleUserIconClick}>
                  <button className="relative hidden 800px:block items-center px-6 py-3 overflow-hidden font-medium transition-all bg-gray-500 rounded-md group">
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-gray-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-gray-700 rounded-md group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      LOGIN
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#0000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[60%] fixed h-screen top-0 right-0 z-[999999999] bg-white dark:bg-slate-900 dark:bg-opacity-90 overflow-y-auto transition-all duration-300 ease-in-out">
              <NavItems
                activeItem={activeItem}
                isMobile={true}
                user={user}
                setOpen={setOpen}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
              <br />
              <p className="text-[16px] px-2 py-5 text-black dark:text-white">
                CopyRight
              </p>
            </div>
          </div>
        )}
      </div>

      {route === "Login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}
      {route === "Sign-Up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}
      {route === "Verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
      <TeachModal
        open={teachModalOpen}
        setOpen={setTeachModalOpen}
        setRoute={setRoute}
      />
    </div>
  );
};

export default Header;