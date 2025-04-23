import type { ServerRuntimeMetaFunction as MetaFunction } from "@remix-run/server-runtime";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "neofactory | Brand Assets" },
    {
      name: "description",
      content: "neofactory Brand Assets",
    },
  ];
};

export default function Brand() {
  return (
    <div className="flex flex-1 flex-col min-h-[calc(100dvh-220px)]">
      <div className="mx-auto flex w-full flex-col px-4 md:px-6 lg:px-8 3xl:pt-32 4xl:pt-36 max-w-4xl py-28">
        <div className="flex flex-col gap-4 lg:items-center lg:text-center mb-16">
          <h1 className="font-semibold text-3xl lg:text-6xl font-display uppercase tracking-tight bg-gradient-to-b from-zinc-300 to-zinc-800 bg-clip-text text-transparent">
            Brand Assets
          </h1>
          <h2 className="font-medium text-xl text-muted-foreground max-w-4xl text-balance leading-relaxed tracking-tight">
            All neofactory trademarks, logos, or other brand elements can never
            be modified or used for any other purpose other than to represent
            neofactory.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 p-6 rounded-lg bg-card border dark:border-none shadow-md">
            <div className="bg-black p-8 rounded-md flex items-center justify-center min-h-[160px]">
              <img
                src="/brand/neofactory-white.svg"
                alt="White Logo"
                className="h-24"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="secondary" className="text-sm">
                <a href="/brand/neofactory-white.svg" download>
                  SVG
                </a>
              </Button>
              <Button asChild variant="secondary" className="text-sm">
                <a href="/brand/neofactory-white.png" download>
                  PNG
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6 rounded-lg bg-card border dark:border-none shadow-md">
            <div className="bg-white p-8 rounded-md flex items-center justify-center">
              <img
                src="/brand/neofactory-black.svg"
                alt="Black Logo"
                className="h-24"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="secondary" className="text-sm">
                <a href="/brand/neofactory-black.svg" download>
                  SVG
                </a>
              </Button>
              <Button asChild variant="secondary" className="text-sm">
                <a href="/brand/neofactory-black.png" download>
                  PNG
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6 rounded-lg bg-card border dark:border-none shadow-md">
            <div className="bg-black p-8 rounded-md flex items-center justify-center min-h-[160px]">
              <img
                src="/brand/neofactory-square-white.svg"
                alt="White Logo"
                className="h-24"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="secondary" className="text-sm">
                <a href="/brand/neofactory-square-white.svg" download>
                  SVG
                </a>
              </Button>
              <Button asChild variant="secondary" className="text-sm">
                <a href="/brand/neofactory-square-white.png" download>
                  PNG
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6 rounded-lg bg-card border dark:border-none shadow-md">
            <div className="bg-white p-8 rounded-md flex items-center justify-center">
              <img
                src="/brand/neofactory-square-black.svg"
                alt="Black Logo"
                className="h-24"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="secondary" className="text-sm">
                <a href="/brand/neofactory-square-black.svg" download>
                  SVG
                </a>
              </Button>
              <Button asChild variant="secondary" className="text-sm">
                <a href="/brand/neofactory-square-black.png" download>
                  PNG
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
