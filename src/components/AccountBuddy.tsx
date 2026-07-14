import React, { useState } from "react";
import { 
  Users2, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  Play, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileText,
  BookmarkCheck,
  ChevronRight,
  ChevronDown,
  X,
  Plus,
  HelpCircle
} from "lucide-react";

interface AccountBuddyProps {
  userName: string;
}

interface Account {
  name: string;
  vertical: string;
  meta: string;
  stage: string;
  color: [string, string]; // [bg, text]
  timeline: [string, string][]; // [date/age, event]
  assets: string[];
  risk: string;
  intel: string[];
  gap?: string;
  rp: string;
}

const ACCOUNTS_DATA: Account[] = [
  {
    name: "Helix Therapeutics",
    vertical: "Specialty Pharma",
    meta: "2,800 reps",
    stage: "Discovery",
    color: ["bg-sky-50 text-sky-800 border-sky-200", "text-sky-700"],
    timeline: [
      ["3 days ago", "Intro call booked via inbound MQL"],
      ["Yesterday", "Discovery call #1 — pain around field readiness surfaced"],
      ["Today", "Follow-up scheduled with Head of Commercial Excellence"]
    ],
    assets: [
      "Pharma Field-Readiness ROI one-pager",
      "MLR-compliant practice case study",
      "Discovery question set — pharma edition"
    ],
    risk: "COI not yet quantified across 2 calls. Deal aging in discovery.",
    intel: [
      "Across 14 past pharma discovery calls at this stage, the #1 unspoken concern was MLR review bottlenecks slowing field readiness.",
      "Buyers here respond best when ramp cost is framed as lost launch-window revenue, not training efficiency."
    ],
    rp: 'Practice: a Head of Commercial Excellence who insists field training "works fine" — extract the compliance-weighted cost of inaction.'
  },
  {
    name: "Northwind SaaS",
    vertical: "Series C SaaS",
    meta: "$90M ARR",
    stage: "Demo Scheduled",
    color: ["bg-amber-50 text-amber-800 border-amber-200", "text-amber-700"],
    timeline: [
      ["1 week ago", "Discovery completed — ramp + forecast pain confirmed"],
      ["2 days ago", "Demo scheduled with RevOps + VP Sales"],
      ["Tomorrow", "Tailored demo — you present"]
    ],
    assets: [
      "Outcome-based demo storyboard (SaaS)",
      "Gong vs Mindtickle positioning card",
      "Readiness Index demo flow"
    ],
    risk: "VP Sales attending — single-threaded so far. Multi-thread before the demo.",
    intel: [
      "In 9 past demos to Series C RevOps leaders, deals stalled most when the AE toured features instead of solving the stated ramp problem.",
      "Top performers opened by replaying the exact pain language from discovery — 2x higher win rate."
    ],
    gap: "A VP Sales joins this demo — your exec-pitch gap is relevant. A quick compression drill is waiting below.",
    rp: 'Practice: a skeptical RevOps lead who says "Gong already does this" mid-demo — reframe to platform value.'
  },
  {
    name: "Cobalt Systems",
    vertical: "Mid-market SaaS",
    meta: "220 reps",
    stage: "Negotiation",
    color: ["bg-purple-50 text-purple-800 border-purple-200", "text-purple-700"],
    timeline: [
      ["2 weeks ago", "Technical win secured"],
      ["4 days ago", "Pricing sent"],
      ["Today", "Procurement pushing back on price"]
    ],
    assets: [
      "Give-to-Get trading matrix",
      "Multi-year value justification calculator",
      "Competitive displacement battlecard"
    ],
    risk: "Procurement citing a competitor 20% lower. This is your flagged gap area — prep carefully.",
    intel: [
      "In past mid-market negotiations, procurement opened with a competitor price 20-25% lower 70% of the time.",
      "Reps who held margin traded multi-year commitment or case-study rights — never a straight discount."
    ],
    gap: "This deal is in negotiation — your flagged gap. Before your next procurement call, close it here.",
    rp: "Practice: a cold procurement agent demanding 20% off or the deal waits a quarter — defend by trading equal value."
  },
  {
    name: "Vantage Health",
    vertical: "Pre-launch Pharma",
    meta: "pre-launch",
    stage: "Prospecting",
    color: ["bg-red-50 text-red-800 border-red-200", "text-red-700"],
    timeline: [
      ["5 days ago", "Account assigned from territory scan"],
      ["3 days ago", "Identified upcoming indication launch (Q3)"],
      ["Next", "First outreach — not yet contacted"]
    ],
    assets: [
      "Pre-launch pharma cold call script",
      "Launch-readiness hypothesis template",
      "Industry primer — specialty pharma"
    ],
    risk: "Cold account. Timing matters — launch window is the compelling event.",
    intel: [
      "Pre-launch pharma orgs are most reachable 60-90 days before an indication launch — the launch date is the compelling event.",
      "Winning cold calls led with a research hook tied to the specific launch, not a generic pitch."
    ],
    rp: 'Practice: a VP Commercial Training who says "we already have a vendor" — pattern interrupt tied to their upcoming launch.'
  }
];

interface CuratedModule {
  name: string;
  why: string;
  rp: boolean;
  stage: string;
}

const CURATED_MODULES: CuratedModule[] = [
  { name: "Negotiation Mastery", why: "RP5 score below benchmark — conceded price without a trade", rp: true, stage: "Negotiation" },
  { name: "Executive Pitch Mastery", why: "RP4 ran past the 7-min window; COI framing weak", rp: true, stage: "Exec Pitch" },
  { name: "Demo Mastery — Advanced", why: "RP3 handled the Gong gap but lost outcome framing", rp: true, stage: "Demo" },
  { name: "ICP & Persona Deep Dive", why: "Discovery showed shallow buyer-world understanding", rp: false, stage: "Discovery" },
  { name: "Closing & Handoff Mastery", why: "RP6 close was rushed; no expansion seed planted", rp: false, stage: "Close" }
];

export default function AccountBuddy({ userName }: AccountBuddyProps) {
  const [activeAccountIdx, setActiveAccountIdx] = useState<number>(0);
  const [dgOpen, setDgOpen] = useState<boolean>(false);
  
  // Track mock state of completing assigned modules
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [isRoleplayActive, setIsRoleplayActive] = useState<boolean>(false);
  const [roleplayText, setRoleplayText] = useState<string>("");
  const [roleplayFeedback, setRoleplayFeedback] = useState<string | null>(null);
  const [isAnalyzingRoleplay, setIsAnalyzingRoleplay] = useState<boolean>(false);

  const activeAccount = ACCOUNTS_DATA[activeAccountIdx];

  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "buddy"; text: string; time: string }>>([
    {
      sender: "buddy",
      text: `Hello ${userName}! I'm your ElevateOS™ Account Buddy AI powered by OpenAI. Ask me anything about ${activeAccount.name} — whether you need discovery questions, email drafts, competitive positioning, or negotiation strategies.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isChatting, setIsChatting] = useState<boolean>(false);

  // Helper to resolve which curated module applies to this stage
  const getStageModule = (stageName: string) => {
    const stageMap: Record<string, string> = {
      "Discovery": "Discovery",
      "Demo Scheduled": "Demo",
      "Negotiation": "Negotiation",
      "Prospecting": "Close"
    };
    const target = stageMap[stageName];
    return CURATED_MODULES.find(m => m.stage === target);
  };

  const stageModule = getStageModule(activeAccount.stage);

  const handleSelectAccount = (idx: number) => {
    setActiveAccountIdx(idx);
    setDgOpen(false);
    setIsRoleplayActive(false);
    setRoleplayText("");
    setRoleplayFeedback(null);
    const newAcct = ACCOUNTS_DATA[idx];
    setChatMessages([
      {
        sender: "buddy",
        text: `Hello ${userName}! I'm your ElevateOS™ Account Buddy AI powered by OpenAI. Ask me anything about ${newAcct.name} — whether you need discovery questions, email drafts, competitive positioning, or negotiation strategies.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  const handleCompleteModule = (modName: string) => {
    setCompletedModules(prev => ({ ...prev, [modName]: true }));
    if (modName === "ICP & Persona Deep Dive") {
      window.open("https://deeplinks.mindtickle.com/xEyiyEQur4b", "_blank", "noopener,noreferrer");
    }
    alert(`🎉 Module "${modName}" marked as completed! Your dynamic readiness score has been updated.`);
  };

  const handleSubmitRoleplay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleplayText.trim() || isAnalyzingRoleplay) return;

    setIsAnalyzingRoleplay(true);
    setRoleplayFeedback(null);

    try {
      const response = await fetch("/api/openai/account-buddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "roleplay",
          accountName: activeAccount.name,
          vertical: activeAccount.vertical,
          stage: activeAccount.stage,
          risk: activeAccount.risk,
          intel: activeAccount.intel,
          userResponse: roleplayText
        })
      });

      if (!response.ok) {
        throw new Error("Failed to reach OpenAI Account Buddy service");
      }

      const data = await response.json();
      const scoreText = typeof data.score === "number" ? `🏆 OpenAI Readiness Score: ${data.score}/100\n\n` : "";
      const feedbackText = data.feedback || data.recommendation || "Roleplay analysis completed successfully.";
      const nextStepText = data.next_step ? `\n\n👉 Next Step: ${data.next_step}` : "";

      setRoleplayFeedback(`${scoreText}${feedbackText}${nextStepText}`);
    } catch (err: any) {
      console.error("Account Buddy roleplay error:", err);
      setRoleplayFeedback(`⚠️ Error: ${err.message || "Failed to analyze response via OpenAI API."}`);
    } finally {
      setIsAnalyzingRoleplay(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatting) return;

    const userMsg = {
      sender: "user" as const,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    const sentMessage = chatInput;
    setChatInput("");
    setIsChatting(true);

    try {
      const response = await fetch("/api/openai/account-buddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          accountName: activeAccount.name,
          vertical: activeAccount.vertical,
          stage: activeAccount.stage,
          risk: activeAccount.risk,
          intel: activeAccount.intel,
          chatMessage: sentMessage,
          chatHistory: newHistory
        })
      });

      if (!response.ok) {
        throw new Error("Failed to reach OpenAI Co-pilot service");
      }

      const data = await response.json();
      setChatMessages(prev => [
        ...prev,
        {
          sender: "buddy",
          text: data.reply || "I'm reviewing your account details. What specific asset would you like to prepare next?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err: any) {
      console.error("Account Buddy chat error:", err);
      setChatMessages(prev => [
        ...prev,
        {
          sender: "buddy",
          text: `⚠️ Could not reach OpenAI API: ${err.message || "Please check connection and try again."}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="space-y-10 font-sans">
      
      {/* Title block */}
      <div className="text-left max-w-2xl space-y-2">
        <span className="text-[10px] font-bold tracking-widest text-mt-orange uppercase font-mono block">
          Phase 03 · Activates on account assignment — runs in parallel with Phase 02
        </span>
        <h1 className="text-3xl font-black text-mt-navy tracking-tight">Account Buddy</h1>
        <p className="text-slate-500 text-sm">
          ElevateOS™ stops being a training program and becomes your deal companion — prepping you for the real conversations happening now.
        </p>
        <div className="inline-block text-xs font-bold px-3 py-1 bg-mt-orange/5 text-mt-orange rounded-full mt-1 border border-mt-orange/10">
          Grounded in your real accounts · Intel mined from past deals at the same stage & industry
        </div>
      </div>

      {/* Guide Bar */}
      <div className="bg-mt-orange/5 border-l-4 border-mt-orange rounded-r-xl p-4 flex gap-3 text-sm text-slate-700 max-w-5xl shadow-sm">
        <span className="text-lg">🚀</span>
        <div>
          <strong>How to use this:</strong> Pick an account. Start with its Deal Guide for the full picture, then review the deal-specific intel and run a curated practice tuned to that exact buyer before your next call.
        </div>
      </div>

      {/* Main Stats Summary Block */}
      <div className="max-w-5xl bg-gradient-to-br from-mt-indigo/5 via-white to-mt-orange/5 border-2 border-mt-indigo/10 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase font-mono">Your Readiness</span>
            <h2 className="text-2xl font-black text-mt-navy tracking-tight">Almost Ready</h2>
            <p className="text-xs text-slate-500">
              Solid foundation with a few flagged gaps. You can take accounts with a safety net.
            </p>
          </div>
          
          <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <div className="text-right">
              <span className="text-[9px] font-mono uppercase text-slate-400 block">Deal Winning Probability (avg)</span>
              <span className="text-3xl font-black text-mt-orange tracking-tight">58%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Curated Modules Board */}
      <div className="max-w-5xl bg-amber-50/40 border border-amber-200 rounded-2xl p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black tracking-widest text-amber-800 uppercase font-mono block">
            📋 Curated Modules Assigned to You
          </span>
          <p className="text-xs text-slate-500">
            Based on your pressure-testing simulation output, these gaps are custom-assigned to raise your field success.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {CURATED_MODULES.map((mod) => {
            const isDone = completedModules[mod.name] === true;
            return (
              <span 
                key={mod.name} 
                onClick={() => !isDone && handleCompleteModule(mod.name)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all duration-150 ${
                  isDone 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                    : "bg-white text-amber-900 border-amber-200 hover:bg-amber-100/50 cursor-pointer"
                }`}
              >
                <span>{mod.name} {mod.rp ? "· RP" : ""}</span>
                {isDone ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </span>
            );
          })}
        </div>

        <div className="bg-amber-50 text-xs text-amber-900/90 rounded-xl p-3 border border-amber-100 leading-relaxed font-medium">
          💡 <strong>Your choice:</strong> complete these in one go from here, or let them come to you — each is also tucked inside the deal where it matters most. Knock them out upfront, or learn just-in-time as your deals reach that stage.
        </div>
      </div>

      {/* Account Grid Split */}
      <div className="max-w-5xl grid md:grid-cols-12 gap-8">
        
        {/* Left Column: Account selector list */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono block">Your First 4 Accounts</span>
          
          <div className="space-y-2">
            {ACCOUNTS_DATA.map((acct, idx) => {
              const isActive = activeAccountIdx === idx;
              return (
                <button
                  key={acct.name}
                  onClick={() => handleSelectAccount(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isActive 
                      ? "bg-white border-mt-indigo shadow-md ring-2 ring-indigo-50"
                      : "bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-black text-slate-800">{acct.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{acct.vertical} • {acct.meta}</p>
                  </div>
                  
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border mt-3 w-fit ${acct.color[0]}`}>
                    {acct.stage}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Account Buddy workspace detail */}
        <div className="md:col-span-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
            
            {/* Account Header */}
            <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">{activeAccount.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeAccount.vertical} · {activeAccount.stage}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${activeAccount.color[0]}`}>
                {activeAccount.stage}
              </span>
            </div>

            {/* Deal Guide Accordion Card */}
            <div className="border border-mt-orange/20 bg-gradient-to-r from-mt-orange/5 to-mt-indigo/5 rounded-2xl p-4 md:p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-base">📋</span>
                  <div className="text-xs font-black text-mt-navy uppercase font-mono tracking-wider">Deal Guide — Auto-generated</div>
                </div>
                <button 
                  onClick={() => setDgOpen(!dgOpen)}
                  className="text-xs font-bold px-3 py-1.5 bg-white border border-slate-200 hover:border-mt-orange text-slate-700 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>{dgOpen ? "Hide" : "View"} Deal Guide</span>
                  {dgOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>

              {dgOpen && (
                <div className="pt-3 border-t border-slate-100 space-y-4 animate-fade-in text-xs text-slate-700">
                  {/* CRM Timeline */}
                  <div className="space-y-2">
                    <span className="font-bold text-[10px] font-mono uppercase tracking-wide text-slate-400 block">CRM Timeline</span>
                    <div className="border-l-2 border-slate-200 pl-4 space-y-3">
                      {activeAccount.timeline.map((item, tIdx) => (
                        <div key={tIdx} className="relative">
                          <span className="text-[10px] font-bold text-slate-400 block">{item[0]}</span>
                          <span className="font-medium text-slate-700">{item[1]}</span>
                          <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-mt-indigo" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shared assets */}
                  <div className="space-y-2">
                    <span className="font-bold text-[10px] font-mono uppercase tracking-wide text-slate-400 block">Key Assets to Share</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeAccount.assets.map((asset) => (
                        <span key={asset} className="text-[10px] font-bold bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-md">
                          {asset}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Risks highlight */}
                  <div className="space-y-2">
                    <span className="font-bold text-[10px] font-mono uppercase tracking-wide text-slate-400 block">⚠️ Risk Highlight</span>
                    <div className="p-3.5 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-xs text-red-950 font-medium leading-relaxed">
                      {activeAccount.risk}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sales Intel Block */}
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest text-teal-700 uppercase font-mono block">
                🎯 Deal-Specific Sales Intel — from past deals at this stage
              </span>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5">
                <ul className="space-y-3">
                  {activeAccount.intel.map((itm, index) => (
                    <li key={index} className="text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed font-medium">
                      <span className="text-mt-indigo text-sm shrink-0">→</span>
                      <span>{itm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stage-Surfaced Must-Complete Module (Dynamic curated block) */}
            {stageModule && (
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-amber-800 uppercase font-mono block">
                  📋 Must-Complete Module — surfaced for this deal
                </span>
                
                <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-5 space-y-3.5">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-sm font-extrabold text-amber-900">{stageModule.name} {stageModule.rp && <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">INCLUDES ROLEPLAY</span>}</h4>
                      <p className="text-xs text-amber-800/80 mt-1 font-medium">
                        Assigned because: {stageModule.why}. This deal is at the <strong className="text-amber-950">{activeAccount.stage}</strong> stage — complete it here, or from the tabs up top.
                      </p>
                    </div>
                    {completedModules[stageModule.name] && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">COMPLETED ✓</span>
                    )}
                  </div>

                  {!completedModules[stageModule.name] && (
                    stageModule.name === "ICP & Persona Deep Dive" ? (
                      <a 
                        href="https://deeplinks.mindtickle.com/xEyiyEQur4b"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleCompleteModule(stageModule.name)}
                        className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer text-center"
                      >
                        Complete module now →
                      </a>
                    ) : (
                      <button 
                        onClick={() => handleCompleteModule(stageModule.name)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        Complete module now →
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Curated Practice Roleplay Panel */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono block">
                🎙️ Curated Practice
              </span>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {activeAccount.rp}
                </p>

                {!isRoleplayActive ? (
                  <button 
                    onClick={() => setIsRoleplayActive(true)}
                    className="px-4 py-2.5 bg-mt-navy hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start practice roleplay →</span>
                  </button>
                ) : (
                  <form onSubmit={handleSubmitRoleplay} className="space-y-4 pt-2 border-t border-slate-200 animate-fade-in">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-slate-400 font-mono tracking-wider block">Your response:</label>
                      <textarea 
                        rows={3}
                        value={roleplayText}
                        onChange={(e) => setRoleplayText(e.target.value)}
                        placeholder="Type how you would handle this objection..."
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-mt-indigo outline-none"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <button 
                        type="button"
                        onClick={() => { setIsRoleplayActive(false); setRoleplayFeedback(null); }}
                        className="text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isAnalyzingRoleplay}
                        className="px-4 py-2 bg-mt-indigo hover:bg-indigo-600 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5"
                      >
                        {isAnalyzingRoleplay ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Analyzing via OpenAI...</span>
                          </>
                        ) : (
                          <span>Submit Practice Response</span>
                        )}
                      </button>
                    </div>

                    {roleplayFeedback && (
                      <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-slate-700 space-y-1.5 whitespace-pre-line leading-relaxed font-medium animate-fade-in">
                        {roleplayFeedback}
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* KAI Deal Co-pilot — Account Buddy AI Chat (OpenAI API) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-mt-indigo uppercase font-mono block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-mt-orange" />
                  <span>KAI Deal Co-pilot — Account Buddy AI (OpenAI API)</span>
                </span>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100 font-mono">
                  GPT-4o Engine
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-4">
                <div className="max-h-[280px] overflow-y-auto space-y-3 pr-1">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-1 animate-fade-in`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                        <span className="font-bold text-slate-600">{msg.sender === "user" ? userName : "KAI Account Buddy (OpenAI)"}</span>
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>
                      <div
                        className={`text-xs p-3.5 rounded-2xl max-w-[88%] leading-relaxed font-medium whitespace-pre-line shadow-2xs ${
                          msg.sender === "user"
                            ? "bg-mt-navy text-white rounded-tr-none"
                            : "bg-white text-slate-700 border border-slate-200/80 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isChatting && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2 font-mono animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-mt-orange animate-ping" />
                      <span>KAI Account Buddy is analyzing deal intelligence via OpenAI API...</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-200/60">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Ask KAI for discovery questions, email drafts, or positioning for ${activeAccount.name}...`}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-mt-indigo bg-white outline-none font-medium"
                  />
                  <button
                    type="submit"
                    disabled={isChatting || !chatInput.trim()}
                    className="px-4 py-2.5 bg-mt-indigo hover:bg-indigo-600 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1 shrink-0 shadow-xs"
                  >
                    <span>Send</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
