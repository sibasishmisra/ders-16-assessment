'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TOTAL_MIN, TOTAL_MAX, type DersBand } from '@/lib/scoring';

interface SubscaleScore {
  key: string;
  label: string;
  description: string;
  raw: number;
  min: number;
  max: number;
  pctOfMax: number;
  pctOfRange: number;
}

interface AssessmentResult {
  id: string;
  totalScore: number;
  band: DersBand;
  bandDescription: string;
  pctOfRange: number;
  subscales: SubscaleScore[];
  timeTaken: number;
}

const BAND_STYLES: Record<DersBand, { bg: string; text: string; border: string; dot: string }> = {
  'Low':           { bg: 'bg-green-500/20',  text: 'text-green-300',  border: 'border-green-500/30',  dot: 'bg-green-400' },
  'Mild–Moderate': { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-500/30', dot: 'bg-yellow-400' },
  'Elevated':      { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/30', dot: 'bg-orange-400' },
  'High':          { bg: 'bg-red-500/20',    text: 'text-red-300',    border: 'border-red-500/30',    dot: 'bg-red-400' },
};

const SUBSCALE_COLORS: Record<string, string> = {
  clarity:       'from-blue-500 to-blue-600',
  goals:         'from-green-500 to-green-600',
  impulse:       'from-yellow-500 to-yellow-600',
  strategies:    'from-orange-500 to-orange-600',
  nonAcceptance: 'from-pink-500 to-pink-600',
};

export default function CompletePage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [candidateName, setCandidateName] = useState('');

  useEffect(() => {
    const resultData = sessionStorage.getItem('assessmentResult');
    if (!resultData) { router.push('/'); return; }
    const parsed = JSON.parse(resultData);
    // Guard against stale/malformed data from before the scoring fix
    if (!parsed.subscales || !Array.isArray(parsed.subscales) || parsed.totalScore === undefined) {
      sessionStorage.removeItem('assessmentResult');
      router.push('/');
      return;
    }
    setResult(parsed);

    const info = sessionStorage.getItem('candidateInfo');
    if (info) setCandidateName(JSON.parse(info).name?.split(' ')[0] ?? '');
  }, [router]);

  if (!result) return null;

  const band = result.band ?? 'Low';
  const bandStyle = BAND_STYLES[band];

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full mb-5">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {candidateName ? `Well done, ${candidateName}!` : 'Assessment Complete!'}
          </h1>
          <p className="text-indigo-300 mb-4">Thank you for completing the DERS-16 assessment</p>
          <div className="inline-flex items-center gap-2 text-sm text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Completed in {formatTime(result.timeTaken)}
          </div>
        </div>

        {/* ── Total Score ── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-indigo-200 mb-5">Your Score</h2>

          <div className="flex items-center gap-6 mb-6">
            {/* Score dial */}
            <div className="flex-shrink-0 text-center">
              <div className="text-6xl font-bold text-white">{result.totalScore}</div>
              <div className="text-sm text-white/40 mt-1">out of {TOTAL_MAX}</div>
              <div className="text-xs text-white/30 mt-0.5">floor {TOTAL_MIN}</div>
            </div>

            {/* Band badge + bar */}
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold mb-3 ${bandStyle.bg} ${bandStyle.text} ${bandStyle.border}`}>
                <div className={`w-2 h-2 rounded-full ${bandStyle.dot}`} />
                {band}
              </div>
              <p className="text-sm text-gray-400 mb-3">{result.bandDescription}</p>
              {/* Position within 16–80 range */}
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                  style={{ width: `${Math.max(2, result.pctOfRange)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>{TOTAL_MIN} (min)</span>
                <span>{TOTAL_MAX} (max)</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-indigo-200 leading-relaxed">
            <strong>Note:</strong> Higher scores indicate greater difficulty with emotion regulation.
            The DERS-16 is a dimensional measure — scores are most meaningful when compared against
            population norms, not fixed cutoffs.
          </div>
        </div>

        {/* ── Subscale Breakdown ── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-indigo-200 mb-6">Subscale Breakdown</h2>
          <div className="space-y-5">
            {result.subscales.map((s) => (
              <div key={s.key}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-white text-sm">{s.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.description}</div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="text-lg font-bold text-white">{s.raw}</span>
                    <span className="text-xs text-white/30">/{s.max}</span>
                  </div>
                </div>
                {/* Bar shows position within subscale's own min–max range */}
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full bg-gradient-to-r ${SUBSCALE_COLORS[s.key] ?? 'from-indigo-500 to-purple-500'} transition-all duration-700`}
                    style={{ width: `${Math.max(2, s.pctOfRange)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/20 mt-1">
                  <span>{s.min}</span>
                  <span>{s.max}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Next Steps ── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-3">What happens next?</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Your results have been securely saved. Our team will review your assessment
            as part of the evaluation process and will be in touch regarding next steps.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
          >
            Return to Home
          </Link>
        </div>

        {/* Reference ID */}
        <div className="text-center">
          <p className="text-xs text-white/20">
            Reference ID: <span className="font-mono">{result.id}</span>
          </p>
        </div>

      </div>
    </div>
  );
}
