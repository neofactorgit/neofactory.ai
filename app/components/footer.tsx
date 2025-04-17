import { Link } from "@remix-run/react";
import { SocialIcon } from "./social-icon";

export function Footer() {
  return (
    <>
      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-zinc-200/0 via-zinc-500/30 to-zinc-200/0" />
      <div className="flex w-full justify-center border-t py-12 md:py-16 lg:py-20 2xl:py-24 dark:border-transparent">
        <div className="mx-auto w-full max-w-7xl flex-col px-4 md:px-6 lg:px-8 grid grid-cols-1 gap-12 sm:grid-cols-5 sm:gap-6">
          <div className="flex flex-col gap-6 sm:col-span-2">
            <a className="text-white select-none" href="/">
              <div className="flex items-center gap-1.5">
                <img
                  src="/brand/logo-long-dark.svg"
                  alt="neofactory Logo Dark"
                  className="h-5 w-auto block dark:hidden"
                />
                <img
                  src="/brand/logo-long-light.svg"
                  alt="neofactory Logo Light"
                  className="h-5 w-auto hidden dark:block"
                />
              </div>
            </a>

            <div className="flex items-center gap-4">
              <SocialIcon type="x" href="#" />
              <SocialIcon type="linkedin" href="#" />
              <SocialIcon type="github" href="#" />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <p className="font-medium py-1 col-span-1 text-sm text-white">
              Contact
            </p>
            <div className="col-span-2 -mx-1 flex flex-wrap gap-2 sm:flex-col">
              {[
                { href: "/build", text: "Partners" },
                { href: "/work", text: "Jobs" },
                { href: "/invest", text: "Investors" },
              ].map((link) => (
                <Link
                  key={link.href}
                  className="text-muted-foreground hover:text-white p-1 text-sm"
                  to={link.href}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="col-span-1 flex flex-col gap-1">
              <p className="font-medium py-1 col-span-1 text-sm text-white">
                About
              </p>
              <div className="col-span-2 -mx-1 flex flex-wrap gap-2 sm:flex-col">
                {[
                  { href: "/mission", text: "Mission" },
                  { href: "/brand", text: "Brand Assets" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    className="text-muted-foreground hover:text-white p-1 text-sm"
                    to={link.href}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
