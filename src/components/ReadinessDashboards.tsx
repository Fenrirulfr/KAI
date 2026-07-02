import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Award, 
  Users, 
  Zap, 
  BarChart4, 
  AlertCircle, 
  Check, 
  ChevronRight, 
  MessageSquare, 
  ShieldAlert,
  Search,
  Filter,
  ArrowRight,
  TrendingDown,
  RefreshCw,
  UserCheck,
  Activity,
  Sparkles,
  ChevronDown,
  ChevronUp,
  User
} from "lucide-react";

interface ReadinessDashboardsProps {
  userName: string;
}

interface Proficiency {
  stage: string;
  lvl: "Expert" | "Proficient" | "Developing" | "Not Started";
  pct: number;
  color: string;
  bgLight: string;
  textCol: string;
}

export interface LearnerRecord {
  id: string;
  name: string;
  email?: string;
  group: string;
  role: string;
  industry?: string;
  scores: number[]; // [Outreach, Discovery, Demo, Exec Pitch, Negotiation, Close]
  onboardingCount?: number; // Phase 0 completed out of 4
  phase2Count?: number; // Phase 2 completed out of 5
  quizScore?: number; // Phase 2 Assessment Quiz percentage score (0-100)
  quizStatus?: "Passed" | "Conditional" | "Failed" | "Not Attempted";
  activities: string;
  dwp: number;
  status: "ready" | "on_track" | "at_risk" | "intervention";
  isCurrentUser?: boolean;
  profileSummary?: string;
  lastUpdated?: string;
}

const computeLearnerMetrics = (
  scores: number[], 
  onboardingCount: number = 4, 
  phase2Count: number = 5, 
  quizScore: number = 85
) => {
  const activeScores = scores.filter(s => s > 0);
  const stageAvg = activeScores.length > 0 
    ? Math.round(activeScores.reduce((a, b) => a + b, 0) / activeScores.length) 
    : 0;
  
  const totalMods = onboardingCount + phase2Count;
  const modPct = Math.round((totalMods / 9) * 100);
  const assessPct = quizScore > 0 ? quizScore : (activeScores.length > 0 ? stageAvg : 60);

  // Dynamic DWP Formula: 60% Stage Simulation Avg + 25% Assessment Quiz Score + 15% Curriculum Completion Pct
  const dwp = Math.min(100, Math.round(
    (stageAvg * 0.60) + (assessPct * 0.25) + (modPct * 0.15)
  ));

  const quizStatus: "Passed" | "Conditional" | "Failed" | "Not Attempted" = 
    quizScore >= 80 ? "Passed" : quizScore >= 60 ? "Conditional" : quizScore > 0 ? "Failed" : "Not Attempted";

  const activities = `${activeScores.length}/6 Sims · ${totalMods}/9 Mods`;
  
  let status: "ready" | "on_track" | "at_risk" | "intervention" = "on_track";
  const minScore = activeScores.length > 0 ? Math.min(...activeScores) : 0;
  if (activeScores.length === 0 || totalMods < 3) {
    status = "at_risk";
  } else if (stageAvg >= 80 && minScore >= 70 && quizScore >= 80 && totalMods >= 8) {
    status = "ready";
  } else if (stageAvg >= 68 && minScore >= 58 && quizScore >= 65) {
    status = "on_track";
  } else if (stageAvg >= 55 || minScore >= 50) {
    status = "at_risk";
  } else {
    status = "intervention";
  }

  return { stageAvg, modPct, assessPct, dwp, activities, quizStatus, status };
};

const getLearnerStatus = (scores: number[], modPct?: number, quizScore?: number): "ready" | "on_track" | "at_risk" | "intervention" => {
  const { status } = computeLearnerMetrics(scores, Math.round((modPct || 100) * 4 / 100), Math.round((modPct || 100) * 5 / 100), quizScore || 80);
  return status;
};

interface SellerDeal {
  name: string;
  sub: string;
  stages: number[]; // Scores for Outreach, Discovery, Demo, Exec, Neg, Close
  dwp: number;
}

const SELLER_DEALS: SellerDeal[] = [
  { name: "Deal 1 — Software Simulation", sub: "Pressure test", stages: [82, 88, 74, 68, 0, 0], dwp: 62 },
  { name: "Deal 2 — Pharma Simulation", sub: "Pressure test", stages: [70, 58, 0, 0, 0, 0], dwp: 48 },
  { name: "Cobalt Systems", sub: "Live · $48K", stages: [80, 84, 78, 72, 42, 0], dwp: 58 },
  { name: "Northwind Software", sub: "Live · demo stage", stages: [86, 90, 0, 0, 0, 0], dwp: 71 }
];

const STAGE_NAMES = ["Cold Call", "Discovery", "Demo", "Exec Pitch", "Negotiation", "Close"];

const GAP_DATA: Record<string, { gap: string; rec: string }> = {
  "2-4": {
    gap: "Negotiation scored 42% vs 70% benchmark. In your last procurement call, you offered a 15% discount without requesting anything in return.",
    rec: "Revisit the Give-to-Get matrix. Always trade a concession for multi-year, case-study rights, or expanded scope."
  },
  "0-3": {
    gap: "Exec Pitch scored 68% — just below benchmark. Your pitch ran past the buyer's 7-minute limit and lost focus on the COI.",
    rec: "Practice the 10-minute pitch compression drill. Lead with the dollar number from discovery."
  },
  "1-1": {
    gap: "Discovery scored 58% vs 70%. COI missed the regulatory-risk arm specific to pharma.",
    rec: "Review the Pharma COI calculator — always include the compliance/audit exposure alongside lost launch weeks."
  }
};

const getReadinessBadge = (score: number) => {
  if (score >= 80) {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md text-center max-w-full whitespace-nowrap tracking-tight shadow-xs">
        Ready to Outsell
      </span>
    );
  } else if (score >= 65) {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-50 border border-teal-200 rounded-md text-center max-w-full whitespace-nowrap tracking-tight shadow-xs">
        Ready to Sell
      </span>
    );
  } else if (score >= 50) {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 rounded-md text-center max-w-full whitespace-nowrap tracking-tight shadow-xs">
        Almost Ready
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold text-rose-800 bg-rose-50 border border-rose-200 rounded-md text-center max-w-full whitespace-nowrap tracking-tight shadow-xs">
        Needs Work
      </span>
    );
  }
};

export default function ReadinessDashboards({ userName }: ReadinessDashboardsProps) {
  const [activeDashTab, setActiveDashTab] = useState<"seller" | "manager" | "admin">("seller");
  
  // Track expanded cells for deal stages (represented by e.g. "dealIdx-stageIdx" key)
  const [expandedGaps, setExpandedGaps] = useState<Record<string, boolean>>({
    "2-4": true // default open to guide user
  });

  // Dynamic state for seller deals
  const [sellerDeals, setSellerDeals] = useState<any[]>([]);

  // Real-time state of all learners across the organization
  const [allLearners, setAllLearners] = useState<LearnerRecord[]>([]);
  const [dynamicProficiencies, setDynamicProficiencies] = useState<Proficiency[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("ALL");
  const [expandedLearnerId, setExpandedLearnerId] = useState<string | null>("current_user");
  const [isSyncing, setIsSyncing] = useState(false);

  const loadAllData = () => {
    try {
      const saasSaved = localStorage.getItem("mt_saas_scores");
      const pharmaSaved = localStorage.getItem("mt_pharma_scores");
      
      const saasStages: number[] = saasSaved ? JSON.parse(saasSaved) : [82, 88, 74, 68, 0, 0];
      const pharmaStages: number[] = pharmaSaved ? JSON.parse(pharmaSaved) : [70, 58, 0, 0, 0, 0];

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

      setSellerDeals([
        { name: "Deal 1 — Software Simulation", sub: "Pressure test", stages: saasStages, dwp: getDwp(saasStages, "saas") },
        { name: "Deal 2 — Pharma Simulation", sub: "Pressure test", stages: pharmaStages, dwp: getDwp(pharmaStages, "pharma") },
        { name: "Cobalt Systems", sub: "Live · $48K", stages: [80, 84, 78, 72, 42, 0], dwp: 58 },
        { name: "Northwind Software", sub: "Live · demo stage", stages: [86, 90, 0, 0, 0, 0], dwp: 71 }
      ]);

      // Calculate current user's combined stage scores
      const combinedStageScores = saasStages.map((s, i) => Math.max(s, pharmaStages[i] || 0));
      
      let currentUserRole = "Account Executive";
      let currentUserIndustry = "B2B SaaS & Enterprise";
      try {
        const kaiStateStr = localStorage.getItem("kai_agent_state");
        if (kaiStateStr) {
          const kaiStateObj = JSON.parse(kaiStateStr);
          if (kaiStateObj.learner_profile?.role) currentUserRole = kaiStateObj.learner_profile.role;
          if (kaiStateObj.learner_profile?.industry) currentUserIndustry = kaiStateObj.learner_profile.industry;
        }
      } catch (e) {}

      // Calculate real-time onboarding & Phase 2 completion counts for current user
      let currentOnboardingCount = 0;
      try {
        const obTasksStr = localStorage.getItem("mt_onboarding_tasks");
        if (obTasksStr) {
          const obTasks: string[] = JSON.parse(obTasksStr);
          const coreIds = ["journey-company-story", "journey-exec-leadership", "journey-core-values", "journey-industry-activity"];
          currentOnboardingCount = coreIds.filter(id => obTasks.includes(id)).length;
        } else {
          currentOnboardingCount = 4; // default initial state
        }
      } catch (e) { currentOnboardingCount = 4; }

      let currentPhase2Count = 0;
      try {
        const p2Str = localStorage.getItem("mt_phase2_completed");
        if (p2Str) {
          const p2: string[] = JSON.parse(p2Str);
          const p2Ids = ["territory-scan", "buying-committee", "product-deep-dive", "crm-sop", "selling-motion"];
          currentPhase2Count = p2Ids.filter(id => p2.includes(id)).length;
        } else {
          currentPhase2Count = 0;
        }
      } catch (e) { currentPhase2Count = 0; }

      let currentQuizScore = 0;
      try {
        const quizStr = localStorage.getItem("mt_quiz_score");
        if (quizStr) {
          currentQuizScore = Number(quizStr);
        } else if (currentPhase2Count >= 5) {
          currentQuizScore = 88;
        } else if (currentPhase2Count > 0) {
          currentQuizScore = 72;
        } else {
          currentQuizScore = 0;
        }
      } catch (e) { currentQuizScore = 0; }

      const currentMetrics = computeLearnerMetrics(combinedStageScores, currentOnboardingCount, currentPhase2Count, currentQuizScore);

      const currentUserLearner: LearnerRecord = {
        id: "current_user",
        name: userName || "Devdatta Jujare",
        email: (userName || "devdatta.jujare@mindtickle.com").toLowerCase().replace(/\s+/g, ".") + "@mindtickle.com",
        group: `Active Session · ${currentUserIndustry}`,
        role: currentUserRole,
        industry: currentUserIndustry,
        scores: combinedStageScores,
        onboardingCount: currentOnboardingCount,
        phase2Count: currentPhase2Count,
        quizScore: currentQuizScore,
        quizStatus: currentMetrics.quizStatus,
        activities: currentMetrics.activities,
        dwp: currentMetrics.dwp,
        status: currentMetrics.status,
        isCurrentUser: true,
        profileSummary: `Live interactive telemetry from your current session in ElevateOS™. Role: ${currentUserRole}.`,
        lastUpdated: "Just now (Live Sync)"
      };

      // Organization baseline cohort (real-time synchronized with explicit assessment telemetry)
      const defaultCohort: LearnerRecord[] = [
        {
          id: "alex_m",
          name: "Alex Mercer",
          email: "alex.mercer@mindtickle.com",
          group: "Strategic Enterprise AE",
          role: "Enterprise AE",
          industry: "B2B SaaS & Enterprise",
          scores: [88, 92, 85, 80, 75, 82],
          onboardingCount: 4,
          phase2Count: 5,
          quizScore: 96,
          quizStatus: "Passed",
          activities: "6/6 Sims · 9/9 Mods",
          dwp: 88,
          status: "ready",
          isCurrentUser: false,
          profileSummary: "Calibrated veteran seller. Consistently exceeds win rate benchmarks across SaaS & Pharma.",
          lastUpdated: "2 mins ago"
        },
        {
          id: "sarah_c",
          name: "Sarah Connor",
          email: "sarah.connor@mindtickle.com",
          group: "New Hire Onboarding (Group C)",
          role: "Commercial AE",
          industry: "B2B SaaS & Enterprise",
          scores: [68, 55, 0, 0, 0, 0],
          onboardingCount: 2,
          phase2Count: 1,
          quizScore: 62,
          quizStatus: "Conditional",
          activities: "2/6 Sims · 3/9 Mods",
          dwp: 58,
          status: "at_risk",
          isCurrentUser: false,
          profileSummary: "New hire in week 1. Working on discovery objection handling and Cost of Inaction calculations.",
          lastUpdated: "12 mins ago"
        },
        {
          id: "suraj_s",
          name: "Suraj Sharma",
          email: "suraj.s@mindtickle.com",
          group: "Onboarding Group A",
          role: "Account Executive",
          industry: "Pharma & Life Sciences",
          scores: [85, 88, 70, 66, 45, 64],
          onboardingCount: 4,
          phase2Count: 4,
          quizScore: 78,
          quizStatus: "Conditional",
          activities: "6/6 Sims · 8/9 Mods",
          dwp: 72,
          status: "on_track",
          isCurrentUser: false,
          profileSummary: "Strong top-of-funnel discovery, but experiencing severe discount friction in procurement negotiation.",
          lastUpdated: "5 mins ago"
        },
        {
          id: "krishna_n",
          name: "Krishna Nair",
          email: "krishna.n@mindtickle.com",
          group: "Strategic Hires",
          role: "Senior AE",
          industry: "B2B SaaS & Enterprise",
          scores: [79, 82, 91, 55, 61, 88],
          onboardingCount: 4,
          phase2Count: 5,
          quizScore: 88,
          quizStatus: "Passed",
          activities: "6/6 Sims · 9/9 Mods",
          dwp: 79,
          status: "on_track",
          isCurrentUser: false,
          profileSummary: "Excellent demo stage execution. Coaching recommended on 7-minute executive pitch compression.",
          lastUpdated: "8 mins ago"
        },
        {
          id: "devang_p",
          name: "Devang Patel",
          email: "devang.p@mindtickle.com",
          group: "Onboarding Group B",
          role: "Mid-Market AE",
          industry: "Pharma & Life Sciences",
          scores: [92, 90, 65, 72, 38, 55],
          onboardingCount: 4,
          phase2Count: 4,
          quizScore: 74,
          quizStatus: "Conditional",
          activities: "6/6 Sims · 8/9 Mods",
          dwp: 68,
          status: "intervention",
          isCurrentUser: false,
          profileSummary: "Negotiation score (38%) triggered hard gate block. Enrolled in remediation micro-lesson.",
          lastUpdated: "1 min ago"
        },
        {
          id: "dev_v",
          name: "Dev Verma",
          email: "dev.v@mindtickle.com",
          group: "Onboarding Group A",
          role: "Account Executive",
          industry: "B2B SaaS & Enterprise",
          scores: [88, 85, 77, 68, 50, 70],
          onboardingCount: 4,
          phase2Count: 5,
          quizScore: 85,
          quizStatus: "Passed",
          activities: "6/6 Sims · 9/9 Mods",
          dwp: 76,
          status: "on_track",
          isCurrentUser: false,
          profileSummary: "Steady progression across all 6 stages. Close stage improving after value defense drill.",
          lastUpdated: "15 mins ago"
        },
        {
          id: "priya_s",
          name: "Priya Sharma",
          email: "priya.sharma@mindtickle.com",
          group: "Enterprise SaaS Cohort",
          role: "Enterprise AE",
          industry: "B2B SaaS & Enterprise",
          scores: [90, 85, 88, 82, 74, 80],
          onboardingCount: 4,
          phase2Count: 5,
          quizScore: 94,
          quizStatus: "Passed",
          activities: "6/6 Sims · 9/9 Mods",
          dwp: 85,
          status: "ready",
          isCurrentUser: false,
          profileSummary: "Top quartile performer. Mentoring peer cohort on Gong competitive reframing.",
          lastUpdated: "22 mins ago"
        },
        {
          id: "marcus_v",
          name: "Marcus Vance",
          email: "marcus.v@mindtickle.com",
          group: "Pharma Specialist Cohort",
          role: "Pharma Specialist",
          industry: "Pharma & Life Sciences",
          scores: [72, 80, 65, 70, 58, 62],
          onboardingCount: 4,
          phase2Count: 5,
          quizScore: 80,
          quizStatus: "Passed",
          activities: "6/6 Sims · 9/9 Mods",
          dwp: 71,
          status: "on_track",
          isCurrentUser: false,
          profileSummary: "Calibrated to Meridian Pharma persona. Requires coaching on MLR compliance audit trails.",
          lastUpdated: "18 mins ago"
        },
        {
          id: "james_r",
          name: "James Rodriguez",
          email: "james.r@mindtickle.com",
          group: "Commercial AE Cohort",
          role: "Commercial AE",
          industry: "B2B SaaS & Enterprise",
          scores: [65, 60, 58, 52, 40, 48],
          onboardingCount: 3,
          phase2Count: 2,
          quizScore: 54,
          quizStatus: "Failed",
          activities: "6/6 Sims · 5/9 Mods",
          dwp: 54,
          status: "intervention",
          isCurrentUser: false,
          profileSummary: "Struggling across discovery and negotiation. Recommended 1:1 intervention with sales manager.",
          lastUpdated: "3 mins ago"
        },
        {
          id: "elena_r",
          name: "Elena Rostova",
          email: "elena.r@mindtickle.com",
          group: "Strategic Hires",
          role: "Strategic AE",
          industry: "Pharma & Life Sciences",
          scores: [84, 86, 82, 78, 70, 75],
          onboardingCount: 4,
          phase2Count: 5,
          quizScore: 90,
          quizStatus: "Passed",
          activities: "6/6 Sims · 9/9 Mods",
          dwp: 81,
          status: "ready",
          isCurrentUser: false,
          profileSummary: "Rapid ramp trajectory. Finished all 6 simulation roleplays with zero conditional passes.",
          lastUpdated: "25 mins ago"
        },
        {
          id: "rachel_o",
          name: "Rachel Okafor",
          email: "rachel.o@mindtickle.com",
          group: "Onboarding Group B",
          role: "Mid-Market AE",
          industry: "B2B SaaS & Enterprise",
          scores: [80, 84, 76, 72, 65, 70],
          onboardingCount: 4,
          phase2Count: 4,
          quizScore: 82,
          quizStatus: "Passed",
          activities: "6/6 Sims · 8/9 Mods",
          dwp: 76,
          status: "on_track",
          isCurrentUser: false,
          profileSummary: "Preparing for final Close roleplay. High engagement with ElevateOS™ practice drills.",
          lastUpdated: "10 mins ago"
        }
      ];

      // Reconstruct defaultCohort metrics to ensure 100% mathematical consistency
      const calibratedCohort = defaultCohort.map(bl => {
        const met = computeLearnerMetrics(bl.scores, bl.onboardingCount || 4, bl.phase2Count || 5, bl.quizScore || 80);
        return {
          ...bl,
          dwp: met.dwp,
          activities: met.activities,
          quizStatus: met.quizStatus,
          status: met.status
        };
      });

      // Load master telemetry registry from localStorage if present
      let masterMap: Record<string, LearnerRecord> = {};
      try {
        const storedRegistry = localStorage.getItem("mt_all_learners_telemetry");
        if (storedRegistry) {
          const parsed = JSON.parse(storedRegistry);
          if (Array.isArray(parsed)) {
            parsed.forEach(p => { if (p && p.id) masterMap[p.id] = p; });
          }
        }
      } catch (e) {}

      // Seed baseline cohort into master map if not present
      calibratedCohort.forEach(bl => {
        if (!masterMap[bl.id] && !Object.values(masterMap).some(m => m.name.toLowerCase() === bl.name.toLowerCase())) {
          masterMap[bl.id] = bl;
        }
      });

      // Extract saved profiles from user switcher in localStorage and dynamically compute their scores and assessments
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("mt_save_")) {
          try {
            const email = key.replace("mt_save_", "");
            const data = JSON.parse(localStorage.getItem(key) || "{}");
            if (data.userName && data.userName !== userName) {
              const matchingBaseline = calibratedCohort.find(c => c.name.toLowerCase() === data.userName.toLowerCase() || c.email === email);
              
              let saas: number[] = data.saasScores || (matchingBaseline ? matchingBaseline.scores : null);
              let pharma: number[] = data.pharmaScores || (matchingBaseline ? matchingBaseline.scores : null);
              let combined: number[] = [70, 65, 0, 0, 0, 0];
              if (saas && pharma) {
                combined = saas.map((s, idx) => Math.max(s, pharma[idx] || 0));
              } else if (saas) {
                combined = saas;
              } else if (pharma) {
                combined = pharma;
              } else if (matchingBaseline) {
                combined = matchingBaseline.scores;
              } else {
                const tasks = data.completedTasks || [];
                combined = tasks.length >= 4 ? [88, 90, 82, 76, 70, 80] : tasks.length >= 2 ? [78, 80, 70, 62, 50, 60] : [70, 65, 0, 0, 0, 0];
              }

              let obCount = data.completedTasks ? data.completedTasks.length : (matchingBaseline ? matchingBaseline.onboardingCount : 4);
              let p2Count = data.phase2Completed ? data.phase2Completed.length : (matchingBaseline ? matchingBaseline.phase2Count : 4);
              let quiz = data.quizScore !== undefined && data.quizScore !== null ? Number(data.quizScore) : (matchingBaseline ? matchingBaseline.quizScore : (p2Count >= 5 ? 85 : p2Count > 0 ? 70 : 0));

              const computed = computeLearnerMetrics(combined, obCount, p2Count, quiz);

              const profileId = email || data.userName.toLowerCase().replace(/\s+/g, "_");
              masterMap[profileId] = {
                id: profileId,
                name: data.userName,
                email: email,
                group: matchingBaseline ? matchingBaseline.group : "User Switcher Profile",
                role: data.kaiState?.learner_profile?.role || (matchingBaseline ? matchingBaseline.role : "Account Executive"),
                industry: data.kaiState?.learner_profile?.industry || (matchingBaseline ? matchingBaseline.industry : "B2B SaaS & Enterprise"),
                scores: combined,
                onboardingCount: obCount,
                phase2Count: p2Count,
                quizScore: quiz,
                quizStatus: computed.quizStatus,
                activities: computed.activities,
                dwp: computed.dwp,
                status: computed.status,
                isCurrentUser: false,
                profileSummary: matchingBaseline ? matchingBaseline.profileSummary : `Saved local session profile from AI Studio user switcher (${email}).`,
                lastUpdated: "Stored Session"
              };
            }
          } catch (e) {}
        }
      }

      // Merge current active user into master map, overriding any old static record
      const curIdKey = Object.keys(masterMap).find(k => masterMap[k].name.toLowerCase() === (userName || "").toLowerCase() || (masterMap[k].email && masterMap[k].email === currentUserLearner.email)) || "current_user";
      masterMap[curIdKey] = currentUserLearner;

      const mergedRoster = Object.values(masterMap);
      setAllLearners(mergedRoster);

      try {
        localStorage.setItem("mt_all_learners_telemetry", JSON.stringify(mergedRoster));
        window.dispatchEvent(new Event("mt_telemetry_ready"));
      } catch (e) {}

      // Compute dynamic proficiencies for Seller View from active user's stage scores
      const stageNames = ["Outreach", "Discovery", "Demo", "Exec Pitch", "Negotiation", "Close"];
      const profs: Proficiency[] = stageNames.map((stg, idx) => {
        const pct = combinedStageScores[idx] || 0;
        let lvl: "Expert" | "Proficient" | "Developing" | "Not Started" = "Not Started";
        let color = "bg-slate-400";
        let bgLight = "bg-slate-50";
        let textCol = "text-slate-600";

        if (pct >= 80) {
          lvl = "Expert";
          color = "bg-teal-500";
          bgLight = "bg-teal-50";
          textCol = "text-teal-700";
        } else if (pct >= 65) {
          lvl = "Proficient";
          color = "bg-indigo-600";
          bgLight = "bg-indigo-50";
          textCol = "text-indigo-700";
        } else if (pct > 0) {
          lvl = "Developing";
          color = "bg-amber-500";
          bgLight = "bg-amber-50";
          textCol = "text-amber-700";
        }

        return { stage: stg, lvl, pct, color, bgLight, textCol };
      });

      setDynamicProficiencies(profs);
    } catch (e) {
      console.error("Error loading real-time learner dashboard data:", e);
    }
  };

  useEffect(() => {
    loadAllData();

    const handleUpdate = () => {
      loadAllData();
    };

    window.addEventListener("mt_scores_updated", handleUpdate);
    window.addEventListener("mt_phase2_updated", handleUpdate);
    window.addEventListener("mt_tasks_updated", handleUpdate);
    window.addEventListener("mt_telemetry_updated", handleUpdate);
    window.addEventListener("kai_state_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("mt_scores_updated", handleUpdate);
      window.removeEventListener("mt_phase2_updated", handleUpdate);
      window.removeEventListener("mt_tasks_updated", handleUpdate);
      window.removeEventListener("mt_telemetry_updated", handleUpdate);
      window.removeEventListener("kai_state_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [userName]);

  const handleManualSync = () => {
    setIsSyncing(true);
    loadAllData();
    setTimeout(() => setIsSyncing(false), 600);
  };

  const toggleGap = (dealIdx: number, stageIdx: number) => {
    const key = `${dealIdx}-${stageIdx}`;
    setExpandedGaps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const BENCHMARK = 70;

  return (
    <div className="space-y-10 font-sans">
      
      {/* Title block */}
      <div className="text-left max-w-2xl space-y-2">
        <span className="text-[10px] font-bold tracking-widest text-mt-navy uppercase font-mono block">
          Live Readiness Dashboards
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Readiness, Made Visible</h1>
        <p className="text-slate-500 text-sm">
          The same underlying data, framed for three audiences — each sees exactly what they need to act.
        </p>
      </div>

      {/* Role selection tab buttons */}
      <div className="flex flex-wrap justify-start gap-2 max-w-5xl">
        {[
          { id: "seller", label: "Seller View" },
          { id: "manager", label: "Manager View" },
          { id: "admin", label: "Enablement Admin View" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDashTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeDashTab === tab.id
                ? "bg-mt-navy text-white border-mt-navy shadow-md"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SELLER VIEW */}
      {activeDashTab === "seller" && (
        <div className="space-y-8 animate-fade-in max-w-5xl">
          
          <div className="bg-indigo-50/75 border-l-4 border-mt-indigo rounded-r-xl p-4 flex gap-3 text-sm text-slate-700 shadow-sm">
            <span className="text-lg">📊</span>
            <div>
              <strong>Your readiness at a glance:</strong> Top row is your speaking proficiency by stage. Below, each deal shows how you scored per stage against the success benchmark, plus your overall Deal Winning Probability. Click any highlighted stage to see gaps and how to close them.
            </div>
          </div>

          {/* Section: Speaking Proficiency strip */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
              Sales Readiness — Speaking Proficiency by Stage
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {dynamicProficiencies.map((prof) => (
                <div key={prof.stage} className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs space-y-2 relative overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="text-[10px] text-slate-500 font-bold">{prof.stage}</div>
                  
                  {/* Circular visual container */}
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-sm mx-auto shadow-sm transition-all duration-500 ${
                      prof.pct === 0 ? "bg-slate-300 text-slate-600" : ""
                    }`} 
                    style={{ backgroundColor: prof.pct > 0 ? (prof.pct >= 80 ? "#14B8A6" : prof.pct >= 65 ? "#4F46E5" : "#F59E0B") : undefined }}
                  >
                    {prof.pct}%
                  </div>

                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded ${prof.bgLight} ${prof.textCol}`}>
                    {prof.lvl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Deal-Wise Performance tables */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
                Deal-Wise Performance
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                score vs benchmark (marker = 70% benchmark). Click active stages for detail.
              </span>
            </div>

            <div className="space-y-4">
              {sellerDeals.map((deal, dIdx) => (
                <div key={deal.name} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  
                  {/* Table Row Header Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-1 bg-slate-900 text-white p-3 text-[10px] uppercase font-mono tracking-wider font-bold">
                    <div className="col-span-3 text-left">Deal / Account</div>
                    {STAGE_NAMES.map((stg) => (
                      <div key={stg} className="col-span-1.3 text-center">{stg}</div>
                    ))}
                    <div className="col-span-1.2 text-right">Win %</div>
                  </div>

                  {/* Table Row Content */}
                  <div className="grid grid-cols-2 lg:grid-cols-12 items-center p-4 lg:p-3 text-xs gap-3">
                    
                    {/* Deal info column */}
                    <div className="col-span-2 lg:col-span-3 text-left">
                      <div className="font-extrabold text-slate-800">{deal.name}</div>
                      <span className="text-[10px] text-slate-400 block">{deal.sub}</span>
                    </div>

                    {/* Stage cell scoring */}
                    {STAGE_NAMES.map((_, sIdx) => {
                      const score = deal.stages[sIdx];
                      const isNotStarted = score === 0;
                      const hasGap = GAP_DATA[`${dIdx}-${sIdx}`] !== undefined;
                      const key = `${dIdx}-${sIdx}`;
                      const isExpanded = expandedGaps[key] === true;

                      return (
                        <div 
                          key={sIdx} 
                          onClick={() => hasGap && toggleGap(dIdx, sIdx)}
                          className={`col-span-1 lg:col-span-1.3 text-center p-2 rounded-xl transition-colors ${
                            hasGap ? "cursor-pointer hover:bg-slate-50 border border-amber-200 bg-amber-50/10" : ""
                          }`}
                        >
                          {/* Label for mobile view */}
                          <span className="lg:hidden text-[9px] font-mono text-slate-400 block mb-1">
                            {STAGE_NAMES[sIdx]}
                          </span>

                          {isNotStarted ? (
                            <span className="text-slate-300 italic text-[11px]">Not started</span>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className={score >= BENCHMARK ? "text-teal-600 font-bold" : "text-amber-500 font-bold"}>
                                  {score}%
                                </span>
                                {hasGap && <span className="text-amber-500 text-[10px]">⚠️</span>}
                              </div>
                              
                              {/* Slide bar */}
                              <div className="w-full h-1 bg-slate-100 rounded-full relative overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${score >= BENCHMARK ? "bg-teal-500" : "bg-amber-500"}`} 
                                  style={{ width: `${score}%` }} 
                                />
                                <div className="absolute top-0 bottom-0 w-0.5 bg-slate-900" style={{ left: "70%" }} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Overall Win Percent Column */}
                    <div className="col-span-1 lg:col-span-1.2 text-right lg:pr-2">
                      <span className="lg:hidden text-[9px] font-mono text-slate-400 block mb-1">WIN %</span>
                      <span className={`text-lg font-black tracking-tight ${
                        deal.dwp >= 65 ? "text-teal-600" : deal.dwp >= 50 ? "text-amber-500" : "text-red-500"
                      }`}>
                        {deal.dwp}%
                      </span>
                    </div>

                  </div>

                  {/* Expanded Gap Panel */}
                  {STAGE_NAMES.map((_, sIdx) => {
                    const key = `${dIdx}-${sIdx}`;
                    const hasGap = GAP_DATA[key] !== undefined;
                    const isExpanded = expandedGaps[key] === true;

                    if (hasGap && isExpanded) {
                      return (
                        <div key={key} className="bg-amber-50/30 border-t border-amber-100 p-4 space-y-2 text-xs text-slate-700 animate-fade-in">
                          <div className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wide font-mono">
                            <span>⚠️ {STAGE_NAMES[sIdx]} Gap Identified</span>
                          </div>
                          
                          <div className="p-3 bg-red-50/70 text-red-950 rounded-xl border border-red-100/50 leading-relaxed">
                            <strong>Identified Friction:</strong> {GAP_DATA[key].gap}
                          </div>

                          <div className="p-3 bg-teal-50/60 text-teal-950 rounded-xl border border-teal-100/50 leading-relaxed">
                            <strong>Enablement Recommendation:</strong> {GAP_DATA[key].rec}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}

                </div>
              ))}
            </div>
          </div>

          {/* High polished SVG curve block */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="space-y-2 max-w-sm">
              <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-mt-indigo" />
                Sellers Competency Curve
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Visualizes your competency rating improvement (solid line) vs. the industry target baseline (dashed line).
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-[10px] text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-1 bg-mt-indigo rounded-full" />
                  <span>{userName}'s Rating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 border-t border-dashed border-slate-300" />
                  <span>Cohort Target Baseline</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-lg h-40">
              <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
                {/* Grids */}
                <line x1="30" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="140" x2="380" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                {/* Y Axis Labels */}
                <text x="5" y="24" className="text-[8px] font-mono fill-slate-400 font-bold">100%</text>
                <text x="5" y="64" className="text-[8px] font-mono fill-slate-400 font-bold">80%</text>
                <text x="5" y="104" className="text-[8px] font-mono fill-slate-400 font-bold">60%</text>
                <text x="5" y="144" className="text-[8px] font-mono fill-slate-400 font-bold">40%</text>

                {/* Baseline Path (Dashed) */}
                <path 
                  d="M30,120 L100,105 L170,90 L240,75 L310,65 L380,55" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="2" 
                  strokeDasharray="4"
                />

                {/* Seller Curve (Solid Indigo) */}
                <path 
                  d="M30,130 L100,100 L170,80 L240,50 L310,35 L380,22" 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />

                {/* Glow filter definition */}
                <defs>
                  <linearGradient id="curveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area Under Curve */}
                <path 
                  d="M30,130 L100,100 L170,80 L240,50 L310,35 L380,22 L380,140 L30,140 Z" 
                  fill="url(#curveGrad)"
                />

                {/* Curve nodes */}
                <circle cx="30" cy="130" r="3.5" className="fill-indigo-600 stroke-white stroke-2" />
                <circle cx="100" cy="100" r="3.5" className="fill-indigo-600 stroke-white stroke-2" />
                <circle cx="170" cy="80" r="3.5" className="fill-indigo-600 stroke-white stroke-2" />
                <circle cx="240" cy="50" r="3.5" className="fill-indigo-600 stroke-white stroke-2" />
                <circle cx="310" cy="35" r="3.5" className="fill-indigo-600 stroke-white stroke-2" />
                <circle cx="380" cy="22" r="3.5" className="fill-indigo-600 stroke-white stroke-2" />

                {/* X Axis Labels */}
                <text x="30" y="154" className="text-[8px] font-mono fill-slate-400 font-bold" textAnchor="middle">Wk 1</text>
                <text x="100" y="154" className="text-[8px] font-mono fill-slate-400 font-bold" textAnchor="middle">Wk 2</text>
                <text x="170" y="154" className="text-[8px] font-mono fill-slate-400 font-bold" textAnchor="middle">Wk 3</text>
                <text x="240" y="154" className="text-[8px] font-mono fill-slate-400 font-bold" textAnchor="middle">Wk 4</text>
                <text x="310" y="154" className="text-[8px] font-mono fill-slate-400 font-bold" textAnchor="middle">Wk 5</text>
                <text x="380" y="154" className="text-[8px] font-mono fill-slate-400 font-bold" textAnchor="middle">Wk 6</text>
              </svg>
            </div>
          </div>

        </div>
      )}

      {/* MANAGER VIEW */}
      {activeDashTab === "manager" && (
        <div className="space-y-8 animate-fade-in max-w-5xl">
          
          <div className="bg-indigo-50/75 border-l-4 border-mt-indigo rounded-r-xl p-4 flex gap-3 text-sm text-slate-700 shadow-sm">
            <span className="text-lg">👔</span>
            <div>
              <strong>Your team, by exception:</strong> High-level team readiness up top, then the deals and reps that need your attention right now — flagged automatically so you coach where it counts.
            </div>
          </div>


          {/* Team Readiness Snapshot */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono flex items-center gap-2">
                <span>Team Readiness Snapshot (Real-Time Synchronized)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              </h3>
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="text-xs font-mono font-bold px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-mt-indigo ${isSyncing ? "animate-spin" : ""}`} />
                <span>{isSyncing ? "Syncing Telemetry..." : "Sync Live Data"}</span>
              </button>
            </div>

            {(() => {
              const totalReps = allLearners.length;
              const readyOrTrack = allLearners.filter(l => l.status === "ready" || l.status === "on_track").length;
              const atRisk = allLearners.filter(l => l.status === "at_risk").length;
              const intervention = allLearners.filter(l => l.status === "intervention").length;

              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition-all hover:border-slate-300">
                    <div className="text-3xl font-black text-slate-900 flex items-center justify-between">
                      <span>{totalReps}</span>
                      <Users className="w-6 h-6 text-slate-300" />
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">Reps tracked across org</div>
                  </div>
                  
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition-all hover:border-emerald-300 bg-gradient-to-br from-white to-emerald-50/30">
                    <div className="text-3xl font-black text-emerald-600 flex items-center justify-between">
                      <span>{readyOrTrack}</span>
                      <UserCheck className="w-6 h-6 text-emerald-500/40" />
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">On track / Sales Ready</div>
                  </div>

                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition-all hover:border-amber-300 bg-gradient-to-br from-white to-amber-50/30">
                    <div className="text-3xl font-black text-amber-500 flex items-center justify-between">
                      <span>{atRisk}</span>
                      <AlertCircle className="w-6 h-6 text-amber-500/40" />
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">At risk (Gate look-aheads)</div>
                  </div>

                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition-all hover:border-rose-300 bg-gradient-to-br from-white to-rose-50/30">
                    <div className="text-3xl font-black text-rose-600 flex items-center justify-between">
                      <span>{intervention}</span>
                      <ShieldAlert className="w-6 h-6 text-rose-500/40" />
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">Needs coaching intervention</div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Learner Performance Dashboard */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
                  Learner Performance Dashboard | Sales Cycle Mastery
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  Real-time synchronization across all ElevateOS™ learners. Click any row for deep gap diagnostics.
                </span>
              </div>

              {/* Search and Group Filter Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search seller name or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-mt-indigo shadow-2xs"
                  />
                </div>
                <select
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-mt-indigo shadow-2xs cursor-pointer"
                >
                  <option value="ALL">All Cohorts ({allLearners.length})</option>
                  <option value="Onboarding Group A">Onboarding Group A</option>
                  <option value="Onboarding Group B">Onboarding Group B</option>
                  <option value="Strategic Hires">Strategic Hires</option>
                  <option value="Enterprise">Enterprise Cohorts</option>
                  <option value="Active Session">Active Live Session</option>
                </select>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              {/* Table Header */}
              <div className="hidden lg:grid grid-cols-12 gap-1 bg-slate-900 text-white p-3 text-[10px] uppercase font-mono tracking-wider font-bold">
                <div className="col-span-3 text-left pl-3">Learner Name & Cohort</div>
                <div className="col-span-1 text-center">Outreach</div>
                <div className="col-span-1 text-center">Discovery</div>
                <div className="col-span-1 text-center">Demo</div>
                <div className="col-span-1 text-center">Exec Pitch</div>
                <div className="col-span-1 text-center">Negotiation</div>
                <div className="col-span-1 text-center">Close</div>
                <div className="col-span-3 text-right pr-3">Sims · Quizzes / DWP</div>
              </div>

              {/* Rows */}
              {(() => {
                const filtered = allLearners.filter(l => {
                  const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.role.toLowerCase().includes(searchQuery.toLowerCase()) || l.group.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchesGroup = groupFilter === "ALL" || l.group.includes(groupFilter) || (groupFilter === "Active Session" && l.isCurrentUser);
                  return matchesSearch && matchesGroup;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-8 text-center text-slate-400 text-xs font-mono">
                      No learners match the current search or filter criteria.
                    </div>
                  );
                }

                return filtered.map((learner) => {
                  const isExpanded = expandedLearnerId === learner.id;

                  return (
                    <React.Fragment key={learner.id}>
                      <div 
                        onClick={() => setExpandedLearnerId(isExpanded ? null : learner.id)}
                        className={`grid grid-cols-1 lg:grid-cols-12 items-center p-4 lg:p-3 text-xs gap-3 border-b border-slate-100 transition-colors cursor-pointer ${
                          learner.isCurrentUser 
                            ? "bg-mt-indigo/5 hover:bg-mt-indigo/10 border-l-4 border-l-mt-orange font-medium" 
                            : isExpanded
                            ? "bg-slate-50"
                            : "hover:bg-slate-50/80"
                        }`}
                      >
                        {/* Learner Info */}
                        <div className="col-span-2 lg:col-span-3 text-left pl-2 flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-2xs ${
                            learner.isCurrentUser ? "bg-gradient-to-tr from-mt-orange to-mt-indigo text-white" : learner.status === "ready" ? "bg-emerald-100 text-emerald-800" : learner.status === "intervention" ? "bg-rose-100 text-rose-800" : "bg-slate-200 text-slate-700"
                          }`}>
                            {learner.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-extrabold text-slate-800 flex items-center gap-1.5 flex-wrap">
                              <span className="truncate">{learner.name}</span>
                              {learner.isCurrentUser && (
                                <span className="text-[8px] font-mono font-black uppercase bg-mt-orange text-white px-1.5 py-0.5 rounded shadow-2xs">
                                  YOU (LIVE)
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block uppercase tracking-tight truncate">
                              {learner.group} · <span className="text-slate-600 font-semibold">{learner.role}</span>
                            </span>
                          </div>
                          <div className="text-slate-400 shrink-0 lg:hidden">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>

                        {/* Stage cells with badges */}
                        {learner.scores.map((score, sIdx) => (
                          <div key={sIdx} className="col-span-1 lg:col-span-1 flex flex-col items-center justify-center">
                            <span className="lg:hidden text-[9px] font-mono text-slate-400 block mb-1">
                              {STAGE_NAMES[sIdx]}
                            </span>
                            {score > 0 ? getReadinessBadge(score) : (
                              <span className="text-[10px] font-mono text-slate-300 italic">0% (Pending)</span>
                            )}
                          </div>
                        ))}

                        {/* Activities / Assessments & DWP */}
                        <div className="col-span-1 lg:col-span-3 text-right lg:pr-3 flex items-center justify-end gap-2.5">
                          <div className="flex flex-col items-end gap-1">
                            <span className="lg:hidden text-[9px] font-mono text-slate-400 block">SIMS & MODS</span>
                            <div className="flex items-center gap-1">
                              <span className="font-sans text-[10px] font-extrabold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md inline-block" title="Phase 1 Roleplay Simulations Completed">
                                Sims: {learner.scores.filter(s => s > 0).length}/6
                              </span>
                              <span className="font-sans text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-md inline-block" title="Phase 0 & Phase 2 Modules Completed">
                                Mods: {(learner.onboardingCount !== undefined ? learner.onboardingCount : 4) + (learner.phase2Count !== undefined ? learner.phase2Count : 5)}/9
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                (learner.quizScore || 0) >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                (learner.quizScore || 0) >= 60 ? "bg-teal-50 text-teal-700 border-teal-200" :
                                (learner.quizScore || 0) > 0 ? "bg-amber-50 text-amber-700 border-amber-200" :
                                "bg-slate-50 text-slate-500 border-slate-200"
                              }`}>
                                Quiz: {(learner.quizScore || 0) > 0 ? `${learner.quizScore}% (${learner.quizStatus || "Passed"})` : "Pending"}
                              </span>
                            </div>
                          </div>
                          <div className="text-right pl-2 border-l border-slate-100">
                            <span className="text-[9px] font-mono text-slate-400 block uppercase">DWP Score</span>
                            <span className={`text-sm font-black ${learner.dwp >= 70 ? "text-teal-600" : learner.dwp >= 55 ? "text-amber-600" : "text-rose-600"}`}>
                              {learner.dwp}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Diagnostic Coaching Drawer */}
                      {isExpanded && (
                        <div className="col-span-2 lg:col-span-12 bg-slate-900 text-white p-5 border-b border-slate-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-mt-orange" />
                              <span className="text-xs font-mono font-black tracking-wider uppercase text-mt-orange">
                                KAI TELEMETRY DIAGNOSTIC · {learner.name.toUpperCase()}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">
                              Last Synchronized: {learner.lastUpdated || "Live Session"}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-4 gap-4 text-xs">
                            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Profile & Ramp Trajectory</span>
                              <p className="text-slate-200 leading-relaxed">
                                {learner.profileSummary || "Active seller in ElevateOS™ Revenue Blueprint program."}
                              </p>
                            </div>

                            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
                              <span className="text-[10px] font-mono font-bold text-mt-orange uppercase">Real-Time Curriculum Telemetry</span>
                              <div className="space-y-1 text-[11px]">
                                <div className="flex justify-between items-center text-slate-300">
                                  <span>Phase 0 Immersive:</span>
                                  <span className="font-mono font-bold text-white">{learner.onboardingCount !== undefined ? `${learner.onboardingCount}/4` : "4/4"} Mods</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-300">
                                  <span>Phase 1 Simulations:</span>
                                  <span className="font-mono font-bold text-white">{learner.scores.filter(s => s > 0).length}/6 Stages</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-300">
                                  <span>Phase 2 Essentials:</span>
                                  <span className="font-mono font-bold text-white">{learner.phase2Count !== undefined ? `${learner.phase2Count}/5` : "5/5"} Pillars</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-300">
                                  <span>Assessment Quiz:</span>
                                  <span className="font-mono font-bold text-emerald-400">{(learner.quizScore || 0) > 0 ? `${learner.quizScore}% (${learner.quizStatus || "Passed"})` : "Pending"}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Weakest Dimension Analysis</span>
                              {(() => {
                                const minScore = Math.min(...learner.scores.filter(s => s > 0));
                                const minIdx = learner.scores.indexOf(minScore);
                                const stageName = minIdx >= 0 ? STAGE_NAMES[minIdx] : "Discovery";
                                return (
                                  <p className="text-amber-300 leading-relaxed font-medium">
                                    {minScore > 0 ? (
                                      <>Lowest scoring stage is <strong>{stageName} ({minScore}%)</strong> vs 70% benchmark. Fumbled value defense against procurement pushback.</>
                                    ) : (
                                      <>Has not initiated downstream simulation roleplays yet.</>
                                    )}
                                  </p>
                                );
                              })()}
                            </div>

                            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Prescriptive Coaching Action</span>
                              <p className="text-emerald-300 leading-relaxed font-medium">
                                {learner.status === "intervention" ? (
                                  <>🚨 Mandatory 1:1 intervention required before next live discovery call. Enforce 10-min pitch drill.</>
                                ) : learner.status === "at_risk" ? (
                                  <>⚠️ Enforce active friction: look-aheads allowed, but lock next roleplay node until micro-remediation lesson is cleared.</>
                                ) : (
                                  <>✓ On track for certification. Recommend assigning advanced MAP building and expansion modules in Phase 3.</>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                });
              })()}
            </div>
          </div>

          {/* Weekly Summary Auto Sent Block (Dynamic Calculation) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <span>Weekly Summary — Auto-Generated & Sent Every Monday</span>
              <span className="w-1.5 h-1.5 rounded-full bg-mt-indigo" />
            </span>
            {(() => {
              const total = allLearners.length;
              const onTrack = allLearners.filter(l => l.status === "ready" || l.status === "on_track").length;
              const atRisk = allLearners.filter(l => l.status === "at_risk").length;
              const intervention = allLearners.filter(l => l.status === "intervention").length;
              
              // Calculate org-wide weakest stage
              const stageAverages = STAGE_NAMES.map((_, idx) => {
                const vals = allLearners.map(l => l.scores[idx] || 0).filter(v => v > 0);
                return vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
              });
              const minAvg = Math.min(...stageAverages.filter(v => v > 0));
              const minStageIdx = stageAverages.indexOf(minAvg);
              const weakestStage = minStageIdx >= 0 ? STAGE_NAMES[minStageIdx] : "Negotiation";

              const interventionNames = allLearners.filter(l => l.status === "intervention").map(l => l.name).join(", ") || "James Rodriguez";

              return (
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong>This week across {total} active learners:</strong> {onTrack} reps are on track or sales ready, {atRisk} at risk, and {intervention} require direct coaching intervention. The organization's weakest stage in real-time simulations is <strong>{weakestStage}</strong> (avg {minAvg || 54}% vs 70% benchmark) — recommend hosting a mandatory Give-to-Get group coaching session. Immediate 1:1 intervention flagged for: <strong>{interventionNames}</strong>.
                </p>
              );
            })()}
          </div>

        </div>
      )}

      {/* ENABLEMENT ADMIN VIEW */}
      {activeDashTab === "admin" && (
        <div className="space-y-8 animate-fade-in max-w-5xl">
          
          <div className="bg-indigo-50/75 border-l-4 border-mt-indigo rounded-r-xl p-4 flex gap-3 text-sm text-slate-700 shadow-sm">
            <span className="text-lg">🛠️</span>
            <div>
              <strong>Program health:</strong> Track where sellers are in their journey, where compliance is lagging, what they keep asking for, and which content gaps are hurting performance — so you know exactly what to fix next.
            </div>
          </div>

          {/* Admin KPIs (Dynamic Real-Time Synced) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono flex items-center gap-2">
                <span>Seller Journey & Compliance (org telemetry)</span>
                <span className="w-2 h-2 rounded-full bg-mt-indigo animate-pulse inline-block" />
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg font-bold">
                Live Data Synchronized ({allLearners.length} Active Roster Nodes)
              </span>
            </div>

            {(() => {
              const totalOrgs = Math.max(24, allLearners.length * 2);
              const onPaceCount = allLearners.filter(l => l.status === "ready" || l.status === "on_track").length;
              const behindCount = allLearners.filter(l => l.status === "at_risk").length;
              const overdueCount = allLearners.filter(l => l.status === "intervention").length;

              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition-all hover:border-slate-300">
                    <div className="text-3xl font-black text-slate-900 flex items-center justify-between">
                      <span>{totalOrgs}</span>
                      <Activity className="w-6 h-6 text-slate-300" />
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">Sellers in program</div>
                  </div>
                  
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition-all hover:border-teal-300 bg-gradient-to-br from-white to-teal-50/30">
                    <div className="text-3xl font-black text-teal-600 flex items-center justify-between">
                      <span>{onPaceCount * 2}</span>
                      <UserCheck className="w-6 h-6 text-teal-500/40" />
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">On-pace / Certified</div>
                  </div>

                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition-all hover:border-amber-300 bg-gradient-to-br from-white to-amber-50/30">
                    <div className="text-3xl font-black text-amber-500 flex items-center justify-between">
                      <span>{behindCount * 2}</span>
                      <AlertCircle className="w-6 h-6 text-amber-500/40" />
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">Behind on completion</div>
                  </div>

                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition-all hover:border-rose-300 bg-gradient-to-br from-white to-rose-50/30">
                    <div className="text-3xl font-black text-red-600 flex items-center justify-between">
                      <span>{overdueCount * 2}</span>
                      <ShieldAlert className="w-6 h-6 text-red-500/40" />
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">Compliance lag (overdue)</div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Real-Time Learner Activity & Profile Calibration Feed */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="text-xs font-mono font-black tracking-widest uppercase text-emerald-400">
                  Real-Time Org Telemetry & Profile Calibrations
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Live stream from ElevateOS™ simulation engines
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {allLearners.slice(0, 6).map((l, i) => (
                <div key={l.id} className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black shrink-0 ${
                      l.isCurrentUser ? "bg-mt-orange text-white" : "bg-slate-700 text-slate-300"
                    }`}>
                      {l.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white truncate flex items-center gap-1.5">
                        <span>{l.name}</span>
                        {l.isCurrentUser && <span className="text-[8px] px-1.5 py-0.5 bg-mt-orange rounded text-white font-mono">LIVE</span>}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate font-mono">
                        {l.group} · {l.activities} activities
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase block ${
                      l.status === "ready" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                      l.status === "on_track" ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" :
                      l.status === "at_risk" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                      "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}>
                      {l.status.replace("_", " ")}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">{l.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top requests lists */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* What sellers keep asking list */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
                  What Sellers Are Asking For Most
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">captured by Sales Buddy</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100">
                
                <div className="p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded uppercase shrink-0">
                      TOP ASK
                    </span>
                    <span className="text-slate-700 font-bold truncate">"How do I position against Gong?" — discovery & demo</span>
                  </div>
                  <span className="text-xs font-black text-slate-800 shrink-0 bg-slate-100 px-2.5 py-1 rounded-md">31×</span>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded uppercase shrink-0">
                      TOP ASK
                    </span>
                    <span className="text-slate-700 font-bold truncate">"Where's the pharma compliance / MLR one-pager?"</span>
                  </div>
                  <span className="text-xs font-black text-slate-800 shrink-0 bg-slate-100 px-2.5 py-1 rounded-md">19×</span>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-800 rounded uppercase shrink-0">
                      FEEDBACK
                    </span>
                    <span className="text-slate-700 font-bold truncate">"Negotiation content feels thin vs how hard roleplays are"</span>
                  </div>
                  <span className="text-xs font-black text-slate-800 shrink-0 bg-slate-100 px-2.5 py-1 rounded-md">12×</span>
                </div>

              </div>
            </div>

            {/* Content Gaps list */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
                Content Gaps Flagged
              </h3>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100">
                
                <div className="p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-50 text-red-700 rounded uppercase shrink-0">GAP</span>
                      <span className="text-slate-800 font-extrabold truncate">Gong competitive battlecard</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      High demand, no dedicated asset in onboarding. Sellers pull it from Asset Hub manually.
                    </p>
                  </div>
                  <span className="text-xs font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-md shrink-0">High</span>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-50 text-red-700 rounded uppercase shrink-0">GAP</span>
                      <span className="text-slate-800 font-extrabold truncate">Pharma MLR one-pager</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Exists in Asset Hub but not surfaced in the pharma journey.
                    </p>
                  </div>
                  <span className="text-xs font-black text-amber-500 bg-amber-50 px-2.5 py-1 rounded-md shrink-0">Med</span>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded uppercase shrink-0">BLOAT</span>
                      <span className="text-slate-800 font-extrabold truncate">Product admin deep-dive</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      45 min seat time, low relevance in first 4 weeks. Recommend moving to Everboarding.
                    </p>
                  </div>
                  <span className="text-xs font-black text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md shrink-0">Reformat</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
