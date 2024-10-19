"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const singupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <section className="text-gray-400 h-screen flex justify-center items-center bg-gray-900 body-font">
      <form onSubmit={singupHandler} className="xl:w-2/6 lg:w-3/8 md:w-1/2 max-w-xl bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col">
        <h2 className="text-white text-lg font-medium title-font mb-5">
          Sign Up
        </h2>
        <div className="relative mb-4">
          <label
            htmlFor="username"
            className="leading-7 text-sm text-gray-400"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button type="submit" disabled={buttonDisabled || loading} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:bg-indigo-800 disabled:hover:bg-indigo-800 disabled:text-zinc-400">
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <Link href="/login" className="text-xs mt-3 hover:">
          Visit login page
        </Link>
      </form>
    </section>
  );
};

export default SignupPage;
