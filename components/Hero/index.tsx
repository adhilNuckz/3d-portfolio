"use client";

import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import TeamScrollOverlay from "./TeamScrollOverlay";

const CONTENT_DATA = [
  {
    title: "Linux Server Manager",
    description: "Final-year research project: built a full-stack server management dashboard for real-time process monitoring, Docker container management, and remote deployment pipelines.",
    stack: ["Node.js", "React", "Docker", "PM2", "VPS"],
    github: "https://github.com/adhilNuckz/finalproject",
  },
  {
    title: "Digitel Hosting Platform",
    description: "Self-service frontend hosting platform with free subdomain provisioning and REST API integration. Full deployment lifecycle from server provisioning to DNS and uptime monitoring.",
    stack: ["Node.js", "React", "PM2", "VPS", "Cloud"],
    github: "https://github.com/adhilNuckz/digitel-frontend-hoster",
    demo: "https://digitel.site",
  },
  {
    title: "gdup – Google Drive CLI",
    description: "Cross-platform CLI tool to manage Google Drive files and generate shareable links programmatically. Built with Python for Linux and Windows environments.",
    stack: ["Python", "Linux", "CLI"],
    github: "https://github.com/adhilNuckz/g-dup",
    demo: "https://gdup.nighttime.online",
  },
  {
    title: "ZigZag – Privacy Social",
    description: "Decentralized, privacy-first social platform built over the Tor network. Designed with censorship resistance and anonymous communication as core principles.",
    stack: ["Tor", "React", "Node.js"],
    github: "https://github.com/adhilNuckz/zigzag",
  },
];

export default function Hero() {
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    damping: 40,
    stiffness: 60,
    mass: 1.0,
    restDelta: 0.0005,
  });

  const timelineProgress = useTransform(smoothProgress, (v) => Math.max(0, Math.min(1, v)));
  const isOverlayOpen = useRef(false);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isOverlayOpen.current) return;
    e.preventDefault();
    const delta = e.deltaY;
    const current = scrollProgress.get();
    const speed = 0.0004; // Smooth speed
    const next = Math.max(0, Math.min(1.0, current + delta * speed));
    scrollProgress.set(next);
  }, [scrollProgress]);

  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isOverlayOpen.current) return;
    e.preventDefault();
    const touchY = e.touches[0].clientY;
    const delta = touchStartY.current - touchY;
    touchStartY.current = touchY;

    const current = scrollProgress.get();
    const speed = 0.0008; // Touch speed
    const next = Math.max(0, Math.min(1.0, current + delta * speed));
    scrollProgress.set(next);
  }, [scrollProgress]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  // Navbar section navigation
  useEffect(() => {
    const handler = (e: Event) => {
      const section = (e as CustomEvent).detail;
      const targets: Record<string, number> = {
        about: 0.10,
        stack: 0.62,
        projects: 0.80,
        contact: 0.95,
      };
      const target = targets[section.toLowerCase()];
      if (target !== undefined) {
        scrollProgress.set(target);
      }
    };
    window.addEventListener("nav-scroll", handler);
    return () => window.removeEventListener("nav-scroll", handler);
  }, [scrollProgress]);

  // Title transformations based on progress
  const titleOpacity = useTransform(timelineProgress, [0, 0.1], [1, 0]);
  const titleScale = useTransform(timelineProgress, [0, 0.1], [1, 1.1]);
  const titleY = useTransform(timelineProgress, [0, 0.1], [0, -50]);

  // Floating particles use deterministic values so motion remains stable across renders.
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        startX: (i * 13.7) % 100,
        startY: (i * 19.3) % 100,
        endX: (i * 29.1 + 37) % 100,
        endY: (i * 11.9 + 53) % 100,
        opacity: ((i % 6) + 1) * 0.04,
        duration: 20 + (i % 10) * 1.5,
      })),
    []
  );

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-background">
      {/* Background Canvas */}
      <HeroCanvas progress={timelineProgress} />

      {/* Particle Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${particle.startX}%`,
              y: `${particle.startY}%`,
              opacity: particle.opacity
            }}
            animate={{
              y: [`${particle.startY}%`, `${particle.endY}%`],
              x: [`${particle.startX}%`, `${particle.endX}%`],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-accent rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Content Layer */}
      <TeamScrollOverlay
        progress={timelineProgress}
        smoothProgress={smoothProgress}
        data={CONTENT_DATA}
        isOverlayOpen={isOverlayOpen}
      />

      {/* Fixed Title / Branding Reveal */}
      <motion.div 
        style={{ 
          opacity: titleOpacity,
          scale: titleScale,
          y: titleY
        }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12vw] font-black uppercase font-outfit leading-[0.8] text-center tracking-tighter"
        >
          ADHIL<br />
          <span className="text-accent underline decoration-accent/20">MARZOOK</span>
        </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 text-sm font-bold uppercase tracking-[1em] text-white/40"
          >
           Software Engineer  |  Full-Stack Developer
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.85 }}
            className="mt-4 max-w-xl text-center text-sm md:text-base text-white/70 tracking-wide"
          >
            Final-year CS student at Eastern University of Sri Lanka. Passionate about clean code, full-stack development, and software engineering.
          </motion.p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <div className="h-64 w-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            style={{ 
              height: "100%",
              scaleY: timelineProgress,
              transformOrigin: "top"
            }}
            className="absolute top-0 left-0 w-full bg-accent"
          />
        </div>
        <span className="text-[10px] font-black uppercase vertical-text tracking-widest text-accent">
          Timeline
        </span>
      </div>
    </section>
  );
}
