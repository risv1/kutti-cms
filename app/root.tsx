import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import { LinksFunction } from "@remix-run/node";
import { Toaster } from "react-hot-toast";
import Error from "./components/Common/Error";

export const links: LinksFunction = () => {
  return [{ rel: "icon", href: "/logo.png" }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster toastOptions={{
          success: {
            className: "bg-neutral-800 text-primary p-5 rounded-md border border-primary",
          },
          error: {
            className: "bg-neutral-800 text-red-500 p-5 rounded-md border border-red-500",
          },
          }} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)){
    return (
      <Error text={error.statusText} status={error.status} data={error.data} />
    )
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{"Unknown error"}</p>
    </>
  );
}