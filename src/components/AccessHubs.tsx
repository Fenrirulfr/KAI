import React, { useState } from "react";
import {
  Users,
  Settings,
  ShieldCheck,
  FileText,
  ArrowUpRight,
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  LockKeyhole,
  Info,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Filter,
  Check,
  AlertCircle
} from "lucide-react";

export default function AccessHubs() {
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [personaFilter, setPersonaFilter] = useState<"all" | "cro" | "enablement" | "revops">("all");
  const [meddpiccStatus, setMeddpiccStatus] = useState<Record<string, boolean>>({
    metrics: true,
    buyer: false,
    criteria: true,
    process: false,
    paper: false,
    pain: true,
    champion: false,
    competition: false
  });

  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const hubs = [
    {
      id: "icp",
      title: "ICP & Buyer Personas",
      description: "Understand our sweet spot and learn to speak the language of key executive stakeholders.",
      icon: Users,
      color: "from-cyan-500 to-blue-500",
      accent: "cyan",
      badge: "Target Grid Active",
      code: "HUB.ICP.01",
      href: "https://deeplinks.mindtickle.com/rcz7shMA1Zb"
    },
    {
      id: "tools",
      title: "Tools & Processes",
      description: "Master our internal tech stack, pipeline stages, and the MEDDPICC sales qualification standard.",
      icon: Settings,
      color: "from-indigo-500 to-purple-500",
      accent: "indigo",
      badge: "Workflow Optimized",
      code: "HUB.SYS.02",
      href: "https://deeplinks.mindtickle.com/ixOUpsCsd0b"
    },
    {
      id: "security",
      title: "Security & Compliance",
      description: "Navigate security reviews confidently with certified materials and SOC2 compliance records.",
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-500",
      accent: "emerald",
      badge: "Zero-Trust Verified",
      code: "HUB.SEC.03",
      href: "https://deeplinks.mindtickle.com/jutuTZ8shKb"
    },
    {
      id: "resources",
      title: "Onboarding Resources",
      description: "Access battlecards, SDR-to-AE handoff templates, current pitch decks, and roadmaps.",
      icon: FileText,
      color: "from-amber-500 to-orange-500",
      accent: "amber",
      badge: "Resource Repository",
      code: "HUB.RES.04",
      href: "https://deeplinks.mindtickle.com/RqCuZYJbf0b"
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const toggleMeddpicc = (key: string) => {
    setMeddpiccStatus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="access-hubs" className="scroll-mt-24 space-y-10 py-4">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-mt-navy tracking-tight font-sans">
            Revenue Access Hubs
          </h2>
          <p className="text-slate-500 text-sm max-w-xl">
            Unified access points to critical revenue systems, buyer intelligence models, compliance registers, and live onboarding assets.
          </p>
        </div>
      </div>

      {/* Grid of Hub Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hubs.map((hub) => {
          const Icon = hub.icon;
          const isSelected = activeHub === hub.id;

          if (hub.href) {
            return (
              <a
                key={hub.id}
                href={hub.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between bg-mt-navy text-white rounded-2xl p-6 border transition-all duration-300 cursor-pointer overflow-hidden border-slate-800 hover:border-mt-orange/50 hover:shadow-lg hover:shadow-mt-navy/10"
              >
                {/* Background gradient effects */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hub.color} opacity-10 rounded-full blur-2xl pointer-events-none group-hover:opacity-20 transition-opacity`} />

                {/* Icon and Title */}
                <div className="space-y-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hub.color} p-0.5 shadow-md group-hover:scale-105 transition-transform`}>
                    <div className="w-full h-full bg-mt-navy rounded-[10px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-200" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-mt-orange transition-colors flex items-center gap-1.5">
                      {hub.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-3">
                      {hub.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer interaction */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    Explore Repository
                  </span>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform" />
                  </div>
                </div>
              </a>
            );
          }

          return (
            <div
              key={hub.id}
              onClick={() => setActiveHub(isSelected ? null : hub.id)}
              className={`group relative flex flex-col justify-between bg-slate-900 text-white rounded-2xl p-6 border transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected 
                  ? `border-slate-700 shadow-xl ring-2 ring-indigo-500/50 scale-[1.02] bg-slate-900`
                  : `border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/10`
              }`}
            >
              {/* Background gradient effects */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hub.color} opacity-10 rounded-full blur-2xl pointer-events-none group-hover:opacity-20 transition-opacity`} />
              
              {/* Futuristic metadata tags */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="font-mono text-[9px] text-slate-500 tracking-wider">
                  [{hub.code}]
                </span>
                <span className="text-[8px] font-mono tracking-widest text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 uppercase">
                  {hub.badge}
                </span>
              </div>

              {/* Icon and Title */}
              <div className="space-y-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hub.color} p-0.5 shadow-md group-hover:scale-105 transition-transform`}>
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-200" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors flex items-center gap-1.5">
                    {hub.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-400" />
                  </h3>
                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-3">
                    {hub.description}
                  </p>
                </div>
              </div>

              {/* Card Footer interaction */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                <span className="text-[10px] font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  {isSelected ? "Click to Close" : "Explore Repository"}
                </span>
                <div className="flex items-center gap-2">
                  <ChevronRight className={`w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform ${isSelected ? "rotate-90 text-indigo-400" : ""}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Panel based on active selection */}
      {activeHub && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden animate-in fade-in duration-300">
          {/* Holographic grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />
          
          <button
            onClick={() => setActiveHub(null)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-mt-navy border border-slate-800 hover:border-mt-orange hover:bg-slate-850 text-slate-400 hover:text-white transition-colors"
          >
            <span className="sr-only">Close</span>
            <span className="text-xs px-1 font-mono">ESC ×</span>
          </button>

          {/* HUB 1: ICP & Buyer Personas details */}
          {activeHub === "icp" && (
            <div className="space-y-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    ICP & Buyer Personas Deep-Dive
                  </h3>
                  <p className="text-xs text-slate-400">
                    Interactive stakeholder matrices, strategic value-prop maps, and customer pain telemetry.
                  </p>
                  <div className="pt-1.5">
                    <a
                      href="https://deeplinks.mindtickle.com/rcz7shMA1Zb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-[11px] font-bold text-cyan-400 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch Verified Mindtickle ICP Repository ↗</span>
                    </a>
                  </div>
                </div>
                {/* Filter buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {(["all", "cro", "enablement", "revops"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setPersonaFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                        personaFilter === filter
                          ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-400"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {filter.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Persona Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {(personaFilter === "all" || personaFilter === "cro") && (
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 bg-cyan-950/60 border border-cyan-800/40 rounded text-[9px] font-mono text-cyan-400 font-bold">CRO (CHIEF REVENUE OFFICER)</span>
                        <span className="text-[10px] font-mono text-slate-500">Tier-1 Exec</span>
                      </div>
                      <h4 className="font-bold text-base text-white">Chief Revenue Officer</h4>
                      <div className="space-y-2 text-xs">
                        <p className="text-slate-300"><strong className="text-cyan-400">Core Motivator:</strong> Driving total contract value (TCV), increasing sales team efficiency, accelerating quota attainment, and predicting pipeline revenue with perfect precision.</p>
                        <p className="text-slate-300"><strong className="text-cyan-400">Main Pain Point:</strong> Long ramp time for new Account Executives (currently takes 6+ months), and high rep turnover because of poor enablement resources.</p>
                      </div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono mt-4">
                      <span className="text-cyan-400 font-bold block mb-1">💡 Golden pitch statement:</span>
                      "Mindtickle helps cut your AE ramp time by up to 35% through continuous automated coaching, letting your team close more deals sooner."
                    </div>
                  </div>
                )}

                {(personaFilter === "all" || personaFilter === "enablement") && (
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 bg-indigo-950/60 border border-indigo-800/40 rounded text-[9px] font-mono text-indigo-400 font-bold">VP OF ENABLEMENT</span>
                        <span className="text-[10px] font-mono text-slate-500">Program Lead</span>
                      </div>
                      <h4 className="font-bold text-base text-white">VP of Sales Enablement</h4>
                      <div className="space-y-2 text-xs">
                        <p className="text-slate-300"><strong className="text-indigo-400">Core Motivator:</strong> Ensuring global adoption of methodology (MEDDPICC), verifying curriculum certification rates, and tracking individual skill progression metrics.</p>
                        <p className="text-slate-300"><strong className="text-indigo-400">Main Pain Point:</strong> No clear visibility into which enablement content actually drives closed-won deals; hard to prove ROI to executive board.</p>
                      </div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono mt-4">
                      <span className="text-indigo-400 font-bold block mb-1">💡 Golden pitch statement:</span>
                      "Map learning milestones directly to Salesforce deal data to clearly demonstrate the revenue contribution of each training block."
                    </div>
                  </div>
                )}

                {(personaFilter === "all" || personaFilter === "revops") && (
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 bg-purple-950/60 border border-purple-800/40 rounded text-[9px] font-mono text-purple-400 font-bold">REVOPS DIRECTOR</span>
                        <span className="text-[10px] font-mono text-slate-500">Operations</span>
                      </div>
                      <h4 className="font-bold text-base text-white">Director of Revenue Operations</h4>
                      <div className="space-y-2 text-xs">
                        <p className="text-slate-300"><strong className="text-purple-400">Core Motivator:</strong> Consolidating high-cost tech stacks, building real-time data syncs, and enforcing clean CRM pipeline data discipline.</p>
                        <p className="text-slate-300"><strong className="text-purple-400">Main Pain Point:</strong> Tool bloat. Reps must context-switch between 6 different platforms, resulting in lost data and poor sales hygiene.</p>
                      </div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono mt-4">
                      <span className="text-purple-400 font-bold block mb-1">💡 Golden pitch statement:</span>
                      "Unify practice exercises, AI coaching, call recording analysis, and CRM logs under one robust console to eliminate tool fatigue."
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HUB 2: Tools & Processes details */}
          {activeHub === "tools" && (
            <div className="space-y-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Settings className="w-5 h-5 text-indigo-400" />
                    Tools & Processes Playbook
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Synchronized pipelines, sales methodologies, and live MEDDPICC framework tracking.
                  </p>
                </div>
                <div className="bg-slate-905 border border-slate-800 rounded-lg p-2 flex items-center gap-1 text-[11px] font-mono text-indigo-400">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  <span>MEDDPICC Qualification Engine Active</span>
                </div>
              </div>

              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4 space-y-4">
                  <h4 className="text-sm font-bold tracking-wider text-slate-400 uppercase font-mono">Our AE Tech Stack</h4>
                  <div className="space-y-2.5">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-mono text-xs font-black">SF</div>
                      <div>
                        <div className="text-xs font-bold text-white">Salesforce CRM</div>
                        <p className="text-[10px] text-slate-400">The central source of truth for deals.</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 font-mono text-xs font-black">GG</div>
                      <div>
                        <div className="text-xs font-bold text-white">Gong.io Portal</div>
                        <p className="text-[10px] text-slate-400">Call insights and competitor trackers.</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono text-xs font-black">MT</div>
                      <div>
                        <div className="text-xs font-bold text-white">Mindtickle Platform</div>
                        <p className="text-[10px] text-slate-400">Everboarding, pitch practice, roleplays.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MEDDPICC Interactive grid */}
                <div className="md:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">Interactive MEDDPICC Scorecard</h4>
                      <p className="text-[10px] text-slate-400">Qualify opportunities dynamically. Click metrics to change status.</p>
                    </div>
                    <span className="text-[10px] text-indigo-400 font-mono">
                      {Object.values(meddpiccStatus).filter(Boolean).length}/8 Qualified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries({
                      metrics: "Metrics",
                      buyer: "Economic Buyer",
                      criteria: "Decision Criteria",
                      process: "Decision Process",
                      paper: "Paper Process",
                      pain: "Identify Pain",
                      champion: "Champion",
                      competition: "Competition"
                    }).map(([key, label]) => {
                      const active = meddpiccStatus[key];
                      return (
                        <button
                          key={key}
                          onClick={() => toggleMeddpicc(key)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                            active
                              ? "bg-indigo-950/40 border-indigo-500/60 text-white"
                              : "bg-slate-950 border-slate-800/80 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                          }`}
                        >
                          <span className={`text-[9px] font-mono font-bold tracking-wider uppercase ${active ? "text-indigo-400" : "text-slate-600"}`}>
                            {key.toUpperCase()}
                          </span>
                          <div className="flex items-center justify-between w-full mt-2">
                            <span className="text-xs font-extrabold truncate">{label}</span>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] ${
                              active ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-600"
                            }`}>
                              {active ? <Check className="w-2.5 h-2.5" /> : "−"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HUB 3: Security & Compliance details */}
          {activeHub === "security" && (
            <div className="space-y-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Security, Trust & CCPA Compliance
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Zero-Trust enterprise certification, SOC 2 status checks, and data processing matrices.
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-950/60 border border-emerald-800/50 rounded-lg text-emerald-400 font-mono text-[10px]">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>REGIONAL HOSTING PROVISIONED: US-EAST-1</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <LockKeyhole className="w-4 h-4" />
                    <h4 className="font-bold text-sm text-white">Security Credentials</h4>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Mindtickle maintains continuous security certifications representing top-tier enterprise guidelines to ease the burden of buyer security questionnaires.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-400 pt-1 font-mono">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> SOC 2 Type II Certified</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> GDPR & CCPA Compliant</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> HIPAA Compliant Architecture</li>
                  </ul>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Database className="w-4 h-4" />
                    <h4 className="font-bold text-sm text-white">Data Privacy Policy</h4>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    All client data in transit is encrypted using TLS 1.3, and AES-256 for data at rest. We support full custom data deletion keys and robust database partitioning.
                  </p>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Active SLA Rate: 99.99%</span>
                    <span className="text-emerald-400 text-[9px] animate-pulse">● SECURE</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-slate-200">Customer Facing Security Materials</h4>
                    <p className="text-xs text-slate-400">Send these vetted PDFs to procurement officers during deal qualification.</p>
                  </div>
                  <div className="space-y-2 pt-2">
                    <button 
                      onClick={() => alert("Mock PDF generated: security_nda_form_v5.pdf")}
                      className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs rounded-xl font-mono flex items-center justify-between px-3 transition-colors text-slate-300"
                    >
                      <span>security_nda_form.pdf</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </button>
                    <button 
                      onClick={() => alert("Mock link copied to clipboard: trust_portal_link_mindtickle_sso")}
                      className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs rounded-xl font-mono flex items-center justify-between px-3 transition-colors text-slate-300"
                    >
                      <span>trust_portal_handbook.pdf</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HUB 4: Onboarding Resources details */}
          {activeHub === "resources" && (
            <div className="space-y-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    AE Onboarding Resources & Vault
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Download core templates, view latest roadmaps, and read battlecards to win competitor shootouts.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
                  LATEST_SYNC_TIME: TODAY
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">High Priority Materials</h4>
                  <div className="space-y-2">
                    {[
                      { id: "deck", name: "Mindtickle Core Customer Pitch Deck v4.2", size: "14.5 MB", format: "PPTX" },
                      { id: "handoff", name: "SDR-to-AE Qualified Opportunity Handoff Template", size: "1.2 MB", format: "DOCX" },
                      { id: "roadmap", name: "Mindtickle Consolidated Product Roadmap 2026", size: "8.9 MB", format: "PDF" },
                      { id: "competitor", name: "Competitor Battlecard Quick Reference Index", size: "4.7 MB", format: "PDF" }
                    ].map((file) => (
                      <div key={file.id} className="p-3 bg-slate-900/80 border border-slate-800/80 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
                            {file.format}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">{file.name}</div>
                            <div className="text-[10px] font-mono text-slate-500">{file.size}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleCopy(`https://mindtickle.internal/assets/${file.id}_download_redirect`, file.id)}
                            className="p-1.5 bg-slate-950 rounded hover:bg-slate-800 border border-slate-800/60 text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-mono"
                          >
                            {copiedLink === file.id ? "Copied!" : "Copy URL"}
                          </button>
                          <button
                            onClick={() => alert(`Initiating mock download for: ${file.name}`)}
                            className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[10px] transition-colors flex items-center gap-1 font-mono"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-sm text-white">Suggested Self-Paced Learning Path</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    While pursuing your week-by-week timeline milestones, we suggest reviewing these self-study video modules in the Mindtickle LMS platform.
                  </p>
                  
                  <div className="space-y-3 pt-1">
                    <div className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Value Selling & Quantified ROI Calculation</div>
                        <p className="text-[10px] text-slate-400">Duration: 45 min • Recommended in Week 3</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Advanced Enterprise Negotiation & Procurement Playbook</div>
                        <p className="text-[10px] text-slate-400">Duration: 60 min • Recommended in Week 4</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-400">Tackling Security Assessments with our Trust Center API</div>
                        <p className="text-[10px] text-slate-500">Duration: 30 min • Recommended in Week 5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </section>
  );
}
