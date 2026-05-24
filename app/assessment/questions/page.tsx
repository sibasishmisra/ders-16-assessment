'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { questions, likertScale } from '@/lib/questions';

// ---------------------------------------------------------------------------
// Tiny confetti helper — no external dependency needed
// ---------------------------------------------------------------------------
function ConfettiCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: 8 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      vy: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 2,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (frame < 180) rafRef.current = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

// ---------------------------------------------------------------------------
// Milestone toast
// ---------------------------------------------------------------------------
function MilestoneToast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium">
        <span className="text-lg">🎉</span>
        {message}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function QuestionsPage() {
  const router = useRouter();
  const [candidateName, setCandidateName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [startTime, setStartTime] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneMsg, setMilestoneMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [submitError, setSubmitError] = useState(false);

  // Tick the elapsed timer every 30 s (just for display)
  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem('candidateInfo');
    if (!raw) { router.push('/assessment/start'); return; }
    const info = JSON.parse(raw);
    // Grab first name only for a friendlier feel
    setCandidateName(info.name?.split(' ')[0] ?? info.name ?? '');
    if (startTime === 0) setStartTime(Date.now());
  }, [router, startTime]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  // Replace {name} placeholder in nudge
  const nudge = question.nudge.replace('{name}', candidateName);

  const triggerMilestone = (msg: string) => {
    setMilestoneMsg(msg);
    setShowMilestone(true);
    setTimeout(() => setShowMilestone(false), 3500);
  };

  const handleAnswer = (value: number) => {
    setSelectedValue(value);

    setTimeout(() => {
      const newResponses = { ...responses, [question.id]: value };
      setResponses(newResponses);

      const answeredCount = Object.keys(newResponses).length;

      if (currentQuestion < questions.length - 1) {
        // Halfway milestone — fires exactly when Q8 is answered
        if (answeredCount === 8) {
          triggerMilestone(`Halfway there, ${candidateName}! You're doing brilliantly 🚀`);
        }
        setCurrentQuestion(currentQuestion + 1);
        setSelectedValue(null);
      } else {
        // Final question answered — confetti then submit
        setShowConfetti(true);
        triggerMilestone(`All done, ${candidateName}! Submitting your results…`);
        setTimeout(() => completeAssessment(newResponses), 1800);
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
        // Guard: only navigate if the response contains the expected shape
        if (data.subscales && data.totalScore !== undefined) {
          sessionStorage.setItem('assessmentResult', JSON.stringify(data));
          router.push('/assessment/complete');
        } else {
          console.error('Unexpected response shape:', data);
          setSubmitError(true);
        }
      } else {
        const err = await response.json().catch(() => ({}));
        console.error('Submission failed:', err);
        setSubmitError(true);
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setSubmitError(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedValue(responses[questions[currentQuestion - 1].id] ?? null);
    }
  };

  if (!question || !candidateName) return null;

  if (submitError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center p-4">
        <div className="bg-white/5 border border-red-500/30 rounded-3xl p-10 text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">Submission failed</h2>
          <p className="text-gray-400 text-sm mb-6">Something went wrong saving your responses. Please try again.</p>
          <button
            onClick={() => { setSubmitError(false); setShowConfetti(false); }}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const elapsedMin = Math.floor((Date.now() - startTime) / 1000 / 60);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-4">

      <ConfettiCanvas active={showConfetti} />
      <MilestoneToast message={milestoneMsg} visible={showMilestone} />

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/10 z-40">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto pt-10 pb-10">

        {/* Header row */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-sm font-medium text-indigo-300">
            Question {currentQuestion + 1} <span className="text-white/30">/ {questions.length}</span>
          </span>
          <div className="flex items-center gap-4">
            {/* 50% badge */}
            {currentQuestion >= 8 && (
              <span className="text-xs bg-green-500/20 text-green-300 border border-green-500/30 rounded-full px-3 py-1 font-medium">
                ✓ 50%+ done
              </span>
            )}
            <div className="flex items-center text-sm text-white/40">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {elapsedMin} min
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">

          {/* Nudge banner */}
          <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-b border-white/10 px-6 py-3">
            <p className="text-sm text-indigo-200 leading-relaxed italic">
              {nudge}
            </p>
          </div>

          {/* Question body */}
          <div className="p-7 md:p-10">
            <div className="flex items-start justify-between gap-4 mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                {question.text}
              </h2>

              {/* Tooltip trigger */}
              <div className="relative flex-shrink-0">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                  aria-label="Show example"
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                {showTooltip && (
                  <div className="absolute right-0 top-10 w-72 bg-gray-900 border border-white/10 text-gray-200 text-xs rounded-2xl p-4 shadow-2xl z-20 leading-relaxed">
                    <p className="font-semibold text-indigo-300 mb-1">💡 What this means</p>
                    {question.example}
                    <div className="absolute -top-2 right-3 w-4 h-4 bg-gray-900 border-l border-t border-white/10 transform rotate-45" />
                  </div>
                )}
              </div>
            </div>

            {/* Likert options */}
            <div className="space-y-2.5">
              {likertScale.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                    selectedValue === option.value
                      ? 'border-indigo-500 bg-indigo-500/20 shadow-lg shadow-indigo-900/30'
                      : 'border-white/10 hover:border-indigo-400/50 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                      selectedValue === option.value
                        ? 'border-indigo-400 bg-indigo-500'
                        : 'border-white/30'
                    }`}>
                      {selectedValue === option.value && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      selectedValue === option.value ? 'text-white' : 'text-gray-300'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer nav */}
          <div className="border-t border-white/10 px-7 py-4 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentQuestion === 0
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-indigo-300 hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {/* Mini progress dots */}
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i < currentQuestion
                      ? 'w-2 h-2 bg-indigo-400'
                      : i === currentQuestion
                      ? 'w-4 h-2 bg-purple-400'
                      : 'w-2 h-2 bg-white/15'
                  }`}
                />
              ))}
            </div>

            <span className="text-xs text-white/30">
              {Object.keys(responses).length}/{questions.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
