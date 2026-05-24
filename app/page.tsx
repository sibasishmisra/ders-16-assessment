import Link from 'next/link';

// ── Sample result bar (static, decorative) ──────────────────────────────────
function SampleBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className="text-xs text-slate-500">{pct}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Step card ────────────────────────────────────────────────────────────────
function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300 font-bold text-sm">
        {n}
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ── Dimension pill ───────────────────────────────────────────────────────────
function Dim({ icon, name, desc, accent }: { icon: string; name: string; desc: string; accent: string }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent}`}>
      <div className="text-2xl mb-3">{icon}</div>
      <div className="font-semibold text-white mb-1">{name}</div>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a12] text-white antialiased">

      {/* ── ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-700/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-fuchsia-700/10 blur-[100px]" />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          NAV
      ════════════════════════════════════════════════════════════════════ */}
      <nav className="relative z-20 border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">Emotion Self-Check</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#how" className="text-sm text-slate-400 hover:text-white transition-colors hidden md:block">How it works</a>
            <a href="#dimensions" className="text-sm text-slate-400 hover:text-white transition-colors hidden md:block">Dimensions</a>
            <Link
              href="/assessment/start"
              className="text-sm font-medium px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"
            >
              Begin
            </Link>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-400/20 rounded-full px-4 py-1.5 text-xs text-violet-300 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Based on the DERS-16 scale
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
              How do you relate to your{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                emotions
              </span>{' '}
              when things get hard?
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
              A short, research-based self-reflection that helps you notice your patterns around difficult feelings —
              clarity, acceptance, impulse, and the strategies you reach for.
              Takes about three minutes. Your result is delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/assessment/start"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-xl shadow-violet-900/40 hover:shadow-violet-800/50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              >
                Begin the check
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium rounded-2xl transition-all duration-200"
              >
                See how it works
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              {[
                { icon: '⏱', label: '~3 minutes' },
                { icon: '📋', label: '16 questions' },
                { icon: '🔒', label: 'Private & secure' },
              ].map(m => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — sample result card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Sample result</p>
                  <h3 className="font-semibold text-white">Five dimensions, one clear picture</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>

              <SampleBar label="Clarity"       pct={38} color="bg-blue-400" />
              <SampleBar label="Goals"         pct={55} color="bg-emerald-400" />
              <SampleBar label="Impulse"       pct={42} color="bg-yellow-400" />
              <SampleBar label="Nonacceptance" pct={61} color="bg-rose-400" />
              <SampleBar label="Strategies"    pct={47} color="bg-violet-400" />

              <div className="mt-5 pt-5 border-t border-white/10 flex items-start gap-2">
                <svg className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Descriptive reflection only — not a clinical score or diagnosis.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════════════ */}
      <section id="how" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Three calm steps, start to result</h2>
            <p className="text-slate-400 leading-relaxed">
              No login, no pressure. Move at your own pace and stop whenever you like.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/3 border border-white/8 rounded-2xl p-7 hover:border-violet-500/30 transition-colors">
              <Step
                n="1"
                title="A few optional details"
                body="Share your name and contact so we can email your result, plus a handful of optional context questions you're free to skip."
              />
            </div>
            <div className="bg-white/3 border border-white/8 rounded-2xl p-7 hover:border-violet-500/30 transition-colors">
              <Step
                n="2"
                title="Sixteen short prompts"
                body="Each asks how often a statement applies to you, on a simple five-point scale. Most people finish in under three minutes."
              />
            </div>
            <div className="bg-white/3 border border-white/8 rounded-2xl p-7 hover:border-violet-500/30 transition-colors">
              <Step
                n="3"
                title="Your result, explained"
                body="See a gentle, plain-language summary across five dimensions on screen — and a copy lands in your inbox to revisit later."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DIMENSIONS
      ════════════════════════════════════════════════════════════════════ */}
      <section id="dimensions" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">What it looks at</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Five ways we relate to difficult emotions</h2>
            <p className="text-slate-400 leading-relaxed">
              The DERS-16 doesn't label feelings as good or bad. It looks at how you respond to them when you're upset.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Dim icon="🔍" name="Clarity"       desc="How clearly you can name what you're feeling."                  accent="bg-blue-500/10 border-blue-500/20" />
            <Dim icon="🎯" name="Goals"         desc="Staying focused on what matters while upset."                   accent="bg-emerald-500/10 border-emerald-500/20" />
            <Dim icon="⚡" name="Impulse"       desc="Keeping a sense of control over your actions."                  accent="bg-yellow-500/10 border-yellow-500/20" />
            <Dim icon="🤍" name="Nonacceptance" desc="How harshly you judge yourself for feeling."                    accent="bg-rose-500/10 border-rose-500/20" />
            <Dim icon="🧭" name="Strategies"    desc="Believing there are ways to feel better."                       accent="bg-violet-500/10 border-violet-500/20" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRIVACY + DISCLAIMER
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white/3 border border-white/8 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-3">Your privacy</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your responses and contact details are stored securely and used only to deliver and review your result.
                Nothing is shared or sold. You'll be asked for clear consent before you begin.
              </p>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-3">An important note</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                This is a self-reflection screening tool, not a diagnosis, and it's not a substitute for professional assessment.
                If anything here raises concerns, please talk with a qualified mental-health professional.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-28 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[300px] bg-violet-600/15 rounded-full blur-[80px]" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Ready when you are
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Take a few quiet minutes for yourself. There are no right or wrong answers — only honest ones.
            </p>
            <Link
              href="/assessment/start"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-violet-900/50 hover:shadow-violet-800/60 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              Begin the check
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/5">
        {/* Crisis banner */}
        <div className="bg-rose-950/40 border-b border-rose-900/30 py-4">
          <div className="max-w-6xl mx-auto px-6 flex items-start gap-3">
            <svg className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-xs text-rose-300 leading-relaxed">
              If you're in distress or need someone to talk to, you don't have to wait for a result.
              In India, call <strong>Tele-MANAS: 14416</strong> or <strong>1-800-891-4416</strong>, or contact local emergency services.
            </p>
          </div>
        </div>

        {/* Footer bar */}
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xs text-slate-500">Emotion Regulation Self-Check — built on the DERS-16 scale.</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>Not a diagnostic instrument</span>
            <span>·</span>
            <span>No medical advice</span>
            <span>·</span>
            <Link href="/admin" className="hover:text-slate-400 transition-colors">Admin</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
