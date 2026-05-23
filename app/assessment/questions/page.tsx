'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions, likertScale } from '@/lib/questions';

export default function QuestionsPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [startTime, setStartTime] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  useEffect(() => {
    // Check if candidate info exists
    const candidateInfo = sessionStorage.getItem('candidateInfo');
    if (!candidateInfo) {
      router.push('/assessment/start');
      return;
    }

    // Set start time
    if (startTime === 0) {
      setStartTime(Date.now());
    }
  }, [router, startTime]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: number) => {
    setSelectedValue(value);
    
    // Small delay for visual feedback
    setTimeout(() => {
      const newResponses = { ...responses, [question.id]: value };
      setResponses(newResponses);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedValue(null);
      } else {
        // Assessment complete
        completeAssessment(newResponses);
      }
    }, 300);
  };

  const completeAssessment = async (finalResponses: Record<number, number>) => {
    const candidateInfo = JSON.parse(sessionStorage.getItem('candidateInfo') || '{}');
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName: candidateInfo.name,
          candidateEmail: candidateInfo.email,
          responses: finalResponses,
          timeTaken,
          startedAt: new Date(startTime).toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('assessmentResult', JSON.stringify(data));
        router.push('/assessment/complete');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedValue(responses[questions[currentQuestion - 1].id] || null);
    }
  };

  if (!question) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto pt-12 pb-8">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-indigo-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {Math.floor((Date.now() - startTime) / 1000 / 60)} min
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed">
                {question.text}
              </h2>
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="ml-4 flex-shrink-0 relative"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {showTooltip && (
                  <div className="absolute right-0 top-10 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-xl z-10">
                    {question.example}
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-900 transform rotate-45" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Likert Scale Options */}
          <div className="space-y-3">
            {likertScale.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 transform hover:scale-102 ${
                  selectedValue === option.value
                    ? 'border-indigo-600 bg-indigo-50 shadow-md'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedValue === option.value
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedValue === option.value && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`font-medium ${
                    selectedValue === option.value ? 'text-indigo-900' : 'text-gray-700'
                  }`}>
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentQuestion === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              ← Back
            </button>
            <span className="text-sm text-gray-500">
              {Object.keys(responses).length} of {questions.length} answered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
