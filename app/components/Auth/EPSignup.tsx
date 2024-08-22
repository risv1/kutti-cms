import React from "react";
import { Form } from "@remix-run/react";

const EPSignup: React.FC = () => {
  return (
    <Form
      method="post"
      action="/auth/signup"
      className="w-[50%] h-fit flex items-center flex-col gap-10"
    >
      <h1 className="text-3xl font-semibold text-center text-white">
        Create your account here.
        <p className="font-normal mt-2 text-gray-500 text-xl text-center">
          Get Started with Kutti CMS.
        </p>
      </h1>
      <div className="w-full text-white h-fit flex flex-col gap-5 items-center">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-2/3 placeholder:text-xl bg-neutral-800 p-3 border hover:border-primary ease-in-out duration-150 border-neutral-800 focus:outline-none focus:border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-2/3 placeholder:text-xl bg-neutral-800 p-3 border hover:border-primary ease-in-out duration-150 border-neutral-800 focus:outline-none focus:border-gray-300 rounded-md"
        />
      </div>
      <button className="w-fit ml-2 rounded-full text-xl px-6 py-4 gap-3 text-black font-semibold bg-primary flex items-center hover:gap-6 transition-all duration-200">
        Signup
        <span className="w-full text-2xl font-bold ml-2 transform">&rarr;</span>
      </button>
    </Form>
  );
};

export default EPSignup;
