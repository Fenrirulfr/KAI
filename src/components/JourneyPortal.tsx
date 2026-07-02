import React from "react";
import { 
  X as CloseIcon, 
  ArrowRight as ArrowRightIcon,
  BookOpen, 
  Users, 
  ShieldCheck, 
  Award,
  User,
  Cpu,
  Zap,
  Globe,
  Sparkles,
  Target as TargetIcon,
  RefreshCw,
  Network,
  BarChart3,
  Trophy as TrophyIcon,
  Star,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type JourneyTab = "story" | "leadership" | "values" | "authority";

interface JourneyPortalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: JourneyTab;
}

export default function JourneyPortal({ isOpen, onClose, initialTab = "story" }: JourneyPortalProps) {
  const [activeTab, setActiveTab] = React.useState<JourneyTab>(initialTab);

  React.useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [isOpen, initialTab]);

  const tabs = [
    { id: "story", label: "Company Story", icon: <BookOpen className="w-5 h-5" />, step: "01" },
    { id: "leadership", label: "Executive Leadership", icon: <Users className="w-5 h-5" />, step: "02" },
    { id: "values", label: "Core Values", icon: <ShieldCheck className="w-5 h-5" />, step: "03" },
    { id: "authority", label: "Industry Authority", icon: <Award className="w-5 h-5" />, step: "04" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-mt-navy/95 backdrop-blur-xl p-0 md:p-6"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="w-full h-full max-w-7xl bg-white rounded-none md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* Sidebar */}
          <aside className="w-full md:w-72 bg-slate-50 border-r border-slate-200 flex flex-col p-6 gap-8 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-mt-indigo/10 flex items-center justify-center text-mt-indigo">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-sm text-mt-indigo leading-tight uppercase tracking-tight">Seller Journey</h3>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Onboarding Path</p>
              </div>
            </div>

            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 relative">
              {/* Journey Path Line (Desktop) */}
              <div className="hidden md:block absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-bottom from-mt-indigo/40 via-mt-indigo/10 to-transparent z-0" />
              
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as JourneyTab)}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 relative z-10 whitespace-nowrap md:whitespace-normal shrink-0 ${
                    activeTab === tab.id
                      ? "text-mt-indigo font-bold border-l-4 border-mt-indigo bg-mt-indigo/5 shadow-sm"
                      : "text-slate-500 font-medium hover:bg-white hover:text-mt-navy"
                  }`}
                >
                  <span className={`${activeTab === tab.id ? "text-mt-indigo" : "text-slate-400"}`}>
                    {tab.icon}
                  </span>
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto hidden md:block">
              <button className="w-full py-3 px-4 border border-mt-indigo/20 rounded-xl text-mt-indigo font-black text-xs hover:bg-mt-indigo/5 transition-colors uppercase tracking-widest">
                View Milestones
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white overflow-y-auto relative">
            <div className="max-w-4xl mx-auto px-6 py-12 md:px-12">
              
              <AnimatePresence mode="wait">
                {activeTab === "story" && (
                  <motion.div 
                    key="story"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-4">
                      <span className="text-[10px] font-black tracking-[0.2em] text-mt-indigo uppercase">DECRYPTED PLATFORM ARCHIVE</span>
                      <h2 className="text-3xl md:text-4xl font-black text-mt-navy tracking-tight">Our Story: Defining Sales Readiness</h2>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        Founded in 2011, Mindtickle pioneered the Sales Readiness category. We realized that B2B selling had evolved from transactional relationships to deep, skill-intensive solution consultations. Simply giving sellers marketing collateral wasn't working. We built a platform designed to systematically measure and improve rep capability. Today, Mindtickle powers revenue productivity for over 500+ global enterprises. We believe that readiness is not a one-time onboarding event, but an ongoing 'everboarding' discipline that drives predictable, repeatable revenue growth.
                      </p>
                    </div>

                    <div className="w-full group cursor-pointer relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center shadow-lg hover:shadow-mt-indigo/10 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-mt-indigo/5 to-mt-orange/5" />
                      <div className="relative flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center text-mt-indigo group-hover:scale-110 transition-transform duration-300">
                          <div className="absolute inset-0 rounded-full bg-mt-indigo/20 animate-ping" />
                          <Play className="w-8 h-8 fill-mt-indigo ml-1" />
                        </div>
                        <span className="text-[10px] font-black tracking-[0.3em] text-mt-indigo uppercase">Watch Our Journey</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-black text-mt-navy tracking-tight">Key Milestones & Achievements</h3>
                      <div className="grid md:grid-cols-3 gap-6 relative">
                        {/* Connector line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-mt-indigo/30 via-mt-indigo/10 to-transparent -translate-y-1/2 z-0" />
                        
                        {[
                          { step: "01", label: "REVENUE OPTIMIZATION", desc: "Over $100B in revenue pipeline optimized", icon: <Zap className="w-4 h-4" /> },
                          { step: "02", label: "INDUSTRY RECOGNITION", desc: "Consistently recognized as a Category Leader by G2 and Gartner", icon: <Globe className="w-4 h-4" /> },
                          { step: "03", label: "GLOBAL REACH", desc: "Global presence across US, Europe, and Asia-Pacific", icon: <Sparkles className="w-4 h-4" /> }
                        ].map((m, idx) => (
                          <div key={idx} className="relative z-10 space-y-4">
                            <div className="w-10 h-10 rounded-full border border-mt-indigo bg-white text-mt-indigo flex items-center justify-center shadow-sm mx-auto md:mx-0">
                              {m.icon}
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                              <div className="text-xs font-black text-mt-indigo mb-1">{m.step}</div>
                              <div className="text-[10px] font-black text-mt-navy uppercase tracking-widest mb-2">{m.label}</div>
                              <p className="text-[11px] text-slate-500 leading-normal">{m.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "leadership" && (
                  <motion.div 
                    key="leadership"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-4">
                      <span className="text-[10px] font-black tracking-[0.2em] text-mt-indigo uppercase">DECRYPTED PLATFORM ARCHIVE</span>
                      <h2 className="text-3xl md:text-4xl font-black text-mt-navy tracking-tight">Leadership Insights: Meet the Founders</h2>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        Learn about the vision and foundational philosophy directly from our leadership pod.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {[
                        { 
                          name: "Krishna Depura", 
                          role: "CO-FOUNDER & CEO", 
                          quote: "Revenue readiness is the ultimate competitive moat. When your reps know more, consult better, and adapt faster than competitors, you win.",
                          icon: <User className="w-6 h-6" />
                        },
                        { 
                          name: "Deepak Diwakar", 
                          role: "CO-FOUNDER & CTO", 
                          quote: "We don't build software just for compliance training; we build highly interactive intelligent engines that actively shape human potential and mastery.",
                          icon: <Cpu className="w-6 h-6" />
                        }
                      ].map((leader, idx) => (
                        <div key={idx} className="bg-slate-50/50 p-8 rounded-3xl border border-mt-indigo/10 shadow-sm space-y-6 relative group hover:bg-white transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-mt-indigo/10 flex items-center justify-center text-mt-indigo group-hover:bg-mt-indigo group-hover:text-white transition-all">
                              {leader.icon}
                            </div>
                            <div>
                              <h4 className="font-black text-mt-navy text-lg">{leader.name}</h4>
                              <p className="text-[10px] text-mt-indigo font-black tracking-widest">{leader.role}</p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 italic leading-relaxed relative pl-4 border-l-2 border-mt-indigo/20">
                            "{leader.quote}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "values" && (
                  <motion.div 
                    key="values"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="space-y-4">
                      <span className="text-[10px] font-black tracking-[0.2em] text-mt-indigo uppercase">FOUNDATIONAL CULTURE</span>
                      <h2 className="text-3xl md:text-4xl font-black text-mt-navy tracking-tight leading-tight">Calibrating the Future of <br/>Sales Readiness</h2>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        At Mindtickle, our culture is designed around speed, customer impact, and continuous skill calibration. Here are the 4 core pillars that guide every decision.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { title: "Customer Obsession", desc: "We win when our clients' sales reps are ready and winning in the field. Every line of code and every enablement path is built for their success.", icon: <TargetIcon className="w-8 h-8" />, color: "mt-indigo" },
                        { title: "Continuous Everboarding", desc: "Readiness isn't a one-time onboarding milestone; it is an ongoing daily discipline of calibration and mastery.", icon: <RefreshCw className="w-8 h-8" />, color: "mt-indigo" },
                        { title: "One Team Alignment", desc: "Cross-functional synergy between sales, marketing, and product creates a unified front that drives market dominance.", icon: <Network className="w-8 h-8" />, color: "mt-indigo" },
                        { title: "Data-Driven Excellence", desc: "Using quantitative readiness scores and smart voice analysis to validate rep capability through cold, hard data.", icon: <BarChart3 className="w-8 h-8" />, color: "mt-indigo" }
                      ].map((pillar, idx) => (
                        <div key={idx} className="bg-slate-50 p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden group hover:bg-white hover:shadow-xl hover:shadow-mt-indigo/5 transition-all duration-500 border border-transparent hover:border-mt-indigo/10">
                          <div className={`w-14 h-14 rounded-2xl bg-mt-indigo/10 flex items-center justify-center text-mt-indigo group-hover:bg-mt-indigo group-hover:text-white transition-all`}>
                            {pillar.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-mt-navy mb-3">{pillar.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                          </div>
                          <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-mt-indigo">
                            {React.cloneElement(pillar.icon as React.ReactElement, { className: "w-32 h-32" })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "authority" && (
                  <motion.div 
                    key="authority"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="text-center space-y-4">
                      <span className="inline-block px-3 py-1 bg-mt-indigo/5 text-mt-indigo border border-mt-indigo/20 rounded-full text-[10px] font-black tracking-widest uppercase">HERITAGE & IMPACT</span>
                      <h2 className="text-3xl md:text-4xl font-black text-mt-navy tracking-tight">Our Heritage: Industry Authority</h2>
                      <p className="text-slate-600 leading-relaxed text-sm max-w-2xl mx-auto">
                        Leading the evolution of modern sales enablement through deep technology and proven data science.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 shadow-sm space-y-10">
                      <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/3 space-y-6">
                          <h3 className="text-xl font-black text-mt-navy">Trusted Global Brand Authority</h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            We support sales excellence for over 500+ premium enterprises globally, providing deep learning systems and live call-coaching integration software.
                          </p>
                          <div className="flex gap-10">
                            <div>
                              <div className="text-2xl font-black text-mt-indigo tracking-tight">500+</div>
                              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Global Enterprises</div>
                            </div>
                            <div>
                              <div className="text-2xl font-black text-mt-indigo tracking-tight">98%</div>
                              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Retention Rate</div>
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                          {["CISCO", "databricks", "snowflake", "splunk>", "PaloAlto", "cloudera", "NUTANIX", "DocuSign"].map((brand, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-center grayscale hover:grayscale-0 hover:border-mt-indigo/30 hover:bg-mt-indigo/[0.02] transition-all shadow-sm">
                              <span className="text-[10px] font-black text-slate-400 group-hover:text-mt-indigo tracking-tight">{brand}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { title: "Leader in Sales Readiness", desc: "Systematically recognized globally for setting the gold standard in seller readiness.", icon: <TrophyIcon className="w-8 h-8" /> },
                        { title: "#1 Sales Onboarding", desc: "Highest customer satisfaction and ease-of-use scores on G2 Crowd assessments.", icon: <Award className="w-8 h-8" /> },
                        { title: "Gold Stevie Award", desc: "Awarded for premier performance and product design excellence in training software.", icon: <Star className="w-8 h-8" /> }
                      ].map((award, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-mt-indigo/30 transition-all duration-300">
                          <div className="w-16 h-16 bg-mt-indigo/5 rounded-full flex items-center justify-center mb-6 text-mt-indigo group-hover:scale-110 transition-transform">
                            {award.icon}
                          </div>
                          <h4 className="text-sm font-black text-mt-navy mb-3">{award.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{award.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-mt-indigo rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-mt-indigo/20 text-white">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-black">Ready to master the platform?</h2>
                        <p className="text-sm text-white/80 max-w-lg">
                          The next chapter of your onboarding journey will dive deep into the specific OS tools you'll use daily.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
                        <button className="bg-white text-mt-indigo px-8 py-3 rounded-xl font-black text-xs hover:bg-slate-50 transition-colors shadow-lg uppercase tracking-widest">
                          Begin Next Chapter
                        </button>
                        <button className="border border-white/30 text-white px-8 py-3 rounded-xl font-black text-xs hover:bg-white/10 transition-colors uppercase tracking-widest">
                          Review Previous
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
