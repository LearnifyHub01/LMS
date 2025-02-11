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



"use client";
import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie"; // For managing session cookies
import { signOut } from "next-auth/react";
import toast from 'react-hot-toast'
const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

interface SocketContextType {
  sessionData: any[];
  updateSessionData: (data: any[]) => void;
}

export const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: ReactNode;
  user: any; // Ensure user is passed from Next.js session
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, user }) => {
  const [sessionData, setSessionData] = useState<any[]>([]);

  useEffect(() => {



    console.log('socket provider user',user)
  
    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", socket.id);
    });
    
    socket.on("updateDevices", (data) => {
      console.log("📡 Received updateDevices event:", data);
      setSessionData((prev) => {
        return data; 
      });
      console.log(user)
    });

    socket.on("logoutAllDevices",async(data)=>{
      if (data.userId === user?._id) {
        toast.error(" logged out", {
          duration: 3000,
        });
        await signOut();
      }else{
        console.log("⚠️ Unauthorized access detected");
        // ✅ Toast for other devices with an invalid session
        toast.error("Unauthorized access!", {
          duration: 3000,
        });
      }
    })

    socket.on('logoutSpecificDevice',async(data)=>{
      toast.error('session expired',{
        duration:3000
      })
      await signOut()
    })
    
    // ✅ Listen for logout event and clear cookies
   

    return () => {
      socket.off('logoutAllDevices')
      socket.off("updateDevices");
      socket.off('logoutSpecificDevice')
      socket.off("connect");
    };
  }, [user]);

  const updateSessionData = (data: any[]) => {
    setSessionData(data);
  };

  return (
    <SocketContext.Provider value={{ sessionData, updateSessionData }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket context
export const useSocket = () => {
  return useContext(SocketContext);
};
