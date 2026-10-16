import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { GlobalMotion, Magnetic, Reveal, Tilt } from "@/components/portfolio/motion";
import {
  categories, certifications, education, experience, filterSkills, profile, publication, sections, stats, type Category,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mukesh Kumar B | System Engineer & Software Quality" },
      { name: "description", content: "Portfolio of Mukesh Kumar B — system troubleshooting, software quality, build stability, Linux and IT operations." },
      { property: "og:title", content: "Mukesh Kumar B | System Engineer" },
      { property: "og:description", content: "Troubleshooting, system validation, software quality and IT operations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ease = [0.22, 1, 0.36, 1] as const;

function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4">
      <nav className="flex items-center justify-between">
        <a href="#home" className="font-display text-2xl text-accent">MK</a>
        <ul className="hidden items-center font-display text-2xl md:flex">
          {sections.map((s, i) => (
            <li key={s} className="flex items-center">
              {i > 0 && <span className="mx-2 opacity-60">/</span>}
              <a href={`#${s.toLowerCase()}`} className="group relative">{s}<span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-foreground transition-all group-hover:w-full" /></a>
            </li>
          ))}
        </ul>
        <button className="md:hidden font-display text-xl" onClick={() => setOpen(!open)} aria-label="Menu">{open ? "Close" : "Menu"}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mt-2 space-y-1 rounded-2xl bg-primary p-4 text-primary-foreground md:hidden">
            {sections.map(s => <li key={s}><a onClick={() => setOpen(false)} href={`#${s.toLowerCase()}`} className="block py-2 font-display text-3xl">{s}</a></li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

const slides = [
  { title: "Hi, I'm Mukesh", sub: "I'm a system engineer who finds what's broken, isolates why, and proves it's fixed" },
  { title: "I break builds", sub: "700+ defects tracked and retested across PC, Xbox, PS5, Steam Deck and Switch" },
  { title: "I fix machines", sub: "Hardware, OS, boot and application issues — diagnosed, repaired, validated" },
  { title: "I love Linux", sub: "Building my career in system engineering, IT operations and networking" },
  { title: "I publish", sub: "IEEE 2025 — intrusion detection using ACGAN-powered machine learning" },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(n => (n + 1) % slides.length), 4500); return () => clearInterval(t); }, [i]);
  const s = slides[i]!;
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <div className="mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial="hide" animate="show" exit="out">
            <h1 className="font-display text-[clamp(4rem,14vw,10rem)] leading-[0.9] text-accent drop-shadow-sm">
              {s.title.split(" ").map((w, k) => (
                <span key={k} className="mr-[0.2em] inline-block overflow-hidden align-bottom">
                  <motion.span className="inline-block" variants={{ hide: { y: "110%", rotate: 6 }, show: { y: 0, rotate: 0 }, out: { y: "-110%" } }} transition={{ duration: 0.6, delay: k * 0.08, ease }}>{w}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p variants={{ hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 }, out: { opacity: 0 } }} transition={{ delay: 0.35, duration: 0.5 }}
              className="mx-auto mt-2 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.8rem)] leading-tight">{s.sub}</motion.p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex justify-center gap-4">
          <Magnetic><a href="#about" className="inline-block rounded-md border-2 border-accent px-4 py-1 font-display text-3xl text-accent transition-colors hover:bg-accent hover:text-accent-foreground">Learn more</a></Magnetic>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          {slides.map((_, k) => (
            <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)}
              className={`h-4 w-4 rounded-full border-2 border-accent transition-all ${k === i ? "bg-accent scale-110" : "bg-transparent hover:bg-accent/50"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Troubleshooting", "System Validation", "Regression Testing", "Linux", "Networking", "Build Stability", "Root Cause Analysis"];
  return (
    <div className="overflow-hidden border-y border-border bg-primary py-5 text-primary-foreground">
      <div className="marquee">
        {[...items, ...items].map((t, i) => <span key={i} className="mx-6 font-display text-3xl font-semibold whitespace-nowrap">{t} <span className="text-accent">✦</span></span>)}
      </div>
    </div>
  );
}

function SectionTitle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <Reveal className="mb-14 flex items-end gap-4">
      <span className="font-mono text-sm text-muted-foreground">{n}</span>
      <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">{children}</h2>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionTitle n="01">About</SectionTitle>
      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <p className="font-display text-2xl leading-snug md:text-3xl">{profile.intro}</p>
          <p className="mt-6 text-muted-foreground">{profile.about}</p>
          <div className="mt-8 rounded-2xl border border-border bg-card p-5">
            <p className="font-mono text-xs uppercase text-muted-foreground">Education</p>
            <p className="mt-1 font-display text-lg font-semibold">{education.school}</p>
            <p className="text-sm text-muted-foreground">{education.degree} · {education.period}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-accent">
                <p className="font-display text-4xl font-bold"><Counter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} /></p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionTitle n="02">Experience</SectionTitle>
      <div className="space-y-8">
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 0.1}>
            <Tilt>
              <article className="rounded-3xl border border-border bg-card p-8 md:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl font-bold">{e.role}</h3>
                    <p className="text-muted-foreground">{e.company}</p>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1 font-mono text-xs text-accent-foreground">{e.period}</span>
                </div>
                <p className="mt-6 text-lg">{e.summary}</p>
                <ul className="mt-4 grid gap-2 text-muted-foreground sm:grid-cols-2">
                  {e.points.map(p => <li key={p}>→ {p}</li>)}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {e.chips.map(c => <span key={c} className="rounded-full border border-border px-3 py-1 text-sm">{c}</span>)}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
                  {e.flow.map((f, k) => (
                    <motion.span key={f} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.12 }} className="flex items-center gap-2">
                      <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">{f}</span>{k < e.flow.length - 1 && "→"}
                    </motion.span>
                  ))}
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [cat, setCat] = useState<Category>("All");
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionTitle n="03">Skills</SectionTitle>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} className="relative rounded-full px-5 py-2 text-sm font-medium">
            {cat === c && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className={`relative ${cat === c ? "text-primary-foreground" : ""}`}>{c}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="flex flex-wrap gap-3">
        <AnimatePresence mode="popLayout">
          {filterSkills(cat).map(s => (
            <motion.div key={s.name} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -4, rotate: -2 }} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:bg-accent">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-mono text-xs text-primary-foreground">{s.icon}</span>
              <span className="font-medium">{s.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Work() {
  const [copied, setCopied] = useState(false);
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28">
      <SectionTitle n="04">Work</SectionTitle>
      <Reveal>
        <Tilt>
          <article data-project className="overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-14">
            <p className="font-mono text-xs uppercase opacity-70">IEEE Publication · 2025</p>
            <h3 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">{publication.title}</h3>
            <p className="mt-6 max-w-2xl opacity-80">{publication.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {publication.tags.map(t => <span key={t} className="rounded-full border border-primary-foreground/30 px-3 py-1 text-sm">{t}</span>)}
            </div>
            <p className="mt-8 text-sm opacity-70">{publication.venue}<br />{publication.authors}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground">View publication ↗</a>
              <button onClick={() => { navigator.clipboard.writeText(publication.doi); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="rounded-full border border-primary-foreground/40 px-6 py-3 font-mono text-sm">
                {copied ? "Copied!" : `DOI ${publication.doi}`}
              </button>
            </div>
          </article>
        </Tilt>
      </Reveal>
    </section>
  );
}

function Awards() {
  return (
    <section id="awards" className="mx-auto max-w-6xl px-6 py-28">
      <SectionTitle n="05">Certifications</SectionTitle>
      <div className="divide-y divide-border border-y border-border">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05}>
            <div className="group flex items-center justify-between gap-4 py-6 transition-all hover:bg-accent hover:px-4">
              <div>
                <p className="font-mono text-xs text-muted-foreground">{c.issuer}</p>
                <p className="font-display text-xl font-semibold md:text-2xl">{c.name}</p>
              </div>
              <span className="font-mono text-sm transition-transform group-hover:rotate-[-6deg]">{c.code}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${body}`;
  };
  const input = "w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-foreground";
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <SectionTitle n="06">Let's talk</SectionTitle>
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal className="space-y-4">
          <a href={`mailto:${profile.email}`} className="block font-display text-2xl font-semibold underline decoration-accent decoration-4 underline-offset-8 md:text-3xl break-all">{profile.email}</a>
          <p className="text-lg">{profile.phone}</p>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-block rounded-full border-2 border-foreground px-5 py-2">LinkedIn ↗</a>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="space-y-4">
            <input required placeholder="Name" className={input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Email" className={input} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <textarea required rows={5} placeholder="Message" className={input} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            <button className="rounded-full bg-primary px-7 py-4 font-medium text-primary-foreground">Open email draft →</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="overflow-x-clip">
      <GlobalMotion />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <Work />
      <Awards />
      <Contact />
      <footer className="border-t border-border px-6 py-8 text-center font-mono text-xs text-muted-foreground">© 2026 {profile.name}</footer>
    </main>
  );
}
