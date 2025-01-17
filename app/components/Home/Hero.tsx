import { Link } from "@remix-run/react";
import logo from "/logo.png";

export default function Hero() {
  return (
    <section className="w-full px-32 py-40 h-fit flex flex-row justify-center items-center">
      <div className="w-2/3 flex flex-col gap-5">
        <img src={logo} alt="logo" className="w-24 h-20" />
        <h1 className="ml-2 text-6xl text-white font-extrabold">
          Welcome to Kutti CMS.
        </h1>
        <p className="ml-2 text-2xl text-gray-500">
          Kutti CMS is a simple content management system to manage digital
          assets like images, videos, and docments.
        </p>
        <Link
          to={"/dashboard"}
          className="w-fit ml-2 rounded-full text-xl px-6 py-4 text-black font-semibold bg-primary"
        >
          Get Started
        </Link>
      </div>
      <div className="w-1/3">
        <img
          src={logo}
          alt="hero"
          className="rotate-3 w-full h-full bg-inherit"
        />
      </div>
    </section>
  );
}
