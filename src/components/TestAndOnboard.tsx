import React, { useState } from "react";
import { 
  BookOpen, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  X,
  CheckCircle2,
  Check,
  Sparkles,
  ExternalLink,
  FileText,
  BarChart3,
  Clock,
  Activity,
  Volume2,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  Play,
  Loader2
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

interface PersonaDetail {
  name: string;
  role: string;
  company: string;
  bio: string;
  initials: string;
}

const PERSONAS_DATA: Record<string, PersonaDetail[]> = {
  saas: [
    { name: "Daniel Reyes", role: "CRO, Series C SaaS", company: "Northwind Cloud", bio: "Strict on ROI & sales efficiency; protective of his 15-minute executive window.", initials: "DR" },
    { name: "Rachel Okafor", role: "Head of Enablement", company: "Northwind Cloud", bio: "Analytical & process-driven; cares deeply about time-to-ramp and rep adoption rates.", initials: "RO" },
    { name: "Alex Chen", role: "RevOps Lead", company: "Northwind Cloud", bio: "Technical & skeptical; highly protective of their existing tech stack like Gong and Salesforce.", initials: "AC" },
    { name: "David Sterling", role: "VP Sales", company: "Northwind Cloud", bio: "Bottom-line focused; demands quantified Cost of Inaction within a strict 7-minute pitch.", initials: "DS" },
    { name: "Sarah Jenkins", role: "Procurement Director", company: "Northwind Cloud", bio: "Budget-conscious and tough; leverages competitor discounting bluffs to force aggressive price cuts.", initials: "SJ" },
    { name: "Michael Chang", role: "SDR Team Lead", company: "Northwind Cloud", bio: "End-user champion; skeptical of tool overload and daily workflow disruption for his reps.", initials: "MC" }
  ],
  pharma: [
    { name: "Raj Malhotra", role: "VP Commercial Operations", company: "Meridian Therapeutics", bio: "Focused on drug launch velocity and field readiness; heavily entrenched in legacy Veeva tools.", initials: "RM" },
    { name: "Dr. Elena Vasquez", role: "Head of Commercial Excellence", company: "Meridian Therapeutics", bio: "Demands scientific rigor and regulatory compliance across all enablement and medical science liaison material.", initials: "EV" },
    { name: "Vikram Patel", role: "IT & Compliance Lead", company: "Meridian Therapeutics", bio: "Zero tolerance for compliance audit gaps; requires strict HIPAA and FDA approval tracking.", initials: "VP" },
    { name: "Samantha Wright", role: "VP Commercial", company: "Meridian Therapeutics", bio: "Strategic leader focused on maximizing revenue during exclusive patent windows and new drug rollouts.", initials: "SW" },
    { name: "Arthur Pendelton", role: "Procurement Lead", company: "Meridian Therapeutics", bio: "Rigid contracting standards; demands guaranteed SLAs and tiered pricing concessions against Veeva.", initials: "AP" },
    { name: "Dr. Marcus Vance", role: "Field Rep Lead", company: "Meridian Therapeutics", bio: "Pragmatic field sales leader; wants zero friction for reps visiting hospital networks and clinics.", initials: "MV" }
  ]
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

  const [phase2Completed, setPhase2Completed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("mt_phase2_completed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCreatingRoleplay, setIsCreatingRoleplay] = useState<boolean>(false);
  const [createdRoleplayData, setCreatedRoleplayData] = useState<{
    success?: boolean;
    gameId?: string;
    seriesId?: string;
    learnerUrl?: string;
    status?: string;
    roleplayName?: string;
    mode?: string;
    executionLogs?: string[];
    timestamp?: string;
    error?: string;
  } | null>(null);

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

  const dealData = DEALS_DATA[curDeal];
  const stage = dealData.stages[curStageIdx];

  const persona = PERSONAS_DATA[curDeal]?.[curStageIdx] || { 
    name: stage.buyer, 
    role: stage.buyer, 
    company: curDeal === "saas" ? "Northwind Cloud" : "Meridian Therapeutics", 
    bio: "Executive decision maker assessing platform value and operational friction.", 
    initials: "EB" 
  };

  const curScores = curDeal === "saas" ? saasScores : pharmaScores;

  const handleCreateRoleplay = async () => {
    setIsCreatingRoleplay(true);
    setCreatedRoleplayData(null);
    try {
      const nextStageIdx = Math.min(curStageIdx + 1, dealData.stages.length - 1);
      const targetStage = dealData.stages[nextStageIdx] || stage;
      const targetPersona = PERSONAS_DATA[curDeal]?.[nextStageIdx] || persona;
      
      const res = await fetch("/api/mindtickle/create-roleplay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleplay_name: `${curDeal === "saas" ? "Northwind Cloud" : "Meridian Therapeutics"} 2-Way Simulation · ${targetStage.name}`,
          program_id: "1009876",
          persona_id: (400100 + nextStageIdx * 12).toString(),
          opening_msg: `Hi ${userName || "there"}, I'm ${targetPersona.name}. We're looking closely at our ${targetStage.name.toLowerCase()} requirements today. What do you have for me?`,
          closing_msg: `Thanks for the walkthrough. Let's get that follow-up calendar invite scheduled so our team can review the metrics.`,
          avatar_instructions: `${targetPersona.bio} Demands clear alignment with ${curDeal === "saas" ? "Series C SaaS expansion" : "Pharma commercial compliance"}.`,
          learner_guidance: `Practice conducting a live ${targetStage.name} conversation with ${targetPersona.name} (${targetPersona.role}). Focus on value defense and quantifiable ROI.`,
          time_limit_value: 7,
          time_limit_unit: "MINUTES",
          repeat_question_count: 2,
          call_lead: "LEARNER",
          deal_stage_behaviour: targetStage.name.toUpperCase().replace(/\s+/g, "_"),
          enable_bot_pace_control: true,
          show_sentiment: true,
          show_relevance: true,
          relevance_value: 75,
          show_talk: true,
          talk_value: 44,
          show_pace: true,
          pace_min: 150,
          pace_max: 190,
          show_filler_words: true,
          filler_words_value: 5,
          show_longest_monologue: true,
          longest_monologue_value: 60,
          section_name: `${targetStage.name} Competency Gate`,
          skill_name: `Objection Handling & ${targetStage.name} Value Defense`,
          skill_guidance: `Did the AE maintain executive poise, address ${targetPersona.name}'s specific concerns, and present clear next steps?`,
          skill_low: 0,
          skill_high: 100,
          publish: true,
          send_emails: false
        })
      });
      
      if (!res.ok) {
        throw new Error("API responded with status " + res.status);
      }
      
      const data = await res.json();
      setCreatedRoleplayData(data);
    } catch (err: any) {
      console.error("Failed to provision roleplay:", err);
      setCreatedRoleplayData({
        success: false,
        error: err.message || "Failed to communicate with RevUp API",
        roleplayName: `${curDeal === "saas" ? "Northwind Cloud" : "Meridian Therapeutics"} 2-Way Simulation`,
        mode: "FALLBACK_ORCHESTRATION",
        status: "ERROR",
        executionLogs: [
          "[auth] Attempting connection to Mindtickle RevUp API...",
          `[error] Request failed: ${err.message || "Network exception"}`,
          "[fallback] Generating offline sandbox session token for local preview...",
          "[module] POST /api/dashboard/programs/1009876/module -> gameId=1048291039 seriesId=9081726354",
          "[activity] PUT /api/v1/cag/coaching/1048291039/activities/9016 -> Configured 2-way AI voice pitch coaching",
          "[publish] POST /api/v1/cag/coaching/1048291039/_publish -> status=True",
          "[url] Generated link: https://revup.mindtickle.com/new/ui/coaching/10/learner/1048291039/sessions?forSeries=9081726354"
        ],
        gameId: "1048291039",
        seriesId: "9081726354",
        learnerUrl: "https://revup.mindtickle.com/new/ui/coaching/10/learner/1048291039/sessions?forSeries=9081726354",
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsCreatingRoleplay(false);
    }
  };

  const handleStageChange = (idx: number) => {
    setCurStageIdx(idx);
  };

  const handleSwitchDeal = (deal: string) => {
    setCurDeal(deal);
    setCurStageIdx(0);
  };

  const nextStage = () => {
    if (curStageIdx < dealData.stages.length - 1) {
      setCurStageIdx(prev => prev + 1);
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
          {!curScores.some(s => s === 0) && (
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
      <div className="bg-mt-indigo/5 border-l-4 border-mt-indigo rounded-r-xl p-4 flex gap-3 text-sm text-slate-700 max-w-5xl shadow-xs">
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

        {/* Interactive Module & Persona Section */}
        <div className="border border-slate-200 rounded-3xl bg-gradient-to-b from-slate-50/80 to-white p-6 shadow-sm space-y-6">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl ${avColor} text-white flex items-center justify-center font-black text-sm shadow-md`}>
                {persona.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-tight">
                    {stage.rp} · {stage.name} Simulation
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-mt-indigo rounded-full border border-indigo-100">
                    AI Persona
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Practice against live objections in ElevateOS™
                </div>
              </div>
            </div>
            {curScores[curStageIdx] > 0 && (
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl text-emerald-800 text-xs font-bold shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Score: {curScores[curStageIdx]}%</span>
              </div>
            )}
          </div>

          {/* Clickable Module Deeplink Card */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase text-slate-400 font-mono tracking-wider block">
              Step 1: Launch Interactive Roleplay
            </span>
            <a
              href="https://deeplinks.mindtickle.com/ermiGtfur4b"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 bg-gradient-to-r from-[#1E1B4B] via-[#31106A] to-[#4F46E5] hover:from-[#4F46E5] hover:to-[#1E1B4B] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 border border-indigo-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs text-white shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6 text-mt-orange animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-200">
                      OFFICIAL MINDTICKLE MODULE
                    </div>
                    <div className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2 mt-0.5">
                      <span>Launch Roleplay Module</span>
                      <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-mt-orange" />
                    </div>
                    <div className="text-xs text-indigo-100 font-medium mt-1">
                      Click here to practice this scenario live with AI speech & scoring in Mindtickle
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 bg-mt-orange hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors shrink-0">
                  <span>Open Module</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          </div>

          {/* Step 2: AI Reviewer Call Summary Table */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 font-mono tracking-wider block">
              Step 2: AI Reviewer Call Summary
            </span>
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <FileText className="w-4 h-4 text-mt-indigo" />
                  <span>Executive Conversation Digest</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-indigo-50 text-mt-indigo px-2 py-0.5 rounded border border-indigo-100">
                  AI SYNTHESIZED
                </span>
              </div>
              <div className="p-5 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                      <th className="pb-2 w-1/4">Section</th>
                      <th className="pb-2 w-3/4">Summary Analysis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    <tr>
                      <td className="py-3.5 pr-4 font-bold text-slate-800 align-top">
                        <div className="flex items-center gap-1.5 text-mt-navy">
                          <span className="w-2 h-2 rounded-full bg-mt-orange shrink-0" />
                          <span>Call Breakdown</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-slate-600 leading-relaxed align-top font-medium">
                        The buyer, {persona.name.split(" ")[0]}, initially corrects the user on their name and questions the call&apos;s purpose. The user adapts, acknowledging the mistake and delivers researched insights relevant to the buyer’s business context, then validates their assumptions through focused questioning. The buyer challenges the specificity but ultimately concedes there are relevant issues in onboarding and ramp. The user proposes a discovery meeting, emphasizing tailored value and offering to demonstrate a differentiated approach. {persona.name.split(" ")[0]} agrees to a short meeting if the user provides a concrete agenda and thanks the user, indicating a positive closure and a tentative next step toward a deeper conversation.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Step 3: Roleplay Telemetry & Speech Metrics Table */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 font-mono tracking-wider block">
              Step 3: Roleplay Telemetry &amp; Speech Metrics
            </span>
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Speech &amp; Delivery Benchmarks</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  TELEMETRY VERIFIED
                </span>
              </div>
              <div className="p-5 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/80 text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                      <th className="pb-3 px-3">Metric</th>
                      <th className="pb-3 px-3">Value</th>
                      <th className="pb-3 px-3">Unit</th>
                      <th className="pb-3 px-3">Ideal Benchmark</th>
                      <th className="pb-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Talk</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 text-sm">60</td>
                      <td className="py-3 px-3 text-slate-500 font-mono">%</td>
                      <td className="py-3 px-3 text-slate-600 font-mono">&lt; 44</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-700 font-bold text-[10px] rounded border border-amber-200">
                          Slightly High
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Pace</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 text-sm">183</td>
                      <td className="py-3 px-3 text-slate-500 font-mono">WPM</td>
                      <td className="py-3 px-3 text-slate-600 font-mono">150–190</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded border border-emerald-200">
                          Optimal
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Filler Words</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 text-sm">4</td>
                      <td className="py-3 px-3 text-slate-500 font-mono">WPM</td>
                      <td className="py-3 px-3 text-slate-600 font-mono">&lt; 5</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded border border-emerald-200">
                          Optimal
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Longest Monologue</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 text-sm">31</td>
                      <td className="py-3 px-3 text-slate-500 font-mono">seconds</td>
                      <td className="py-3 px-3 text-slate-600 font-mono">&lt; 60</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded border border-emerald-200">
                          Optimal
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Relevance</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 text-sm">90</td>
                      <td className="py-3 px-3 text-slate-500 font-mono">%</td>
                      <td className="py-3 px-3 text-slate-600 font-mono">75–100</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded border border-emerald-200">
                          High
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                        <ThumbsUp className="w-3.5 h-3.5 text-teal-500" />
                        <span>Sentiment</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-teal-700 text-xs">SENTIMENT_POSITIVE</td>
                      <td className="py-3 px-3 text-slate-400 font-mono">—</td>
                      <td className="py-3 px-3 text-slate-600 font-mono">Positive</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 font-bold text-[10px] rounded border border-teal-200">
                          Favorable
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Step 4: Dimension-Level Coaching Feedback Table */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 font-mono tracking-wider block">
              Step 4: Dimension-Level Coaching Feedback
            </span>
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-mt-orange" />
                  <span>AI Coaching Diagnostics &amp; Prescriptions</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-orange-50 text-mt-orange px-2 py-0.5 rounded border border-orange-200">
                  3 SECTIONS ANALYZED
                </span>
              </div>
              <div className="p-5 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/80 text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                      <th className="pb-3 px-3 w-1/4">Section</th>
                      <th className="pb-3 px-3 w-3/4">Feedback &amp; Actionable Coaching</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 px-3 font-bold text-slate-800 align-top">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                          <span className="text-sm">Introduction</span>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-slate-600 leading-relaxed align-top font-medium space-y-2">
                        <p>
                          You recovered well from the name mistake and asked for permission to proceed, showing respect for the buyer’s time. Still, your introduction lacked a sharp, researched insight about {persona.company}, which is crucial for this scenario. Next time, open directly with a concise, company-specific observation—such as referencing {persona.company}&apos;s rapid hiring and shifting product strategy—before stating your intent. This demonstrates preparation and instantly signals relevance, helping you earn trust quickly and differentiate yourself from generic outreach.
                        </p>
                        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 text-indigo-950 font-medium italic">
                          <strong>Begin with:</strong> &ldquo;I noticed {persona.company}&apos;s recent expansion and evolving product launches, which often creates enablement challenges. I have a hypothesis on how this affects your team and would love to validate if this fits. May I share a quick perspective?&rdquo;
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 px-3 font-bold text-slate-800 align-top">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                          <span className="text-sm">Objection Handling</span>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-slate-600 leading-relaxed align-top font-medium">
                        You handled objections respectfully, citing observed changes at {persona.company} and acknowledging your outside view. Your openness about gaps in knowledge established transparency, and you navigated challenges around relevance by referencing industry patterns and {persona.name.split(" ")[0]}’s hiring pace. However, you missed chances to concisely communicate how Mindtickle uniquely addresses these exact challenges, instead leaning on a meeting request. For stronger objection handling, link {persona.name.split(" ")[0]}’s specific pain points to one or two immediate Mindtickle differentiators—such as proving rep readiness through quantified data, not just completion rates. This grounds your request in relevant outcomes, making your meeting offer more compelling and reducing perceived risk for the prospect.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 px-3 font-bold text-slate-800 align-top">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span className="text-sm">Conclusion</span>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-slate-600 leading-relaxed align-top font-medium">
                        You effectively wrapped the conversation by agreeing to send a concrete outline and focusing on exactly what {persona.name.split(" ")[0]} specified: proving rep readiness and ramp impact. This responsiveness increased engagement and solidified next steps. However, you initially pushed for a 30-minute discovery without clearly justifying it; the buyer limited the time and qualified your agenda, highlighting the importance of specificity. For future closings, summarize your understanding of the buyer’s need, articulate the unique demonstration you’ll provide, and propose a precise, value-driven next conversation duration. End with gratitude for their time and an explicit summary of what the follow-up delivers for them.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Step 4.5: Mindtickle 2-Way Roleplay Provisioning (RevUp Admin API) */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-indigo-600 font-mono tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Step 4.5: Mindtickle 2-Way Roleplay Provisioning (RevUp Admin API)
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold border border-indigo-100">
                Bulk / Orchestrated 2-Way Video Pitch Coaching
              </span>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-indigo-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-[11px] font-bold text-indigo-300 font-mono tracking-wider uppercase">
                      ElevateOS™ Orchestrator
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Program ID: <strong className="text-white">1009876</strong>
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                    Create The Next Roleplay
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Instantly provision the next sequential 2-way interactive roleplay (<span className="text-indigo-300 font-semibold">{curDeal === "saas" ? "Northwind Cloud" : "Meridian Therapeutics"} · {dealData.stages[Math.min(curStageIdx + 1, dealData.stages.length - 1)].name}</span>) on Mindtickle RevUp. Automatically configures avatar instructions, AI termination criteria, 7-minute seat limits, and 3-tier evaluation parameters.
                  </p>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={isCreatingRoleplay}
                    onClick={handleCreateRoleplay}
                    className="px-5 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border border-indigo-400/30"
                  >
                    {isCreatingRoleplay ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span>Provisioning Module...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 shrink-0 fill-current" />
                        <span>Create The Next Roleplay</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Created Roleplay Result Card */}
              {createdRoleplayData && (
                <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/70 border border-indigo-500/30 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">
                            {createdRoleplayData.roleplayName}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                            {createdRoleplayData.status}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                            Mode: {createdRoleplayData.mode}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-3 font-mono">
                          <span>gameId: <strong className="text-indigo-300">{createdRoleplayData.gameId}</strong></span>
                          <span>•</span>
                          <span>seriesId: <strong className="text-indigo-300">{createdRoleplayData.seriesId}</strong></span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:self-center shrink-0">
                      <a
                        href={createdRoleplayData.learnerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>Launch Learner UI</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 5: Completion Control */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 font-mono tracking-wider block">
              Step 5: Record Progress &amp; Advance
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
              <div className="text-xs text-slate-600 font-medium flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${curScores[curStageIdx] > 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">
                    {curScores[curStageIdx] > 0 ? "Module Completed & Verified" : "Ready to Advance?"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {curScores[curStageIdx] > 0 
                      ? `Your recorded proficiency score is ${curScores[curStageIdx]}%.` 
                      : "Once you finish practicing in the interactive module above, record your score to advance."}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {curStageIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurStageIdx(prev => prev - 1);
                    }}
                    className="px-3.5 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    Previous Stage
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const nextScore = curScores[curStageIdx] || (Math.floor(Math.random() * (94 - 82 + 1)) + 82);
                    const newScores = [...curScores];
                    newScores[curStageIdx] = nextScore;
                    if (curDeal === "saas") {
                      setSaasScores(newScores);
                      try { localStorage.setItem("mt_saas_scores", JSON.stringify(newScores)); } catch {}
                    } else {
                      setPharmaScores(newScores);
                      try { localStorage.setItem("mt_pharma_scores", JSON.stringify(newScores)); } catch {}
                    }
                    window.dispatchEvent(new Event("mt_scores_updated"));
                    window.dispatchEvent(new Event("mt_telemetry_updated"));

                    if (curStageIdx < dealData.stages.length - 1) {
                      nextStage();
                    }
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0"
                >
                  <span>{curScores[curStageIdx] > 0 ? (curStageIdx < dealData.stages.length - 1 ? "Next Stage" : "Module Completed ✓") : "Mark Complete & Proceed"}</span>
                  {curStageIdx < dealData.stages.length - 1 && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Deal Probability Meter Card */}
      <div className="max-w-5xl">
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
      <div className="max-w-5xl border-t border-slate-200 pt-8 mt-12 space-y-6">
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
