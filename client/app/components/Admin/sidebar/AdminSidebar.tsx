"use client";
import { JSX } from "react";
import { useState, FC, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaUser,
  FaFileAlt,
  FaBook,
  FaThLarge,
  FaCog,
  FaBars,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import avatarDefault from "../../../../public/assests/download5.png";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ItemsProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<ItemsProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, isSetCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <>
      <div className="h-screen flex">
        <Sidebar
          collapsed={isCollapsed}
          className="bg-gray-800 text-black shadow-md overflow-hidden"
        >
          <Menu>
            {/* Toggle Button at the Top */}
            <MenuItem
              icon={<FaBars />}
              onClick={() => isSetCollapsed(!isCollapsed)}
              className="cursor-pointer text-black"
            >
              {!isCollapsed}
            </MenuItem>

            {/* Profile Section */}
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Image
                    alt="profile-user"
                    width={90}
                    height={90}
                    src={user.avatar ? user.avatar.url : avatarDefault}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      border: "3px solid #5b6e6",
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    className="!text-[20px] text-black dark:text-white"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="!text-[20px] text-black dark:text-white capitalize"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    - {user?.role}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Sidebar Menu Items */}
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<FaThLarge />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Data Section */}
            <SubMenu
              label="Data"
              icon={<FaFileAlt />}
              className="text-black"
              defaultOpen={false} // Make the submenu open by default
            >
              <Item
                title="Users"
                to="/data/users"
                icon={<FaUser />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Invoices"
                to="/data/invoices"
                icon={<FaFileAlt />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            {/* Content Section */}
            <SubMenu
              label="Content"
              icon={<FaBook />}
              className="text-black"
              defaultOpen={false} // Make the submenu open by default
            >
              <Item
                title="Create Course"
                to="/content/create-course"
                icon={<FaBook />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Live Courses"
                to="/content/live-courses"
                icon={<FaBook />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            {/* Customization Section */}
            <SubMenu
              label="Customization"
              icon={<FaCog />}
              className="text-black"
              defaultOpen={false} 
            >
              <Item
                title="Hero"
                to="/customization/hero"
                icon={<FaCog />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ"
                to="/customization/faq"
                icon={<FaCog />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Categories"
                to="/customization/categories"
                icon={<FaCog />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            {/* Controllers Section */}
            <SubMenu
              label="Controllers"
              icon={<FaUsers />}
              className="text-black"
              defaultOpen={false} // Make the submenu open by default
            >
              <Item
                title="Manage Team"
                to="/controllers/manage-team"
                icon={<FaUsers />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            {/* Analytics Section */}
            <SubMenu
              label="Analytics"
              icon={<FaChartBar />}
              className="text-black"
              defaultOpen={false} // Make the submenu open by default
            >
              <Item
                title="Courses Analytics"
                to="/analytics/courses"
                icon={<FaChartBar />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Courses Analytics 2"
                to="/analytics/courses2"
                icon={<FaChartBar />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="User Analytics"
                to="/analytics/users"
                icon={<FaChartBar />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            {/* Extras Section */}
            <SubMenu
              label="Extras"
              icon={<FaCog />}
              className="text-black"
              defaultOpen={false} // Make the submenu open by default
            >
              <Item
                title="Settings"
                to="/extras/settings"
                icon={<FaCog />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logout"
                to="/extras/logout"
                icon={<FaSignOutAlt />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default AdminSidebar;
