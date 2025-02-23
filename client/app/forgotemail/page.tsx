"use client";

import { useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;
  const token = params?.token as string;

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}forgot-password`, { email });

      if (res.status === 200) {
        toast.success("Password reset link has been sent to your email.");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
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
        <label className="block mb-2 font-medium">Enter Your Email:</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send link to your Email"
          )}
        </button>
      </form>
    </div>
  );
}
