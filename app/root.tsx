import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import Tailwind from "~/styles/tailwind.css?url";
import { Footer } from "./components/footer";
import { Logo } from "./components/logo";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";

export const config = { runtime: "edge" };

export function links() {
  return [
    { rel: "stylesheet", href: Tailwind },
  ];
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  let requestUrl = new URL(request.url);
  let siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return json({ siteUrl });
}

export const meta: MetaFunction = ({ data }) => {
  const { siteUrl } = data as { siteUrl: string };

  if (!siteUrl) {
    return [
      { title: "404 Not Found | neofactory" },
      {
        name: "description",
        content: "404 Not Found | neofactory",
      },
    ];
  }

  return [
    {
      title: "neofactory",
    },
    {
      name: "description",
      content:
        "Neofactory builds and operates automated production lines for high-precision industries",
    },
    {
      name: "robots",
      content: "index,follow",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "neofactory",
    },
    {
      property: "og:title",
      content: "neofactory",
    },
    {
      property: "og:description",
      content:
        "Neofactory builds and operates automated production lines for high-precision industries",
    },
    {
      property: "og:image",
      content: `${siteUrl}/twitter-card.jpg`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: "@neofactory",
    },
    {
      name: "twitter:title",
      content: "neofactory",
    },
    {
      name: "twitter:description",
      content:
        "Neofactory builds and operates automated production lines for high-precision industries",
    },
    {
      name: "twitter:image",
      content: `${siteUrl}/twitter-card.jpg`,
    },
  ];
};

const Document = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    title?: string;
    mode?: "light" | "dark";
    isLightBackground: boolean;
  }
>(function Document(
  { children, title = "neofactory", mode = "dark", isLightBackground },
  ref
) {
  return (
    <html lang="en" className={`${mode} h-full overflow-x-hidden w-[100dvw]`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body
        suppressHydrationWarning
        className="h-[100vh] w-[100dvw] flex flex-col bg-background text-foreground antialiased [selection]:bg-[#fff] selection:text-[#000] dark:selection:bg-primary dark:selection:text-[#fff]"
      >
        <header className="max-w-section mx-auto flex select-none items-center px-6 md:px-8 lg:px-12 xl:px-[6vw] h-[var(--header-height)] fixed top-0 left-0 right-0 z-header">
          <div className="flex items-center justify-between gap-2 z-logo text-foreground w-full">
            <Logo isLightBackground={isLightBackground} />
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/company/neofactoryai/people/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm credit-jhey-animation px-3 py-1"
              >
                <span
                  className={cn("credit-jhey", isLightBackground && "hidden")}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </span>
                </span>
                <span>Team</span>
              </a>
              <Link
                to="/contact"
                className="bg-primary text-sm credit-jhey-animation"
              >
                <span
                  className={cn("credit-jhey", isLightBackground && "hidden")}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </span>
                </span>
                <span>Join Us</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="relative flex h-full w-full items-start justify-center">
          <main className="flex flex-col w-full" ref={ref}>
            {children}
            <Footer />
          </main>
        </div>

        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
});

export default function App() {
  const [isLightBackground, setIsLightBackground] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsLightBackground(false);
  }, [location.pathname]);

  useEffect(() => {
    const logoElement = document.querySelector(
      ".logo-container"
    ) as HTMLElement;

    if (!logoElement || !sectionsRef.current) return;

    const checkSectionColor = () => {
      const logoRect = logoElement.getBoundingClientRect();
      const logoPosition = logoRect.top + logoRect.height / 2;
      const sections = document.querySelectorAll(".section");

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        // Check if logo is within this section's vertical bounds
        if (rect.top <= logoPosition && rect.bottom >= logoPosition) {
          setIsLightBackground(section.classList.contains("bg-foreground"));
          break;
        }
      }
    };

    // Debounce the handler
    const throttledCheck = throttle(checkSectionColor, 50);

    // Initial check
    checkSectionColor();

    // Check on scroll and resize with debounce
    window.addEventListener("scroll", throttledCheck);
    window.addEventListener("resize", throttledCheck);

    return () => {
      window.removeEventListener("scroll", throttledCheck);
      window.removeEventListener("resize", throttledCheck);
      // Clean up debounce timer
      throttledCheck.cancel();
    };
  }, []);

  // Debounce utility function
  function throttle<T extends (...args: any[]) => any>(func: T, wait: number) {
    let lastRun = 0;
    let timeout: NodeJS.Timeout | null = null;

    const throttled = (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRun >= wait) {
        // Enough time has passed, execute immediately
        func(...args);
        lastRun = now;
      } else if (!timeout) {
        // Schedule next execution at wait boundary
        const remaining = wait - (now - lastRun);
        timeout = setTimeout(() => {
          func(...args);
          lastRun = Date.now();
          timeout = null;
        }, remaining);
      }
    };

    throttled.cancel = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };

    return throttled;
  }

  return (
    <Document
      mode="dark"
      ref={sectionsRef}
      isLightBackground={isLightBackground}
    >
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.data.message ?? error.data
    : error instanceof Error
    ? error.message
    : String(error);

  const sectionsRef = useRef<HTMLDivElement>(null);

  return (
    <Document title="Error!" ref={sectionsRef} isLightBackground={false}>
      <div className="dark">
        <div className="flex flex-col w-[100dvw] h-screen items-center justify-center space-y-4 ">
          <img
            src="/brand/neofactory-white.svg"
            alt="Neofactory Logo"
            className="block max-w-[240px]"
          />
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground max-w-2xl">{message}</p>
        </div>
      </div>
    </Document>
  );
}
