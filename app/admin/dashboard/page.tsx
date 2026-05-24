'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import type { DersBand } from '@/lib/scoring';

interface Assessment {
  id: string;
  candidateName: string;
  candidateEmail: string;
  totalScore: number;
  clarityScore: number;
  goalsScore: number;
  impulseScore: number;
  strategiesScore: number;
  nonAcceptanceScore: number;
  band: DersBand;
  timeTaken: number;
  completedAt: string;
}

const BAND_PILL: Record<string, string> = {
  'Low':           'text-green-700  bg-green-50  border border-green-200',
  'Mild–Moderate': 'text-yellow-700 bg-yellow-50 border border-yellow-200',
  'Elevated':      'text-orange-700 bg-orange-50 border border-orange-200',
  'High':          'text-red-700    bg-red-50    border border-red-200',
};

export default function AdminDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin');
    else if (status === 'authenticated') fetchAssessments();
  }, [status, router]);

  const fetchAssessments = async () => {
    try {
      const res = await fetch('/api/admin/assessments');
      if (res.ok) setAssessments(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = assessments
    .filter(a =>
      a.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === 'date'
        ? new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        : b.totalScore - a.totalScore
    );

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Total (16–80)', 'Band', 'Clarity (/10)', 'Goals (/15)', 'Impulse (/15)', 'Strategies (/25)', 'Non-Acceptance (/15)', 'Time', 'Completed'];
    const rows = filtered.map(a => [
      `"${a.candidateName}"`, `"${a.candidateEmail}"`,
      a.totalScore, a.band,
      a.clarityScore, a.goalsScore, a.impulseScore, a.strategiesScore, a.nonAcceptanceScore,
      fmt(a.timeTaken), `"${fmtDate(a.completedAt)}"`,
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const el = document.createElement('a');
    el.href = url; el.download = `ders16-${new Date().toISOString().split('T')[0]}.csv`;
    el.click(); URL.revokeObjectURL(url);
  };

  // Stats — band thresholds anchored to 16–80 range
  const avgScore = assessments.length
    ? Math.round(assessments.reduce((s, a) => s + a.totalScore, 0) / assessments.length)
    : 0;
  const elevated = assessments.filter(a => a.totalScore >= 48).length;

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">DERS-16 Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              5 subscales · Total range 16–80 · No reverse scoring
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Assessments', value: assessments.length, icon: '👥', color: 'bg-indigo-50 text-indigo-600' },
            { label: 'Avg Score (16–80)', value: avgScore || '—', icon: '📊', color: 'bg-blue-50 text-blue-600' },
            { label: 'Elevated or High', value: elevated, icon: '⚠️', color: 'bg-orange-50 text-orange-600' },
            { label: 'Avg Time', value: assessments.length ? fmt(Math.round(assessments.reduce((s, a) => s + a.timeTaken, 0) / assessments.length)) : '—', icon: '⏱️', color: 'bg-purple-50 text-purple-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-5">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-5 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'date' | 'score')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="date">Sort: Date</option>
              <option value="score">Sort: Score</option>
            </select>
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Score / Band</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscales</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">
                      No assessments found
                    </td>
                  </tr>
                ) : filtered.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-sm font-medium text-gray-900">{a.candidateName}</div>
                      <div className="text-xs text-gray-400">{a.candidateEmail}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-xl font-bold text-gray-900 mb-1">{a.totalScore}<span className="text-xs font-normal text-gray-400">/80</span></div>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${BAND_PILL[a.band] ?? ''}`}>
                        {a.band}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs">
                        {[
                          ['Clarity',        a.clarityScore,       10],
                          ['Goals',          a.goalsScore,         15],
                          ['Impulse',        a.impulseScore,       15],
                          ['Strategies',     a.strategiesScore,    25],
                          ['Non-Acceptance', a.nonAcceptanceScore, 15],
                        ].map(([name, score, max]) => (
                          <div key={String(name)} className="flex justify-between gap-2">
                            <span className="text-gray-500">{name}</span>
                            <span className="font-medium text-gray-700">{score}<span className="text-gray-400">/{max}</span></span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{fmt(a.timeTaken)}</td>
                    <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{fmtDate(a.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
