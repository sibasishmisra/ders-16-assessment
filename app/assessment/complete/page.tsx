'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AssessmentResult {
  id: string;
  totalScore: number;
  awarenessScore: number;
  clarityScore: number;
  goalsScore: number;
  impulseScore: number;
  strategiesScore: number;
  nonAcceptanceScore: number;
  timeTaken: number;
  interpretation: string;
}

export default function CompletePage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const resultData = sessionStorage.getItem('assessmentResult');
    if (!resultData) {
      router.push('/');
      return;
    }
    setResult(JSON.parse(resultData));
  }, [router]);

  if (!result) return null;

  const subscales = [
    { name: 'Awareness', score: result.awarenessScore, max: 10, description: 'Attention to emotions' },
    { name: 'Clarity', score: result.clarityScore, max: 5, description: 'Understanding emotions' },
    { name: 'Goals', score: result.goalsScore, max: 20, description: 'Difficulty pursuing goals' },
    { name: 'Impulse', score: result.impulseScore, max: 15, description: 'Impulse control' },
    { name: 'Strategies', score: result.strategiesScore, max: 20, description: 'Access to strategies' },
    { name: 'Non-Acceptance', score: result.nonAcceptanceScore, max: 15, description: 'Emotional acceptance' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Assessment Complete!
          </h1>
          <p className="text-gray-600">
            Thank you for completing the DERS-16 assessment
          </p>
          <div className="mt-4 inline-flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Completed in {formatTime(result.timeTaken)}
          </div>
        </div>

        {/* Total Score */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Results</h2>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Total Score</p>
                <p className="text-5xl font-bold">{result.totalScore}</p>
                <p className="text-indigo-100 text-sm mt-1">out of 80</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <p className="text-sm font-medium">{result.interpretation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Higher scores indicate greater difficulty with emotion regulation. 
              This assessment is used as part of our hiring evaluation process to understand emotional 
              competencies in workplace contexts.
            </p>
          </div>
        </div>

        {/* Subscale Scores */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscale Breakdown</h2>
          <div className="space-y-6">
            {subscales.map((subscale, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{subscale.name}</h3>
                    <p className="text-sm text-gray-500">{subscale.description}</p>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">
                    {subscale.score}/{subscale.max}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(subscale.score / subscale.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h2>
          <p className="text-gray-600 mb-6">
            Your results have been securely saved. Our team will review your assessment 
            as part of the hiring process. You will be contacted regarding next steps.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Return to Home
          </Link>
        </div>

        {/* Reference ID */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Reference ID: <span className="font-mono font-medium">{result.id}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
