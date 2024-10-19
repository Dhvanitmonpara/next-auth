"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      toast.success("Logged in successfully");
      setData(res.data.data._id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <section className="text-gray-400 h-screen flex justify-center items-center bg-gray-900 body-font">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-4xl">Profile Page</h1>
          <p className="text-xl bg-black/50 rounded-sm px-2">
            {data ? <Link href={`/profile/${data}`}>{data}</Link> : "Nothing"}
          </p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={getUserDetails}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Get user details
          </button>
          <button
            onClick={logout}
            className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
          >
            Logout
          </button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default ProfilePage;
