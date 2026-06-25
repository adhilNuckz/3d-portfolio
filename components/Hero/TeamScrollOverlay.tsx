"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, MotionValue, useTransform, useVelocity } from "framer-motion";
import {
  Code,
  Database,
  Layout,
  Server,
  Sparkles,
  Zap,
  MapPin,
  GraduationCap,
  Mail,
  User,
  Compass,
  Terminal,
  ExternalLink,
  Download,
  Eye,
  FileText,
  X,
} from "lucide-react";

interface ContentCard {
  title: string;
  description: string;
  stack?: string[];
  github?: string;
  demo?: string;
}

interface TeamScrollOverlayProps {
  progress: MotionValue<number>;
  data: ContentCard[];
  smoothProgress?: MotionValue<number>;
  isOverlayOpen: React.MutableRefObject<boolean>;
}

type Skill = {
  name: string;
  info: string;
  Icon: React.ComponentType<{ className?: string }>;
  initial: { x: number; y: number };
};

const CV_CONTENT = {
  name: "Adhil Marzook",
  contact: {
    phone: "+94 783811114",
    email: "mikeadhil2002@gmail.com",
    github: "github.com/adhilNuckz",
    linkedin: "linkedin.com/in/adhilmk",
    title: "Software Engineer | Full-Stack Developer",
  },
  about:
    "Final-year BSc Computer Science student at Eastern University of Sri Lanka with a strong foundation in software engineering, full-stack development, and system design. Proficient in Python, JavaScript, and Go, with hands-on experience building and deploying scalable web applications on cloud and VPS infrastructure. Passionate about writing clean, maintainable code and leveraging AI tooling to accelerate development cycles.",
  education: [
    {
      period: "Jul 2023 – Present",
      degree: "BSc in Computer Science",
      institution: "Eastern University of Sri Lanka, Trincomalee Campus",
      details:
        "CGPA: 3.4. Coursework: Software Engineering, Problem Solving, Data Structures & Algorithms, Software Testing, Networking, Artificial Intelligence.",
    },
  ],
  experience: [
    {
      period: "Jul 2025 – Dec 2025",
      role: "Web Developer – Group Work",
      company: "Eastern University of Sri Lanka, Trincomalee Campus",
      details:
        "Architected and developed the university society's gallery page using React with component-driven design. Improved UI/UX through responsive layouts and accessibility improvements. Delivered Figma prototypes translated into production-ready code.",
      tech: ["React", "Figma"],
    },
    {
      period: "Jul 2022 – Jul 2023",
      role: "Software & Hardware Troubleshooter",
      company: "SmartNet Communication, Kattankudy, Sri Lanka",
      details:
        "– Diagnosed and resolved hardware/software issues, reducing average resolution time significantly.\n– Installed and configured operating systems, drivers, and enterprise applications across client machines.",
      tech: ["Windows", "Linux", "Drivers"],
    },
  ],
  skills: {
    Languages: ["Python", "JavaScript", "Go", "C/C++", "Java", "PHP", "Bash"],
    Frontend: ["React", "Next.js", "HTML/CSS"],
    Backend: ["Node.js", "NestJS", "Laravel", "REST APIs"],
    DevOps: ["Docker", "PM2", "CI/CD", "VPS", "Cloud", "Linux"],
    Tools: ["Git", "Figma", "AI Agents", "n8n"],
    Other: ["Domain Management", "Hosting", "Penetration Testing"],
    AI: ["Claude", "OpenCode", "Codex"],
  },
  certificates: [
    "Google – Foundations: Data, Data, Everywhere (Verify: SHZIBPSOJ2N1)",
    "KodeCloud – Docker",
    "HackerRank – MySQL",
    "Hack & Fix – Cybersecurity (Anti-Phishing)",
  ],
};

function downloadCV() {
  const a = document.createElement("a");
  a.href = "/cv.pdf";
  a.download = "Adhil_Marzook_CV.pdf";
  a.click();
}

export default function TeamScrollOverlay({
  progress,
  data,
  smoothProgress,
  isOverlayOpen,
}: TeamScrollOverlayProps) {
  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const skillsBoundsRef = useRef<HTMLDivElement>(null);

  // Lock main scroll when overlays or skill panel are open
  useEffect(() => {
    isOverlayOpen.current = showAllProjects || showCV || activeSkillName !== null;
  }, [showAllProjects, showCV, activeSkillName, isOverlayOpen]);

  // --- Scroll Transformations for Sections ---

  // 1. Who Am I (Intro Bio Details)
  const whoAmIOpacity = useTransform(progress, [0, 0.08, 0.14, 0.18], [0, 1, 1, 0]);
  const whoAmIY = useTransform(progress, [0, 0.08, 0.14, 0.18], [60, 0, 0, -60]);

  // 2. Where I Am From
  const whereFromOpacity = useTransform(progress, [0.18, 0.22, 0.34, 0.38], [0, 1, 1, 0]);
  const whereFromY = useTransform(progress, [0.18, 0.22, 0.34, 0.38], [60, 0, 0, -60]);

  // 3. Education & Qualification
  const educationOpacity = useTransform(progress, [0.38, 0.42, 0.54, 0.58], [0, 1, 1, 0]);
  const educationY = useTransform(progress, [0.38, 0.42, 0.54, 0.58], [60, 0, 0, -60]);

  // 4. Profile Photo Transition
  const photoOpacity = useTransform(progress, [0.34, 0.40, 0.54, 0.62], [0, 1, 1, 0]);
  const photoScale = useTransform(progress, [0.34, 0.40, 0.54, 0.62], [0.3, 1, 1, 0.85]);
  const photoX = useTransform(progress, [0.54, 0.64], [0, 150]);
  const photoY = useTransform(progress, [0.54, 0.64], [0, -80]);
  const photoRotate = useTransform(progress, [0.54, 0.64], [0, 15]);
  const photoSkewX = useTransform(progress, [0.54, 0.64], [0, -15]);
  const photoBlurVal = useTransform(progress, [0.54, 0.64], [0, 16]);
  const photoFilter = useTransform(photoBlurVal, (v) => `url(#water-drop-filter) blur(${v}px)`);

  const photoBorderRadius = useTransform(
    progress,
    [0.34, 0.38, 0.41, 0.44],
    [
      "30% 70% 70% 30% / 30% 30% 70% 70%",
      "55% 45% 65% 35% / 45% 55% 45% 55%",
      "46% 54% 52% 48% / 54% 46% 52% 48%",
      "24px",
    ]
  );

  const displacementScale = useTransform(
    progress,
    [0.34, 0.40, 0.44, 0.54, 0.60, 0.64],
    [150, 40, 0, 0, 15, 50]
  );
  const turbulenceFreq = useTransform(
    progress,
    [0.34, 0.44, 0.54, 0.64],
    [0.06, 0.01, 0.01, 0.04]
  );

  // 5. Skills
  const skillsOpacity = useTransform(progress, [0.58, 0.62, 0.74, 0.78], [0, 1, 1, 0]);
  const skillsY = useTransform(progress, [0.58, 0.62, 0.74, 0.78], [60, 0, 0, -60]);

  // 6. Projects
  const projectsOpacity = useTransform(progress, [0.78, 0.82, 0.90, 0.94], [0, 1, 1, 0]);
  const projectsY = useTransform(progress, [0.78, 0.82, 0.90, 0.94], [60, 0, 0, -60]);

  // 7. Contact
  const contactOpacity = useTransform(progress, [0.94, 0.97, 1.0], [0, 1, 1]);
  const contactY = useTransform(progress, [0.94, 0.97, 1.0], [60, 0, 0]);

  // Scroll vibration
  const scrollVelocity = useVelocity(smoothProgress ?? progress);
  const vibrateX = useTransform(scrollVelocity, [-5, -0.5, 0, 0.5, 5], [-2, -0.3, 0, 0.3, 2]);
  const vibrateY = useTransform(scrollVelocity, [-5, -0.5, 0, 0.5, 5], [1, 0.15, 0, -0.15, -1]);

  const skills: Skill[] = useMemo(
    () => [
      {
        name: "Python",
        info: "Automation, CLI tools (gdup), data processing, scripting across Linux and Windows.",
        Icon: Code,
        initial: { x: -240, y: -120 },
      },
      {
        name: "Node.js",
        info: "REST APIs, real-time systems, server management, deployment pipelines, hosting platforms.",
        Icon: Server,
        initial: { x: 220, y: -150 },
      },
      {
        name: "React",
        info: "Component-driven UIs, hooks, state management, interactive dashboards and gallery pages.",
        Icon: Layout,
        initial: { x: -120, y: 130 },
      },
      {
        name: "Docker",
        info: "Containerization, dev environments, VPS deployment, process isolation for production apps.",
        Icon: Database,
        initial: { x: 250, y: 120 },
      },
      {
        name: "Linux",
        info: "Server management, shell scripting, system administration, VPS hosting and deployment.",
        Icon: Terminal,
        initial: { x: 30, y: 170 },
      },
      {
        name: "JavaScript",
        info: "Full-stack development, ES6+, async patterns, cross-platform code for web and server.",
        Icon: Zap,
        initial: { x: 10, y: -220 },
      },
      {
        name: "Claude",
        info: "Code generation, rapid prototyping, debugging, and system design.",
        Icon: Sparkles,
        initial: { x: -10, y: -20 },
      },
    ],
    []
  );

  const activeSkill = activeSkillName ? skills.find((s) => s.name === activeSkillName) : null;
  const activeSkillProjects = useMemo(() => {
    if (!activeSkillName) return [];
    const name = activeSkillName.toLowerCase();
    return data.filter(
      (p) =>
        p.title.toLowerCase().includes(name) ||
        (p.stack ?? []).some((item) => item.toLowerCase().includes(name))
    );
  }, [activeSkillName, data]);

  return (
    <motion.div
      style={{ x: vibrateX, y: vibrateY }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* SVG Liquid Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ visibility: "hidden" }}>
        <defs>
          <filter id="water-drop-filter">
            <motion.feTurbulence
              type="fractalNoise"
              baseFrequency={turbulenceFreq}
              numOctaves="2"
              result="noise"
            />
            <motion.feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* 01: Who Am I */}
      <motion.div
        style={{ opacity: whoAmIOpacity, y: whoAmIY }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <User className="w-5 h-5" />
              <span className="uppercase text-xs tracking-[0.5em] font-bold">Introduction</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9]">
              Who<br />Am I
            </h2>
            <p className="text-white/65 text-sm md:text-base leading-relaxed">
              Final-year BSc Computer Science student at Eastern University of Sri Lanka with a strong
              foundation in software engineering, full-stack development, and system design.
            </p>
          </div>

          <div className="glass border border-white/12 rounded-3xl p-6 md:p-8 space-y-4 bg-background/35 backdrop-blur-xl">
            <h3 className="text-xl font-bold uppercase text-accent">Full-Stack Developer</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Proficient in Python, JavaScript, and Go with hands-on experience building and deploying
              scalable web applications on cloud and VPS infrastructure. Passionate about writing clean,
              maintainable code and leveraging AI tooling to accelerate development cycles.
            </p>
            <div className="flex gap-4 text-xs font-black uppercase tracking-widest text-white/50 pt-2">
              <span className="flex items-center gap-1.5 text-accent">
                <Code className="w-3.5 h-3.5" /> Clean Code
              </span>
              <span className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" /> Full-Stack
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 02: Where I Am From */}
      <motion.div
        style={{ opacity: whereFromOpacity, y: whereFromY }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Compass className="w-5 h-5" />
              <span className="uppercase text-xs tracking-[0.5em] font-bold">Origin & Location</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9]">
              Where I Am<br />From
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Based in Sri Lanka, studying at Eastern University's Trincomalee Campus. Bridging research
              and engineering to create state-of-the-art interactive systems.
            </p>
          </div>

          <div className="glass border border-white/12 rounded-3xl p-6 md:p-8 space-y-6 bg-background/35 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/55">University</h3>
                  <p className="text-lg font-bold uppercase mt-0.5">Eastern University of Sri Lanka</p>
                  <p className="text-xs text-white/70">Trincomalee Campus, Sri Lanka</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/55">Program</h3>
                  <p className="text-lg font-bold uppercase mt-0.5">BSc in Computer Science</p>
                  <p className="text-xs text-white/70 font-sans">Faculty of Engineering & Technology</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between items-center text-[10px] text-white/50 uppercase tracking-widest">
              <span>CGPA: 3.4</span>
              <span className="text-accent font-bold">Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 03: Education & Qualification */}
      <motion.div
        style={{ opacity: educationOpacity, y: educationY }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div className="w-full max-w-5xl grid md:grid-cols-12 gap-8 items-center h-full relative">
          <div className="absolute top-[45%] md:top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:-translate-x-0 -translate-y-[20%] md:-translate-y-1/2 w-[92%] md:w-[48%] space-y-4 md:space-y-6 z-20">
            <div className="space-y-1 md:space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                <span className="uppercase text-[9px] md:text-xs tracking-[0.5em] font-bold">Timeline</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                Education &<br className="hidden md:block" /> Experience
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="glass border border-white/12 rounded-2xl p-4 md:p-6 bg-background/35 backdrop-blur-xl">
                <span className="text-accent text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                  Jul 2023 – Present
                </span>
                <h3 className="text-sm md:text-lg font-black uppercase mt-2">BSc in Computer Science</h3>
                <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider">
                  Eastern University of Sri Lanka, Trincomalee Campus
                </p>
                <p className="text-white/80 text-[11px] md:text-sm mt-1.5 leading-relaxed">
                  CGPA: 3.4. Coursework: Software Engineering, Problem Solving, Data Structures &amp;
                  Algorithms, Software Testing, Networking, Artificial Intelligence.
                </p>
              </div>

              <div className="glass border border-white/12 rounded-2xl p-4 md:p-6 bg-background/35 backdrop-blur-xl">
                <span className="text-accent text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                  Jul 2022 – Jul 2023
                </span>
                <h3 className="text-sm md:text-lg font-black uppercase mt-2">Software &amp; Hardware Troubleshooter</h3>
                <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider">
                  SmartNet Communication, Kattankudy, Sri Lanka
                </p>
                <p className="text-white/80 text-[11px] md:text-sm mt-1.5 leading-relaxed">
                  – Diagnosed and resolved hardware/software issues, reducing average resolution time significantly.<br />
                  – Installed and configured operating systems, drivers, and enterprise applications across client machines.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["Windows", "Linux", "Drivers"].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[9px] uppercase tracking-widest border border-accent/30 text-accent rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Photo */}
      <motion.div
        style={{
          opacity: photoOpacity,
          scale: photoScale,
          x: photoX,
          y: photoY,
          rotate: photoRotate,
          skewX: photoSkewX,
          filter: photoFilter,
          borderRadius: photoBorderRadius,
        }}
        className="absolute top-[18%] md:top-1/2 left-1/2 md:left-[62%] -translate-x-1/2 md:-translate-x-0 md:-translate-y-1/2 w-36 h-36 md:w-80 md:h-80 overflow-hidden border border-white/20 shadow-2xl bg-background/50 backdrop-blur-md pointer-events-none z-30"
      >
        <img
          src="/images/profile.png"
          alt="Profile photo"
          className="w-full h-full object-cover scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-white/5 pointer-events-none" />
      </motion.div>

      {/* 04: Skills */}
      <motion.div
        style={{ opacity: skillsOpacity, y: skillsY }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div ref={skillsBoundsRef} className="relative w-full max-w-5xl h-[70vh] pointer-events-auto" style={{ perspective: "1200px" }}>
          {skills.map((skill) => (
            <motion.button
              key={skill.name}
              type="button"
              drag
              dragElastic={0.12}
              dragConstraints={skillsBoundsRef}
              initial={{ x: skill.initial.x, y: skill.initial.y }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveSkillName(skill.name)}
              className={
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 " +
                "w-24 h-24 md:w-32 md:h-32 rounded-full glass border border-white/20 " +
                "bg-gradient-to-tr from-background/80 to-background/20 " +
                "shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.3)] " +
                "flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
              }
            >
              <skill.Icon className="w-6 h-6 mb-2 text-accent" />
              <span className="font-black uppercase tracking-widest text-[10px] md:text-xs text-center text-white/90">
                {skill.name}
              </span>
            </motion.button>
          ))}

          {/* Skill detail panel */}
          <motion.div
            animate={{ opacity: activeSkill ? 1 : 0, y: activeSkill ? 0 : 10 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 bottom-4 -translate-x-1/2 w-[92%] md:w-[520px] pointer-events-auto z-40"
          >
            {activeSkill ? (
              <div className="glass border border-accent/40 rounded-3xl p-6 bg-background/70 backdrop-blur-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-accent uppercase text-xs tracking-[0.35em]">Skill</p>
                    <h4 className="text-2xl font-black uppercase leading-tight mt-2">{activeSkill.name}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSkillName(null)}
                    className="px-4 py-2 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
                  >
                    Close
                  </button>
                </div>

                <p className="text-white/80 text-sm md:text-base leading-relaxed mt-4">
                  {activeSkill.info}
                </p>

                <div className="mt-5">
                  <p className="text-white/55 text-xs uppercase tracking-[0.3em]">Related Projects</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(activeSkillProjects.length ? activeSkillProjects : data).map((p) => (
                      <span
                        key={p.title}
                        className="px-3 py-2 text-[10px] uppercase tracking-widest border border-white/15 rounded-full text-white/80"
                      >
                        {p.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      </motion.div>

      {/* 05: Projects */}
      <motion.div
        style={{ opacity: projectsOpacity, y: projectsY }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div className="w-full max-w-5xl flex flex-col items-center gap-6">
          <div className="text-center space-y-2">
            <p className="text-accent uppercase text-xs tracking-[0.5em]">Featured Work</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Projects</h2>
            <p className="text-white/60 text-xs tracking-widest uppercase pt-2">Scroll to continue</p>
          </div>

          <div className="w-full grid gap-4 md:gap-6 md:grid-cols-2 pointer-events-auto">
            {data.slice(0, 2).map((card) => (
              <article
                key={card.title}
                className="glass border border-white/12 rounded-3xl bg-background/35 backdrop-blur-xl overflow-hidden"
              >
                <div className="p-6 md:p-7 space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase leading-tight">{card.title}</h3>
                    <p className="text-white/75 text-sm md:text-base leading-relaxed mt-3">{card.description}</p>
                  </div>

                  {(card.stack ?? []).length ? (
                    <div className="flex flex-wrap gap-2">
                      {(card.stack ?? []).map((item) => (
                        <span
                          key={item}
                          className="px-2 py-1 text-[10px] uppercase tracking-widest border border-accent/40 text-accent rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-3">
                    {card.demo ? (
                      <a
                        href={card.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 text-[11px] font-black uppercase tracking-widest bg-accent text-background rounded-xl flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3 h-3" /> Live
                      </a>
                    ) : null}
                    {card.github ? (
                      <a
                        href={card.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 text-[11px] font-black uppercase tracking-widest border border-white/30 rounded-xl hover:border-accent transition-colors flex items-center gap-1.5"
                      >
                        GitHub
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAllProjects(true)}
            className="pointer-events-auto px-6 py-3 border border-accent/40 text-accent rounded-xl text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-300"
          >
            View All Projects
          </button>
        </div>
      </motion.div>

      {/* View All Projects Overlay */}
      {showAllProjects && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setShowAllProjects(false)} />
          <div className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">All Projects</h2>
              <button
                type="button"
                onClick={() => setShowAllProjects(false)}
                className="p-2 border border-white/20 rounded-xl hover:border-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              {data.map((card) => (
                <article
                  key={card.title}
                  className="glass border border-white/12 rounded-3xl bg-background/35 backdrop-blur-xl overflow-hidden"
                >
                  <div className="p-6 md:p-7 space-y-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-black uppercase leading-tight">{card.title}</h3>
                      <p className="text-white/75 text-sm md:text-base leading-relaxed mt-3">{card.description}</p>
                    </div>

                    {(card.stack ?? []).length ? (
                      <div className="flex flex-wrap gap-2">
                        {(card.stack ?? []).map((item) => (
                          <span
                            key={item}
                            className="px-2 py-1 text-[10px] uppercase tracking-widest border border-accent/40 text-accent rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="flex flex-wrap gap-3">
                      {card.demo ? (
                        <a
                          href={card.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 text-[11px] font-black uppercase tracking-widest bg-accent text-background rounded-xl flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      ) : null}
                      {card.github ? (
                        <a
                          href={card.github}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 text-[11px] font-black uppercase tracking-widest border border-white/30 rounded-xl hover:border-accent transition-colors flex items-center gap-1.5"
                        >
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* CV Overlay */}
      {showCV && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setShowCV(false)} />
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Curriculum Vitae</h2>
              <button
                type="button"
                onClick={() => setShowCV(false)}
                className="p-2 border border-white/20 rounded-xl hover:border-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="glass border border-white/12 rounded-3xl p-6 md:p-8 bg-background/35 backdrop-blur-xl space-y-6">
              {/* Header */}
              <div className="text-center space-y-2 pb-6 border-b border-white/10">
                <h3 className="text-2xl md:text-4xl font-black uppercase">{CV_CONTENT.name}</h3>
                <p className="text-accent text-sm uppercase tracking-widest">{CV_CONTENT.contact.title}</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[10px] md:text-xs text-white/60 uppercase tracking-wider">
                  <span>{CV_CONTENT.contact.phone}</span>
                  <span>{CV_CONTENT.contact.email}</span>
                  <span>{CV_CONTENT.contact.github}</span>
                  <span>{CV_CONTENT.contact.linkedin}</span>
                </div>
              </div>

              {/* About */}
              <div>
                <h4 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-3">About Me</h4>
                <p className="text-white/80 text-sm leading-relaxed">{CV_CONTENT.about}</p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-3">Education</h4>
                {CV_CONTENT.education.map((e, i) => (
                  <div key={i} className="border-l-2 border-accent/30 pl-4 py-2">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">{e.period}</span>
                    <p className="font-bold uppercase text-sm mt-0.5">{e.degree}</p>
                    <p className="text-xs text-white/60">{e.institution}</p>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">{e.details}</p>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-3">Experience</h4>
                {CV_CONTENT.experience.map((e, i) => (
                  <div key={i} className="border-l-2 border-accent/30 pl-4 py-2 mb-4">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">{e.period}</span>
                    <p className="font-bold uppercase text-sm mt-0.5">{e.role}</p>
                    <p className="text-xs text-white/60">{e.company}</p>
                    {e.details.split("\n").map((line, j) => (
                      <p key={j} className="text-xs text-white/70 leading-relaxed">{line}</p>
                    ))}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {e.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[9px] uppercase tracking-widest border border-accent/30 text-accent rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-3">Skills</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(CV_CONTENT.skills).map(([cat, items]) => (
                    <div key={cat} className="glass border border-white/10 rounded-xl p-3 bg-background/20">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold mb-1.5">{cat}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 text-[9px] uppercase tracking-widest border border-white/15 rounded-full text-white/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificates */}
              <div>
                <h4 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-3">Certificates</h4>
                <ul className="space-y-2">
                  {CV_CONTENT.certificates.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                      <span className="text-accent mt-0.5">&#9656;</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download button inside overlay */}
              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={downloadCV}
                  className="px-6 py-3 bg-accent text-background font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download CV
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 06: Contact */}
      <motion.div
        style={{ opacity: contactOpacity, y: contactY }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div className="w-full max-w-4xl glass border border-white/15 rounded-3xl p-8 md:p-12 space-y-6 bg-background/35 backdrop-blur-xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-accent">
              <Mail className="w-5 h-5" />
              <span className="uppercase text-xs tracking-[0.5em] font-bold">Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Let&apos;s Build</h2>
            <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Open to roles, freelance projects, and creative collaborations. Drop a line and let&apos;s turn
              your ideas into functional digital masterpieces.
            </p>
          </div>

          <div className="pointer-events-auto flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="mailto:mikeadhil2002@gmail.com"
              className="px-6 py-4 bg-accent text-background font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-accent/25"
            >
              <Mail className="w-4 h-4" /> Send Email
            </a>
            <a
              href="https://github.com/adhilNuckz"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 border border-white/25 font-black uppercase tracking-widest text-xs rounded-xl hover:border-accent hover:text-accent transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg> GitHub
            </a>
            <a
              href="https://linkedin.com/in/adhilmk"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 border border-white/25 font-black uppercase tracking-widest text-xs rounded-xl hover:border-accent hover:text-accent transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg> LinkedIn
            </a>
            <button
              type="button"
              onClick={() => setShowCV(true)}
              className="px-6 py-4 border border-white/25 font-black uppercase tracking-widest text-xs rounded-xl hover:border-accent hover:text-accent transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> View CV
            </button>
            <button
              type="button"
              onClick={downloadCV}
              className="px-6 py-4 border border-white/25 font-black uppercase tracking-widest text-xs rounded-xl hover:border-accent hover:text-accent transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download CV
            </button>
          </div>

          <div className="pt-8 text-white/45 text-[10px] md:text-xs uppercase tracking-[0.3em] flex justify-between border-t border-white/10 mt-10">
            <span>© 2026 Adhil Marzook</span>
            <span className="text-accent">Built with Next.js & Tailwind</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
