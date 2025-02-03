'use client'
import React, { useEffect, useState } from "react";
import { useLogoutFromAllQuery } from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SessionInfo = () => {
  const router = useRouter();
  const [cureentSessionId, setCurrentSessionId] = useState("");
  const [session, setSession] = useState([]);
  const user = useSelector((state: any) => state.auth);
  useEffect(() => {
    setSession(user.user.sessions);
  }, [session, user]);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutFromAllQuery(undefined, {
    skip: !logout ? true : false,
  });

  const handleLogoutFromAll = async () => {

    await signOut({ redirect: false });
  

    setLogout(true);
    redirect('/')
  };
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
  useEffect(() => {
    getCurrentCookie();
  }, [getCurrentCookie]);

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Active Sessions</h2>
      {session.length > 0 ? (
        <ul className="space-y-2">
          {session.map((session: any, index: number) => {
            const sessionId = session.sessionKey.split(":").pop()
            
            return (
              <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                <p>
                  <strong>IP:</strong> {session.ipAddress}
                </p>
                <p>
                  <strong>Last Active:</strong>{" "}
                  {new Date(session.loginTime).toLocaleString()}
                </p>
                <p>
                  <strong>Os:</strong> {session.os}
                </p>
                <p>
                  <strong>browser:</strong> {session.browser}
                </p>
                <p>
                  <strong>sesionKey:</strong> {session.sessionKey}
                </p>
              </li>
            );
          })}
          <button onClick={handleLogoutFromAll}>Logout From All</button>
        </ul>
      ) : (
        <p>No active sessions found.</p>
      )}
    </div>
  );
};

export default SessionInfo;

