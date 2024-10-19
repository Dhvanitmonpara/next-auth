"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";

const SignupPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.status === 200) {
        setVerified(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(true);
      } else if (error instanceof AxiosError && error.response) {
        setError(error.response.data);
      }
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken);
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <section className="text-gray-400 h-screen flex justify-center items-center bg-gray-900 body-font">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Verify email</h1>
        <p className="bg-black/50 p-2 rounded-sm">
          {token ? `${token}` : "No token provided"}
        </p>
        <h2>
          {verified && (
            <div>
              <h2 className="inline">Verified successfully, Now you can </h2>
              <Link className="hover:underline inline text-blue-500" href="/login">
                Login
              </Link>
            </div>
          )}
        </h2>
        <h2>
          {error && (
            <div>
              <h2>Error</h2>
              <p>{error}</p>
            </div>
          )}
        </h2>
      </div>
    </section>
  );
};

export default SignupPage;
