import React from "react";
import { Form } from "@remix-run/react";

const GoogleLogin: React.FC = () => {
  return (
    <Form method="post" action="/auth/google" className="w-fit h-fit">
      <button
        type="submit"
        className="w-full flex flex-row items-center px-6 py-4 bg-neutral-900 h-full rounded-full transition-all gap-3 hover:scale-110 duration-200"
      >
        <img src="/google-icon.svg" alt="Google Icon" className="w-8 h-8" />
        <span className="text-lg text-gray-400 font-medium">
          Login with Google
        </span>
      </button>
    </Form>
  );
};

export default GoogleLogin;
