// import React, { createContext, useEffect, useState, ReactNode } from "react";
// import { io } from "socket.io-client";
// import { deleteCookie } from "cookies-next"; 
// import { useRouter } from "next/navigation"; 


// const socket = io("http://localhost:8080", {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 3000,
// });

// interface SocketContextType {
//   sessionData: any[];
//   updateSessionData: (data: any[]) => void;
// }

// export const SocketContext = createContext<SocketContextType | null>(null);

// interface SocketProviderProps {
//   children: ReactNode;
//   user?: any; 
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children,user }) => {
//   const [sessionData, setSessionData] = useState<any[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to WebSocket:", socket.id);
//     });

//     socket.on("updateDevices", (data) => {
//       console.log("Received updateDevices event:", data);
      // setSessionData((prev) => {
      //   return data; 
      // });
//     });

//     if(user?._id){
//       const logoutEvent = `logout-${user._id}`;
//       console.log("Received updateDevices event:", user?._id);
//       socket.on(logoutEvent,()=>{
//         deleteCookie("access_token");
//         deleteCookie("refresh_token");
//         deleteCookie("session_id");

//         setSessionData([]);
//         router.push("/");
//       })
      
//     return () => {
//       socket.off(logoutEvent);
//       socket.off("updateDevices");
//       socket.off("connect");
//     };
//     }


//   }, [user,router]);

//   const updateSessionData = (data: any[]) => {
//     setSessionData(data);
//   };

//   return (
//     <SocketContext.Provider value={{ sessionData, updateSessionData }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };



// "use client";
// import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
// import { io } from "socket.io-client";
// import Cookies from "js-cookie"; // For managing session cookies
// import { signOut } from "next-auth/react";
// import toast from 'react-hot-toast'
// const socket = io("http://localhost:8080", {
//   transports: ["websocket"],
//   reconnectionAttempts: 5,
//   reconnectionDelay: 3000,
// });

// interface SocketContextType {
//   sessionData: any[];
//   updateSessionData: (data: any[]) => void;
//   courses: any[];
//   updateCourses: (data: any[]) => void;
// }

// export const SocketContext = createContext<SocketContextType | null>(null);

// interface SocketProviderProps {
//   children: ReactNode;
//   user: any; // Ensure user is passed from Next.js session
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children, user }) => {
//   const [sessionData, setSessionData] = useState<any[]>([]);
//   const [courses,setCourses] = useState<any[]>([])

//   useEffect(() => {



//     console.log('socket provider user',user)
  
//     socket.on("connect", () => {
//       console.log("✅ Connected to WebSocket:", socket.id);
//     });
    
//     socket.on("updateDevices", (data) => {
//       console.log("📡 Received updateDevices event:", data);
//       setSessionData((prev) => {
//         return data; 
//       });
//       console.log(user)
//     });

//     socket.on("logoutAllDevices",async(data)=>{
//       if (data.userId === user?._id) {
//         toast.error(" logged out", {
//           duration: 3000,
//         });
//         await signOut();
//       }else{
//         console.log("⚠️ Unauthorized access detected");
//         // ✅ Toast for other devices with an invalid session
//         toast.error("Unauthorized access!", {
//           duration: 3000,
//         });
//       }
//     })

//     socket.on('logoutSpecificDevice',async(data)=>{
     
//       toast.error('session expired',{
//         duration:3000
//       })
//       await signOut()
//     })

//     socket.on("new-course", (newCourse) => {
//       setCourses((prevCourses) => [newCourse, ...prevCourses]); // Add new course in real-time
//     });
    
//     // ✅ Listen for logout event and clear cookies
   

//     return () => {
//       socket.off('logoutAllDevices')
//       socket.off("updateDevices");
//       socket.off('logoutSpecificDevice')
//       socket.off("connect");
//     };
//   }, [user]);

//   const updateSessionData = (data: any[]) => {
//     setSessionData(data);
//   };
//   const updateCourses = (data: any[]) => {
//     setCourses(data);
//   };

//   return (
//     <SocketContext.Provider value={{ sessionData, updateSessionData, courses, updateCourses }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// // Custom hook to use socket context
// export const useSocket = () => {
//   return useContext(SocketContext);
// };

"use client";

import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

// ✅ Initialize Socket.io
const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

// ✅ Define Type for Context
interface SocketContextType {
  sessionData: any[];
  updateSessionData: (data: any[]) => void;
  courses: any[];
  updateCourses: (data: any[]) => void;
  newUser: any[]; // ✅ Added newUser
  updateNewUser: (data: any[]) => void; // ✅ Function to update newUser
}

// ✅ Create Context with Default Values
export const SocketContext = createContext<SocketContextType>({
  sessionData: [],
  updateSessionData: () => {},
  courses: [],
  updateCourses: () => {},
  newUser: [], // ✅ Added newUser default state
  updateNewUser: () => {},
});

interface SocketProviderProps {
  children: ReactNode;
  user: any;
}

// ✅ Socket Provider Component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children, user }) => {
  const [sessionData, setSessionData] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [newUser, setNewUser] = useState<any[]>([]); // 

  useEffect(() => {
    console.log("ℹ️ Socket Provider Initialized", { user });

    const handleUpdateDevices = (data: any[]) => {
      console.log("📡 Received updateDevices event:", data);
      setSessionData(data);
    };

    const handleLogoutAllDevices = async (data: { userId: string }) => {
      if (data.userId === user?._id) {
        toast.error("You've been logged out from all devices!", { duration: 3000 });
        await signOut();
      }
    };

    const handleLogoutSpecificDevice = async () => {
      toast.error("Session expired. Logging out...", { duration: 3000 });
      await signOut();
    };

    const handleNewCourse = (newCourse: any) => {
      setCourses((prevCourses) => [newCourse, ...prevCourses]);
    };

    const handleNewUser = (newUser: any) => {
      console.log("📡 New user received:", newUser);
      setNewUser((prevUsers) => [newUser, ...prevUsers]); // ✅ Update state when new user is emitted
    };

    // ✅ Attach Event Listeners
    socket.on("connect", () => console.log("✅ Connected to WebSocket:", socket.id));
    socket.on("updateDevices", handleUpdateDevices);
    socket.on("logoutAllDevices", handleLogoutAllDevices);
    socket.on("logoutSpecificDevice", handleLogoutSpecificDevice);
    socket.on("new-course", handleNewCourse);
    socket.on("new-user", handleNewUser);

    // ✅ Cleanup on Unmount
    return () => {
      socket.off("updateDevices", handleUpdateDevices);
      socket.off("logoutAllDevices", handleLogoutAllDevices);
      socket.off("logoutSpecificDevice", handleLogoutSpecificDevice);
      socket.off("new-course", handleNewCourse);
      socket.off("new-user", handleNewUser);
    };
  }, [user]);

  // ✅ State Updaters
  const updateSessionData = (data: any[]) => setSessionData(data);
  const updateCourses = (data: any[]) => setCourses(data);
  const updateNewUser = (data: any[]) => setNewUser(data); // ✅ Update function

  return (
    <SocketContext.Provider value={{ sessionData, updateSessionData, courses, updateCourses, newUser, updateNewUser }}>
      {children}
    </SocketContext.Provider>
  );
};

// ✅ Custom Hook for Using Socket Context
export const useSocket = () => {
  return useContext(SocketContext);
};
