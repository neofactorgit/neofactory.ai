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
      <Features />
      {/* <Text /> */}
      <Plan />
      <Costs />
    </>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="section bg-background flex flex-col items-center justify-center lg:justify-end gap-8 h-[100dvh] text-white z-logo relative overflow-hidden w-full px-section py-[80px]">
      <div className="absolute inset-0 w-full">
        {mounted && (
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/videos/demo.mp4" type="video/mp4" />
          </motion.video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background" />
      </div>

      <div className="max-w-section !my-0 grid-layout z-20 relative">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            filter: { duration: 0.6, delay: 0.4 },
          }}
          className="select-none max-lg:mb-[20px] col-span-full lg:col-span-7 uppercase text-[32px] xs:text-[42px] md:text-[40px] lg:text-[46px] xl:text-[67px] 2xl:text-[80px] leading-heading font-bold text-wrap-balance font-display "
        >
          Full Factory Automation
        </motion.h1>
        <div className="col-span-full lg:col-span-5 lg:col-start-8 flex flex-col gap-base lg:mt-[-5.4px]">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              filter: { duration: 0.6, delay: 0.6 },
            }}
            className="xs:text-[24px] lg:text-[22px] xl:text-[24px] standard-type-body text-wrap-pretty"
          >
            Neofactory builds and operates automated production lines for
            high-precision industries
          </motion.h2>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="section flex flex-col items-center justify-center gap-8 min-h-[110dvh] bg-background text-foreground">
      <div className="flex flex-col w-full max-w-section mx-auto px-section gap-24">
        <div className="w-full relative">
          <h2 className="text-base font-medium tracking-tighter top-[-22px] absolute left-0">
            Bridging the gap between AI and robotics
          </h2>
          <div className="top-[3px] absolute left-0 w-full h-px bg-foreground" />
          <div className="top-[2px] absolute left-0 w-[284px] h-[3px] bg-foreground" />
        </div>
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="bg-accent rounded-lg p-6 flex flex-col gap-4">
            <img src="/icons/cube.svg" alt="Cube" className="size-16" />
            <h3 className="text-xl tracking-tight text-white">
              Complex Requirements
            </h3>
            <p className="text-base font-light tracking-tight text-muted-foreground text-balance">
              In precision manufacturing, the great majority of work involves
              transforming complex requirements into specific quality attributes
              and operations. By automating the ingestion and routing of complex
              requirements documents, we can reduce the time and cost of
              manufacturing.
            </p>
          </div>

          <div className="bg-accent rounded-lg p-6 flex flex-col gap-4">
            <img src="/icons/diamond.svg" alt="Diamond" className="size-16" />
            <h3 className="text-xl tracking-tight text-white">
              Critical Processes
            </h3>
            <p className="text-base font-light tracking-tight text-muted-foreground text-balance">
              A precision machine can destroy itself in 200 milliseconds if not
              properly calibrated. A $30,000 steel blank can be ruined by a
              scratch. Automated monitoring and precision control prevent costly
              errors and ensure top quality.
            </p>
          </div>

          <div className="bg-accent rounded-lg p-6 flex flex-col gap-4">
            <img src="/icons/triangle.svg" alt="Triangle" className="size-16" />
            <h3 className="text-xl tracking-tight text-white">
              Long Time Horizons
            </h3>
            <p className="text-base font-light tracking-tight text-muted-foreground text-balance">
              Artificial intelligence and robotics work best with single,
              solvable tasks. But in the real world, thousands of subtasks
              require coordination across weeks of time. Our software layer
              orchestrates the coordination of these subtasks to create a
              factory that can adapt to changing requirements.
            </p>
          </div>
        </div>
        <div className="w-full relative">
          <div className="top-[3px] absolute left-0 w-full h-px bg-foreground" />
          <div className="top-[2px] absolute right-0 w-[39%] h-[3px] bg-foreground" />
        </div>
      </div>
    </div>
  );
}

function Plan() {
  return (
    <div className="section flex flex-col items-center justify-start gap-8 min-h-[110dvh] bg-accent z-logo relative overflow-hidden py-32 px-6">
      <DotPattern
        glow
        className={cn(
          "[mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]",
          "md:opacity-100"
        )}
      />

      <div className="max-w-2xl w-full flex flex-col mx-auto mt-12 gap-8 z-50">
        <h2 className="text-2xl font-display text-center uppercase">
          Hyper-scale production
        </h2>
        <p className="text-base font-light text-muted-foreground text-center">
          Scaling high-mix low-volume manufacturing requires a new approach to
          automation. It's not enough to automate the machines. A new layer is
          needed to automate operations.
        </p>
        {plan.map((item, index) => (
          <div
            key={item.title}
            className="w-full rounded bg-accent p-6 border border-border flex justify-between items-center backdrop-filter backdrop-blur-xl bg-opacity-5"
          >
            <div className="flex flex-col flex-grow items-start justify-start gap-2">
              <div className="flex items-center justify-start gap-2">
                <item.icon className="w-6 h-6" />
                <h3 className="text-xl font-display uppercase text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm font-light tracking-tight text-muted-foreground">
                {item.shortDescription}
              </p>
            </div>
            <div className="flex flex-col items-end justify-center gap-2">
              <span className="text-xl font-display uppercase text-white/30">
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

function Costs() {
  return (
    <div className="section flex flex-col items-center justify-center gap-8 h-[100dvh] bg-foreground text-muted">
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full h-full">
        <div className="flex flex-col items-center justify-center p-6 gap-8 border-r h-full">
          <h2 className="text-2xl font-semibold tracking-tight leading-heading lg:w-full">
            A paradigm shift in manufacturing costs
          </h2>
          <p className="text-sm tracking-tight font-light lg:w-full">
            The rules for making things are fundamentally rewritten every few
            generations. The 1870s saw steel mills and electric grids reshape
            our cities. The 1910s brought assembly lines that put the world on
            wheels. Each time, America led the way not just by inventing new
            technologies, but by rearranging itself to build at scale.
          </p>
          <p className="text-sm tracking-tight font-light lg:w-full">
            Today, we stand at another such moment. Intelligence, automation,
            and cheap abundant energy are converging to rewrite the economics of
            production. Beyond industrial or trade policy, something more
            profound is changing: the underlying cost physics of manufacturing.
            And unlike previous technological revolutions, this transformation
            may be permanent – creating a lasting shift that uniquely favors
            American manufacturing.
          </p>
        </div>

        <div className="flex border-r h-full flex-col justify-between items-center p-4">
          <BrutalChart value="Labor ▼" height={5} className="bg-white" />
        </div>
        <div className="flex border-r h-full flex-col justify-between items-center p-4">
          <BrutalChart
            value="CapEx ▲"
            height={40}
            className="bg-muted-foreground"
          />
        </div>
        <div className="flex h-full flex-col justify-between items-center p-4">
          <BrutalChart value="Material" height={52} className="bg-background" />
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
  label?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-end h-full w-full gap-2">
      <h3 className="text-6xl font-medium">{value}</h3>
      {label && <p className="text-sm font-light tracking-tight">{label}</p>}
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
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    longDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  {
    title: "Build",
    icon: LucideFactory,
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    longDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Automate",
    icon: LucideFunctionSquare,
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    longDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Scale",
    icon: LucideChartNoAxesCombined,
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    longDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

function Text() {
  return (
    <div className="section flex flex-col items-center justify-center gap-8 min-h-[110dvh] bg-foreground text-muted">
      <div className="flex flex-col w-full max-w-section mx-auto px-8 gap-24 py-12 px-section">
        <div className="w-full relative">
          <div className="top-[3px] absolute left-0 w-full h-px bg-accent" />
          <div className="top-[2px] absolute left-0 w-[240px] h-[3px] bg-accent" />
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
