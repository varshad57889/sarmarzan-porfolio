"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

type SkillCategory = {
  title: string;
  items: string[];
  note?: string;
};

type Project = {
  name: string;
  summary: string;
  tags: string[];
  status?: "Concept" | "Building" | "Shipped";
};

const PROMPT = {
  user: "sarmarzan",
  host: "temple",
  path: "~",
};

function PromptLine({ command }: { command: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-sm text-[color:var(--terminal-text)]">
      <span className="text-[color:var(--terminal-gold)]">{PROMPT.user}</span>
      <span className="text-[color:var(--terminal-muted)]">@</span>
      <span className="text-[color:var(--terminal-gold)]">{PROMPT.host}</span>
      <span className="text-[color:var(--terminal-muted)]">:</span>
      <span className="text-[color:var(--terminal-muted)]">{PROMPT.path}</span>
      <span className="text-[color:var(--terminal-muted)]">$</span>
      <span className="text-[color:var(--terminal-text)]">{command}</span>
    </div>
  );
}

function TerminalCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`terminal-card relative overflow-hidden rounded-2xl border border-[color:var(--terminal-line)] bg-[color:var(--terminal-panel)] p-6 ${className}`}
    >
      {title ? (
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="font-mono text-sm text-[color:var(--terminal-muted)]">
            {title}
          </div>
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[color:rgba(216,183,106,0.55)]" />
            <span className="h-2 w-2 rounded-full bg-[color:rgba(216,183,106,0.25)]" />
            <span className="h-2 w-2 rounded-full bg-[color:rgba(216,183,106,0.12)]" />
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div
      className="my-10 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(216,183,106,0.5),transparent)]"
      aria-hidden="true"
    />
  );
}

function Section({
  id,
  command,
  title,
  lead,
  children,
}: {
  id: string;
  command: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="reveal">
        <PromptLine command={command} />
        <h2 className="mt-4 font-mono text-2xl leading-tight text-[color:var(--terminal-gold-soft)]">
          {title}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-3xl text-pretty text-[color:var(--terminal-muted)]">
            {lead}
          </p>
        ) : null}
        <div className="mt-6">{children}</div>
      </div>
      <Divider />
    </section>
  );
}

export default function PortfolioTerminal() {
  const [scrollY, setScrollY] = useState(0);

  const skills = useMemo<SkillCategory[]>(
    () => [
      {
        title: "Web Development",
        items: ["HTML", "CSS", "JSON"],
      },
      {
        title: "Backend",
        items: ["Django", "SQL", "SQLite"],
      },
      {
        title: "Frontend",
        items: ["React", "React Query & libraries"],
      },
      {
        title: "Programming",
        items: ["Python", "Top 10 Python libraries"],
        note: "I learn by building — then I refine until it feels inevitable.",
      },
      {
        title: "Machine Learning",
        items: ["Advanced understanding"],
      },
      {
        title: "Systems / DevOps",
        items: ["WSL", "WSL2", "Linux basics", "Docker (professional level)"],
      },
      {
        title: "Other",
        items: ["Automation tools", "Blockchain essentials"],
      },
    ],
    [],
  );

  const certifications = useMemo(
    () =>
      [
        {
          group: "Microsoft Azure",
          items: ["AI-900", "AZ-900", "AI-102", "AZ-104"],
        },
        {
          group: "Google Cloud",
          items: ["Google Prompting Essentials"],
        },
        {
          group: "Blockchain Technology",
          items: [
            "Base Builder",
            "Wormhole Learner",
            "Wormhole Developer",
          ],
        },
      ] as const,
    [],
  );

  const projects = useMemo<Project[]>(
    () => [
      {
        name: "Temple Terminal Portfolio",
        summary:
          "A dark, calm, terminal-inspired portfolio — minimal lines, soft gold light, and a voice that feels human.",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        status: "Shipped",
      },
      {
        name: "Automation Studio (Placeholder)",
        summary:
          "A future workspace for small automations that save time and reduce chaos.",
        tags: ["Python", "Automation"],
        status: "Concept",
      },
      {
        name: "Wisdom Notes (Placeholder)",
        summary:
          "A quiet place to store lessons learned — not motivation, but clarity.",
        tags: ["Writing", "Systems"],
        status: "Building",
      },
    ],
    [],
  );

  const hobbies = useMemo(
    () =>
      [
        "Spiritual reflection",
        "Gaming — Shadow of War: Middle-Earth, Assetto Corsa, City Driving",
        "Motorsports — Ferrari & Red Bull",
        "Football",
        "Coding & automations",
        "Philosophy & reading",
        "F1 passion",
        "Life purpose & wisdom",
      ] as const,
    [],
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (prefersReduced) {
      for (const el of elements) el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    for (const el of elements) io.observe(el);

    return () => io.disconnect();
  }, []);

  const orbA = `translate3d(0, ${scrollY * 0.18}px, 0)`;
  const orbB = `translate3d(0, ${scrollY * 0.1}px, 0)`;
  const gridShift = `translate3d(0, ${scrollY * 0.06}px, 0)`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[color:var(--terminal-bg)] text-[color:var(--terminal-text)]">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-[-20%] opacity-60"
          style={{ transform: gridShift }}
        >
          <div className="terminal-grid absolute inset-0" />
        </div>

        <div
          className="terminal-orb absolute -top-40 left-1/2 h-[540px] w-[540px] -translate-x-1/2"
          style={{ transform: `${orbA} translateX(-50%)` }}
        />
        <div
          className="terminal-orb absolute -bottom-56 right-[-120px] h-[520px] w-[520px] opacity-70"
          style={{ transform: orbB }}
        />

        <div className="terminal-scanlines absolute inset-0" />
      </div>

      <header className="sticky top-0 z-20 border-b border-[color:var(--terminal-line)] bg-[color:rgba(6,6,8,0.72)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="h-3 w-3 rounded-full bg-[color:var(--terminal-gold)] shadow-[0_0_18px_rgba(216,183,106,0.45)]"
              aria-hidden="true"
            />
            <div className="font-mono text-sm">
              <span className="text-[color:var(--terminal-gold-soft)]">
                Sarmarzan
              </span>
              <span className="text-[color:var(--terminal-muted)]"> / </span>
              <span className="text-[color:var(--terminal-muted)]">
                Erfan Ghasri Fard
              </span>
            </div>
          </div>

          <nav className="no-scrollbar flex max-w-[55vw] flex-1 flex-nowrap items-center justify-end gap-4 overflow-x-auto whitespace-nowrap text-sm text-[color:var(--terminal-muted)]">
            <a className="terminal-link" href="#about">
              about
            </a>
            <a className="terminal-link" href="#skills">
              skills
            </a>
            <a className="terminal-link" href="#certifications">
              certifications
            </a>
            <a className="terminal-link" href="#projects">
              projects
            </a>
            <a className="terminal-link" href="#hobbies">
              hobbies
            </a>
            <a className="terminal-link" href="#mission">
              mission
            </a>
            <a className="terminal-link" href="#contact">
              contact
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-28 pt-16">
        <section className="reveal">
          <PromptLine command="whoami" />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <h1 className="text-pretty font-mono text-4xl leading-tight text-[color:var(--terminal-gold-soft)] sm:text-5xl">
                Erfan Ghasri Fard
                <span className="text-[color:var(--terminal-muted)]">
                  {" "}
                  — “Sarmarzan”
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[color:var(--terminal-text)]">
                Calm. Humble. Driven. Honest.
                <span className="text-[color:var(--terminal-muted)]">
                  {" "}
                  ENTJ energy — but with a quiet mind.
                </span>
              </p>

              <div className="mt-6 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-[color:var(--terminal-line)] bg-[color:rgba(8,8,10,0.52)] px-4 py-3">
                <span className="font-mono text-sm text-[color:var(--terminal-muted)]">
                  brand_phrase
                </span>
                <span className="font-mono text-sm text-[color:var(--terminal-gold-soft)]">
                  “Sarmarzan Above All”
                </span>
                <span className="terminal-cursor" aria-hidden="true" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="terminal-button inline-flex items-center justify-center rounded-xl border border-[color:rgba(216,183,106,0.45)] bg-[color:rgba(216,183,106,0.08)] px-5 py-3 font-mono text-sm text-[color:var(--terminal-gold-soft)] shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition hover:bg-[color:rgba(216,183,106,0.12)]"
                >
                  initiate contact
                </a>
                <a
                  href="#mission"
                  className="terminal-button inline-flex items-center justify-center rounded-xl border border-[color:var(--terminal-line)] bg-[color:rgba(8,8,10,0.38)] px-5 py-3 font-mono text-sm text-[color:var(--terminal-muted)] transition hover:border-[color:rgba(216,183,106,0.35)] hover:text-[color:var(--terminal-gold-soft)]"
                >
                  read my mission
                </a>
              </div>

              <p className="mt-10 max-w-2xl text-pretty text-[color:var(--terminal-muted)]">
                I’m 17, from Iran. I build, learn, and grow — but the real goal is
                leadership.
              </p>
            </div>

            <TerminalCard title="status" className="lg:mt-2">
              <div className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[color:var(--terminal-muted)]">role</div>
                  <div className="text-right font-mono text-[color:var(--terminal-text)]">
                    young developer
                    <div className="text-[color:var(--terminal-muted)]">
                      future entrepreneur / leader
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="text-[color:var(--terminal-muted)]">focus</div>
                  <div className="text-right font-mono text-[color:var(--terminal-text)]">
                    clarity → systems → impact
                  </div>
                </div>

                <div className="rounded-xl border border-[color:rgba(216,183,106,0.22)] bg-[color:rgba(216,183,106,0.06)] p-4">
                  <div className="font-mono text-xs text-[color:var(--terminal-muted)]">
                    small spiritual note
                  </div>
                  <div className="mt-2 text-pretty font-mono text-sm text-[color:var(--terminal-gold-soft)]">
                    “In stillness, the next decision becomes obvious.”
                  </div>
                  <div className="mt-2 text-right text-xs text-[color:rgba(216,183,106,0.55)]">
                    بِسْمِ ٱللَّٰهِ
                  </div>
                </div>
              </div>
            </TerminalCard>
          </div>

          <Divider />
        </section>

        <Section
          id="about"
          command="cat about.md"
          title="About Me"
          lead="I know a little bit of everything — not to look skilled, but to stay adaptable."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <TerminalCard title="story">
              <p className="text-pretty leading-relaxed text-[color:var(--terminal-text)]">
                I’m a young developer who moves calmly, learns quickly, and stays
                honest.
                <span className="text-[color:var(--terminal-muted)]">
                  {" "}
                  I’m not trying to become “just a developer.”
                </span>
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-[color:var(--terminal-muted)]">
                My direction is entrepreneurship, leadership, and management —
                building systems that people trust.
              </p>
            </TerminalCard>

            <TerminalCard title="principles">
              <ul className="space-y-3 text-[color:var(--terminal-muted)]">
                <li>
                  <span className="text-[color:var(--terminal-gold)]">&gt;</span>{" "}
                  Calm confidence — no noise, just results.
                </li>
                <li>
                  <span className="text-[color:var(--terminal-gold)]">&gt;</span>{" "}
                  Humility — I stay a student.
                </li>
                <li>
                  <span className="text-[color:var(--terminal-gold)]">&gt;</span>{" "}
                  Wisdom — decisions over reactions.
                </li>
                <li>
                  <span className="text-[color:var(--terminal-gold)]">&gt;</span>{" "}
                  Integrity — truth is the foundation.
                </li>
              </ul>

              <div className="mt-5 rounded-xl border border-[color:rgba(216,183,106,0.25)] bg-[color:rgba(8,8,10,0.32)] p-4">
                <p className="text-pretty font-mono text-sm text-[color:var(--terminal-text)]">
                  “I don’t want to be rich or famous — I want to be known. Known
                  for honesty, wisdom, and integrity.”
                </p>
              </div>
            </TerminalCard>
          </div>
        </Section>

        <Section
          id="skills"
          command="ls skills/ --group-directories-first"
          title="Technical Skills"
          lead="A wide base, sharpened by curiosity and disciplined practice."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((c) => (
              <TerminalCard key={c.title} title={c.title}>
                <div className="flex flex-wrap gap-2">
                  {c.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[color:rgba(216,183,106,0.22)] bg-[color:rgba(216,183,106,0.06)] px-3 py-1 font-mono text-xs text-[color:var(--terminal-gold-soft)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {c.note ? (
                  <p className="mt-4 text-pretty text-sm text-[color:var(--terminal-muted)]">
                    {c.note}
                  </p>
                ) : null}
              </TerminalCard>
            ))}
          </div>
        </Section>

        <Section
          id="certifications"
          command="cat certifications.json | jq"
          title="Certifications"
          lead="Proof of work matters — but character matters more."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {certifications.map((g) => (
              <TerminalCard key={g.group} title={g.group}>
                <ul className="space-y-2 font-mono text-sm">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:rgba(216,183,106,0.55)]" />
                      <span className="text-[color:var(--terminal-text)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </TerminalCard>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          command="ls projects/"
          title="Projects"
          lead="Placeholders for now — the real projects will be systems people can rely on."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((p) => (
              <TerminalCard
                key={p.name}
                title={`${p.status ?? "Project"} · ${p.name}`}
                className="flex flex-col"
              >
                <p className="text-pretty text-sm leading-relaxed text-[color:var(--terminal-muted)]">
                  {p.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-[color:var(--terminal-line)] bg-[color:rgba(8,8,10,0.32)] px-2.5 py-1 font-mono text-[11px] text-[color:var(--terminal-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TerminalCard>
            ))}
          </div>
        </Section>

        <Section
          id="hobbies"
          command="cat hobbies_and_philosophy.txt"
          title="Hobbies & Philosophy"
          lead="A person is built in their quiet hours."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <TerminalCard title="interests">
              <ul className="space-y-3 text-[color:var(--terminal-muted)]">
                {hobbies.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="text-[color:var(--terminal-gold)]">•</span>
                    <span className="text-pretty">{h}</span>
                  </li>
                ))}
              </ul>
            </TerminalCard>

            <TerminalCard title="reflection">
              <p className="text-pretty leading-relaxed text-[color:var(--terminal-text)]">
                I like ideas that survive pressure.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-[color:var(--terminal-muted)]">
                I’m not interested in temporary hype — I’m interested in lasting
                value: truth, discipline, and calm progress.
              </p>
              <div className="mt-6 rounded-xl border border-[color:rgba(216,183,106,0.2)] bg-[color:rgba(216,183,106,0.05)] p-4">
                <p className="text-pretty font-mono text-sm text-[color:var(--terminal-gold-soft)]">
                  “Wisdom is not loud. It is consistent.”
                </p>
              </div>
            </TerminalCard>
          </div>
        </Section>

        <Section
          id="mission"
          command="cat mission.txt"
          title="Personal Mission"
          lead="I’m building a name that means something."
        >
          <TerminalCard title="values">
            <div className="grid gap-6 lg:grid-cols-3">
              <div>
                <div className="font-mono text-sm text-[color:var(--terminal-gold-soft)]">
                  honesty
                </div>
                <p className="mt-2 text-pretty text-sm text-[color:var(--terminal-muted)]">
                  I don’t negotiate with the truth. If I’m wrong, I learn.
                </p>
              </div>
              <div>
                <div className="font-mono text-sm text-[color:var(--terminal-gold-soft)]">
                  leadership
                </div>
                <p className="mt-2 text-pretty text-sm text-[color:var(--terminal-muted)]">
                  I want to lead with calm responsibility, not ego.
                </p>
              </div>
              <div>
                <div className="font-mono text-sm text-[color:var(--terminal-gold-soft)]">
                  integrity
                </div>
                <p className="mt-2 text-pretty text-sm text-[color:var(--terminal-muted)]">
                  I build systems that people can trust — even when no one is
                  watching.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-[color:rgba(216,183,106,0.28)] bg-[color:rgba(8,8,10,0.38)] p-6">
              <div className="font-mono text-xs text-[color:var(--terminal-muted)]">
                final_line
              </div>
              <div className="mt-3 text-pretty font-mono text-lg text-[color:var(--terminal-text)]">
                “I don’t want to be rich or famous — I want to be known.”
              </div>
              <div className="mt-2 text-pretty font-mono text-sm text-[color:var(--terminal-muted)]">
                Known for honesty, wisdom, and integrity.
              </div>
            </div>
          </TerminalCard>
        </Section>

        <Section
          id="contact"
          command="echo \"let's build something real\""
          title="Contact"
          lead="If my mindset matches what you’re building, send a signal."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <TerminalCard title="message">
              <p className="text-pretty text-sm leading-relaxed text-[color:var(--terminal-muted)]">
                This is a static portfolio — but connection is simple.
              </p>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-[color:var(--terminal-muted)]">
                Add your real links later (GitHub, LinkedIn, email). For now,
                these are placeholders.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="terminal-link rounded-xl border border-[color:var(--terminal-line)] bg-[color:rgba(8,8,10,0.32)] px-4 py-2 font-mono text-sm text-[color:var(--terminal-muted)] hover:text-[color:var(--terminal-gold-soft)]"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="terminal-link rounded-xl border border-[color:var(--terminal-line)] bg-[color:rgba(8,8,10,0.32)] px-4 py-2 font-mono text-sm text-[color:var(--terminal-muted)] hover:text-[color:var(--terminal-gold-soft)]"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="terminal-link rounded-xl border border-[color:var(--terminal-line)] bg-[color:rgba(8,8,10,0.32)] px-4 py-2 font-mono text-sm text-[color:var(--terminal-muted)] hover:text-[color:var(--terminal-gold-soft)]"
                >
                  Email
                </a>
              </div>
            </TerminalCard>

            <TerminalCard title="closing">
              <p className="text-pretty text-sm leading-relaxed text-[color:var(--terminal-text)]">
                “Calm is power. Wisdom is direction.”
              </p>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-[color:var(--terminal-muted)]">
                If you’re building something meaningful, I’ll bring discipline,
                honesty, and systems thinking.
              </p>

              <div className="mt-6 rounded-xl border border-[color:rgba(216,183,106,0.25)] bg-[color:rgba(216,183,106,0.05)] p-4">
                <div className="font-mono text-xs text-[color:var(--terminal-muted)]">
                  signature
                </div>
                <div className="mt-2 font-mono text-sm text-[color:var(--terminal-gold-soft)]">
                  Sarmarzan Above All
                </div>
              </div>
            </TerminalCard>
          </div>
        </Section>

        <footer className="reveal">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-[color:var(--terminal-line)] pt-10 text-center font-mono text-xs text-[color:var(--terminal-muted)] md:flex-row md:text-left">
            <div>
              © {new Date().getFullYear()} Erfan Ghasri Fard — “Sarmarzan”
            </div>
            <div className="text-[color:rgba(216,183,106,0.55)]">
              built like a terminal • kept like a temple
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
