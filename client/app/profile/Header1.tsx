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

  //this is only use for image bcz when i update image need one refresh for update reflacte
  const storeUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Automatically close the sidebar on larger screens
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
    <div className="w-full bg-[#FAF9F6] dark:bg-[#1C1C1C] sticky z-50 top-0">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[70px] z-[80] border-b border-gray-400 dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b border-gray-400 dark:border-[#ffffff1c] h-[70px] z-[80]"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-1 h-full">
          <div className="w-full h-[70px] flex items-center justify-between p-3">
            {/* Logo Section  */}

            <div>
              <Link
                href={"/"}
                className="text-[25px] hidden 800px:block font-mono font-[500] text-black dark:text-white"
              >
                LearnifyHub
              </Link>
            </div>
            {/* Desktop Nav Items  */}
            <div className="flex items-center">
              <NavItems
                activeItem={activeItem}
                isMobile={false}
                user={user}
                setOpen={setOpen}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
              <ThemeSwitcher />

              {/* sidebar Menu for Mobile  */}
              <div className="800px:hidden ml-4">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>

              <Link href={"/profile"}>
                <Image
                  src={storeUser?.avatar?.url || avatar}
                  alt="Profile Picture"
                  height={4000}
                  width={3000}
                  className="w-[30px] h-[30px] rounded-full ml-5 hidden 800px:block cursor-pointer object-cover"
                  style={{
                    border: activeItem === 5 ? "2px solid #37a39a" : "none",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar  */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#0000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[60%] fixed h-screen top-0 right-0 z-[999999999] bg-white dark:bg-slate-900 dark:bg-opacity-90 overflow-y-auto transition-all duration-300 ease-in-out ">
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
    </div>
  );
};

export default Header;
