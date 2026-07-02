import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Quote, 
  Building, 
  Map, 
  UserCheck, 
  Briefcase, 
  Globe, 
  TrendingUp, 
  ChevronRight,
  Plus,
  Check
} from "lucide-react";

interface SellerJourneyMapProps {
  completedTasks: string[];
  onTaskComplete: (taskId: string) => void;
}

type SubsectionId = "story" | "leadership" | "values" | "activity";

export default function SellerJourneyMap({ completedTasks, onTaskComplete }: SellerJourneyMapProps) {
  const [activeTab, setActiveTab] = useState<SubsectionId>("story");
  const [showDetailedInsights, setShowDetailedInsights] = useState<Record<string, boolean>>({});

  const milestones = [
    {
      id: "story" as SubsectionId,
      title: "Company Story",
      badge: "Phase 0 · Day 1",
      icon: BookOpen,
      color: "border-amber-200 text-amber-600 bg-amber-50 hover:bg-amber-100/50",
      activeColor: "bg-amber-600 border-amber-600 text-white shadow-amber-200",
      taskId: "journey-company-story",
      summary: "Pioneering the category of Sales Readiness since 2011."
    },
    {
      id: "leadership" as SubsectionId,
      title: "Executive Leadership",
      badge: "Phase 0 · Day 1",
      icon: Users,
      color: "border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100/50",
      activeColor: "bg-indigo-600 border-indigo-600 text-white shadow-indigo-200",
      taskId: "journey-exec-leadership",
      summary: "Meet our founders and align with their visionary leadership pod."
    },
    {
      id: "values" as SubsectionId,
      title: "Core Values",
      badge: "Phase 0 · Day 2",
      icon: ShieldCheck,
      color: "border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100/50",
      activeColor: "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200",
      taskId: "journey-core-values",
      summary: "Four guiding culture pillars that direct our daily decisions."
    },
    {
      id: "activity" as SubsectionId,
      title: "Industry Activity",
      badge: "Phase 0 · Day 2",
      icon: Award,
      color: "border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100/50",
      activeColor: "bg-rose-600 border-rose-600 text-white shadow-rose-200",
      taskId: "journey-industry-activity",
      summary: "Explore our market presence, trusted brands, and active impact."
    }
  ];

  const handleToggleInsight = (key: string) => {
    setShowDetailedInsights(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isMilestoneCompleted = (taskId: string) => completedTasks.includes(taskId);

  const completedCount = milestones.filter(m => isMilestoneCompleted(m.taskId)).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <section id="seller-journey-map" className="scroll-mt-24 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 md:p-8 relative overflow-hidden">
        {/* Subtle decorative background details */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-mt-orange/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-mt-indigo/5 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-widest text-mt-orange bg-mt-orange/10 px-2 py-0.5 rounded border border-mt-orange/20 uppercase">
                DAY 1 - DAY 2 Roadmap
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                Foundational Assimilation
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Know about Mindtickle
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-2xl leading-relaxed">
              Before you dive into metrics, listen to calls, or practice pitches, master the core identity of Mindtickle. Learn our origins, meet our executive leadership, align with our culture, and discover our industry authority.
            </p>
          </div>

          {/* Overall Progress Tracker */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 shrink-0 flex items-center gap-4 min-w-[220px]">
            <div className="relative w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm font-mono text-xs font-bold text-slate-700">
              {progressPercent}%
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="3"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  fill="transparent"
                  stroke="#FF6B00"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 21}`}
                  strokeDashoffset={`${2 * Math.PI * 21 * (1 - progressPercent / 100)}`}
                  className="transition-all duration-700"
                />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-mono font-black text-mt-orange uppercase tracking-wider block">Assimilated Code</span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">{completedCount} of 4 Milestones Clear</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Clear all 4 to earn certification piece</span>
            </div>
          </div>
        </div>

        {/* Dynamic Connected Node Timeline */}
        <div className="py-8">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-4 md:left-[12.5%] right-4 md:right-[12.5%] h-1 bg-slate-100 -translate-y-1/2 z-0 hidden md:block" />
            
            {/* Interactive Progress Line */}
            <div 
              className="absolute top-1/2 left-[12.5%] h-1 bg-gradient-to-r from-mt-orange to-mt-indigo -translate-y-1/2 z-0 hidden md:block transition-all duration-500" 
              style={{ width: `${Math.max(0, (completedCount - 1) * 25)}%` }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {milestones.map((m, index) => {
                const IconComponent = m.icon;
                const isCurrent = activeTab === m.id;
                const isDone = isMilestoneCompleted(m.taskId);

                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveTab(m.id)}
                    className={`text-left border rounded-2xl p-4 transition-all duration-300 relative flex flex-col justify-between group h-full min-h-[140px] cursor-pointer ${
                      isCurrent
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-4px]"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    {/* Node Circle Badge */}
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                        isCurrent ? m.activeColor : m.color
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-mono font-bold tracking-tight px-2 py-0.5 rounded ${
                          isCurrent ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-500"
                        }`}>
                          {m.badge}
                        </span>
                        {isDone ? (
                          <div className="bg-emerald-500 text-white p-1 rounded-full shadow-sm">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold ${
                            isCurrent ? "border-white/30 text-white/50" : "border-slate-200 text-slate-400"
                          }`}>
                            0{index + 1}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className={`text-sm font-black tracking-tight ${isCurrent ? "text-white" : "text-slate-900"}`}>
                        {m.title}
                      </h4>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${isCurrent ? "text-slate-300" : "text-slate-500"}`}>
                        {m.summary}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-dashed border-slate-100/10 flex items-center justify-between text-[10px] font-mono font-bold">
                      <span className={isCurrent ? "text-mt-orange" : "text-slate-400 group-hover:text-mt-indigo"}>
                        {isCurrent ? "VIEWING PROTOCOL" : "DECRYPT TOPIC"}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isCurrent ? "translate-x-1 text-mt-orange" : "text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subsection Detail Panel Container */}
        <div className="mt-4 bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden shadow-inner">
          <AnimatePresence mode="wait">
            {activeTab === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 space-y-6"
              >
                {/* Story Panel */}
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-black text-amber-700 tracking-wider uppercase">ARCHIVAL BRIEFING · CATEGORY GENESIS</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                      Mindtickle Origins: Defining Sales Readiness
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Founded in 2011, Mindtickle pioneered a brand-new software category. We realized enterprise sales had shifted from transactional, relationship-focused handshakes to deep, skill-intensive, consultative solution partnerships. 
                    </p>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Handing sellers pitch decks and static marketing collaterals wasn't working. We engineered a platform to systematically benchmark, measure, and continuously upgrade sales representative capability. Today, we empower over 500+ global industry-defining enterprises.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm text-center min-w-[120px]">
                        <span className="text-2xl font-black text-slate-900 block">2011</span>
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">FOUNDING YEAR</span>
                      </div>
                      <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm text-center min-w-[120px]">
                        <span className="text-2xl font-black text-slate-900 block">Unicorn</span>
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">STATUS REACHED</span>
                      </div>
                      <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm text-center min-w-[120px]">
                        <span className="text-2xl font-black text-slate-900 block">Everboarding</span>
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">OUR PHILOSOPHY</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <div className="bg-gradient-to-br from-amber-500/10 to-mt-orange/10 border border-amber-200/40 p-6 rounded-2xl space-y-4">
                      <h4 className="text-xs font-mono font-black text-amber-800 tracking-wider uppercase">Key Milestones Path</h4>
                      
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <span className="text-xs font-mono font-bold text-amber-600 shrink-0 mt-0.5">01 //</span>
                          <p className="text-xs text-slate-700 leading-normal">
                            <strong>Platform Evolution:</strong> Expanded from sales training to a full Readiness Suite including live Call AI Coaching, Digital Sales Rooms, and Sales Content Management.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-xs font-mono font-bold text-amber-600 shrink-0 mt-0.5">02 //</span>
                          <p className="text-xs text-slate-700 leading-normal">
                            <strong>The Revenue Impact:</strong> Over $100 Billion in sales pipelines are optimized and run across our diagnostic engine yearly.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-xs font-mono font-bold text-amber-600 shrink-0 mt-0.5">03 //</span>
                          <p className="text-xs text-slate-700 leading-normal">
                            <strong>Everboarding Practice:</strong> Replacing old, boring quarterly tests with automated, smart, bite-sized daily skill reinforcement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Task Completion */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium">
                    Have you read and understood the origins of Mindtickle and the Sales Readiness category?
                  </span>
                  <button
                    onClick={() => onTaskComplete("journey-company-story")}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
                      isMilestoneCompleted("journey-company-story")
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isMilestoneCompleted("journey-company-story") ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Completed!</span>
                      </>
                    ) : (
                      <>
                        <span>Mark as Completed</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "leadership" && (
              <motion.div
                key="leadership"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 space-y-6"
              >
                {/* Leadership Panel */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-indigo-700 tracking-wider uppercase">Visionary Guidance · Leadership Philosophy</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    Executive Leadership: Message from the Pod
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-3xl">
                    Get to know our visionary founders Krishna Devpura and Deepak Diwakar. They designed our architecture not just for compliance training, but as a system of constant development.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Founder 1 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-mono text-base font-black shrink-0 overflow-hidden">
                          <img 
                            src="https://www.mindtickle.com/_next/image/?url=https%3A%2F%2Fsuperb-activity-b7b8c463f3.media.strapiapp.com%2Fkg_941f1925b6.jpg&w=3840&q=75" 
                            alt="Krishna Devpura" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-base">Krishna Devpura</h4>
                          <p className="text-[10px] text-indigo-600 font-black tracking-widest uppercase">Co-Founder & Chief Executive Officer</p>
                        </div>
                      </div>
                      <blockquote className="text-slate-600 text-xs italic leading-relaxed pl-3 border-l-2 border-indigo-400">
                        "Sales readiness is the ultimate competitive moat. When your reps know more, consult better, and adapt faster than your competitors, you dominate the market. Our mission is to make that predictable."
                      </blockquote>
                    </div>
                  </div>

                  {/* Founder 2 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-mono text-base font-black shrink-0 overflow-hidden">
                          <img 
                            src="https://www.mindtickle.com/_next/image/?url=https%3A%2F%2Fsuperb-activity-b7b8c463f3.media.strapiapp.com%2Fdd_748762509e.jpg&w=3840&q=75" 
                            alt="Deepak Diwakar" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-base">Deepak Diwakar</h4>
                          <p className="text-[10px] text-indigo-600 font-black tracking-widest uppercase">Co-Founder & Chief Technology Officer</p>
                        </div>
                      </div>
                      <blockquote className="text-slate-600 text-xs italic leading-relaxed pl-3 border-l-2 border-indigo-400">
                        "We don't build software just for standard onboarding checklists. We build state-of-the-art diagnostic systems that leverage AI to actively guide, refine, and shape human sales potential."
                      </blockquote>
                    </div>
                  </div>

                  {/* Leader 3 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-mono text-base font-black shrink-0 overflow-hidden">
                          <img 
                            src="https://www.mindtickle.com/_next/image/?url=https%3A%2F%2Fsuperb-activity-b7b8c463f3.media.strapiapp.com%2Fnishant_21e1d46b2d.png&w=3840&q=75" 
                            alt="Nishant Mungali" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-base">Nishant Mungali</h4>
                          <p className="text-[10px] text-indigo-600 font-black tracking-widest uppercase">Chief Customer Experience Officer</p>
                        </div>
                      </div>
                      <blockquote className="text-slate-600 text-xs italic leading-relaxed pl-3 border-l-2 border-indigo-400">
                        "A highly accomplished user-experience and design expert pioneering the \"Sales Readiness\" category to eliminate the execution gap for global B2B revenue teams."
                      </blockquote>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
                  <h5 className="text-[10px] font-mono font-black text-indigo-800 tracking-wider uppercase mb-1.5">Leadership Alignment Memo</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Krishna and Deepak's guidance, Mindtickle has grown into a collaborative global organization. As an AE, your alignment with our executive mission means showing deep client empathy and selling value over features.
                  </p>
                </div>

                {/* Interactive Task Completion */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium">
                    Did you digest our leadership insights and align with our executive vision?
                  </span>
                  <button
                    onClick={() => onTaskComplete("journey-exec-leadership")}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
                      isMilestoneCompleted("journey-exec-leadership")
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isMilestoneCompleted("journey-exec-leadership") ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Aligned! Milestone Cleared</span>
                      </>
                    ) : (
                      <>
                        <span>Align & Mark Complete</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "values" && (
              <motion.div
                key="values"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 space-y-6"
              >
                {/* Values Panel */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-emerald-700 tracking-wider uppercase">Foundational Pillars · Cultural DNA</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    Our 4 Foundational Pillars & Core Values
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-3xl">
                    Culture at Mindtickle is not passive. We live by four main parameters that keep us focused on sales enablement performance and customer-obsessed value.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  {[
                    {
                      id: "value-obsess",
                      title: "Customer Obsession",
                      badge: "CUSTOMER-FIRST",
                      desc: "Our clients win when their sales representatives excel. We do not just build tools; we build successful business outcomes. Every onboarding milestone we curate is with the end-customer in mind.",
                      bg: "hover:bg-amber-50/40 hover:border-amber-200"
                    },
                    {
                      id: "value-ever",
                      title: "Continuous Everboarding",
                      badge: "DAILY MASTERY",
                      desc: "Readiness is not an isolated checkbox on day 30. It is a continuous lifecycle of development, skill calibration, voice analysis, and persistent improvement in the field.",
                      bg: "hover:bg-emerald-50/40 hover:border-emerald-200"
                    },
                    {
                      id: "value-team",
                      title: "One Team Synergy",
                      badge: "COLLABORATION",
                      desc: "Cross-functional synchronization is critical. Our product, customer success, marketing, and sales execution pods collaborate directly to eliminate friction in the B2B sales cycle.",
                      bg: "hover:bg-indigo-50/40 hover:border-indigo-200"
                    },
                    {
                      id: "value-data",
                      title: "Data-Driven Excellence",
                      badge: "DIAGNOSTICS",
                      desc: "We rely on cold, objective analytics. Using measurable voice signals, coaching insights, and capabilities benchmarks to accurately grade and upgrade field competency.",
                      bg: "hover:bg-rose-50/40 hover:border-rose-200"
                    }
                  ].map((value) => (
                    <div 
                      key={value.id}
                      onClick={() => handleToggleInsight(value.id)}
                      className={`bg-white border border-slate-200 rounded-2xl p-5 transition-all duration-300 shadow-sm cursor-pointer ${value.bg}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-black text-slate-900 text-sm md:text-base flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {value.title}
                        </h4>
                        <span className="text-[8px] font-mono font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          {value.badge}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {value.desc}
                      </p>
                      
                      {/* Micro interaction */}
                      <div className="mt-3 pt-2 border-t border-slate-100/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>{showDetailedInsights[value.id] ? "COLLAPSE DETAIL" : "EXPAND VALUE PHILOSOPHY"}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDetailedInsights[value.id] ? "rotate-90 text-emerald-500" : ""}`} />
                      </div>

                      {showDetailedInsights[value.id] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mt-3 pt-2 text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50 p-2.5 rounded-lg space-y-1"
                        >
                          <p className="font-bold text-slate-800">What this means for you as an AE:</p>
                          <p>When you conduct discoveries, you will practice Customer Obsession by deeply diagnostic questioning, rather than premature pitching. You will continuously review your call insights to practice continuous everboarding.</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Task Completion */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium">
                    Do you commit to incorporating these four cultural parameters into your daily sales conduct?
                  </span>
                  <button
                    onClick={() => onTaskComplete("journey-core-values")}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
                      isMilestoneCompleted("journey-core-values")
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isMilestoneCompleted("journey-core-values") ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Committed & Cleared!</span>
                      </>
                    ) : (
                      <>
                        <span>Commit & Mark Complete</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 space-y-6"
              >
                {/* Industry Activity Panel */}
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-black text-rose-700 tracking-wider uppercase">Market Authority · Global Ecosystem Activity</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                      Industry Activity & Global Brand Authority
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Mindtickle isn't just another tech tool; we are the market-defining infrastructure powering enablement for the world's most high-performing, fast-growing sales organizations.
                    </p>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Our platform active metrics run across massive datasets. We are recognized as a continuous **Leader in Sales Training and Coaching** on peer-review landscapes like G2, and trusted by global enterprises.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm">
                        <span className="text-2xl font-black text-rose-600 block">500+</span>
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Enterprise Clients</span>
                      </div>
                      <div className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm">
                        <span className="text-2xl font-black text-rose-600 block">G2 Leader</span>
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Category Champion</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-sm">
                      <span className="text-[10px] font-mono font-black text-rose-700 tracking-wider uppercase block">Trusted Enterprise Cohorts</span>
                      <div className="grid grid-cols-2 gap-2">
                        {["CISCO", "Databricks", "Snowflake", "Splunk", "Palo Alto", "Cloudera", "Nutanix", "DocuSign"].map((brand, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg py-2.5 px-3 text-center transition-colors hover:bg-rose-50/30 hover:border-rose-100">
                            <span className="text-[10px] font-black text-slate-600 tracking-tight block truncate">{brand}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[9px] text-slate-400 text-center leading-relaxed">
                        These organizations rely on Mindtickle daily to coach reps and close gaps.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50/40 border border-rose-100 p-4 rounded-xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="text-[11px] font-bold text-rose-900 uppercase tracking-wide">Key Selling Accent: G2 & Stevie Awards</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      As an AE, you can boast that Mindtickle ranks #1 in sales onboarding customer satisfaction. Our client retention rate remains above 98% due to our data-proven capability lift.
                    </p>
                  </div>
                </div>

                {/* Interactive Task Completion */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium">
                    Have you completed your review of our market authority, enterprise cohorts, and G2 ranking points?
                  </span>
                  <button
                    onClick={() => onTaskComplete("journey-industry-activity")}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
                      isMilestoneCompleted("journey-industry-activity")
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {isMilestoneCompleted("journey-industry-activity") ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Completed!</span>
                      </>
                    ) : (
                      <>
                        <span>Mark as Completed</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
