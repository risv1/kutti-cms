import React, { Suspense } from "react";

const Hero = React.lazy(() => import("~/components/Home/Hero"));
const Features = React.lazy(() => import("~/components/Home/Features"));
const Footer = React.lazy(() => import("~/components/Common/Footer"));
const Loader = React.lazy(() => import("~/components/Common/Loader"));

export default function Index() {
  return (
    <Suspense fallback={<Loader />}>
      <main className="page-entry w-screen flex flex-col h-screen bg-inherit overflow-scroll">
        <Hero />
        <Features />
        <Footer />
      </main>
    </Suspense>
  );
}
