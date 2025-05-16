import { Link } from "@remix-run/react";

export default function CatchAllRoute() {
  return (
    <div className="dark">
      <div className="flex flex-col w-[100dvw] h-screen items-center justify-center space-y-4">
        <img
          src="/brand/neofactory-white.svg"
          alt="Neofactory Logo"
          className="block max-w-[240px]"
        />
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-muted-foreground max-w-2xl">
          Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
        </p>
        <Link to="/" className="text-primary hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
} 