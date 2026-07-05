import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import mainLogo from "../assets/main-logo.svg";
import browserMockup from "../assets/browser-mockup.png";
import nurseVideo from "../assets/nurse-video.mp4";
import nutanixAvatar from "../assets/nutanix-avatar.svg";
import frame207 from "../assets/frame-207.svg";
import programmingArrow from "../assets/programming-arrow.svg";
import upsideLogo from "../assets/upside-logo.svg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const RISE_EASE = [0.25, 1, 0.5, 1] as const;

/* ---------------------------------- */
/* Reusable animation components       */
/* ---------------------------------- */

function AnimatedWords({
  text,
  className = "",
  delayStart = 0,
  stagger = 0.06,
  inView = false,
}: {
  text: string;
  className?: string;
  delayStart?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const play = inView ? isInView : true;
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.2em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={play ? { y: "0%", opacity: 1 } : undefined}
            transition={{
              duration: 0.6,
              ease: RISE_EASE,
              delay: delayStart + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedDottedFrame({
  className = "",
  style,
  startDelay = 0,
}: {
  className?: string;
  style?: CSSProperties;
  startDelay?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const pts: Array<{ x: number; y: number }> = [];
    for (let d = 2; d <= total; d += 4) {
      const p = path.getPointAtLength(d);
      pts.push({ x: p.x, y: p.y });
    }
    setPoints(pts);
  }, []);

  return (
    <svg
      width="141"
      height="107"
      viewBox="0 0 141 107"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        ref={pathRef}
        d="M140.75 3.75H5.75C2.98857 3.75 0.75 5.98858 0.75 8.75V95.75C0.75 98.5114 2.98858 100.75 5.75 100.75H40"
        fill="none"
        stroke="none"
      />
      <g>
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.1"
            fill="white"
            className="dot-pop"
            style={{ animationDelay: `${startDelay + i * 40}ms` }}
          />
        ))}
      </g>
    </svg>
  );
}

/* ---------------------------------- */
/* Inline icons & brand marks          */
/* ---------------------------------- */

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function AiBadgeIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 12 10" fill="none">
      <path
        d="M5.71198 0L9.56198 9.982H7.686L6.734 7.336H2.786L1.806 9.982H0L3.85 0H5.71198ZM6.272 6.02L4.788 1.82L3.234 6.02H6.272ZM11.998 0.014V9.982H10.234V0.014H11.998Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function StarIcon({ half = false }: { half?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="star">
      {half && (
        <defs>
          <linearGradient id="half-star" x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="rgba(0,0,0,0.15)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2.5l2.95 6.2 6.8.78-5.05 4.66 1.4 6.66L12 17.6l-6.1 3.2 1.4-6.66L2.25 9.48l6.8-.78L12 2.5z"
        fill={half ? "url(#half-star)" : "currentColor"}
      />
    </svg>
  );
}

function IntelLogo() {
  return (
    <svg width="50" height="20" viewBox="0 0 50 20" fill="currentColor">
      <text
        x="0"
        y="16"
        fontFamily="'Inter Tight', sans-serif"
        fontSize="17"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        intel
      </text>
    </svg>
  );
}

function OracleLogo() {
  return (
    <svg width="110" height="15" viewBox="0 0 110 15" fill="currentColor">
      <text
        x="0"
        y="13"
        fontFamily="'Inter Tight', sans-serif"
        fontSize="14"
        fontWeight="600"
        letterSpacing="3"
      >
        ORACLE
      </text>
    </svg>
  );
}

function GoFundMeLogo() {
  return (
    <svg width="100" height="30" viewBox="0 0 100 30" fill="currentColor">
      <text
        x="0"
        y="20"
        fontFamily="'Inter Tight', sans-serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="-0.3"
      >
        gofundme
      </text>
    </svg>
  );
}

function NutanixLogo() {
  return (
    <svg width="105" height="14" viewBox="0 0 105 14" fill="currentColor">
      <text
        x="0"
        y="12"
        fontFamily="'Inter Tight', sans-serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="2"
      >
        NUTANIX
      </text>
    </svg>
  );
}

/* ---------------------------------- */
/* Page sections                       */
/* ---------------------------------- */

const NAV_LINKS = [
  { label: "Home", active: true },
  { label: "How it works", active: false },
  { label: "Company", active: false, chevron: true },
  { label: "Case Studies", active: false },
];

function Header() {
  const brand = "Nixole";
  return (
    <header className="flex items-center justify-between pt-6 md:pt-8">
      <a href="/" className="flex items-center gap-[9.23px]">
        <motion.img
          src={mainLogo}
          alt="Nixole"
          width={38}
          height={38}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        />
        <span
          className="text-[28px] font-semibold text-black"
          aria-label={brand}
        >
          {brand.split("").map((letter, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: RISE_EASE,
                  delay: 0.5 + i * 0.06,
                }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </span>
      </a>

      <nav className="hidden items-center gap-9 md:flex">
        {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href="#"
            className={
              link.active
                ? "flex items-center gap-1.5 text-[15px] font-medium text-foreground underline decoration-[1.5px] underline-offset-[6px]"
                : "flex items-center gap-1.5 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 + i * 0.08 }}
          >
            {link.label}
            {link.chevron && <ChevronDownIcon />}
          </motion.a>
        ))}
      </nav>

      <motion.button
        type="button"
        className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-colors hover:bg-muted"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut", delay: 1.3 }}
      >
        Book a demo
      </motion.button>
    </header>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-center pt-16 text-center md:pt-24">
      <motion.div
        className="inline-flex items-center gap-2.5 rounded-lg bg-[rgba(192,192,192,0.17)] py-1 pl-1 pr-[11px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
      >
        <span className="flex h-[22px] w-7 items-center justify-center rounded-md bg-white text-foreground">
          <AiBadgeIcon />
        </span>
        <span className="text-sm">
          Autonomous calls, enrollment &amp; payments
        </span>
      </motion.div>

      <h1 className="mt-6 max-w-[1100px] text-[64px] font-medium leading-[1.05] tracking-[-0.035em] md:text-[88px]">
        <span className="block">
          <AnimatedWords
            text="AI that converts patients"
            delayStart={1.7}
            stagger={0.05}
          />
        </span>
        <span className="block">
          <AnimatedWords text="for your" delayStart={1.95} stagger={0.05} />{" "}
          <motion.video
            src={nurseVideo}
            autoPlay
            loop
            muted
            playsInline
            className="mx-2 inline-block h-[88px] w-[88px] rounded-full object-cover align-middle md:h-[108px] md:w-[108px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut", delay: 2.15 }}
          />{" "}
          <AnimatedWords
            text="medical practice"
            className="text-foreground/25"
            delayStart={2.1}
            stagger={0.05}
          />
        </span>
      </h1>

      <motion.p
        className="mt-8 max-w-[760px] text-lg leading-[1.5] text-muted-foreground"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
      >
        Built for how patients actually decide. They Google. They hesitate. They
        miss calls.
        <br />
        Our AI handles every touchpoint - calls, WhatsApp - until they book an
        appointment.
      </motion.p>

      <div className="mt-10 flex items-center justify-center gap-3">
        <motion.button
          type="button"
          className="rounded-full border border-border bg-white px-6 py-3 text-[15px] font-medium shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-colors hover:bg-muted"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut", delay: 2.7 }}
        >
          Book a demo
        </motion.button>
        <motion.button
          type="button"
          className="rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-accent-foreground"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut", delay: 2.8 }}
          whileHover={{ scale: 1.02 }}
        >
          {"Let’s Talk"}
        </motion.button>
      </div>
    </section>
  );
}

const KEY_FEATURES = [
  { label: "AI Sales Agent", active: false },
  { label: "Lead Capture & Forms", active: false },
  { label: "Payments & Subscriptions", active: true },
  { label: "Automated Follow-ups", active: false },
  { label: "CRM for Academies", active: false },
];

function SeamDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`box-content h-2 w-2 rounded-full border-2 border-white/[0.12] bg-white bg-clip-content ${className}`}
    />
  );
}

function ShowcaseLeftCard() {
  return (
    <motion.div
      className="relative flex min-h-[360px] flex-col overflow-visible rounded-[22px] bg-[#1E1D19] p-6 text-white md:p-7"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 3.2 }}
    >
      <motion.div
        className="flex h-[22px] w-9 items-center justify-center rounded-[6px] bg-white text-xs font-medium text-[#111114]"
        initial={{ scale: 2.4, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: RISE_EASE, delay: 3.45 }}
      >
        Pro
      </motion.div>

      <h2 className="mt-5 text-[28px] font-medium leading-[1.15] tracking-tight text-white">
        <span className="block">
          <AnimatedWords text="All-in-One" delayStart={3.6} />
        </span>
        <span className="block">
          <AnimatedWords text="Enrollment Platform" delayStart={3.75} />
        </span>
      </h2>

      <p className="mt-auto pt-6 text-base font-normal leading-[19px] text-[rgba(255,255,255,0.36)]">
        From lead capture to recurring payments,
        <br />
        We run your enrollment with AI.
      </p>

      <div className="absolute bottom-0 right-0 hidden w-[330px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] md:block">
        <img
          src={browserMockup}
          alt="Medical.AI dashboard"
          className="w-full"
        />
        <SeamDot className="absolute left-[1px] top-10" />
        <AnimatedDottedFrame
          className="absolute left-[-135.75px] top-[43.25px]"
          startDelay={4200}
        />
      </div>

      <motion.div
        className="absolute bottom-[-24px] right-[214px] z-10 hidden h-[222px] w-[210px] flex-col rounded-[13.654px] border border-white/[0.34] p-3 backdrop-blur-[214.5px] md:flex"
        style={{
          background:
            "linear-gradient(164deg, rgba(255,255,255,0.04) 14.62%, rgba(255,255,255,0.40) 85.2%)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 3.95 }}
      >
        <div className="mb-2 flex items-center gap-2">
          <img src={programmingArrow} alt="" width={14} height={14} />
          <span className="text-[13px] font-medium text-white">
            Key Features
          </span>
        </div>
        <div className="relative -mx-3 mb-2 h-px bg-white/[0.19]">
          <SeamDot className="absolute left-[-4px] top-[-4px]" />
        </div>
        <div className="space-y-1">
          {KEY_FEATURES.map((feature) => (
            <div
              key={feature.label}
              className={
                feature.active
                  ? "flex items-center gap-2 rounded-[4.312px] bg-[#F4F4F4] px-1 py-1.5 text-xs font-medium text-[#111114]"
                  : "flex items-center gap-2 px-1 py-1.5 text-xs font-medium text-white/90"
              }
            >
              {feature.active ? (
                <span className="flex h-3 w-3 items-center justify-center rounded-[1.006px] bg-[#FFD209] text-white">
                  <CheckIcon />
                </span>
              ) : (
                <span className="h-3 w-3 rounded-[3px] bg-white/15" />
              )}
              {feature.label}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ShowcaseRightCard() {
  return (
    <motion.div
      className="relative min-h-[360px] rounded-[22px] bg-white p-6 md:p-7"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 3.3 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={frame207} alt="Customer avatars" className="h-11" />
          <span className="text-[15px] font-medium text-foreground">
            What our customers say
          </span>
        </div>
        <div className="flex flex-col gap-[4.34px]">
          <span className="h-[32.569px] w-[4.343px] rounded-[5.428px] bg-[#131318]" />
          <span className="h-[16.285px] w-[4.343px] rounded-[5.428px] bg-[#DCDCDC]" />
        </div>
      </div>

      <p className="mt-12 text-[13px] text-muted-foreground">Feb 02, 2026</p>

      <blockquote className="mt-2 max-w-[420px] text-[22px] font-medium leading-[1.3] tracking-tight">
        <AnimatedWords
          text="They converted 40% more leads"
          className="text-foreground"
          delayStart={3.6}
        />{" "}
        <AnimatedWords
          text="than our sales team - and never missed a follow-up."
          className="text-muted-foreground"
          delayStart={3.75}
          stagger={0.04}
        />
      </blockquote>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        <img src={nutanixAvatar} alt="Nutanix" className="h-7" />
        <div className="flex items-center gap-1">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon half />
        </div>
      </div>
    </motion.div>
  );
}

function TrustedByRow() {
  const logos = (
    <div className="flex shrink-0 items-center gap-10 pr-10 text-white">
      <IntelLogo />
      <OracleLogo />
      <GoFundMeLogo />
      <NutanixLogo />
      <img src={upsideLogo} alt="Upside" className="h-6" />
    </div>
  );

  return (
    <div className="mt-7 flex flex-col items-start gap-6 px-1 md:flex-row md:items-center md:justify-between">
      <p className="max-w-md text-[13px] leading-[1.5] text-white/75">
        Trusted by industry leaders in X who don&#39;t just follow trends,
        <br />
        but define how the industry moves forward.
      </p>
      <div
        className="w-full overflow-hidden md:max-w-[60%]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-10">
          {logos}
          {logos}
        </div>
      </div>
    </div>
  );
}

function Showcase() {
  return (
    <motion.section
      className="mesh-showcase mx-4 mt-16 overflow-hidden rounded-[28px] p-5 md:p-7"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: RISE_EASE, delay: 3.0 }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <ShowcaseLeftCard />
        <ShowcaseRightCard />
      </div>
      <TrustedByRow />
    </motion.section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Header />
        <Hero />
      </div>
      <Showcase />
      <div className="h-16" />
    </div>
  );
}
