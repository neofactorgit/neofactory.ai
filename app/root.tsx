import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";

import Tailwind from "~/styles/tailwind.css?url";
import { Footer } from "./components/footer";
import { Logo } from "./components/logo";
import { Button } from "./components/ui/button";

export const config = { runtime: "edge" };

export function links() {
  return [{ rel: "stylesheet", href: Tailwind }];
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
        "neofactory is high-precision CNC factory that is built for transparent automation",
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
        "neofactory is high-precision CNC factory that is built for transparent automation",
    },
    // {
    //   property: "og:image",
    //   // TODO:
    //   content: `${siteUrl}/screenshots/features-schedule.webp`,
    // },
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
        "neofactory is high-precision CNC factory that is built for transparent automation",
    },
    // {
    //   name: "twitter:image",
    //   content: `${siteUrl}/screenshots/features-schedule.webp`,
    // },
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
        className="h-[100dvh] w-[100dvw] flex flex-col bg-background text-foreground antialiased selection:bg-[#00cc9937] selection:text-[#007763fd] dark:selection:bg-[#00fff61d] dark:selection:text-[#67ffded2]"
      >
        <header className="flex select-none items-center px-6 md:px-8 lg:px-12 xl:px-24 h-[var(--header-height)] fixed top-0 left-0 right-0 z-header">
          <div className="flex items-center justify-between gap-2 z-logo text-foreground w-full">
            <Logo isLightBackground={isLightBackground} />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0">
                <Button variant="secondary" className="cursor-pointer">
                  Our Mission
                </Button>
              </div>
              <Button variant="default" className="cursor-pointer">
                Contact
              </Button>
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

  useEffect(() => {
    const logoElement = document.querySelector(
      ".logo-container"
    ) as HTMLElement;

    if (!logoElement || !sectionsRef.current) return;

    const logoRect = logoElement.getBoundingClientRect();
    const logoPosition = logoRect.top + logoRect.height / 2;

    const checkSectionColor = () => {
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

    // Initial check
    checkSectionColor();

    // Check on scroll
    window.addEventListener("scroll", checkSectionColor);

    return () => {
      window.removeEventListener("scroll", checkSectionColor);
    };
  }, []);

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
            src="/brand/logo-stacked-mixed.svg"
            alt="Neofactory Logo"
            className="block max-w-[120px]"
          />
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground max-w-2xl">{message}</p>
        </div>
      </div>
    </Document>
  );
}
