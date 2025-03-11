"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineCamera } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import avtarIcon from "../../../public/assests/download5.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { RootState } from "@/redux/store";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
  useDeleteUserMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { setUser } from "@/redux/features/user/userSlice";
import {
  HomeOutlined,
  Dashboard,
  School,
  Lock,
  Memory,
  Menu as MenuIcon,
  Face,
} from "@mui/icons-material";
import { FiEdit3 } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

type Props = {
  user: any;
};

// Sidebar Menu Component
const Menu: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`w-[28%] bg-[#D1D1D1] dark:bg-[#2C2C2C] dark:text-[#C4C7CA] text-[#1D3C6A] overflow-y-auto p-4 flex flex-col items-center transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

// Sidebar Menu Item Component
const MenuItem: FC<{ icon: React.ReactNode; title: string; to: string }> = ({
  icon,
  title,
  to,
}) => (
  <Link
    href={to}
    className="flex items-center gap-3 w-full mt-6 p-2 rounded-md hover:bg-[#5A86C5] dark:hover:bg-[#3A5E9E]"
  >
    {icon}
    {title}
  </Link>
);

const ProfileInfo: FC<Props> = ({ user }) => {
  const router = useRouter(); // Initialize router
  const dispatch = useDispatch();
  const storeUser = useSelector((state: RootState) => state.user.user);
  const [name, setName] = useState(storeUser?.name || "");
  const [avatar, setAvatar] = useState(storeUser?.avatar?.url || avtarIcon);
  const [editProfile, { isSuccess, error }] = useEditProfileMutation();
  const [updateAvatar, { isSuccess: success, error: updateError }] =
    useUpdateAvatarMutation();
  const [
    deleteUser,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteUserMutation(); // Add delete user mutation
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useLoadUserQuery(undefined, { skip: !loadUser });
  const [logout, setLogout] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [imageName, setImageName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && openSidebar) {
        setOpenSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar]);

  const {
    data,
    isLoading: logoutLoading,
    isSuccess: logoutSuccess,
    error: logoutError,
  } = useLogOutQuery(undefined, { skip: !logout });

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    setLogout(true);
  };

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageName(file.name);

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const updateUrl = await updateAvatar(fileReader.result).unwrap();
        dispatch(setUser(updateUrl.user));
        setAvatar(updateUrl.user.avatar.url);
      }
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
      toast.success("Profile Updated Successfully!");
      setIsLoading(false);
    }
  }, [isSuccess, success]);

  useEffect(() => {
    if (logoutSuccess) {
      toast.success("Logged out successfully!");
    } else if (logoutError) {
      toast.error("Logout failed. Please try again.");
    }
  }, [logoutSuccess, logoutError]);

  useEffect(() => {
    if (storeUser?.name) {
      setName(storeUser.name);
    }
  }, [storeUser?.name]);

  useEffect(() => {
    if (deleteSuccess) {
      setUserId("");
      setOpen(false);
      setDeleteConfirmation("");
      toast.success("User deleted successfully!");
      signOut().then(() => {
        router.push("/"); // Redirect to homepage
      });
    }
    if (deleteError) {
      toast.error("Error deleting user. Please try again.");
    }
  }, [deleteSuccess, deleteError, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || name === storeUser?.name) return;

    try {
      const updatedUser = await editProfile({ name }).unwrap();
      dispatch(setUser(updatedUser.user));
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleDeleteConfirm = () => {
    if (userId && deleteConfirmation.toLowerCase() === "delete account") {
      deleteUser(userId); // Trigger the delete mutation
    } else {
      toast.error("Please type 'delete account' to confirm.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserId("");
    setSelectedUserEmail("");
    setDeleteConfirmation("");
  };

  const handleDeleteClick = () => {
    setUserId(user?._id || "");
    setSelectedUserEmail(user?.email || "");
    setOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="md:hidden absolute top-4 left-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-md shadow-md"
      >
        <MenuIcon />
      </button>

      <Menu className={`${openSidebar ? "block" : "hidden"} md:flex w-[28%]`}>
        <div className="flex flex-col items-center mt-8">
          <div className="relative w-[100%] h-[100%]">
            <Image
              src={user?.avatar?.url || avtarIcon}
              alt="Profile"
              width={140}
              height={140}
              className="rounded-full border-2 border-gray-300"
              style={{ height: "100px", width: "102px" }}
            />
          </div>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 pt-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-1000 dark:text-[#9E9E9E] text-[#003366]">
                {user?.name
                  ? user?.name
                      .split(" ")
                      .map(
                        (word: any) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  : "User Name"}
              </h2>
              {user.role === "admin" && (
                <MdVerified className="text-blue-500 text-lg md:text-xl" />
              )}
            </div>
          </div>
          <p className="text-[#6A7F4D] dark:text-[#AABFCC] pt-2 mr-[20%]">
            {user?.role}
          </p>
        </div>

        <div className="mt-4 w-full">
          <MenuItem icon={<HomeOutlined />} title="Home" to="/" />
          {user.role === "admin" && (
            <MenuItem
              icon={<Dashboard />}
              title="Admin Dashboard"
              to="/admin"
            />
          )}
          <MenuItem
            icon={<School />}
            title="Enrolled Courses"
            to="/profile/viewcourses"
          />
          <MenuItem
            icon={<Lock />}
            title="Change Password"
            to="/profile/changepassword"
          />
          <MenuItem
            icon={<Memory />}
            title="Device Info"
            to="/profile/sessioninformation"
          />
        </div>
      </Menu>

      <div className="w-full flex flex-col bg-[#FAF9F6] dark:bg-[#383838]">
        <div className="border-b-2 mt-4 border-gray-300 p-4 text-center w-full">
          <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-[#E3E6EB]">
            Profile Information
          </h3>
          <p className="text-gray-700 dark:text-[#B6BBC2]">
            Update Your password securely
          </p>
        </div>
        <br />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col">
            <label className="block ml-[10%] font-bold text-gray-700 dark:text-[#C4C7CA] mb-1">
              Basics:
            </label>
            <input
              type="text"
              className="text-gray-700 dark:text-[#C4C7CA] bg-white dark:bg-gray-600 border border-gray-300 dark:border-[#7A7E85] w-[80%] mt-2 items-center mx-auto justify-center rounded-md p-3 focus:ring-1 focus:outline-dotted transition"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <FiEdit3 className="absolute right-[12%] mt-2 md:top-11 text-gray-700 dark:text-white" />
            <input
              type="text"
              className="text-gray-700 dark:text-slate-300 cursor-not-allowed w-[80%] mt-2 mx-auto bg-gray-200 dark:bg-gray-700 border border-gray-400 rounded-md p-3 focus:outline-none transition"
              placeholder="Email Address"
              value={user?.email || "email@example.com"}
              readOnly
            />
          </div>

          <div className="relative flex flex-col">
            <label className="block ml-[10%] font-bold text-gray-700 dark:text-[#C4C7CA] mb-1">
              Profile Picture:
            </label>
            <div className="relative flex flex-col items-center">
              <input
                type="file"
                id="avatar"
                className="hidden"
                onChange={imageHandler}
                accept="image/*"
              />
              <p
                className="text-sm w-[80%] bg-white dark:bg-gray-600 text-gray-700 dark:text-white mt-2 border border-gray-300 dark:border-gray-700 rounded-md p-3 cursor-pointer text-center"
                onClick={() => {
                  const avatarInput = document.getElementById("avatar");
                  if (avatarInput) {
                    avatarInput.click();
                  }
                }}
              >
                {imageName ? imageName : "Change your profile picture"}
                <AiOutlineCamera
                  size={21}
                  className="absolute text-gray-700 dark:text-white right-[11.5%] -mt-6 md:top-11"
                />
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-[15%] ml-[10%] mt-[20%] rounded-md bg-gray-500 dark:bg-[#2D5F8F] text-white py-3 hover:bg-gray-400 dark:hover:bg-[#366DA2] shadow-lg"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-[#E3E6EB]" size={20} />
            ) : (
              "SAVE"
            )}
          </button>

          <button
            className="w-[15%] ml-[50%] mt-[20%] rounded-md bg-red-700 text-white py-3 hover:bg-red-400 shadow-lg"
            onClick={handleLogOut}
            disabled={logoutLoading}
          >
            {logoutLoading ? (
              <FaSpinner className="animate-spin text-white" size={20} />
            ) : (
              "Logout"
            )}
          </button>
          {user.role === "user" && (
            <button
              className="w-[15%] ml-[10%] mt-[20%] rounded-md bg-red-600 text-white py-3 hover:bg-red-500 shadow-lg"
              onClick={handleDeleteClick}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <FaSpinner className="animate-spin text-white" size={20} />
              ) : (
                "Delete Account"
              )}
            </button>
          )}
        </form>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-modal"
        aria-describedby="delete-confirmation-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="delete-confirmation-modal"
            variant="h6"
            component="h2"
            sx={{ color: "#1A202C", mb: 2 }}
          >
            Confirm Deletion
          </Typography>
          <Typography
            id="delete-confirmation-description"
            sx={{ mb: 2, color: "#666" }}
          >
            Are you sure you want to delete the user with email{" "}
            <strong>{selectedUserEmail}</strong>? This action cannot be undone.
          </Typography>
          <Typography sx={{ mb: 2, color: "#666" }}>
            Type <strong>delete account</strong> below to confirm:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="delete account"
            sx={{ mb: 3 }}
          />
          {deleteError && (
            <Typography color="error" sx={{ mb: 2 }}>
              Error deleting user. Please try again.
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ color: "#666", borderColor: "#ccc" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileInfo;
