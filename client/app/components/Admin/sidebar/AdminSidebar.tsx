"use client";
import { JSX } from "react";
import { useState, FC, useEffect,useRef } from "react";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { MdVerified } from "react-icons/md";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CategoryIcon from "@mui/icons-material/Category";
import {
  FaUser,
  FaFileAlt,
  FaThLarge,
  FaCog,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import avtarIcon from "../../../../public/assests/download5.png";


interface ItemsProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
  closeSidebar: () => void;
}

const Item: FC<ItemsProps> = ({ title, to, icon, selected, setSelected,closeSidebar }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "white" : "black";

  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        setSelected(title);
       closeSidebar()
      }}
      className={` pl-5 ${
        isDarkMode
          ? "hover:bg-white/20 !text-white"
          : "hover:bg-gray-300/30 !text-black"
      }`}
      style={{
        backgroundColor: "transparent", // Remove selected background color
        color: isDarkMode ? "white" : "black", // Maintain text color based on theme
      }}
      icon={<span style={{ color: iconColor }}>{icon}</span>} // Icon color change
      component={<Link href={to} />}
     
    >
      <Typography
        className="!text-sm !font-Poppins"
        style={{ color: isDarkMode ? "white" : "black" }}
      >
        {title}
      </Typography>
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { theme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isDarkMode = theme === "dark";


  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1200);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsCollapsed(true);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* Mobile Menu Icon */}
      {isMobileView && (
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ color: isDarkMode ? "white" : "black" }}
          className="fixed top-4 left-4 z-50"
        >
          <MenuOutlinedIcon />
        </IconButton>
      )}

      {/* Sidebar */}
      <div
      ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen transition-all duration-300 ${
          isMobileView
            ? isCollapsed
              ? "-translate-x-full"
              : "translate-x-0 w-[250px] shadow-lg"
            : "w-[250px]"
        } ${isDarkMode ? "bg-[#27374D]" : "bg-gray-200"} `}
      >
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900">
          <Menu>
            <Box mb="25px">
              {/* Profile Section */}
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                 alt="profile-user"
                 width={100}
                 height={100}
                 src={user.avatar?.url|| avtarIcon}
                 style={{ width: "105px", height: "100px" }}
                 className="mt-5 rounded-full"
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  style={{ color: isDarkMode ? "white" : "black" }}
                >
                  {user?.name}
                  {/* Add MdVerified icon next to the name */}
                  <MdVerified
                    style={{
                      marginLeft: "180px",
                      marginTop: "-28px",
                      color: "#4cceac", // Or any color of your choice
                      fontSize: "20px", // Adjust the size of the icon as needed
                    }}
                  />
                </Typography>
              </Box>

              {/* Menu Items */}
              <Box paddingLeft="0%" marginTop={"25px"}>
                <Item
                  title="Dashboard"
                  to="/"
                  icon={<FaThLarge />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Typography
                  sx={{ m: "15px 0 5px 20px" }}
                  style={{
                    color: isDarkMode ? "gray" : "black",
                    fontSize: "15px",
                    marginLeft: "35px",
                  }}
                >
                  Data
                </Typography>
                <Item
                  title="Users"
                  to="/admin/users"
                  icon={<FaUser />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Item
                  title="Invoices"
                  to="/data/invoices"
                  icon={<FaFileAlt />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Typography
                  sx={{ m: "15px 0 5px 20px" }}
                  style={{
                    color: isDarkMode ? "gray" : "black",
                    fontSize: "15px",
                    marginLeft: "35px",
                  }}
                >
                  Content
                </Typography>
                <Item
                  title="Create Course"
                  to="/admin/create-course"
                  icon={<VideoLibraryIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Item
                  title="Live Courses"
                  to="/admin/live-courses"
                  icon={<LiveTvIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Typography
                  sx={{ m: "15px 0 5px 20px" }}
                  style={{
                    color: isDarkMode ? "gray" : "black",
                    fontSize: "15px",
                    marginLeft: "35px",
                  }}
                >
                  Customization
                </Typography>
                <Item
                  title="FAQ"
                  to="/admin/faq"
                  icon={<QuizIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Item
                  title="Categories"
                  to="/customization/categories"
                  icon={<CategoryIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Typography
                  sx={{ m: "15px 0 5px 20px" }}
                  style={{
                    color: isDarkMode ? "gray" : "black",
                    fontSize: "15px",
                    marginLeft: "35px",
                  }}
                >
                  Controllers
                </Typography>
                <Item
                  title="Manage Team"
                  to="/admin/manage-team"
                  icon={<FaUsers />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Typography
                  sx={{ m: "15px 0 5px 20px" }}
                  style={{
                    color: isDarkMode ? "gray" : "black",
                    fontSize: "15px",
                    marginLeft: "35px",
                  }}

                >
                  Analytics
                </Typography>
                <Item
                  title="Courses Analytics"
                  to="/analytics/courses"
                  icon={<FaChartBar />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Item
                  title="Courses Analytics 2"
                  to="/analytics/courses2"
                  icon={<FaChartBar />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Item
                  title="User Analytics"
                  to="/analytics/users"
                  icon={<FaChartBar />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
                <Typography
                  sx={{ m: "15px 0 5px 20px" }}
                  style={{
                    color: isDarkMode ? "gray" : "black",
                    fontSize: "15px",
                    marginLeft: "35px",
                  }}
                >
                  Extras
                </Typography>
                <Item
                  title="Settings"
                  to="/extras/settings"
                  icon={<FaCog />}
                  selected={selected}
                  setSelected={setSelected}
                  closeSidebar={() => setIsCollapsed(true)}
                />
              </Box>
            </Box>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
