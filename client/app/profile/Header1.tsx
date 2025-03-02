// import React, { FC, useState, useEffect } from "react";
// import Link from "next/link";
// import NavItems from "../utils/NavItems";
// import { ThemeSwitcher } from "../utils/ThemeSwitcher";
// import { useSelector } from "react-redux";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import avatar from "../../public/assests/download5.png";
// import Image from "next/image";

// type Props = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeItem: number;
//   route: string;
//   setRoute: (route: string) => void;
// };

// const Header: FC<Props> = ({ activeItem, setOpen }) => {
//   const [active, setActive] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const { user } = useSelector((state: any) => state.auth);
//   const storeUser = useSelector((state: any) => state.user.user);

//   useEffect(() => {
//     const handleScroll = () => {
//       setActive(window.scrollY > 85);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
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

//   return (
//     <div className="w-full sticky z-50 top-0">
//       <div
//         className={`${
//           active
//             ? "fixed top-0 left-0 w-full h-[70px] z-[80] transition-all duration-300 backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-gray-200/20 shadow-lg"
//             : "w-full h-[70px] z-[80] backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-gray-200/20"
//         }`}
//       >
//         <div className="w-[95%] 800px:w-[92%] mx-auto py-1 h-full">
//           <div className="w-full h-[70px] flex items-center justify-between px-4">
//             {/* Logo Section */}
//             <div className="relative">
//               <Link
//                 href={"/"}
//                 className="text-[25px] hidden 800px:block font-mono font-[600] text-gray-900 dark:text-white hover:text-[#37a39a] transition-colors duration-200"
//               >
//                 LearnifyHub
//                 <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#37a39a] transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="flex items-center gap-4">
//               <div className="hidden 800px:flex items-center backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 px-4 py-2 rounded-full border border-gray-200/30">
//                 <NavItems
//                   activeItem={activeItem}
//                   isMobile={false}
//                   user={user}
//                   setOpen={setOpen}
//                   openSidebar={openSidebar}
//                   setOpenSidebar={setOpenSidebar}
//                 />
//               </div>
//               <ThemeSwitcher />

//               {/* Mobile Menu Button */}
//               <div className="800px:hidden">
//                 <HiOutlineMenuAlt3
//                   size={25}
//                   className="cursor-pointer text-gray-900 dark:text-white hover:text-[#37a39a] transition-colors duration-200"
//                   onClick={() => setOpenSidebar(!openSidebar)}
//                 />
//               </div>

//               {/* Profile Avatar */}
//               <Link href={"/profile"} className="hidden 800px:block">
//                 <Image
//                   src={storeUser?.avatar?.url || avatar}
//                   alt="Profile Picture"
//                   height={30}
//                   width={30}
//                   className="w-[30px] h-[30px] rounded-full object-cover transition-all duration-200 hover:scale-110"
//                   style={{
//                     border: activeItem === 5 ? "2px solid #37a39a" : "none",
//                     boxShadow: activeItem === 5 ? "0 0 8px rgba(55, 163, 154, 0.3)" : "none",
//                   }}
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Sidebar */}
//         {openSidebar && (
//           <div
//             className="fixed w-full h-screen top-0 left-0 z-[99999] bg-black/40 backdrop-blur-sm"
//             onClick={handleClose}
//             id="screen"
//           >
//             <div className="w-[70%] fixed h-screen top-0 right-0 z-[999999999] bg-white dark:bg-gray-900 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 overflow-y-auto transition-transform duration-300 ease-in-out translate-x-0">
//               <NavItems
//                 activeItem={activeItem}
//                 isMobile={true}
//                 user={user}
//                 setOpen={setOpen}
//                 openSidebar={openSidebar}
//                 setOpenSidebar={setOpenSidebar}
//               />
//               <p className="text-[14px] px-4 py-5 text-gray-600 dark:text-gray-300 border-t border-gray-200/20 mt-4">
//                 © 2025 LearnifyHub. All rights reserved.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import avatar from "../../public/assests/download5.png";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const storeUser = useSelector((state: any) => state.user.user);

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

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(!openSidebar);
    }
  };

  return (
    <div className="w-full shadow-2xl sticky z-50 top-0">
      <div
        className={`${
          active
            ? "fixed top-0 left-0 w-full h-[70px] z-[80] transition-all duration-300 bg-[#FAF9F6]/90 dark:bg-[#383838]/90 backdrop-blur-md border-b border-gray-200/20 shadow-lg"
            : "w-full h-[70px] z-[80] bg-[#FAF9F6]/90 dark:bg-[#383838]/90 backdrop-blur-md border-b border-gray-200/20"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] mx-auto py-1 h-full">
          <div className="w-full h-[70px] flex items-center justify-between px-4">
            {/* Logo Section */}
            <div className="relative">
              <Link
                href={"/"}
                className="text-[25px] hidden 800px:block font-mono font-[600] text-gray-900 dark:text-white hover:text-[#37a39a] transition-colors duration-200"
              >
                LearnifyHub
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#37a39a] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-4">
                <NavItems
                  activeItem={activeItem}
                  isMobile={false}
                  user={user}
                  setOpen={setOpen}
                  openSidebar={openSidebar}
                  setOpenSidebar={setOpenSidebar}
                />
              <ThemeSwitcher />

              {/* Mobile Menu Button */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-gray-900 dark:text-white hover:text-[#37a39a] transition-colors duration-200"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>

              {/* Profile Avatar */}
              <Link href={"/profile"} className="hidden 800px:block">
                <Image
                  src={storeUser?.avatar?.url || avatar}
                  alt="Profile Picture"
                  height={30}
                  width={30}
                  className="w-[30px] h-[30px] rounded-full object-cover transition-all duration-200 hover:scale-110"
                  style={{
                    border: activeItem === 5 ? "2px solid #37a39a" : "none",
                    boxShadow:
                      activeItem === 5
                        ? "0 0 8px rgba(55, 163, 154, 0.3)"
                        : "none",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed h-screen top-0 right-0 z-[999999999] bg-[#FAF9F6]/95 dark:bg-[#383838]/95 backdrop-blur-md overflow-y-auto transition-transform duration-300 ease-in-out translate-x-0">
              <NavItems
                activeItem={activeItem}
                isMobile={true}
                user={user}
                setOpen={setOpen}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
              <p className="text-[14px] px-4 py-5 text-gray-600 dark:text-gray-300 border-t border-gray-200/20 mt-4">
                © 2025 LearnifyHub. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
