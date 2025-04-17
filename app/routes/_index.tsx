import { DotPattern } from "components/magicui/dot-pattern";
import { motion } from "framer-motion";
import {
  LucideArrowRight,
  LucideChartNoAxesCombined,
  LucideFactory,
  LucideFunctionSquare,
  LucideGamepad2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

export default function Route() {
  return (
    <>
      <Hero />
      <Problem />
      <Plan />
      <CTA />
      <Demo />
    </>
  );
}

function Hero({ className }: { className?: string }) {
  return (
    <div className="section flex flex-col items-center justify-center gap-8 h-[100dvh] bg-background z-logo relative overflow-hidden">
      <DotPattern
        glow
        className={cn(
          "[mask-image:radial-gradient(max(400px,30vw)_circle_at_center,white,transparent)]",
          "md:opacity-100"
        )}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.0, ease: "easeInOut" }}
        className={cn(
          "relative w-full text-center z-logo",
          "md:left-8 lg:left-12 xl:left-24 md:bottom-32 md:absolute md:w-1/3 md:text-left",
          className
        )}
      >
        <h2
          className={cn(
            "font-display font-bold uppercase text-foreground",
            "text-4xl px-12 md:px-0",
            "md:text-4xl lg:text-6xl"
          )}
        >
          Autonomous Factories
        </h2>
      </motion.div>
    </div>
  );
}

function Problem() {
  return (
    <div className="section flex flex-col items-center justify-center gap-8 h-[110dvh] bg-foreground text-muted">
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full h-full">
        <div className="flex flex-col items-center justify-center p-6 gap-8 border-r h-full">
          <h2 className="text-2xl font-semibold tracking-tight leading-[1.1]">
            High-mix, low-volume manufacturing at scale
          </h2>
          <p className="text-sm tracking-tight font-light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>

        <div className="hidden lg:flex border-r h-full flex-col justify-between items-center p-4">
          <BrutalChart
            value="-9%"
            label="1 / Emissions"
            height={10}
            className="bg-white"
          />
        </div>
        <div className="hidden lg:flex border-r h-full flex-col justify-between items-center p-4">
          <BrutalChart
            value="-5%"
            label="2 / Emissions"
            height={48}
            className="bg-muted-foreground"
          />
        </div>
        <div className="hidden lg:flex h-full flex-col justify-between items-center p-4">
          <BrutalChart
            value="3/3"
            label="3 / Emissions"
            height={67}
            className="bg-background"
          />
        </div>
      </div>
    </div>
  );
}

function BrutalChart({
  className,
  height,
  value,
  label,
}: {
  className?: string;
  height: number;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-start justify-end h-full w-full gap-2">
      <h3 className="text-6xl font-medium">{value}</h3>
      <p className="text-sm font-light tracking-tight">{label}</p>
      <div
        style={{
          height: `${height}dvh`,
        }}
        className="flex justify-between w-full"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={cn("h-full w-[2%]", className)} />
        ))}
      </div>
    </div>
  );
}

const plan = [
  {
    title: "Simulate",
    icon: LucideGamepad2,
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    longDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  {
    title: "Build",
    icon: LucideFactory,
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    longDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Automate",
    icon: LucideFunctionSquare,
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    longDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Scale",
    icon: LucideChartNoAxesCombined,
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    longDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

function Plan({ className }: { className?: string }) {
  return (
    <div className="section flex flex-col items-center justify-start gap-8 min-h-[110dvh] bg-accent z-logo relative overflow-hidden py-32 px-6">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(max(400px,30vw)_circle_at_center,white,transparent)]",
          "md:opacity-100"
        )}
      />
      <h2 className="text-2xl font-display font-bold text-center uppercase">
        Hyper-scale production
      </h2>
      <p className="text-base font-light text-muted-foreground text-center">
        Neofactory is building the droid management layer for fully autonomous
        American factories.
      </p>

      <div className="flex flex-col max-w-2xl w-full mx-auto mt-12 gap-8 z-50">
        {plan.map((item, index) => (
          <div
            key={item.title}
            className="w-full rounded bg-accent p-6 border border-border flex justify-between items-center backdrop-filter backdrop-blur-xl bg-opacity-5"
          >
            <div className="flex flex-col flex-grow items-start justify-start gap-2">
              <div className="flex items-center justify-start gap-2">
                <item.icon className="w-6 h-6" />
                <h3 className="text-xl font-medium font-display uppercase text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm font-light tracking-tight text-muted-foreground">
                {item.shortDescription}
              </p>
            </div>
            <div className="flex flex-col items-end justify-center gap-2">
              <span className="text-xl font-medium font-display uppercase text-muted">
                0{index + 1}
              </span>
              <button className="flex items-center justify-center gap-2 text-xs tracking-tight text-muted-foreground">
                Learn more
                <LucideArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Demo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="section relative flex h-screen w-full items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0">
        {mounted && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/videos/demo.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}

function CTA() {
  return (
    <div className="section flex flex-col items-center justify-center gap-8 min-h-[110dvh] bg-foreground text-muted">
      <div className="flex flex-col w-full max-w-4xl mx-auto px-8 gap-24">
        <div className="w-full relative">
          <div className="top-[3px] absolute left-0 w-full h-px bg-accent" />
          <div className="top-[2px] absolute left-0 w-[28%] h-[3px] bg-accent" />
          <h2 className="text-sm font-medium tracking-tighter top-[10px] absolute left-0">
            The future of American manufacturing
          </h2>
        </div>
        <div className="flex flex-col max-w-2xl w-full mx-auto gap-8 ">
          <p className="text-xl text-balance tracking-tight">
            Every few generations, a window opens. The cost of production
            fundamentally shifts, and those who see it clearly - who understand
            not just what is changing but why - have the opportunity to build
            something lasting. Carnegie didn't make better iron works; Ford
            didn't breed a faster horse. They saw that the game itself was
            changing and built entirely new systems to win it.
          </p>
          <p className="text-xl text-balance tracking-tight">
            Today, we stand at another such moment. Every major industry that
            defined past technological revolutions is poised to be remade, and
            the next generation of industrial giants will emerge from those who
            recognize this shift and act boldly. We have a chance to reinvent
            the American production base, not by longing for the past, but by
            building the future. Today, we stand at another such moment. Every
            major industry that defined past technological revolutions is poised
            to be remade, and the next generation of industrial giants will
            emerge from those who recognize this shift and act boldly. We have a
            chance to reinvent the American production base, not by longing for
            the past, but by building the future.
          </p>
          <p className="text-xl text-balance tracking-tight">
            The only question is who will seize the moment.
          </p>
        </div>
        <div className="w-full relative">
          <div className="top-[3px] absolute left-0 w-full h-px bg-accent" />
          <div className="top-[2px] absolute right-0 w-[39%] h-[3px] bg-accent" />
        </div>
      </div>
    </div>
  );
}

function Hr() {
  return (
    <div className="w-full relative">
      <div className="top-[3px] absolute left-0 w-full h-px bg-accent" />
      <div className="top-[2px] absolute left-0 w-[30%] h-[3px] bg-accent" />
    </div>
  );
}
