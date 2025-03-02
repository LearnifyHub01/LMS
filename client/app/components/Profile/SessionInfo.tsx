"use client";
import React, { FC, useEffect, useState, useContext } from "react";
import { useLogoutFromAllQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import avtarIcon from "@/public/assests/download5.png";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { SocketContext } from "@/context/SocketProvider";
import {
  HomeOutlined,
  Dashboard,
  School,
  Lock,
  Face,
} from "@mui/icons-material";

interface Session {
  sessionId: string;
  device: string;
  browser: string;
}

interface Props {
  user: any;
}

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

const SessionInfo: FC<Props> = ({ user }) => {
  const [currentSessionId, setCurrentSessionId] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [logout, setLogout] = useState(false);
  const [session, setSession] = useState(user.sessions || []);
  const [logoutFromAll, setLogoutFromAll] = useState(false);
  // Fetch logout queries only when triggered
  const logoutQuery = useLogOutQuery(undefined, { skip: !logout });
  const logoutFromAllQuery = useLogoutFromAllQuery(undefined, {
    skip: !logoutFromAll,
  });
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <p>Loading...</p>;
  const { sessionData } = socketContext;
  useEffect(() => {
    if (sessionData && sessionData.length > 0) {
      setSession(sessionData); // Update the state with the new session data
    }
  }, [sessionData]); // This ensures the component updates when sessionData changes

  useEffect(() => {
    if (logoutFromAll) logoutFromAllQuery.refetch();
  }, [logoutFromAll]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && openSidebar) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar]);

  const handleLogoutFromAll = async () => {
    await signOut({ redirect: false });
    setLogoutFromAll(true);
    redirect("/");
  };

  useEffect(() => {
    const getCurrentCookie = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/get-current-cookie",
          { withCredentials: true }
        );
        setCurrentSessionId(response.data.sessionId);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentCookie();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#DDE6ED] dark:bg-[#27374D]">
      {/* left side component */}
      <Menu className={`${openSidebar ? "block" : "hidden"} md:flex w-[28%]`}>
        {/* Profile Picture & Name in Sidebar */}
        <div className="flex flex-col items-center mt-8">
          <div className="relative w-[100%] h-[100%]">
            <Image
              src={user?.avatar?.url || avtarIcon}
              alt="Profile"
              width={140}
              height={140}
              className="rounded-full border-2 border-gray-300"
              style={{height:'100px', width:'102px'}}
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
              {user.role == "admin" && (
                <MdVerified className="text-blue-500 text-lg md:text-xl " />
              )}
            </div>
          </div>

          <p className="text-[#6A7F4D] dark:text-[#AABFCC] pt-2 mr-[20%]">{user?.role}</p>
        </div>

        {/* Sidebar Navigation */}
        <div className="mt-4 w-full">
          <MenuItem icon={<HomeOutlined />} title="Home" to="/" />
          <MenuItem icon={<Face />} title="Profile" to="/profile" />
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
        </div>
      </Menu>

      {/* right side */}
      <div className="w-full flex flex-col bg-[#FAF9F6] dark:bg-[#383838]">
        <div className="border-b-2 mt-4 border-gray-300 p-4 text-center w-full">
          <h3 className="text-lg md:text-xl font-bold text-gray-700  dark:text-[#E3E6EB]">
            Device Info.{" "}
          </h3>
          <p className="text-gray-700 dark:text-[#B6BBC2]">
            View Active Device and Session{" "}
          </p>
        </div>
        {session.length > 0 ? (
          <div className="space-y-4 pl-4 pr-[40%] pt-4">
            {session.map((session: any, index: number) => {
              const sessionId = session.sessionKey.split(":").pop();
              const isMatch = currentSessionId == sessionId;

              return (
                <div
                  key={index}
                  className="w-full max-w-[450px] p-5 bg-gradient-to-br from-[#E5E7EB] to-[#CBD5E1] rounded-2xl shadow-xl flex flex-col space-y-4 relative overflow-hidden border border-[#94A3B8]/50 backdrop-blur-md"
                >
                  {/* Floating Decorative Element */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-bl from-[#64748B] to-[#475569] opacity-25 rounded-full blur-xl"></div>

                  {/* Card Content */}
                  <div className="relative z-10 text-gray-900 space-y-3">
                    <p className="text-lg font-semibold text-gray-800">
                      {session.device} {session.deviceName} | {session.hostName}
                    </p>

                    {isMatch && (
                      <p className="text-sm italic text-[#2563EB]">
                        This device
                      </p>
                    )}

                    <div className="text-sm space-y-2 bg-white/50 p-4 rounded-lg border border-[#94A3B8]/40 shadow-md backdrop-blur-md">
                      <p>
                        <span className="font-semibold text-gray-700">
                          Browser:
                        </span>{" "}
                        {session.browser}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">IP:</span>{" "}
                        {session.ipAddress}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Login:
                        </span>{" "}
                        {new Date(session.loginTime).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Session ID:
                        </span>{" "}
                        {sessionId}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            No active sessions found.
          </p>
        )}
        {session.length > 0 && (
          <button
            onClick={handleLogoutFromAll}
            className="w-[20%] ml-4 mt-5 flex items-center justify-center rounded-md bg-red-700 text-white py-4 hover:bg-red-400 shadow-lg"
          >
            Logout From All Devices
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionInfo;

// "use client";
// import React, { FC, useEffect, useState, useContext } from "react";
// import { useLogoutFromAllQuery } from "@/redux/features/auth/authApi";
// import { redirect } from "next/navigation";
// import { signOut } from "next-auth/react";
// import axios from "axios";
// import Image from "next/image";
// import avtarIcon from "@/public/assests/download5.png";
// import { MdVerified } from "react-icons/md";
// import Link from "next/link";
// import { useLogOutQuery } from "@/redux/features/auth/authApi";
// import { SocketContext } from "@/context/SocketProvider";
// import {
//   HomeOutlined,
//   Dashboard,
//   School,
//   Lock,
//   Face,
//   Web,
//   NetworkWifi,
//   AccessTime,
//   Fingerprint,
// } from "@mui/icons-material";

// interface Session {
//   sessionId: string;
//   device: string;
//   browser: string;
// }

// interface Props {
//   user: any;
// }

// // Original Sidebar (Unchanged)
// const Menu: FC<{ children: React.ReactNode; className?: string }> = ({
//   children,
//   className = "",
// }) => (
//   <div
//     className={`w-[28%] bg-[#D1D1D1] dark:bg-[#2C2C2C] dark:text-[#C4C7CA] text-[#1D3C6A] overflow-y-auto p-4 flex flex-col items-center transition-all duration-300 ${className}`}
//   >
//     {children}
//   </div>
// );

// // Original MenuItem (Unchanged)
// const MenuItem: FC<{ icon: React.ReactNode; title: string; to: string }> = ({
//   icon,
//   title,
//   to,
// }) => (
//   <Link
//     href={to}
//     className="flex items-center gap-3 w-full mt-6 p-2 rounded-md hover:bg-[#5A86C5] dark:hover:bg-[#3A5E9E]"
//   >
//     {icon}
//     {title}
//   </Link>
// );

// const SessionInfo: FC<Props> = ({ user }) => {
//   const [currentSessionId, setCurrentSessionId] = useState("");
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const [logout, setLogout] = useState(false);
//   const [session, setSession] = useState(user.sessions || []);
//   const [logoutFromAll, setLogoutFromAll] = useState(false);

//   const logoutQuery = useLogOutQuery(undefined, { skip: !logout });
//   const logoutFromAllQuery = useLogoutFromAllQuery(undefined, {
//     skip: !logoutFromAll,
//   });
//   const socketContext = useContext(SocketContext);

//   if (!socketContext) return <p className="text-center text-gray-500">Loading...</p>;
//   const { sessionData } = socketContext;

//   useEffect(() => {
//     if (sessionData && sessionData.length > 0) {
//       setSession(sessionData);
//     }
//   }, [sessionData]);

//   useEffect(() => {
//     if (logoutFromAll) logoutFromAllQuery.refetch();
//   }, [logoutFromAll]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 800 && openSidebar) {
//         setOpenSidebar(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [openSidebar]);

//   const handleLogoutFromAll = async () => {
//     await signOut({ redirect: false });
//     setLogoutFromAll(true);
//     redirect("/");
//   };

//   useEffect(() => {
//     const getCurrentCookie = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/v1/get-current-cookie",
//           { withCredentials: true }
//         );
//         setCurrentSessionId(response.data.sessionId);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getCurrentCookie();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-[#DDE6ED] dark:bg-[#27374D]">
//       {/* Left Sidebar - Original Design */}
//       <Menu className={`${openSidebar ? "block" : "hidden"} md:flex w-[28%]`}>
//         <div className="flex flex-col items-center mt-8">
//           <div className="relative w-[100%] h-[100%]">
//             <Image
//               src={user?.avatar?.url || avtarIcon}
//               alt="Profile"
//               width={140}
//               height={140}
//               className="rounded-full border-2 border-gray-300"
//               style={{ height: "100px", width: "102px" }}
//             />
//           </div>
//           <div className="text-center space-y-2">
//             <div className="flex items-center justify-center gap-2 pt-4">
//               <h2 className="text-xl md:text-2xl font-semibold text-gray-1000 dark:text-[#9E9E9E] text-[#003366]">
//                 {user?.name
//                   ? user?.name
//                       .split(" ")
//                       .map(
//                         (word: any) =>
//                           word.charAt(0).toUpperCase() + word.slice(1)
//                       )
//                       .join(" ")
//                   : "User Name"}
//               </h2>
//               {user.role === "admin" && (
//                 <MdVerified className="text-blue-500 text-lg md:text-xl" />
//               )}
//             </div>
//           </div>
//           <p className="text-[#6A7F4D] dark:text-[#AABFCC] pt-2 mr-[20%]">{user?.role}</p>
//         </div>

//         <div className="mt-4 w-full">
//           <MenuItem icon={<HomeOutlined />} title="Home" to="/" />
//           <MenuItem icon={<Face />} title="Profile" to="/profile" />
//           {user.role === "admin" && (
//             <MenuItem
//               icon={<Dashboard />}
//               title="Admin Dashboard"
//               to="/admin"
//             />
//           )}
//           <MenuItem
//             icon={<School />}
//             title="Enrolled Courses"
//             to="/profile/viewcourses"
//           />
//           <MenuItem
//             icon={<Lock />}
//             title="Change Password"
//             to="/profile/changepassword"
//           />
//         </div>
//       </Menu>

//       {/* Right Content - Enhanced Card Design */}
//       <div className="w-full flex flex-col bg-[#FAF9F6] dark:bg-[#383838] p-6">
//         <div className="border-b-2 border-gray-200 dark:border-gray-700 pb-4 text-center w-full">
//           <h3 className="text-2xl font-bold text-gray-800 dark:text-[#E5E7EB] tracking-tight">
//             Device Insights
//           </h3>
//           <p className="text-gray-600 dark:text-[#B0B3B8] mt-1 italic">
//             Monitor Your Active Sessions
//           </p>
//         </div>

//         {session.length > 0 ? (
//           <div className="space-y-8 pt-8 px-4">
//             {session.map((session: any, index: number) => {
//               const sessionId = session.sessionKey.split(":").pop();
//               const isMatch = currentSessionId === sessionId;

//               return (
//                 <div
//                   key={index}
//                   className="w-full max-w-[540px] p-6 bg-white/95 dark:bg-[#3C3C3C]/95 rounded-2xl shadow-lg relative overflow-hidden border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//                 >
//                   {/* Gradient Accent */}
//                   <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-teal-400 to-gray-300 dark:from-blue-600 dark:via-teal-600 dark:to-gray-600 opacity-80"></div>

//                   {/* Subtle Background Pattern */}
//                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(200,200,200,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,_rgba(80,80,80,0.1)_0%,_transparent_50%)] pointer-events-none"></div>

//                   {/* Card Content */}
//                   <div className="relative z-10 space-y-6">
//                     <div className="flex items-center justify-between">
//                       <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
//                         {session.device} {session.deviceName} | {session.hostName}
//                       </p>
//                       {isMatch && (
//                         <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-teal-600 bg-teal-100/70 rounded-full dark:text-teal-300 dark:bg-teal-900/50 shadow-sm">
//                           Active Now
//                         </span>
//                       )}
//                     </div>

//                     <div className="text-sm bg-gray-100/50 dark:bg-gray-900/40 p-6 rounded-xl border border-gray-200/40 dark:border-gray-700/40 shadow-inner">
//                       <div className="grid grid-cols-1 gap-5">
//                         <p className="flex items-start gap-3">
//                           <Web className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5" />
//                           <div>
//                             <span className="font-semibold text-gray-800 dark:text-gray-200 block">
//                               Browser
//                             </span>
//                             <span className="text-gray-600 dark:text-gray-400">
//                               {session.browser}
//                             </span>
//                           </div>
//                         </p>
//                         <p className="flex items-start gap-3">
//                           <NetworkWifi className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5" />
//                           <div>
//                             <span className="font-semibold text-gray-800 dark:text-gray-200 block">
//                               IP Address
//                             </span>
//                             <span className="text-gray-600 dark:text-gray-400">
//                               {session.ipAddress}
//                             </span>
//                           </div>
//                         </p>
//                         <p className="flex items-start gap-3">
//                           <AccessTime className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5" />
//                           <div>
//                             <span className="font-semibold text-gray-800 dark:text-gray-200 block">
//                               Login Time
//                             </span>
//                             <span className="text-gray-600 dark:text-gray-400">
//                               {new Date(session.loginTime).toLocaleString()}
//                             </span>
//                           </div>
//                         </p>
//                         <p className="flex items-start gap-3">
//                           <Fingerprint className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5" />
//                           <div>
//                             <span className="font-semibold text-gray-800 dark:text-gray-200 block">
//                               Session ID
//                             </span>
//                             <span className="text-gray-600 dark:text-gray-400 truncate">
//                               {sessionId}
//                             </span>
//                           </div>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p className="text-gray-600 dark:text-gray-400 text-center py-10 italic">
//             No active sessions detected.
//           </p>
//         )}

//         {session.length > 0 && (
//           <button
//             onClick={handleLogoutFromAll}
//             className="w-[25%] mx-auto mt-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 font-semibold text-lg hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-300/50 dark:focus:ring-red-900/50 transition-all duration-300 shadow-md hover:shadow-lg"
//           >
//             Logout From All Devices
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SessionInfo;