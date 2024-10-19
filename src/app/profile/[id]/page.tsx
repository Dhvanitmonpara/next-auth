"use client";
import React from "react";

export default function page({ params }: {params: {id: string}}) {
  return (
    <section className="text-gray-400 h-screen flex justify-center items-center bg-gray-900 body-font">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-4xl">Profile Page</h1>
          <p className="text-xl bg-black/50 rounded-sm px-2">
            {params.id}
          </p>
        </div>
      </div>
    </section>
  );
}
