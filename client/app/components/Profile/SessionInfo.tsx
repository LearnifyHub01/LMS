// //online user is pending
// "use client";
// import React, { FC, useEffect, useRef, useState,useContext } from "react";
// import { useLogoutFromAllQuery } from "@/redux/features/auth/authApi";
// import { redirect } from "next/navigation";
// import { signOut } from "next-auth/react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import avtarIcon from "@/public/assests/download5.png";
// import { MdVerified } from "react-icons/md";
// import Link from "next/link";
// import { useLogOutQuery } from "@/redux/features/auth/authApi";
// import { SocketContext } from "@/context/SocketProvider";


// interface Session {
//   sessionId: string;
//   device: string;
//   browser: string;
// }

// interface Props {
//   user: any
// }

// const SessionInfo: FC<Props> = ({ user }) => {
//   const [currentSessionId, setCurrentSessionId] = useState("");
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const [logout, setLogout] = useState(false);
//   const [session, setSession] = useState(user.sessions || []);
//   const [logoutFromAll, setLogoutFromAll] = useState(false);
//   // Fetch logout queries only when triggered
//   const logoutQuery = useLogOutQuery(undefined, { skip: !logout });
//   const logoutFromAllQuery = useLogoutFromAllQuery(undefined, {
//     skip: !logoutFromAll,
//   });
//   const socketContext = useContext(SocketContext);
//   if (!socketContext) return <p>Loading...</p>;
//   const { sessionData } = socketContext;
//   useEffect(() => {
//     if (sessionData && sessionData.length > 0) {
//       setSession(sessionData); // Update the state with the new session data
//     }
//   }, [sessionData]); // This ensures the component updates when sessionData changes
 

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
//     <div className="flex-col min-h-screen overflow-hidden bg-white dark:bg-[#27374D] flex items-center justify-center">
//       <div className="max-w-[1400px] top-0 w-full border border-gray-300 dark:border-gray-700  bg-white dark:bg-[#27374D] flex">
//         {/* left side component */}
//         <div className="w-[30%] border-r border-gray-300 dark:border-gray-700 p-4 flex flex-col h-full">
//           <div className="w-full text-center flex flex-col items-center justify-start space-y-4">
//             <div className="relative w-20 top-2 h-20 mx-auto">
//               <Image
//                 src={user?.avatar?.url || avtarIcon}
//                 alt="Profile Picture"
//                 width={500}
//                 height={500}
//                 className="w-full h-full object-cover border-2 border-[black] rounded-full shadow-lg"
//               />
//             </div>
//             <div className="text-center space-y-2">
//               <div className="flex items-center justify-center gap-1">
//                 <h2 className="text-xl md:text-2xl font-semibold text-gray-1000 text-black">
//                   {user?.name
//                     ? user?.name
//                         .split(" ")
//                         .map(
//                           (word: any) =>
//                             word.charAt(0).toUpperCase() + word.slice(1)
//                         )
//                         .join(" ")
//                     : "User Name"}
//                 </h2>
//                 {user.role == "admin" && (
//                   <MdVerified className="text-blue-500 text-lg md:text-xl " />
//                 )}
//               </div>
//             </div>
//             {/* Avatar Section */}
//           </div>
//           <div className="flex flex-col w-full space-y-3">
//             <Link
//               href="/profile"
//               className="group flex mt-6 items-center gap-1 px-0 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//             >
//               <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                 Profile
//               </span>
//             </Link>

//             {user.role === "admin" && (
//               <Link
//                 href="/admin"
//                 passHref
//                 className="group flex items-center gap-1 px-0 py-2 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//               >
//                 <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                   Admin Dashboard
//                 </span>
//               </Link>
//             )}

//             <Link
//               href="/profile/viewcourses"
//               passHref
//               className="group flex items-center gap-1 px-0 py-2 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//             >
//               <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                 Enrolled Courses
//               </span>
//             </Link>

//             <Link
//               href="/profile/changepassword"
//               passHref
//               className="group flex items-center gap-1 px-0 py-2 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//             >
//               <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                 Change password
//               </span>
//             </Link>

//             <Link
//               href="/profile/sessioninformation"
//               passHref
//               className="group flex items-center gap-1 px-0 py-2 font-medium text-black transition-colors hover:text-[#1E40AF] relative"
//             >
//               <span className="relative after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[#1E40AF] after:transition-all after:duration-300 group-hover:after:w-full">
//                 Device Info.
//               </span>
//             </Link>
//           </div>
//           {session.length > 0 && (
//             <button
//               onClick={handleLogoutFromAll}
//               className="w-[180px] ml-4 mt-5 flex items-center justify-center rounded-md px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 shadow-md hover:shadow-xl active:scale-95 transition-all duration-200 whitespace-nowrap"
//             >
//               Logout From All Devices
//             </button>
//           )}
//           <br />
//           <br />
//           <br />
//           <br />
//         </div>

//         {/* right side */}
//         <div className="w-full flex flex-col">
//         <div className="border-b mt-4 border-gray-300 dark:border-gray-700 p-4 text-center w-full">
//             <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-white">
//               Device{" "}
//             </h3>
//           </div>
//           {session.length > 0 ? (
//             <div  className="space-y-4 pl-4 pr-[40%] pt-4">
//               {session.map((session: any, index: number) => {
//                 const sessionId = session.sessionKey.split(":").pop();
//                 const isMatch = currentSessionId == sessionId;

//                 return (
//                   <div
//                     key={index}
//                   className="w-full  md:w-[570px] p-4 bg-white dark:bg-gray-800 border-t-2 border-b-2 border-gray-300 dark:border-gray-700 rounded-3xl flex flex-col"
//                   >
//                     <div className="space-y-2">
//                       <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                       
//                         {session.device} {session.deviceName} |{" "}
//                         {session.hostName}
//                       </p>
//                       {isMatch && <p>this device</p>}
//                       <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                       
//                         {session.browser} | {session.ipAddress}
//                       </p>
//                       <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                     
//                         {new Date(session.loginTime).toLocaleString()}
//                       </p>

//                       <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      
//                         {sessionId}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//           ) : (
//             <p className="text-gray-600 dark:text-gray-300 text-center">
//               No active sessions found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SessionInfo;
// // "use client";

// // import React, { useContext, useEffect, useState } from "react";
// // import { SocketContext } from "@/context/SocketProvider";
// // import { FC } from "react";

// // interface Session {
// //   sessionId: string;
// //   device: string;
// //   browser: string;
// // }

// // interface Props {
// //   user: {
// //     sessions: Session[];
// //   };
// // }

// // const SessionInfo: FC<Props> = ({ user }) => {
//   // const socketContext = useContext(SocketContext);
//   // if (!socketContext) return <p>Loading...</p>;

//   // const { sessionData } = socketContext;

//   // // Local state to manage sessions (initialize with user sessions if available)
//   // const [sessions, setSessions] = useState<Session[]>(user.sessions || []);

//   // useEffect(() => {
//   //   if (sessionData && sessionData.length > 0) {
//   //     console.log("🔄 Received updateDevices event:", sessionData);
//   //     setSessions(sessionData); // Update the state with the new session data
//   //   }
//   // }, [sessionData]); // This ensures the component updates when sessionData changes

// //   return (
// //     <div>
// //       <h3>Active Sessions</h3>
// //       {sessions.length > 0 ? (
// //         sessions.map((s) => (
// //           <div key={s.sessionId}>
// //             <p><strong>Device:</strong> {s.device}</p>
// //             <p><strong>Browser:</strong> {s.browser}</p>
// //           </div>
// //         ))
// //       ) : (
// //         <p>No active sessions.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default SessionInfo;
//online user is pending
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
