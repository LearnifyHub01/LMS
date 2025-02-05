
//online user is pending
"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { useLogoutFromAllQuery } from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import avtarIcon from "@/public/assests/download5.png";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { RiAdminFill } from "react-icons/ri";
import { FaChalkboardTeacher, FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import {
  FaDesktop,
  FaGlobe,
  FaClock,
  FaKey,
  FaTabletAlt,
} from "react-icons/fa";

type Props = {
  user: any;
};
const TARGET_TEXT = "Change Password";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join(" ");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group relative px-4 py-2 w-full font-medium dark: text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300"
    >
      <div className="relative z-10 flex items-center gap-2">
        <FiLock />
        <span>{text}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};
const SessionInfo: FC<Props> = ({ user }) => {
  // const router = useRouter();
  // const [cureentSessionId, setCurrentSessionId] = useState("");
  // const [session, setSession] = useState([]);
  // const [openSidebar, setOpenSidebar] = useState(false);
  // const [logout, setLogout] = useState(false);

  // const {} = useLogoutFromAllQuery(undefined, {
  //   skip: !logout ? true : false,
  // });

  // const {
  //   data,
  //   isLoading: logoutLoading,
  //   isSuccess: logoutSuccess,
  //   error: logoutError,
  // } = useLogOutQuery(undefined, {
  //   skip: !logout,
  // });
  // useEffect(() => {
  //   // Automatically close the sidebar on larger screens
  //   const handleResize = () => {
  //     if (window.innerWidth > 800 && openSidebar) {
  //       setOpenSidebar(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [openSidebar]);
  // useEffect(() => {
  //   setSession(user.sessions);
  // }, [session, user]);
  

  // const handleLogOut = async () => {
  //   await signOut({ redirect: false });
  //   setLogout(true);
  // };
  // const handleLogoutFromAll = async () => {
  //   await signOut({ redirect: false });
  //   setLogout(true);
  //   redirect("/");
  // };
  // const getCurrentCookie = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/v1/get-current-cookie",
  //       { withCredentials: true }
  //     );
  //     setCurrentSessionId(response.data.sessionId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getCurrentCookie();
  // }, [getCurrentCookie]);
  const router = useRouter();
  const [currentSessionId, setCurrentSessionId] = useState("");
  const [session, setSession] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [logout, setLogout] = useState(false);
  const [logoutFromAll, setLogoutFromAll] = useState(false);

  // Fetch logout queries only when triggered
  const logoutQuery = useLogOutQuery(undefined, { skip: !logout });
  const logoutFromAllQuery = useLogoutFromAllQuery(undefined, { skip: !logoutFromAll });

  useEffect(() => {
    if (logout) logoutQuery.refetch();
  }, [logout]);

  useEffect(() => {
    if (logoutFromAll) logoutFromAllQuery.refetch();
  }, [logoutFromAll]);

  useEffect(() => {
    setSession(user.sessions);
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && openSidebar) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar]);

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    setLogout(true);
  };

  const handleLogoutFromAll = async () => {
    await signOut({ redirect: false });
    setLogoutFromAll(true);
    redirect("/");
  };

  useEffect(() => {
    const getCurrentCookie = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/get-current-cookie", { withCredentials: true });
        setCurrentSessionId(response.data.sessionId);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentCookie();
  }, []);

  return (
    <div className="flex flex-col min-h-screen  overflow-hidden bg-gray-100 dark:bg-[#121212]">
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 max-w-full w-full md:py-0 flex-1">
        {/* left side component */}
        <div
          className={`w-full md:w-[300px] bg-gray-700 dark:bg-[#1e1e2e] shadow-xl p-6 text-center border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-start space-y-4 ${
            openSidebar ? "block" : "hidden md:block"
          }`}
        >
          {/* Avatar Section */}
          <div className="relative w-20 h-20 mx-auto">
            <Image
              src={user.avatar.url || avtarIcon}
              alt="Profile Picture"
              width={500}
              height={500}
              className="w-full h-full object-cover border-2 border-[#37a39a] rounded-full shadow-lg"
            />
          </div>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-1">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-1000 text-white">
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
              {user.role == "admin" && (
                <MdVerified className="text-blue-500 text-lg md:text-xl " />
              )}
            </div>
            <p className="  text-gray-300 text-sm md:text-base">
              {user?.email || "email@example.com"}
            </p>
            <br />
          </div>

          <div className="flex w-full  mt-4">
            {user.role === "admin" && (
              <Link href="/admin" passHref>
                <button className="group relative flex items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                  <RiAdminFill size={20} />
                  <span>Admin Dashboard</span>
                </button>
              </Link>
            )}
          </div>
          <div className="flex w-full mt-4">
            <Link href="/profile/viewcourses" passHref>
              <button className="group relative flex items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                <FaChalkboardTeacher size={20} />
                <span>Enrolled Courses</span>

                {/* Hover Borders (Only visible on hover) */}
              </button>
            </Link>
          </div>
          <div>
            <Link href="/profile/changepassword" passHref>
              <EncryptButton />
            </Link>
          </div>

          <div className="flex w-full mt-4">
            <Link href="/profile/sessioninformation" passHref>
              <button className="group relative flex jus items-center gap-2 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300">
                <RiAdminFill size={20} />
                <span>Device Info</span>
              </button>
            </Link>
          </div>
          <div>
            <button
              className="w-full flex items-center justify-center gap-3 px-6 py-3 
                         text-white bg-[#37a39a] rounded-lg shadow-lg transition 
                         duration-300 ease-in-out transform hover:bg-[#2b8277] 
                         hover:scale-105 hover:shadow-xl active:scale-95"
              onClick={handleLogOut}
            >
              {/* {logoutLoading ? (
                <FaSpinner className="animate-spin text-lg" />
              ) : (
                <>
                  <FaSignOutAlt className="text-lg" />
                  <span className="font-medium">Logout</span>
                </>
              )} */}
              logout
            </button>
          </div>
        </div>
        {/* right side */}

        <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            🔒 Active Sessions
          </h3>

          {session.length > 0 ? (
            <ul className="space-y-4">
              {session.map((session: any, index: number) => {
                const sessionId = session.sessionKey.split(":").pop();


                return (
                  <li
                    key={index}
                    className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
                  >
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaGlobe
                          size={18}
                          className="text-blue-600 dark:text-blue-400"
                        />
                        <strong>IP:</strong> {session.ipAddress}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaClock
                          size={18}
                          className="text-yellow-600 dark:text-yellow-400"
                        />
                        <strong>Last Active:</strong>{" "}
                        {new Date(session.loginTime).toLocaleString()}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaDesktop
                          size={18}
                          className="text-green-600 dark:text-green-400"
                        />
                        <strong>OS:</strong> {session.os}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaTabletAlt
                          size={18}
                          className="text-purple-600 dark:text-purple-400"
                        />
                        <strong>Browser:</strong> {session.browser}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaKey
                          size={18}
                          className="text-red-600 dark:text-red-400"
                        />
                        <strong>Session ID:</strong> {sessionId}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-center">
              No active sessions found.
            </p>
          )}

          {session.length > 0 && (
            <button
              onClick={handleLogoutFromAll}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
            >
              <FaSignOutAlt size={20} />
              Logout From All Sessions
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
