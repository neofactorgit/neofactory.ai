import { Link } from "@remix-run/react";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { DotPattern } from "~/components/dot-pattern";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/utils";

export default function Route() {
  return (
    <>
      <Hero />
      {/* <Features /> */}
      <Plan />
      <Demo />
      <Mission />
    </>
  );
}

function Hero() {
  const { sectionRef, videoContent } = useVideoBackground({
    videoSrc: "/videos/tool-build/tool-build.m3u8"
  });

  return (
    <div
      ref={sectionRef}
      className="section max-w-section mx-auto bg-background flex flex-col items-center justify-end gap-8 h-[100vh] text-white z-logo relative overflow-hidden w-full px-section py-[80px]"
    >
      {videoContent}

      <div className="max-w-section !my-0 grid-layout z-20 relative gap-4">
        <h1 className="select-none max-lg:mb-[20px] col-span-full lg:col-span-7 uppercase text-[32px] xs:text-[42px] md:text-[40px] lg:text-[46px] xl:text-[67px] 2xl:text-[80px] leading-heading font-bold text-wrap-balance font-display bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
          End to End Automation
        </h1>
        <div className="col-span-full lg:col-span-5 lg:col-start-8 flex flex-col gap-base lg:mt-[-5.4px]">
          <h2 className="xs:text-[24px] lg:text-[22px] xl:text-[24px] standard-type-body text-muted-foreground text-wrap-pretty">
            Neofactory builds and operates high-mix production lines for
            critical industries
          </h2>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Digitized Expertise",
    icon: "/icons/cube.svg",
    description:
      "We're using our expertise in precision machining to digitize each step of the manufacturing process to build and operate factories where AI and robotics operate at scale.",
  },
  {
    title: "Virtual Factories",
    icon: "/icons/diamond.svg",
    description:
      "We've built a software-controlled virtual factory that allows us to simulate and solve end-to-end operations before starting production.",
  },
  {
    title: "On-Site Deployments",
    icon: "/icons/triangle.svg",
    description: "We'll build our first production line in Dallas, TX in Q3.",
  },
];

function Features() {
  return (
    <div className="section flex flex-col items-center justify-center gap-8 min-h-[100vh] bg-foreground text-muted">
      <div className="flex flex-col w-full max-w-section mx-auto px-section gap-24 py-24 lg:py-12">
        <div className="w-full relative">
          <h2 className="text-base font-medium tracking-tighter top-[-22px] absolute left-0">
            Bridging the gap between people, AI and robotics
          </h2>
          <div className="top-[3px] absolute left-0 w-full h-px bg-muted" />
          <div className="top-[2px] absolute left-0 w-[334px] h-[3px] bg-muted" />
        </div>
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-muted rounded-sm p-6 flex flex-col gap-4"
            >
              <img src={feature.icon} alt={feature.title} className="size-16" />
              <h3 className="text-xl font-medium tracking-tighter text-white">
                {feature.title}
              </h3>
              <p className="text-base font-light tracking-tight text-muted-foreground text-balance">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full relative">
          <div className="top-[3px] absolute left-0 w-full h-px bg-muted" />
          <div className="top-[2px] absolute right-0 w-[39%] h-[3px] bg-muted" />
        </div>
      </div>
    </div>
  );
}

const plans = [
  {
    title: "Digitized Expertise",
    icon: "/icons/diamond.svg",
    shortDescription:
      "We're using our expertise in precision machining to digitize each step of the manufacturing process to build and operate factories where AI and robotics operate at scale.",
  },
  {
    title: "Virtual Factories",
    icon: "/icons/cube.svg",
    shortDescription:
      "We've built a software-controlled virtual factory that allows us to simulate and solve end-to-end operations before starting production.",
  },
  {
    title: "On-Site Deployments",
    icon: "/icons/triangle.svg",
    shortDescription:
      "We'll build our first production line in Dallas, TX in Q3. Further lines will be deployed on site at our partner's facilities.",
  },

  {
    title: "Built for Scale",
    icon: "/icons/chart.svg",
    shortDescription:
      "As robotics and AI continue to advance, we'll add more processes, machines, and production lines to our automated operations stack.",
  },
];

function Plan() {
  return (
    <div className="section flex flex-col items-center justify-start gap-8 min-h-[100vh] bg-accent z-logo relative overflow-hidden py-32 px-6">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(30vw_circle_at_center,white,transparent)]",
          "md:opacity-100"
        )}
      />

      <div className="max-w-2xl w-full flex flex-col mx-auto mt-12 gap-8 z-50">
        <h2 className="text-xl lg:text-2xl font-display font-light tracking-wider text-center uppercase">
          The path to hyper-scale
        </h2>
        <p className="text-sm lg:text-base font-normal text-muted-foreground text-center">
          Scaling high-mix low-volume manufacturing requires a new approach to
          automation. It's not enough to automate the machines. A new layer is
          needed to automate operations.
        </p>
        {plans.map((item, index) => (
          <div
            key={item.title}
            className="group w-full bg-accent p-6 border border-border/50 hover:border-muted-foreground flex gap-6 justify-between items-center backdrop-filter backdrop-blur-xl bg-opacity-5 shadow-xl relative text-muted-foreground credit-jhey-animation"
          >
            <div className="flex flex-col flex-grow items-start justify-start gap-2">
              <div className="flex items-center justify-start gap-2">
                <img src={item.icon} alt={item.title} className="size-6" />
                <h3 className="text-xl font-medium tracking-tight text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm font-normal tracking-tight text-muted-foreground">
                {item.shortDescription}
              </p>
            </div>
            <div className="flex flex-col items-end justify-center gap-2">
              <span className="text-xl font-mono font-medium text-white/30 group-hover:text-white">
                0{index + 1}
              </span>
            </div>
            <span className="credit-jhey">
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
          </div>
        ))}
      </div>
    </div>
  );
}

function Demo() {
  const { sectionRef, videoContent } = useVideoBackground({
    videoSrc: "/videos/factory-floor/factory-floor.m3u8",
  });

  return (
    <div
      ref={sectionRef}
      className="section bg-background flex flex-col items-center justify-center lg:justify-end gap-8 h-[100vh] text-white z-logo relative overflow-hidden w-full px-section py-[80px]"
    >
      {videoContent}
    </div>
  );
}

function Mission() {
  return (
    <div
      id="mission"
      className="section flex flex-col items-center justify-center gap-8 min-h-[100vh] bg-foreground text-muted"
    >
      <div className="flex flex-col w-full max-w-section mx-auto px-8 gap-24 py-12 px-section">
        <div className="w-full relative">
          <div className="top-[3px] absolute left-0 w-full h-px bg-accent" />
          <div className="top-[2px] absolute left-0 w-[260px] h-[3px] bg-accent" />
          <h2 className="text-base font-medium tracking-tighter top-[-22px] absolute left-0">
            Our Mission
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="py-20">
            <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight text-left uppercase">
              American abundance through automation
            </h2>
          </div>
          <div className="flex flex-col w-full mx-auto gap-8 ">
            <p className="text-xl text-balance tracking-tight">
              We believe that in order to restore American manufacturing
              dominance, a new approach is needed. Instead of reducing costs
              with lower wages and government subsidies, we envision a future
              inspired by our past&ndash; where abundance is created through
              American ingenuity and automation.
            </p>
            <p className="text-xl text-balance tracking-tight">
              AI and robotics are changing the underlying economics of
              manufacturing. We have a chance to reinvent the American
              production base, not by longing for the past, but by building the
              future.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">Join Us</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full relative">
          <div className="top-[3px] absolute left-0 w-full h-px bg-accent" />
          <div className="top-[2px] absolute right-0 w-[39%] h-[3px] bg-accent" />
        </div>
      </div>
    </div>
  );
}

function useVideoBackground({
  videoSrc,
  className,
}: {
  videoSrc: string;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const lastPlayPositionRef = useRef<number>(0);
  const isInViewRef = useRef<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isNowInView = entry.isIntersecting;

        // Only update state if the view status has changed and it's the first render
        if (isNowInView !== isInViewRef.current) {
          isInViewRef.current = isNowInView;
          setIsInView(isNowInView);

          // Directly control video playback without waiting for re-render
          if (videoRef.current) {
            if (isNowInView) {
              videoRef.current.play().catch((error) => {
                console.warn("Auto-play was prevented:", error);
              });
            } else {
              lastPlayPositionRef.current = videoRef.current.currentTime;
              videoRef.current.pause();
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !videoRef.current) return;

    const video = videoRef.current;

    // Setup HLS only if not already set up
    if (!hlsRef.current) {
      // Check if HLS is supported natively
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      }
      // Check if HLS.js is supported
      else if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });

        hls.loadSource(videoSrc);
        hls.attachMedia(video);

        hlsRef.current = hls;

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (isInViewRef.current) {
            video.play().catch((error) => {
              console.warn("Auto-play was prevented:", error);
            });
          }
        });
      }
      // Fallback for browsers that don't support HLS
      else {
        console.warn("HLS is not supported in your browser");
      }
    }

    // Cleanup on unmount
    return () => {
      if (hlsRef.current) {
        // Store position before destroying
        if (video) {
          lastPlayPositionRef.current = video.currentTime;
        }
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [mounted, videoSrc]);

  return {
    sectionRef,
    videoContent: (
      <div className="absolute inset-0 w-full">
        {mounted && (
          <video
            ref={videoRef}
            muted
            loop
            autoPlay={isInView}
            playsInline
            className={cn("h-full w-full object-cover", className)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-background" />
      </div>
    ),
  };
}
