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
    <Link href={to} passHref legacyBehavior>
  <MenuItem
    component="a" // Ensures that the item is wrapped in an anchor tag
    active={selected === title}
    onClick={() => setSelected(title)}
    icon={icon}
  >
    <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
  </MenuItem>
</Link>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, isSetCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

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
          className="bg-[#eeeee4] text-black shadow-md overflow-hidden custom-sidebar"
          style={{
            width:isCollapsed ? '60px':'250px',
            transition: 'width 0.3s ease-in'
          }}
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
                    src={user.avatar ? user.avatar.url : avatarDefault}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="h-[120px] w-[120px] object-cover border-2 border-[black] rounded-full shadow-lg"
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
                to="/admin/create-course"
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

export default AdminSidebar;
