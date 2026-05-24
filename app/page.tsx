import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white">

      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 md:py-20">

        {/* ── ABOVE THE FOLD ── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-indigo-200 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Clinically Validated Assessment
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl mb-6 rotate-3">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent leading-tight">
            DERS-16
          </h1>
          <p className="text-lg md:text-xl text-indigo-300 font-light mb-3">
            Difficulties in Emotion Regulation Scale
          </p>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed mb-8">
            16 questions · 5–7 minutes · 6 emotional dimensions. Part of our holistic hiring evaluation.
          </p>

          {/* Above-the-fold CTA */}
          <Link
            href="/assessment/start"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-indigo-900/50 hover:shadow-indigo-800/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
          >
            Begin Assessment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <p className="text-xs text-gray-500 mt-3">Read the tips below first for the most accurate results ↓</p>
        </div>

        {/* ── BEST TIME ── */}
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-3xl p-7 mb-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-amber-200 mb-1">✨ Pick your best time</h2>
          <p className="text-sm text-gray-400 mb-5">
            Your answers are only as good as the headspace you bring. Don't rush — come back when the moment feels right.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌅</span>
                <div>
                  <div className="font-semibold text-white text-sm">Morning person</div>
                  <div className="text-xs text-indigo-300">6 AM – 11 AM</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Fresh mind, minimal noise. Best taken with a quiet coffee before the day takes over.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌙</span>
                <div>
                  <div className="font-semibold text-white text-sm">Evening person</div>
                  <div className="text-xs text-indigo-300">7 PM – 10 PM</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Day's noise has faded. Reflect from a grounded, settled place once things quiet down.
              </p>
            </div>
          </div>

          <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl px-4 py-3 text-xs text-amber-200 leading-relaxed">
            <span className="font-semibold">💡 Golden rule:</span> No universally best time — only <em>your</em> best time. If today feels off, come back tomorrow.
          </div>
        </div>

        {/* ── PREPARATION ── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-7 mb-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-indigo-200 mb-4">🧘 Before you begin</h2>
          <div className="space-y-3">
            {[
              { icon: '😌', title: 'Calm mind first', desc: 'Just had a stressful call or commute? Take a few slow breaths or step outside before starting. A settled mind answers more accurately than a reactive one.' },
              { icon: '📵', title: 'Remove distractions', desc: 'Phone on silent, quiet space. This asks you to look inward — interruptions break that.' },
              { icon: '🎯', title: 'Think in patterns, not moments', desc: 'Answer based on how you generally feel over the past few months, not just right now.' },
              { icon: '💬', title: 'Be honest — there are no wrong answers', desc: 'No response makes you look better or worse. Honest answers make the results meaningful.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-400/20 transition-colors">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{item.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHAT IT MEASURES ── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-7 mb-12 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-purple-200 mb-4">🔬 Six dimensions measured</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { name: 'Awareness',   desc: 'Noticing emotions as they arise',   dot: 'bg-blue-400' },
              { name: 'Clarity',     desc: 'Understanding what you feel',        dot: 'bg-cyan-400' },
              { name: 'Goals',       desc: 'Focus when emotions run high',       dot: 'bg-green-400' },
              { name: 'Impulse',     desc: 'Managing reactive behaviour',        dot: 'bg-yellow-400' },
              { name: 'Strategies',  desc: 'Access to coping tools',             dot: 'bg-orange-400' },
              { name: 'Acceptance',  desc: 'Non-judgement toward feelings',      dot: 'bg-pink-400' },
            ].map((dim) => (
              <div key={dim.name} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dim.dot}`} />
                  <span className="font-semibold text-white text-xs">{dim.name}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-5">Ready? Find your quiet moment and begin.</p>
          <Link
            href="/assessment/start"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-indigo-900/50 hover:shadow-indigo-800/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
          >
            Begin Assessment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link href="/admin" className="text-xs text-gray-600 hover:text-indigo-400 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
