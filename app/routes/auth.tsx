import React, { Suspense, useState } from "react";

const EPLogin = React.lazy(() => import("~/components/Auth/EPLogin"));
const GoogleLogin = React.lazy(() => import("~/components/Auth/GoogleLogin"));
const EPSignup = React.lazy(() => import("~/components/Auth/EPSignup"));

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const switchLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-screen flex flex-col justify-center items-center h-screen bg-inherit overflow-hidden">
        {isLogin ? <EPLogin /> : <EPSignup />}
        <div className="w-full justify-center flex flex-row gap-3 my-7 items-center">
          <div className="w-[10%]  h-px bg-primary"></div>
          <span className="px-4 text-primary font-medium">OR</span>
          <div className="w-[10%] h-px bg-primary"></div>
        </div>
        <GoogleLogin />
        <p className="text-gray-500 text-lg mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={switchLogin}
            className="text-primary font-medium cursor-pointer"
          >
            {isLogin ? " Sign Up" : " Sign In"}
          </button>
        </p>
      </main>
    </Suspense>
  );
}
