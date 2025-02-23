// "use client";

// import { useState, FormEvent } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function UpdatePasswordPage() {
//   const params = useParams();
//   const router = useRouter();

//   const id = params?.id as string;
//   const token = params?.token as string;

//   const [password, setPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_SERVER_URI}reset-password/${id}/${token}`,
//         { password }
//       );

//       if (res.status === 200) {
//         toast.success("Password changed successfully!");
//         router.push("/"); // Redirect to login page after success
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         toast.error(err.message);
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//    try {
    
//    } catch (error:any) {
    
//    }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Update Password</h1>
//       <form
//         onSubmit={handleSubmit}
//         className="w-80 bg-white p-6 rounded-lg shadow-md"
//       >
//         <label className="block mb-2 font-medium">New Password:</label>
//         <input
//           type="password"
//           className="w-full p-2 border rounded"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Password"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import socketInstance from "@/app/utils/socket"; // Import your socket instance

export default function UpdatePasswordPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;
  const token = params?.token as string;

  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // ✅ Listen for 'logoutAllDevices' event
    const handleLogout = ({ userId }: { userId: string }) => {
      if (userId === id) {
        router.push("/"); // Redirect user to login page
      }
    };

    socketInstance.on("logoutAllDevices", handleLogout);

    return () => {
      socketInstance.off("logoutAllDevices", handleLogout); // Cleanup listener on unmount
    };
  }, [id, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}reset-password/${id}/${token}`,
        { password }
      );

      if (res.status === 200) {
        toast.success("Password changed successfully!");
        router.push("/"); // Redirect to login page after success
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error('Link Expired');
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Update Password</h1>
      <form
        onSubmit={handleSubmit}
        className="w-80 bg-white p-6 rounded-lg shadow-md"
      >
        <label className="block mb-2 font-medium">New Password:</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
