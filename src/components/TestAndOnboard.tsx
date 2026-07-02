import React, { useState } from "react";
import { 
  BookOpen, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  X,
  CheckCircle2,
  Check,
  Sparkles
} from "lucide-react";

interface TestAndOnboardProps {
  userName: string;
}

interface Lesson {
  type: string;
  title: string;
}

interface Stage {
  name: string;
  rp: string;
  buyer: string;
  line: string;
  obj: string;
  learn: Lesson[];
}

interface DealData {
  label: string;
  score: number;
  good: string[];
  work: string[];
  stages: Stage[];
}

const DEALS_DATA: Record<string, DealData> = {
  saas: {
    label: "SaaS",
    score: 62,
    good: [
      "Strong, research-led cold call openers",
      "Discovery consistently reaches quantified COI",
      "Confident competitive reframe vs Gong"
    ],
    work: [
      "Negotiation: conceded price without a trade",
      "Executive pitch ran long — lost the 7-min window"
    ],
    stages: [
      {
        name: "Cold Call",
        rp: "RP1",
        buyer: "CRO, Series C SaaS",
        line: '"Everything is running smoothly right now — we just renewed our LMS."',
        obj: "Execute a pattern interrupt, handle the brush-off, and book a 15-minute meeting.",
        learn: [
          { type: "PDF", title: "SaaS ICP & Buyer Snapshot" },
          { type: "PDF", title: "Mindtickle Story + Cold Call Framework" }
        ]
      },
      {
        name: "Discovery",
        rp: "RP2",
        buyer: "Head of Enablement",
        line: '"Ramp is just normal — it takes everyone about 6 months."',
        obj: "Move the buyer from a dismissed symptom to a quantified annual dollar loss, then lock a next step.",
        learn: [
          { type: "PDF", title: "SaaS Discovery + COI Framework" }
        ]
      },
      {
        name: "Demo",
        rp: "RP3",
        buyer: "RevOps Lead",
        line: '"Gong gives us call analytics natively — why add Mindtickle?"',
        obj: "Reframe from feature-parity to platform value without bashing the competitor.",
        learn: [
          { type: "PDF", title: "Outcome-Based Demo Basics" },
          { type: "Storyboard", title: "Feature-to-pain mapping" }
        ]
      },
      {
        name: "Exec Pitch",
        rp: "RP4",
        buyer: "VP Sales",
        line: '"I have 10 minutes — actually, make it 7. Why does this matter?"',
        obj: "Compress the whole deal into an economics-only pitch, reusing the COI you built in discovery.",
        learn: [
          { type: "PDF", title: "Economic Buyer Language" }
        ]
      },
      {
        name: "Negotiation",
        rp: "RP5",
        buyer: "Procurement",
        line: '"Seismic came in 25% lower. Match it or we go with them."',
        obj: "Hold pricing integrity — concede only in exchange for equal value.",
        learn: [
          { type: "PDF", title: "Give-to-Get Negotiation & Competition" }
        ]
      },
      {
        name: "Close",
        rp: "RP6",
        buyer: "SDR Team Lead",
        line: '"Our Notion playbooks worked fine — this feels like overkill."',
        obj: "Defend the purchase against end-user skepticism and plant one expansion seed.",
        learn: [
          { type: "PDF", title: "Closing & Kickoff Seed" }
        ]
      }
    ]
  },
  pharma: {
    label: "Pharma",
    score: 48,
    good: [
      "Adapted cold-call hook to pharma launch context",
      "Handled compliance feature gap without over-promising"
    ],
    work: [
      "COI missed the regulatory-risk arm",
      "Did not surface the launch date as a compelling event"
    ],
    stages: [
      {
        name: "Cold Call",
        rp: "RP7",
        buyer: "VP Commercial Training",
        line: '"We use Veeva for everything already."',
        obj: "Adapt your pattern interrupt to pharma language and book the meeting.",
        learn: [
          { type: "PDF", title: "Pharma ICP + Cold Call Adaptation" }
        ]
      },
      {
        name: "Discovery",
        rp: "RP8",
        buyer: "Head of Commercial Excellence",
        line: '"Our field reps manage fine — just a few inconsistencies."',
        obj: "Quantify the compliance-weighted cost of inconsistent field readiness.",
        learn: [
          { type: "PDF", title: "Pharma Discovery + COI" }
        ]
      },
      {
        name: "Demo",
        rp: "RP9",
        buyer: "IT / Compliance Lead",
        line: '"Where is the HIPAA audit trail? Our LMS tracks every interaction."',
        obj: "Address the compliance concern honestly without inventing capability.",
        learn: [
          { type: "PDF", title: "Pharma Demo Basics" }
        ]
      },
      {
        name: "Exec Pitch",
        rp: "RP10",
        buyer: "VP Commercial",
        line: '"Why not status quo? Our compliance record is clean."',
        obj: "Connect the investment to upcoming launch revenue risk and field expansion.",
        learn: [
          { type: "PDF", title: "Pharma Economic Buyer Language" }
        ]
      },
      {
        name: "Negotiation",
        rp: "RP11",
        buyer: "Procurement",
        line: '"You are 20% over cap. Veeva is already integrated."',
        obj: "Defend the premium using compliance and audit-traceability value.",
        learn: [
          { type: "PDF", title: "Pharma Negotiation" }
        ]
      },
      {
        name: "Close",
        rp: "RP12",
        buyer: "Field Rep Lead",
        line: '"Our SharePoint training worked fine for 3 years."',
        obj: "Anchor to the compliance risk and VP sign-off; spot a therapy-area expansion.",
        learn: [
          { type: "PDF", title: "Pharma Closing & Kickoff" }
        ]
      }
    ]
  }
};

export default function TestAndOnboard({ userName }: TestAndOnboardProps) {
  const [curDeal, setCurDeal] = useState<string>("saas");
  const [curStageIdx, setCurStageIdx] = useState<number>(0);

  const [saasScores, setSaasScores] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("mt_saas_scores");
      return saved ? JSON.parse(saved) : [82, 88, 74, 68, 0, 0];
    } catch {
      return [82, 88, 74, 68, 0, 0];
    }
  });

  const [pharmaScores, setPharmaScores] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("mt_pharma_scores");
      return saved ? JSON.parse(saved) : [70, 58, 0, 0, 0, 0];
    } catch {
      return [70, 58, 0, 0, 0, 0];
    }
  });

  const [pitchText, setPitchText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const [phase2Completed, setPhase2Completed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("mt_phase2_completed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleTogglePhase2Item = (id: string) => {
    const next = phase2Completed.includes(id) 
      ? phase2Completed.filter(item => item !== id) 
      : [...phase2Completed, id];
    setPhase2Completed(next);
    try {
      localStorage.setItem("mt_phase2_completed", JSON.stringify(next));
      setTimeout(() => {
        window.dispatchEvent(new Event("mt_phase2_updated"));
        window.dispatchEvent(new Event("mt_telemetry_updated"));
      }, 0);
    } catch {}
  };

  const handleCompleteAllPhase2 = () => {
    const allIds = ["territory-scan", "buying-committee", "product-deep-dive", "crm-sop", "selling-motion"];
    setPhase2Completed(allIds);
    try {
      localStorage.setItem("mt_phase2_completed", JSON.stringify(allIds));
      setTimeout(() => {
        window.dispatchEvent(new Event("mt_phase2_updated"));
        window.dispatchEvent(new Event("mt_telemetry_updated"));
      }, 0);
    } catch {}
  };

  const handleQuickCompletePhase1 = () => {
    if (curDeal === "saas") {
      const completedSaas = [82, 88, 74, 68, 79, 85];
      setSaasScores(completedSaas);
      try {
        localStorage.setItem("mt_saas_scores", JSON.stringify(completedSaas));
      } catch {}
    } else {
      const completedPharma = [70, 58, 80, 84, 76, 82];
      setPharmaScores(completedPharma);
      try {
        localStorage.setItem("mt_pharma_scores", JSON.stringify(completedPharma));
      } catch {}
    }
    setTimeout(() => {
      window.dispatchEvent(new Event("mt_scores_updated"));
      window.dispatchEvent(new Event("mt_telemetry_updated"));
    }, 0);
  };

  const dealData = DEALS_DATA[curDeal];
  const stage = dealData.stages[curStageIdx];

  const curScores = curDeal === "saas" ? saasScores : pharmaScores;

  const handleStageChange = (idx: number) => {
    setCurStageIdx(idx);
    setPitchText("");
    setAnalysisResult(null);
    setApiError(null);
  };

  const handleSwitchDeal = (deal: string) => {
    setCurDeal(deal);
    setCurStageIdx(0);
    setPitchText("");
    setAnalysisResult(null);
    setApiError(null);
  };

  const nextStage = () => {
    if (curStageIdx < dealData.stages.length - 1) {
      setCurStageIdx(prev => prev + 1);
      setPitchText("");
      setAnalysisResult(null);
      setApiError(null);
    }
  };

  const handleSubmitPitch = async () => {
    if (!pitchText.trim()) return;

    setIsAnalyzing(true);
    setApiError(null);

    try {
      const response = await fetch("/api/openai/pitch-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pitch: pitchText,
          personaName: stage.buyer,
          personaTitle: `${stage.rp} · ${stage.name}`
        })
      });

      if (!response.ok) {
        throw new Error("Failed to reach OpenAI coaching service");
      }

      const result = await response.json();
      setAnalysisResult(result);

      const score = result.score || 75;
      
      if (curDeal === "saas") {
        const newScores = [...saasScores];
        newScores[curStageIdx] = score;
        setSaasScores(newScores);
        localStorage.setItem("mt_saas_scores", JSON.stringify(newScores));
      } else {
        const newScores = [...pharmaScores];
        newScores[curStageIdx] = score;
        setPharmaScores(newScores);
        localStorage.setItem("mt_pharma_scores", JSON.stringify(newScores));
      }

      // Force a custom event dispatch to notify live dashboards
      setTimeout(() => {
        window.dispatchEvent(new Event("mt_scores_updated"));
        window.dispatchEvent(new Event("mt_telemetry_updated"));
      }, 0);

    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "An error occurred during OpenAI evaluation. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getDwp = (scores: number[], dealType: string) => {
    const sum = scores.reduce((a, b) => a + b, 0);
    if (dealType === "saas") {
      if (scores[4] > 0 || scores[5] > 0) {
        return Math.min(100, Math.round(sum / 6));
      }
      return 62;
    } else {
      if (scores[2] > 0 || scores[3] > 0 || scores[4] > 0 || scores[5] > 0) {
        return Math.min(100, Math.round(sum / 6));
      }
      return 48;
    }
  };

  const dealScore = getDwp(curScores, curDeal);

  // Avatar background based on deal type
  const avColor = curDeal === "saas" ? "bg-[#FF6B00]" : "bg-[#4F46E5]";

  return (
    <div className="space-y-10 font-sans">
      
      {/* Title block */}
      <div className="text-left max-w-3xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <span className="text-[10px] font-bold tracking-widest text-mt-orange uppercase font-mono block">
            PHASE 01 · REVENUE READINESS SIMULATIONS
          </span>
          {curScores.some(s => s === 0) ? (
            <button
              onClick={handleQuickCompletePhase1}
              className="text-xs font-mono font-bold px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Simulate passing scores for remaining incomplete roleplays to finish Phase 1"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Quick Complete Phase 1 (Simulations)</span>
            </button>
          ) : (
            <div className="px-3 py-1 bg-emerald-100 text-emerald-800 font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Phase 1 ({curDeal === "saas" ? "SaaS" : "Pharma"}) Clear</span>
            </div>
          )}
        </div>
        <h1 className="text-3xl font-black text-mt-navy tracking-tight">Pressure Testing</h1>
        <p className="text-slate-500 text-sm">
          Two full deal simulations — SaaS, then Pharma. Each stage pairs quick just-in-time learning with a live roleplay, so you learn by doing.
        </p>
        <div className="inline-block text-xs font-bold px-3 py-1 bg-mt-orange/5 text-mt-orange rounded-full mt-1 border border-mt-orange/10">
          Buyer behavior drawn from real recorded sales calls via ElevateOS™
        </div>
      </div>

      {/* Guide Bar */}
      <div className="bg-mt-indigo/5 border-l-4 border-mt-indigo rounded-r-xl p-4 flex gap-3 text-sm text-slate-700 max-w-5xl mx-auto shadow-xs">
        <span className="text-lg">🎯</span>
        <div>
          <strong>How this works:</strong> Walk each stage left to right. Read the short prep, run the roleplay, then move on. Your Deal Winning Probability builds as you go — watch it climb (or stall) with each stage.
        </div>
      </div>

      {/* Deal Tabs Selection */}
      <div className="flex justify-start gap-2 max-w-5xl">
        <button 
          onClick={() => handleSwitchDeal("saas")}
          className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
            curDeal === "saas"
              ? "bg-mt-navy text-white border-mt-navy shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          Deal 1 — SaaS
        </button>
        <button 
          onClick={() => handleSwitchDeal("pharma")}
          className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
            curDeal === "pharma"
              ? "bg-mt-navy text-white border-mt-navy shadow-md"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          Deal 2 — Pharma
        </button>
      </div>

      {/* Journey Map */}
      <div className="max-w-5xl">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 md:p-5 shadow-xs">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 items-center">
            {dealData.stages.map((stg, sIdx) => {
              const isActive = curStageIdx === sIdx;
              const isCompleted = sIdx < curStageIdx;
              return (
                <button
                  key={stg.name}
                  onClick={() => handleStageChange(sIdx)}
                  className={`relative p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer group ${
                    isActive 
                      ? "bg-mt-navy text-white border-mt-navy shadow-sm"
                      : isCompleted
                        ? "bg-mt-teal/10 text-mt-teal border-mt-teal/20 hover:bg-mt-teal/20"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono tracking-wider font-bold opacity-75">
                    {stg.rp} {isCompleted && "✓"}
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">{stg.name}</div>
                  
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute bottom-0 inset-x-4 h-[3px] bg-mt-orange rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Panel Details */}
      <div className="max-w-5xl bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
        
        {/* Step Head */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="text-lg font-black text-slate-800 tracking-tight">
            {stage.rp} · {stage.name}
          </h3>
          <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
            {curStageIdx === 5 ? "Final Stage" : "Up next"}
          </span>
        </div>

        {/* Objective Box */}
        <div className="bg-teal-50/70 border border-teal-100 rounded-2xl p-4">
          <span className="text-[10px] font-bold tracking-widest text-teal-800 uppercase font-mono block mb-1">
            Objective of this roleplay
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {stage.obj}
          </p>
        </div>

        {/* Learn Prep Block */}
        <div className="space-y-3">
          <div className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">
            📚 Learn first — just enough to act
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {stage.learn.map((lesson) => (
              <div 
                key={lesson.title} 
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#4F46E5] rounded uppercase shrink-0">
                    {lesson.type}
                  </span>
                  <span className="text-xs font-bold text-slate-700 truncate">{lesson.title}</span>
                </div>
                <span className="text-emerald-600 font-bold text-xs shrink-0">✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="border border-slate-200 rounded-2xl bg-slate-50/40 p-5 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className={`w-8 h-8 rounded-full ${avColor} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
              R
            </div>
            <div>
              <div className="text-xs font-black text-slate-800 uppercase font-mono">
                {stage.rp} · {stage.name} Roleplay
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Buyer: {stage.buyer}
              </div>
            </div>
          </div>

          {/* Buyer speech bubble */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase text-slate-400 font-mono tracking-wider block">
              Buyer Objection
            </span>
            <div className="bg-[#1E1B4B] text-slate-100 rounded-2xl rounded-tl-none p-4 text-xs font-medium leading-relaxed max-w-[85%] shadow-sm">
              {stage.line}
            </div>
          </div>

          {/* Simulation Note */}
          <p className="text-[10.5px] text-slate-400 font-medium leading-relaxed">
            💡 This buyer's objection is drawn from patterns in real recorded {dealData.label} calls. The AI reviewer scores your response live and feeds your Deal Winning Probability.
          </p>

          {/* Dynamic Score Indicator for Completed Stage */}
          {curScores[curStageIdx] > 0 && !analysisResult && !isAnalyzing && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center text-xs text-slate-700 font-semibold animate-fade-in">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <span className="text-base">✓</span>
                <span>Completed score for this stage: <strong className="text-emerald-700">{curScores[curStageIdx]}%</strong></span>
              </span>
              <button
                onClick={() => setPitchText("")}
                className="text-[10px] font-bold text-[#4F46E5] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Retake Roleplay
              </button>
            </div>
          )}

          {/* Interactive Roleplay Area */}
          <div className="space-y-4 pt-3 border-t border-slate-200/60">
            {isAnalyzing ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-8 h-8 border-4 border-mt-orange border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500 font-medium font-mono animate-pulse">
                  ElevateOS™ OpenAI Reviewer is analyzing your pitch...
                </p>
              </div>
            ) : analysisResult ? (
              <div className="space-y-4 animate-fade-in">
                {/* Result Block */}
                <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-4 md:p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100/50 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      <div className="text-xs font-black text-slate-800 uppercase font-mono tracking-wider">
                        Roleplay Evaluation Complete
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-indigo-200 px-3 py-1 rounded-xl shadow-xs">
                      <span className="text-[10px] font-bold text-slate-500 font-mono">YOUR SCORE:</span>
                      <span className={`text-base font-black ${analysisResult.score >= 70 ? 'text-teal-600' : 'text-amber-500'}`}>
                        {analysisResult.score}%
                      </span>
                    </div>
                  </div>

                  {/* Strengths & Gaps */}
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold uppercase text-teal-700 font-mono tracking-wider block">
                        Strengths
                      </span>
                      <ul className="space-y-1">
                        {analysisResult.strengths?.map((s: string, idx: number) => (
                          <li key={idx} className="text-slate-700 flex items-start gap-1.5 font-medium leading-relaxed">
                            <span className="text-teal-600 font-bold">✓</span>
                            <span>{s}</span>
                          </li>
                        )) || <li className="text-slate-400">No strengths logged.</li>}
                      </ul>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold uppercase text-amber-700 font-mono tracking-wider block">
                        Gaps Identified
                      </span>
                      <ul className="space-y-1">
                        {analysisResult.gaps?.map((g: string, idx: number) => (
                          <li key={idx} className="text-slate-700 flex items-start gap-1.5 font-medium leading-relaxed">
                            <span className="text-amber-500 font-bold">→</span>
                            <span>{g}</span>
                          </li>
                        )) || <li className="text-slate-400">No gaps logged.</li>}
                      </ul>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="pt-3 border-t border-indigo-100/50 space-y-1.5">
                    <span className="text-[9px] font-bold uppercase text-indigo-700 font-mono tracking-wider block">
                      AI Coach Recommendation
                    </span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                      {analysisResult.recommendation}
                    </p>
                  </div>
                </div>

                {/* Reset button to retry */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setAnalysisResult(null);
                      setPitchText("");
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    Reset & Try Again
                  </button>

                  {curStageIdx < dealData.stages.length - 1 ? (
                    <button
                      onClick={() => {
                        setAnalysisResult(null);
                        setPitchText("");
                        nextStage();
                      }}
                      className="px-5 py-2.5 bg-mt-indigo hover:bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Proceed to Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                      Simulation complete! Check your updated dashboards.
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-400 font-mono tracking-wider block">
                    Your Response Pitch:
                  </label>
                  <textarea
                    rows={4}
                    value={pitchText}
                    onChange={(e) => setPitchText(e.target.value)}
                    placeholder="Type or paste your response to the buyer objection. Emphasize business outcomes, sales readiness, or revenue metrics..."
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:border-mt-indigo outline-none font-medium leading-relaxed shadow-inner bg-white/50 focus:bg-white transition-all"
                  />
                </div>

                {apiError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700 font-medium">
                    {apiError}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  {curStageIdx > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setCurStageIdx(prev => prev - 1);
                        setPitchText("");
                        setAnalysisResult(null);
                        setApiError(null);
                      }}
                      className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Previous Stage
                    </button>
                  )}
                  <button
                    onClick={handleSubmitPitch}
                    disabled={!pitchText.trim()}
                    className={`px-5 py-2.5 bg-[#1E1B4B] hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm ${
                      !pitchText.trim() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span>Submit Pitch for AI Review</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Deal Probability Meter Card */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-mt-navy text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-mt-indigo/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid md:grid-cols-12 gap-6 items-center">
            
            {/* Probability Score */}
            <div className="md:col-span-4 space-y-1 text-center md:text-left">
              <div className="text-5xl font-black text-mt-orange tracking-tight drop-shadow-md">
                {dealScore}%
              </div>
              <div className="text-xs font-bold text-slate-300">
                Deal Winning Probability — <span className="text-mt-orange font-black uppercase">{dealData.label}</span> deal
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Recalculated in real-time as you clear roleplay gates</p>
            </div>

            {/* Slider bar */}
            <div className="md:col-span-8 space-y-4">
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-mt-orange to-mt-indigo h-full transition-all duration-500"
                  style={{ width: `${dealScore}%` }}
                />
              </div>

              {/* Feedback items list */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-[9px] font-black uppercase text-emerald-400 font-mono tracking-wider block mb-1">
                    What you are doing well
                  </span>
                  <ul className="space-y-1.5">
                    {dealData.good.map((g, idx) => (
                      <li key={idx} className="text-[11px] text-slate-200 flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-[9px] font-black uppercase text-amber-400 font-mono tracking-wider block mb-1">
                    What needs work
                  </span>
                  <ul className="space-y-1.5">
                    {dealData.work.map((w, idx) => (
                      <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-snug">
                        <span className="text-amber-400 font-bold shrink-0">→</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-center text-[10px] text-slate-400 font-mono">
            💡 This score and feedback are assembled by the AI reviewer inside each roleplay — the same engine that scores your live calls later.
          </div>
        </div>
      </div>

      {/* Phase 2: Essentials Section */}
      <div className="max-w-5xl mx-auto border-t border-slate-200 pt-8 mt-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono block">
              PHASE 02 · FOUNDATION ESSENTIALS · 1 Week
            </span>
            <h2 className="text-2xl font-black text-mt-navy tracking-tight mt-1">
              Core Enablement Pillars
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              After your simulations, you complete a short, fixed set of essentials — the same for every AE, no matter how you scored. One week, then you're working accounts.
            </p>
            <div className="inline-block text-xs font-bold px-3 py-1 bg-mt-orange/5 text-mt-orange rounded-full mt-2 border border-mt-orange/10">
              Static · ~4 hrs total · Click any pillar below to mark it complete
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl shrink-0 shadow-xs">
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Phase 2 Status</span>
              <span className="text-sm font-black text-slate-800 font-mono">
                {phase2Completed.length}/5 Pillars Done
              </span>
            </div>
            {phase2Completed.length < 5 ? (
              <button
                onClick={handleCompleteAllPhase2}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                title="Mark all 5 essentials pillars as completed"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Complete All</span>
              </button>
            ) : (
              <div className="px-3.5 py-2 bg-emerald-100 text-emerald-800 font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Phase 2 Clear</span>
              </div>
            )}
          </div>
        </div>

        {/* Essentials Guide Bar */}
        <div className="bg-amber-50/50 border-l-4 border-amber-500 rounded-r-xl p-4 flex gap-3 text-sm text-slate-700 shadow-xs">
          <span className="text-lg">🧱</span>
          <div>
            <strong>Why this is the same for everyone:</strong> These foundations — how Mindtickle's territory, products, tools, and selling motion work — aren't optional and aren't covered by prior experience. What <em>varies</em> by seller is the mastery depth, and that's assigned in Phase 3 based on your simulation output.
          </div>
        </div>

        {/* Essentials Grid Sections */}
        <div className="grid md:grid-cols-3 gap-6 pt-2">
          
          {/* Territory Basics */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider font-mono border-b-2 border-slate-200 pb-2 flex items-center justify-between">
              <span>Territory Basics</span>
              <span className="text-[10px] text-slate-400 font-normal">2 items</span>
            </h4>
            
            <div 
              onClick={() => handleTogglePhase2Item("territory-scan")}
              className={`p-3.5 border rounded-xl flex items-center justify-between gap-3 shadow-xs cursor-pointer transition-all ${
                phase2Completed.includes("territory-scan")
                  ? "bg-emerald-50/70 border-emerald-300 text-slate-900"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black px-2 py-0.5 bg-indigo-50 text-[#4F46E5] rounded uppercase shrink-0 font-mono">
                  LEARN
                </span>
                <span className="text-xs font-bold text-slate-700 leading-snug">
                  Patch Prioritization & Territory Scan
                </span>
              </div>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                phase2Completed.includes("territory-scan")
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-slate-300 bg-slate-50"
              }`}>
                {phase2Completed.includes("territory-scan") && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            <div 
              onClick={() => handleTogglePhase2Item("buying-committee")}
              className={`p-3.5 border rounded-xl flex items-center justify-between gap-3 shadow-xs cursor-pointer transition-all ${
                phase2Completed.includes("buying-committee")
                  ? "bg-emerald-50/70 border-emerald-300 text-slate-900"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black px-2 py-0.5 bg-indigo-50 text-[#4F46E5] rounded uppercase shrink-0 font-mono">
                  LEARN
                </span>
                <span className="text-xs font-bold text-slate-700 leading-snug">
                  Mapping the Buying Committee
                </span>
              </div>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                phase2Completed.includes("buying-committee")
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-slate-300 bg-slate-50"
              }`}>
                {phase2Completed.includes("buying-committee") && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          </div>

          {/* Core Product & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider font-mono border-b-2 border-slate-200 pb-2 flex items-center justify-between">
              <span>Core Product & Tools</span>
              <span className="text-[10px] text-slate-400 font-normal">2 items</span>
            </h4>
            
            <div 
              onClick={() => handleTogglePhase2Item("product-deep-dive")}
              className={`p-3.5 border border-l-4 border-l-pink-500 rounded-xl flex items-center justify-between gap-3 shadow-xs cursor-pointer transition-all ${
                phase2Completed.includes("product-deep-dive")
                  ? "bg-emerald-50/70 border-emerald-300 text-slate-900"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-black px-2 py-0.5 bg-pink-50 text-pink-700 rounded uppercase shrink-0 font-mono">
                  PRODUCT
                </span>
                <span className="text-xs font-bold text-slate-700 leading-snug">
                  MindTickle Product Deep Dive
                </span>
              </div>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                phase2Completed.includes("product-deep-dive")
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-slate-300 bg-slate-50"
              }`}>
                {phase2Completed.includes("product-deep-dive") && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            <div 
              onClick={() => handleTogglePhase2Item("crm-sop")}
              className={`p-3.5 border rounded-xl flex items-center justify-between gap-3 shadow-xs cursor-pointer transition-all ${
                phase2Completed.includes("crm-sop")
                  ? "bg-emerald-50/70 border-emerald-300 text-slate-900"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black px-2 py-0.5 bg-indigo-50 text-[#4F46E5] rounded uppercase shrink-0 font-mono">
                  LEARN
                </span>
                <span className="text-xs font-bold text-slate-700 leading-snug">
                  CRM, Tools & Post-Call SOP
                </span>
              </div>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                phase2Completed.includes("crm-sop")
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-slate-300 bg-slate-50"
              }`}>
                {phase2Completed.includes("crm-sop") && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          </div>

          {/* Selling Motion */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider font-mono border-b-2 border-slate-200 pb-2 flex items-center justify-between">
              <span>Selling Motion</span>
              <span className="text-[10px] text-slate-400 font-normal">1 item</span>
            </h4>
            
            <div 
              onClick={() => handleTogglePhase2Item("selling-motion")}
              className={`p-3.5 border rounded-xl flex items-center justify-between gap-3 shadow-xs cursor-pointer transition-all ${
                phase2Completed.includes("selling-motion")
                  ? "bg-emerald-50/70 border-emerald-300 text-slate-900"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-black px-2 py-0.5 bg-indigo-50 text-[#4F46E5] rounded uppercase shrink-0 font-mono">
                  LEARN
                </span>
                <span className="text-xs font-bold text-slate-700 leading-snug">
                  Core Selling Motion Refresher
                </span>
              </div>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                phase2Completed.includes("selling-motion")
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-slate-300 bg-slate-50"
              }`}>
                {phase2Completed.includes("selling-motion") && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
