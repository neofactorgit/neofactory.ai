import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { Check } from "lucide-react";
import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import Tailwind from "~/styles/tailwind.css?url";
import { Footer } from "./components/footer";
import { Logo } from "./components/logo";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBot, setIsBot] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [role, setRole] = useState("partner");
  const fetcher = useFetcher<{ success: boolean }>();

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
        className="h-[100dvh] w-[100dvw] flex flex-col bg-background text-foreground antialiased [selection]:bg-[#fff] selection:text-[#000] dark:selection:bg-primary dark:selection:text-[#fff]"
      >
        <header className="max-w-section mx-auto flex select-none items-center px-6 md:px-8 lg:px-12 xl:px-[5.9vw] h-[var(--header-height)] fixed top-0 left-0 right-0 z-header">
          <div className="flex items-center justify-between gap-2 z-logo text-foreground w-full">
            <Logo isLightBackground={isLightBackground} />
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                className="cursor-pointer"
                onClick={() => setIsDrawerOpen(true)}
              >
                Join Us
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
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-xl min-h-[70dvh]">
              <DrawerHeader>
                <DrawerTitle>Build with us</DrawerTitle>
                <DrawerDescription>
                  We're always looking for talented people to join our team.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="mx-auto flex flex-col w-full mb-28">
                  {/* Honeypot form - hidden from humans but visible to bots */}
                  <div className="sr-only">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsBot(true);
                      }}
                    >
                      <input type="text" name="name" />
                      <input type="email" name="email" />
                      <input type="submit" />
                    </form>
                  </div>

                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                      <div className="animate-bounce">
                        <Check className="w-16 h-16 text-green-500" />
                      </div>
                      <h2 className="text-2xl font-bold animate-fade-in">
                        Thank you for your interest!
                      </h2>
                      <p className="text-center text-muted-foreground animate-fade-in-delayed">
                        We'll be in touch with you shortly.
                      </p>
                    </div>
                  ) : (
                    <fetcher.Form
                      method={isBot ? "get" : "post"}
                      className="flex flex-col gap-5"
                    >
                      <div className="relative flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <div className="relative flex flex-1">
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                            autoComplete="name"
                          />
                        </div>
                      </div>
                      <div className="relative flex flex-col gap-2">
                        <Label htmlFor="role">What best describes you?</Label>
                        <div className="relative flex flex-1">
                          <input type="hidden" name="role" value={role} />
                          <Select onValueChange={setRole} defaultValue={role}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="partner">
                                Design Partner
                              </SelectItem>
                              <SelectItem value="employee">Employee</SelectItem>
                              <SelectItem value="investor">Investor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-5 lg:grid-cols-2">
                        <div className="relative flex flex-col gap-2">
                          <Label htmlFor="email">Work Email</Label>
                          <div className="relative flex flex-1">
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="you@acme.com"
                              required
                              autoComplete="email"
                            />
                          </div>
                        </div>

                        <div className="relative flex flex-col gap-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <div className="relative flex flex-1">
                            <Input
                              type="text"
                              id="companyName"
                              name="companyName"
                              placeholder="Acme, Inc."
                              required
                              autoComplete="organization"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="relative flex flex-col gap-2">
                        <Label htmlFor="message">Message</Label>
                        <div className="relative flex flex-1">
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Please tell us about yourself"
                            className="h-[113px]"
                          />
                        </div>
                      </div>

                      <div>
                        <Button
                          type="submit"
                          disabled={fetcher.state !== "idle" || isBot}
                        >
                          Submit
                        </Button>
                      </div>
                    </fetcher.Form>
                  )}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
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
