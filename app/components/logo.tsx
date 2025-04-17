import { Link } from "@remix-run/react";
import { useIsMobile } from "~/hooks/useIsMobile";
export function Logo({ isLightBackground }: { isLightBackground: boolean }) {
  const isMobile = useIsMobile();
  return (
    <div className="relative logo-container">
      <Link
        to="/"
        className="cursor-pointer flex flex-row items-center gap-2 flex-shrink-0 relative"
      >
        <img
          src={
            isMobile
              ? "/brand/logo-short-dark.svg"
              : "/brand/logo-long-dark.svg"
          }
          alt="neofactory"
          className={`h-6 w-auto transition-opacity duration-300 absolute ${
            isLightBackground ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={
            isMobile
              ? "/brand/logo-short-light.svg"
              : "/brand/logo-long-light.svg"
          }
          alt="neofactory"
          className={`h-6 w-auto transition-opacity duration-300 ${
            isLightBackground ? "opacity-0" : "opacity-100"
          }`}
        />
        <span className="sr-only">neofactory</span>
      </Link>
    </div>
  );
}
