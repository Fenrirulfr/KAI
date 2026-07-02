/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { PuzzlePiece } from "./types";
import IntakeConversation from "./components/IntakeConversation";
import AccountBuddy from "./components/AccountBuddy";
import TestAndOnboard from "./components/TestAndOnboard";
import ReadinessDashboards from "./components/ReadinessDashboards";
import SellerJourneyMap from "./components/SellerJourneyMap";
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Sparkles, 
  Download, 
  User, 
  Check, 
  ShieldCheck,
  X,
  Target,
  ChevronRight,
  Compass,
  Cpu,
  Bot,
  Activity,
  Menu,
  Settings,
  MessageSquare,
  HelpCircle,
  Play,
  RotateCcw,
  UserCheck,
  Sliders,
  Info,
  Rocket,
  Zap,
  BookOpen,
  ShieldAlert,
  LogIn,
  Mail,
  AlertTriangle
} from "lucide-react";

export default function App() {
  const [userName, setUserName] = useState("New Account Executive");
  const [userEmail, setUserEmail] = useState("devdatta.jujare@mindtickle.com");
  const [isEditingName, setIsEditingName] = useState(false);
  const [activePhase, setActivePhase] = useState<"phase0" | "phase1_2" | "phase3" | "live">("phase0");
  const [showUserSwitcherModal, setShowUserSwitcherModal] = useState(false);
  const [showQuestionnaireAlert, setShowQuestionnaireAlert] = useState(false);
  const [showAdminResetModal, setShowAdminResetModal] = useState(false);
  const [showConfirmResetModal, setShowConfirmResetModal] = useState(false);
  const [adminResetRequested, setAdminResetRequested] = useState(false);
  const [customLoginName, setCustomLoginName] = useState("");
  const [customLoginEmail, setCustomLoginEmail] = useState("");
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("mt_onboarding_tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showCertModal, setShowCertModal] = useState(false);
  const [showPhase3LockModal, setShowPhase3LockModal] = useState(false);

  const [phase1Completed, setPhase1Completed] = useState<boolean>(() => {
    try {
      const saasSaved = localStorage.getItem("mt_saas_scores");
      const pharmaSaved = localStorage.getItem("mt_pharma_scores");
      const saas = saasSaved ? JSON.parse(saasSaved) : [82, 88, 74, 68, 0, 0];
      const pharma = pharmaSaved ? JSON.parse(pharmaSaved) : [70, 58, 0, 0, 0, 0];
      return saas.every((s: number) => s > 0) || pharma.every((s: number) => s > 0);
    } catch {
      return false;
    }
  });

  const [phase2CompletedCount, setPhase2CompletedCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("mt_phase2_completed");
      const items = saved ? JSON.parse(saved) : [];
      return items.length;
    } catch {
      return 0;
    }
  });
  const [telemetryVersion, setTelemetryVersion] = useState(0);

  useEffect(() => {
    const handleScoreUpdate = () => {
      try {
        const saasSaved = localStorage.getItem("mt_saas_scores");
        const pharmaSaved = localStorage.getItem("mt_pharma_scores");
        const saas = saasSaved ? JSON.parse(saasSaved) : [82, 88, 74, 68, 0, 0];
        const pharma = pharmaSaved ? JSON.parse(pharmaSaved) : [70, 58, 0, 0, 0, 0];
        setPhase1Completed(saas.every((s: number) => s > 0) || pharma.every((s: number) => s > 0));
        setTelemetryVersion(v => v + 1);
      } catch {}
    };
    const handlePhase2Update = () => {
      try {
        const saved = localStorage.getItem("mt_phase2_completed");
        const items = saved ? JSON.parse(saved) : [];
        setPhase2CompletedCount(items.length);
        setTelemetryVersion(v => v + 1);
      } catch {}
    };
    const handleTasksUpdate = () => {
      try {
        const saved = localStorage.getItem("mt_onboarding_tasks");
        if (saved) {
          setCompletedTasks(JSON.parse(saved));
        }
        setTelemetryVersion(v => v + 1);
      } catch {}
    };
    const handleTelemetrySync = () => {
      setTelemetryVersion(v => v + 1);
    };
    const handleAddressFurtherStage = () => {
      try {
        let p0Done = false;
        let p1Done = false;
        let p2Done = false;

        const telemStr = localStorage.getItem("mt_all_learners_telemetry");
        if (telemStr) {
          const roster = JSON.parse(telemStr);
          const cur = roster.find((l: any) => l.isCurrentUser || l.id === "current_user");
          if (cur) {
            if (typeof cur.onboardingCount === "number") p0Done = cur.onboardingCount >= 4;
            if (Array.isArray(cur.scores) && cur.scores.length === 6) p1Done = cur.scores.every((s: number) => s > 0);
            if (typeof cur.phase2Count === "number") p2Done = cur.phase2Count >= 5;
          }
        }

        if (!p0Done) {
          const p0Saved = localStorage.getItem("mt_onboarding_tasks");
          const p0Items = p0Saved ? JSON.parse(p0Saved) : [];
          p0Done = ["journey-company-story", "journey-exec-leadership", "journey-core-values", "journey-industry-activity"].every(id => p0Items.includes(id));
        }
        if (!p1Done) {
          const saasSaved = localStorage.getItem("mt_saas_scores");
          const pharmaSaved = localStorage.getItem("mt_pharma_scores");
          const saas = saasSaved ? JSON.parse(saasSaved) : [82, 88, 74, 68, 0, 0];
          const pharma = pharmaSaved ? JSON.parse(pharmaSaved) : [70, 58, 0, 0, 0, 0];
          p1Done = saas.every((s: number) => s > 0) || pharma.every((s: number) => s > 0);
        }
        if (!p2Done) {
          const p2Saved = localStorage.getItem("mt_phase2_completed");
          const p2Items = p2Saved ? JSON.parse(p2Saved) : [];
          p2Done = p2Items.length >= 5;
        }

        if (p0Done && p1Done && p2Done) {
          setActivePhase("phase3");
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setShowPhase3LockModal(true);
        }
      } catch {
        setShowPhase3LockModal(true);
      }
    };
    const handleSwitchToSimulations = () => {
      setActivePhase("phase1_2");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("mt_scores_updated", handleScoreUpdate);
    window.addEventListener("mt_phase2_updated", handlePhase2Update);
    window.addEventListener("mt_tasks_updated", handleTasksUpdate);
    window.addEventListener("mt_telemetry_ready", handleTelemetrySync);
    window.addEventListener("mt_telemetry_updated", handleTelemetrySync);
    window.addEventListener("mt_address_further_stage", handleAddressFurtherStage);
    window.addEventListener("mt_switch_to_simulations", handleSwitchToSimulations);
    return () => {
      window.removeEventListener("mt_scores_updated", handleScoreUpdate);
      window.removeEventListener("mt_phase2_updated", handlePhase2Update);
      window.removeEventListener("mt_tasks_updated", handleTasksUpdate);
      window.removeEventListener("mt_telemetry_ready", handleTelemetrySync);
      window.removeEventListener("mt_telemetry_updated", handleTelemetrySync);
      window.removeEventListener("mt_address_further_stage", handleAddressFurtherStage);
      window.removeEventListener("mt_switch_to_simulations", handleSwitchToSimulations);
    };
  }, []);

  const currentTelemetry = (() => {
    try {
      const saved = localStorage.getItem("mt_all_learners_telemetry");
      if (saved) {
        const roster = JSON.parse(saved);
        return roster.find((l: any) => l.isCurrentUser || l.id === "current_user") || null;
      }
    } catch {}
    return null;
  })();

  const isPhase0Done = (() => {
    const directDone = ["journey-company-story", "journey-exec-leadership", "journey-core-values", "journey-industry-activity"].every(id => completedTasks.includes(id));
    const telemDone = currentTelemetry && typeof currentTelemetry.onboardingCount === "number" ? currentTelemetry.onboardingCount >= 4 : false;
    return directDone || telemDone;
  })();

  const isPhase1Done = (() => {
    const directDone = phase1Completed;
    const telemDone = currentTelemetry && Array.isArray(currentTelemetry.scores) && currentTelemetry.scores.length === 6 ? currentTelemetry.scores.every((s: number) => s > 0) : false;
    return directDone || telemDone;
  })();

  const isPhase2Done = (() => {
    const directDone = phase2CompletedCount >= 5;
    const telemDone = currentTelemetry && typeof currentTelemetry.phase2Count === "number" ? currentTelemetry.phase2Count >= 5 : false;
    return directDone || telemDone;
  })();

  const isPhase3Unlocked = isPhase0Done && isPhase1Done && isPhase2Done;

  // States for Hamburger Menu (KAI AI Chatbot)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [kaiInput, setKaiInput] = useState("");
  const [isKaiTyping, setIsKaiTyping] = useState(false);
  const [kaiState, setKaiState] = useState<any>(() => {
    try {
      const saved = localStorage.getItem("kai_agent_state");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      messages: [],
      session_id: "session_" + Math.random().toString(36).substring(2, 9),
      current_question_index: -1,
      answers: {},
      phase: "greeting"
    };
  });

  const [resetCount, setResetCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("kai_reset_count");
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem("kai_agent_state");
        if (saved) {
          setKaiState(JSON.parse(saved));
        }
        const savedReset = localStorage.getItem("kai_reset_count");
        setResetCount(savedReset ? parseInt(savedReset, 10) : 0);
      } catch (e) {}
    };
    const handleOpenAdmin = () => setShowAdminResetModal(true);
    const handleOpenConfirm = () => setShowConfirmResetModal(true);
    window.addEventListener("kai_state_updated", handleSync);
    window.addEventListener("kai_reset_count_updated", handleSync);
    window.addEventListener("open_admin_reset_modal", handleOpenAdmin);
    window.addEventListener("open_confirm_reset_modal", handleOpenConfirm);
    return () => {
      window.removeEventListener("kai_state_updated", handleSync);
      window.removeEventListener("kai_reset_count_updated", handleSync);
      window.removeEventListener("open_admin_reset_modal", handleOpenAdmin);
      window.removeEventListener("open_confirm_reset_modal", handleOpenConfirm);
    };
  }, []);

  // Save progress to local storage
  useEffect(() => {
    localStorage.setItem("mt_onboarding_tasks", JSON.stringify(completedTasks));
    window.dispatchEvent(new Event("mt_tasks_updated"));
    window.dispatchEvent(new Event("mt_telemetry_updated"));
  }, [completedTasks]);

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks((prev) => {
      if (prev.includes(taskId)) {
        // Toggle/Remove to allow testing and demo, or keep. Keeping is better, but toggling checklists is good.
        // For checklist items, let's toggle. For interactive launches, let's keep.
        if (taskId.startsWith("week") || taskId.startsWith("everboarding")) {
          return prev.filter((id) => id !== taskId);
        }
        return prev;
      }
      return [...prev, taskId];
    });
  };

  const hasCompletedQuestionnaire = !!(kaiState && kaiState.learner_profile) || completedTasks.includes("intake");

  const attemptPhaseChange = (targetPhase: "phase0" | "phase1_2" | "phase3" | "live") => {
    if (targetPhase !== "phase0" && !hasCompletedQuestionnaire) {
      setShowQuestionnaireAlert(true);
      scrollToSection("intake-conversation");
      setIsMenuOpen(true);
      return;
    }
    if (targetPhase === "phase3" && !isPhase3Unlocked) {
      setShowPhase3LockModal(true);
      return;
    }
    setActivePhase(targetPhase);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSwitchUser = (newName: string, newEmail: string, isCalibrated: boolean) => {
    try {
      localStorage.setItem("mt_save_" + userEmail, JSON.stringify({
        kaiState,
        completedTasks,
        resetCount,
        userName
      }));
    } catch (e) {}

    setUserName(newName);
    setUserEmail(newEmail);

    const savedForUser = localStorage.getItem("mt_save_" + newEmail);
    if (savedForUser && !isCalibrated) {
      try {
        const parsed = JSON.parse(savedForUser);
        setKaiState(parsed.kaiState);
        setCompletedTasks(parsed.completedTasks || []);
        setResetCount(parsed.resetCount || 0);
        localStorage.setItem("kai_agent_state", JSON.stringify(parsed.kaiState));
        localStorage.setItem("mt_onboarding_tasks", JSON.stringify(parsed.completedTasks || []));
        localStorage.setItem("kai_reset_count", String(parsed.resetCount || 0));
        setTimeout(() => {
          window.dispatchEvent(new Event("kai_state_updated"));
          window.dispatchEvent(new Event("kai_reset_count_updated"));
        }, 0);
        setShowUserSwitcherModal(false);
        return;
      } catch (e) {}
    }

    if (!isCalibrated) {
      const freshState = {
        messages: [],
        session_id: "session_" + Math.random().toString(36).substring(2, 9),
        current_question_index: -1,
        answers: {},
        phase: "greeting",
        learner_profile: null,
        recommendations: null,
        current_options: null,
        email: newEmail,
        is_returning_learner: false,
        experience_track: "",
        awaiting_other_detail: false
      };
      setKaiState(freshState);
      setCompletedTasks([]);
      setResetCount(0);
      localStorage.setItem("kai_agent_state", JSON.stringify(freshState));
      localStorage.setItem("mt_onboarding_tasks", "[]");
      localStorage.setItem("kai_reset_count", "0");
      setTimeout(() => {
        window.dispatchEvent(new Event("kai_state_updated"));
        window.dispatchEvent(new Event("kai_reset_count_updated"));
      }, 0);
    } else {
      const calibratedState = {
        messages: [
          {
            sender: "kai",
            text: `Welcome back, ${newName}! Your Revenue Readiness Questionnaire is completed and your blueprint is calibrated. How can I help you with your roleplay simulations or playbooks today?`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ],
        session_id: "session_" + Math.random().toString(36).substring(2, 9),
        current_question_index: -1,
        answers: { experience_level: "Senior" },
        phase: "chat",
        learner_profile: {
          persona: "Enterprise AE",
          experience_level: "Senior",
          industry_background: "B2B SaaS & Enterprise",
          communication_preference: "Executive Summary",
          communication_style: "Strategic & Executive",
          strengths: ["Value Defense", "Multi-threading", "Executive Presence"],
          development_areas: ["Procurement Negotiation"]
        },
        recommendations: {
          recommended_tutor_modules: ["Value Engineering", "CFO Discovery"],
          recommended_missions: ["Enterprise Pitch Simulation"],
          peer_learning_recommendations: [
            { topic: "CFO Discovery & Procurement Defense", reason: "Matched with peer mentor Sarah Jenkins based on your development area." },
            { topic: "Enterprise Multi-threading Frameworks", reason: "Recommended by ElevateOS™ based on your B2B SaaS track." }
          ]
        },
        current_options: null,
        email: newEmail,
        is_returning_learner: true,
        experience_track: "Enterprise",
        awaiting_other_detail: false
      };
      setKaiState(calibratedState);
      setCompletedTasks(["intake", "journey-company-story", "journey-demo"]);
      setResetCount(0);
      localStorage.setItem("kai_agent_state", JSON.stringify(calibratedState));
      localStorage.setItem("mt_onboarding_tasks", JSON.stringify(["intake", "journey-company-story", "journey-demo"]));
      localStorage.setItem("kai_reset_count", "0");
      setTimeout(() => {
        window.dispatchEvent(new Event("kai_state_updated"));
        window.dispatchEvent(new Event("kai_reset_count_updated"));
      }, 0);
    }
    setShowUserSwitcherModal(false);
  };

  // Puzzle Pieces Definition & Completion Calculations
  const pieces: PuzzlePiece[] = [
    {
      id: "intake",
      name: "Revenue Blueprint Calibration",
      description: "Complete the KAI interaction to generate your personalized Revenue Readiness track.",
      color: "from-mt-orange to-mt-amber",
      icon: "MessageSquare",
      completed: hasCompletedQuestionnaire,
      requiredTasks: 1,
      completedTasks: hasCompletedQuestionnaire ? 1 : 0
    }
  ];

  const totalAssembledPieces = pieces.filter((p) => p.completed).length;
  const isRevenueReady = totalAssembledPieces === pieces.length;
  const progressPercent = Math.round((totalAssembledPieces / pieces.length) * 100);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetAllProgress = () => {
    setCompletedTasks([]);
  };

  const executeQuestionnaireReset = () => {
    const nextResetCount = resetCount + 1;
    setResetCount(nextResetCount);
    localStorage.setItem("kai_reset_count", String(nextResetCount));
    const newSessionId = "session_" + Math.random().toString(36).substring(2, 9);

    fetch("/api/agent/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, session_id: kaiState?.session_id }),
    }).catch(() => {});

    const resetState = {
      messages: [],
      session_id: newSessionId,
      current_question_index: -1,
      answers: {},
      phase: "greeting" as const,
      learner_profile: null,
      recommendations: null,
      current_options: null,
      email: userEmail,
      is_returning_learner: false,
      experience_track: "",
      awaiting_other_detail: false
    };
    setKaiState(resetState);
    localStorage.setItem("kai_agent_state", JSON.stringify(resetState));
    setCompletedTasks(prev => prev.filter(id => id !== "intake"));
    setIsMenuOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new Event("kai_state_updated"));
      window.dispatchEvent(new Event("kai_reset_count_updated"));
    }, 0);
  };

  const handleSendKaiMessage = useCallback(async (textToSend?: string) => {
    const text = textToSend || kaiInput;
    if (!text.trim() || isKaiTyping) return;

    if (!textToSend) setKaiInput("");

    // Create user message
    const userMsg = {
      sender: "user" as const,
      text,
      role: "user" as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentMessages = kaiState.messages || [];
    const nextState = {
      ...kaiState,
      messages: [...currentMessages, userMsg]
    };

    setKaiState(nextState);
    setIsKaiTyping(true);

    try {
      const response = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: nextState }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.finalState) {
        const withTimes = (data.finalState.messages || []).map((m: any) => ({
          ...m,
          sender: m.sender || (m.role === "user" ? "user" : "kai"),
          time: m.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }));
        const updated = { ...data.finalState, messages: withTimes };
        setKaiState(updated);
        localStorage.setItem("kai_agent_state", JSON.stringify(updated));
        
        // Dispatch custom sync event
        setTimeout(() => window.dispatchEvent(new Event("kai_state_updated")), 0);
      }
    } catch (err) {
      console.error("Error communicating with KAI agent drawer:", err);
      // Fallback response inside drawer chat
      setKaiState((prev: any) => ({
        ...prev,
        messages: [
          ...(prev.messages || []),
          {
            sender: "kai",
            text: "Hello! It looks like there's a temporary connection drop, or your profile is still being processed. Please use the interactive profiler under Phase 0 to completely calibrate your journey first!",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]
      }));
    } finally {
      setIsKaiTyping(false);
    }
  }, [kaiInput, isKaiTyping, kaiState]);

  // Auto-trigger KAI if empty when drawer opens
  useEffect(() => {
    if (isMenuOpen && (!kaiState.messages || kaiState.messages.length === 0)) {
      handleSendKaiMessage("Hello");
    }
  }, [isMenuOpen, kaiState.messages, handleSendKaiMessage]);

  // Turn off page scroll of all pages except chat when Kai Chat window is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-mt-soft-gray text-slate-800 font-sans selection:bg-mt-indigo selection:text-white flex flex-col">


      {/* 4-Phase Navigation Tab Bar */}
      <div className="sticky top-0 bg-white border-y border-slate-200 text-slate-900 select-none relative z-50 shadow-md">
        {/* Holographic matrix line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-mt-orange/20 to-transparent" />

        <div className="flex items-center justify-between w-full px-4">
          {/* LOGO */}
          <div className="pl-2 md:pl-4 pr-6 py-3 flex items-center border-r border-slate-200">
            <div className="flex flex-col items-start">
              <img 
                src="https://www.mindtickle.com/_next/image/?url=https%3A%2F%2Fsuperb-activity-b7b8c463f3.media.strapiapp.com%2Flogo_0e2ef7d0ed.webp&w=384&q=75" 
                alt="Mindtickle Logo" 
                className="h-8 md:h-9 w-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Tab 1: Phase 0 */}
          <button
            onClick={() => setActivePhase("phase0")}
            className={`group text-left py-3 px-3 flex flex-col justify-between min-h-[70px] transition-all duration-300 relative overflow-hidden ${
              activePhase === "phase0"
                ? "bg-mt-orange/5 text-mt-navy"
                : "text-slate-600 hover:text-mt-deep-blue hover:bg-mt-deep-blue/5"
            }`}
          >
            {/* Active Glow Indicators */}
            {activePhase === "phase0" && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-mt-orange shadow-[2px_0_10px_rgba(255,107,0,0.5)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-mt-orange/5 to-transparent pointer-events-none" />
              </>
            )}
            
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-lg border transition-all duration-300 ${
                activePhase === "phase0"
                  ? "bg-mt-orange/10 border-mt-orange/40 text-mt-orange shadow-[0_0_10px_rgba(255,107,0,0.2)]"
                  : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
              }`}>
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className={`text-[9px] tracking-wider font-mono font-black uppercase ${
                  activePhase === "phase0" ? "text-mt-orange" : "text-slate-500 group-hover:text-slate-600"
                }`}>
                  PHASE 00
                </span>
                <span className="text-xs sm:text-sm font-black tracking-tight mt-0.5">
                  Welcome to Mindtickle
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-400">Phase 0 · DAY 1 - DAY 2</span>
            </div>
            
            {/* Bottom Glow bar */}
            <div className={`absolute bottom-0 inset-x-0 h-[2px] transition-all duration-300 ${
              activePhase === "phase0" ? "bg-mt-orange shadow-[0_0_12px_#FF6B00]" : "bg-transparent"
            }`} />
          </button>

          {/* Tab 2: Phase 1+2 */}
          <button
            onClick={() => attemptPhaseChange("phase1_2")}
            className={`group text-left py-3 px-3 flex flex-col justify-between min-h-[70px] transition-all duration-300 relative overflow-hidden ${
              activePhase === "phase1_2"
                ? "bg-mt-orange/5 text-mt-navy"
                : "text-slate-600 hover:text-mt-deep-blue hover:bg-mt-deep-blue/5"
            }`}
          >
            {/* Active Glow Indicators */}
            {activePhase === "phase1_2" && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-mt-orange shadow-[2px_0_10px_rgba(255,107,0,0.5)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-mt-orange/5 to-transparent pointer-events-none" />
              </>
            )}

            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-lg border transition-all duration-300 ${
                activePhase === "phase1_2"
                  ? "bg-mt-orange/10 border-mt-orange/40 text-mt-orange shadow-[0_0_10px_rgba(255,107,0,0.2)]"
                  : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
              }`}>
                <Cpu className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className={`text-[9px] tracking-wider font-mono font-black uppercase ${
                  activePhase === "phase1_2" ? "text-mt-orange" : "text-slate-500 group-hover:text-slate-600"
                }`}>
                  PHASE 1 & 2
                </span>
                <span className="text-xs sm:text-sm font-black tracking-tight mt-0.5">
                  Test & Onboard
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-400">Pressure Testing</span>
            </div>

            {/* Bottom Glow bar */}
            <div className={`absolute bottom-0 inset-x-0 h-[2px] transition-all duration-300 ${
              activePhase === "phase1_2" ? "bg-mt-orange shadow-[0_0_12px_#FF6B00]" : "bg-transparent"
            }`} />
          </button>

          {/* Tab 3: Phase 3 */}
          <button
            onClick={() => attemptPhaseChange("phase3")}
            className={`group text-left py-3 px-3 flex flex-col justify-between min-h-[70px] transition-all duration-300 relative overflow-hidden ${
              activePhase === "phase3"
                ? "bg-mt-orange/5 text-mt-navy"
                : "text-slate-600 hover:text-mt-deep-blue hover:bg-mt-deep-blue/5"
            }`}
          >
            {/* Active Glow Indicators */}
            {activePhase === "phase3" && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-mt-orange shadow-[2px_0_10px_rgba(255,107,0,0.5)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-mt-orange/5 to-transparent pointer-events-none" />
              </>
            )}

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg border transition-all duration-300 ${
                  activePhase === "phase3"
                    ? "bg-mt-orange/10 border-mt-orange/40 text-mt-orange shadow-[0_0_10px_rgba(255,107,0,0.2)]"
                    : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[9px] tracking-wider font-mono font-black uppercase ${
                    activePhase === "phase3" ? "text-mt-orange" : "text-slate-500 group-hover:text-slate-600"
                  }`}>
                    PHASE 03
                  </span>
                  <span className="text-xs sm:text-sm font-black tracking-tight mt-0.5 flex items-center gap-1.5">
                    Account Buddy
                  </span>
                </div>
              </div>
              {!isPhase3Unlocked && (
                <div className="p-1 rounded bg-amber-50 border border-amber-200 text-amber-600 shadow-xs" title="Locked: Complete Phase 1 & 2 first">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-400">ElevateOS™ Deal Co-Pilot</span>
            </div>

            {/* Bottom Glow bar */}
            <div className={`absolute bottom-0 inset-x-0 h-[2px] transition-all duration-300 ${
              activePhase === "phase3" ? "bg-mt-orange shadow-[0_0_12px_#FF6B00]" : "bg-transparent"
            }`} />
          </button>

          {/* Tab 4: LIVE */}
          <button
            onClick={() => attemptPhaseChange("live")}
            className={`group text-left py-3 px-3 flex flex-col justify-between min-h-[70px] transition-all duration-300 relative overflow-hidden ${
              activePhase === "live"
                ? "bg-mt-orange/5 text-mt-navy"
                : "text-slate-600 hover:text-mt-deep-blue hover:bg-mt-deep-blue/5"
            }`}
          >
            {/* Active Glow Indicators */}
            {activePhase === "live" && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-mt-orange shadow-[2px_0_10px_rgba(255,107,0,0.5)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-mt-orange/5 to-transparent pointer-events-none" />
              </>
            )}

            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-lg border transition-all duration-300 ${
                activePhase === "live"
                  ? "bg-mt-orange/10 border-mt-orange/40 text-mt-orange shadow-[0_0_10px_rgba(255,107,0,0.2)]"
                  : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
              }`}>
                <Activity className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className={`text-[9px] tracking-wider font-mono font-black uppercase ${
                  activePhase === "live" ? "text-mt-orange" : "text-slate-500 group-hover:text-slate-600"
                }`}>
                  LIVE PERFORMANCE
                </span>
                <span className="text-xs sm:text-sm font-black tracking-tight mt-0.5">
                  Readiness Dashboards
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-400">Everboarding Grid</span>
            </div>

            {/* Bottom Glow bar */}
            <div className={`absolute bottom-0 inset-x-0 h-[2px] transition-all duration-300 ${
              activePhase === "live" ? "bg-mt-orange shadow-[0_0_12px_#FF6B00]" : "bg-transparent"
            }`} />
          </button>

        </div>

        {/* USER SWITCHER / LOGIN BUTTON */}
        <div className="px-3 md:px-4 flex items-center justify-center border-l border-slate-200 self-stretch bg-slate-50/50">
          <button
            onClick={() => setShowUserSwitcherModal(true)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all border border-slate-200 shadow-sm hover:shadow group"
            title="Switch User Account or Login"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-mt-indigo to-mt-royal-purple text-white flex items-center justify-center text-xs font-black shadow-sm">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col items-start text-left hidden lg:flex">
              <span className="text-[11px] font-black tracking-tight text-slate-800 leading-none max-w-[110px] truncate">{userName}</span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5">{hasCompletedQuestionnaire ? "Calibrated" : "New • Action Req."}</span>
            </div>
            <Sliders className="w-3.5 h-3.5 text-slate-400 group-hover:text-mt-orange transition-colors hidden sm:block ml-1" />
          </button>
        </div>

        {/* HAMBURGER MENU FOR KAI AI AGENTIC CHATBOT AND FUNCTIONS */}
        <div className="px-5 flex items-center justify-center border-l border-slate-200 self-stretch">
          <button 
            id="kai-hamburger-menu"
            onClick={() => setIsMenuOpen(true)}
            className="relative flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#10069F]/30 active:scale-95 transition-all duration-300 group"
          >
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white z-10 animate-pulse shadow-sm" />
            <img 
              src="https://lh3.googleusercontent.com/d/1-IyYMa9knatGlV8ZcU-XfGuiBDiePzWP" 
              alt="KAI Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-[#10069F]/20 group-hover:border-[#10069F] group-hover:scale-105 transition-all duration-300 shadow-[0_4_12px_rgba(16,6,159,0.2)]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback direct URL if googleusercontent hits any restriction
                (e.target as HTMLImageElement).src = "https://drive.google.com/uc?export=view&id=1-IyYMa9knatGlV8ZcU-XfGuiBDiePzWP";
              }}
            />
          </button>
        </div>

      </div>
    </div>

      {activePhase === "phase0" ? (
        <>
          {/* Hero Header Section designed as an interlocking Geometric Cyber Canvas */}
          <section className="relative py-10 md:py-12 px-4 md:px-8 bg-mt-deep-space text-white overflow-hidden border-b border-mt-royal-purple shadow-[inset_0_-8px_40px_rgba(0,0,0,0.7)]">
            {/* Holographic deep cyber grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,16,53,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,16,53,0.5)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 pointer-events-none" />
            
            {/* Ambient Nebula/Glow Spheres */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-mt-orange/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] bg-mt-indigo/10 rounded-full blur-[100px] pointer-events-none" />


            {/* Corner Decorative brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-800 pointer-events-none hidden md:block" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-800 pointer-events-none hidden md:block" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-800 pointer-events-none hidden md:block" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-800 pointer-events-none hidden md:block" />

            <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
              
              {/* Futuristic Typography Title */}
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tight leading-none uppercase font-sans">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8C33] to-[#FFCC00] font-extrabold drop-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
                  Mindtickle
                </span>
              </h1>

              {/* Subtitle description */}
              <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
                Before any training, you settle in and feel part of the company — not just informed about it.
              </p>


              {/* Futuristic Mainframe Button CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection("milestones-section")}
                  className="w-full sm:w-auto bg-gradient-to-r from-mt-orange to-mt-indigo hover:from-mt-orange/90 hover:to-mt-indigo/90 text-white font-black text-xs font-mono uppercase tracking-widest px-6 py-3 rounded-xl shadow-[0_0_25px_rgba(255,107,0,0.35)] transition-all duration-300 flex items-center justify-center gap-2.5 group border border-mt-orange/30"
                >
                  <span>Initialize Onboarding Protocol</span>
                  <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </section>

          {/* Main Container */}
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-12">
            
            {/* Phase Context Banner */}
            <div className="bg-mt-orange/5 border-l-4 border-mt-orange rounded-r-2xl p-6 md:p-8 flex items-start gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-mt-orange/10 p-3 rounded-xl text-mt-orange">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-widest text-mt-orange uppercase">Phase 0 Status</span>
                <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed">
                  <strong>Where you are:</strong> Your first two days. No assessments, no scores. Just get to know Mindtickle, meet your Sales Buddy, and let it get to know you.
                </p>
              </div>
            </div>

            {/* Revenue Milestone Timeline */}
            <section id="milestones-section" className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-mt-navy text-white p-3 rounded-2xl shadow-lg shadow-mt-navy/20">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-mt-navy tracking-tight uppercase">Your <span className="text-mt-orange">Milestones</span></h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-mt-orange animate-pulse" />
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">The Path to Field Readiness</p>
                    </div>
                  </div>
                </div>

                {(() => {
                  const phase0Tasks = ["journey-company-story", "journey-exec-leadership", "journey-core-values", "journey-industry-activity"];
                  const completedCount = phase0Tasks.filter(id => completedTasks.includes(id)).length;
                  const progress = Math.round((completedCount / phase0Tasks.length) * 100);
                  
                  return (
                    <div className="hidden lg:flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Current Velocity</p>
                        <p className="text-sm font-black text-mt-navy font-mono">{progress}% Phase 0</p>
                      </div>
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-mt-orange transition-all duration-1000 ease-out" 
                          style={{ width: `${progress}%` }} 
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* The Timeline Track */}
              {(() => {
                const phase0Tasks = [
                  { id: "journey-company-story", label: "Company Story" },
                  { id: "journey-exec-leadership", label: "Executive Leadership" },
                  { id: "journey-core-values", label: "Core Values" },
                  { id: "journey-industry-activity", label: "Industry Activity" }
                ];
                const phase0CompletedCount = phase0Tasks.filter(t => completedTasks.includes(t.id)).length;
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Horizontal Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-14 left-14 right-14 h-1 bg-slate-100 z-0 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-500 to-mt-orange shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-1000 ease-in-out ${isPhase0Done ? "w-1/3" : "w-0"}`} 
                      />
                    </div>

                    {/* Phase 0 Node: Cultural Immersive */}
                    <div className="relative z-10 group">
                      <div className="flex flex-col items-center md:items-start gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 ${
                          isPhase0Done 
                            ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 rotate-6" 
                            : "bg-mt-orange text-white shadow-xl shadow-mt-orange/20 -rotate-3 ring-4 ring-mt-orange/10"
                        }`}>
                          {isPhase0Done ? <Check className="w-7 h-7 stroke-[3]" /> : <Sparkles className="w-7 h-7" />}
                        </div>
                        <div className="text-center md:text-left space-y-1">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            isPhase0Done ? "bg-emerald-100 text-emerald-700" : "bg-mt-orange/10 text-mt-orange"
                          }`}>
                            {isPhase0Done ? "Phase Clear" : "Active Node"}
                          </span>
                          <h4 className="text-base font-black text-slate-900 leading-tight">CULTURE SYNC</h4>
                          <p className="text-[10px] font-mono text-slate-400 font-bold">DAY 1 - DAY 2</p>
                        </div>
                      </div>

                      <div className={`border-2 rounded-3xl p-5 transition-all duration-500 ${
                        isPhase0Done 
                          ? "bg-emerald-50/50 border-emerald-100 shadow-sm" 
                          : "bg-white border-mt-orange shadow-xl shadow-mt-orange/5"
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Check</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className={`w-3 h-1 rounded-full ${i <= phase0CompletedCount ? "bg-emerald-500" : "bg-slate-200"}`} />
                            ))}
                          </div>
                        </div>
                        <ul className="space-y-3">
                          {phase0Tasks.map(task => (
                            <li key={task.id} className="flex items-center gap-3 text-[11px] font-bold transition-all duration-300">
                              {completedTasks.includes(task.id) ? (
                                <div className="w-5 h-5 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-lg border-2 border-slate-100 flex items-center justify-center shrink-0" />
                              )}
                              <span className={completedTasks.includes(task.id) ? "text-slate-900" : "text-slate-400"}>
                                {task.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Phase 1 Node: Domain Enablement */}
                    <div className="relative z-10 group">
                      <div className="flex flex-col items-center md:items-start gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 ${
                          isPhase0Done 
                            ? "bg-mt-orange text-white shadow-xl shadow-mt-orange/20 -rotate-3 ring-4 ring-mt-orange/10" 
                            : "bg-white border-2 border-slate-200 text-slate-300 shadow-sm"
                        }`}>
                          <BookOpen className="w-7 h-7" />
                        </div>
                        <div className="text-center md:text-left space-y-1">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            isPhase0Done ? "bg-mt-orange/10 text-mt-orange" : "bg-slate-100 text-slate-400"
                          }`}>
                            {isPhase0Done ? "Next Target" : "Pending Sync"}
                          </span>
                          <h4 className={`text-base font-black leading-tight ${isPhase0Done ? "text-slate-900" : "text-slate-400"}`}>ENABLEMENT</h4>
                          <p className="text-[10px] font-mono text-slate-400 font-bold">DAY 3 - DAY 5</p>
                        </div>
                      </div>

                      <div className={`border rounded-3xl p-5 transition-all duration-500 ${
                        isPhase0Done 
                          ? "bg-white border-mt-orange shadow-xl shadow-mt-orange/5" 
                          : "bg-slate-50 border-slate-200 opacity-60"
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enablement Deck</span>
                          {!isPhase0Done && <Lock className="w-3 h-3 text-slate-300" />}
                        </div>
                        <ul className="space-y-3">
                          {["Revenue Domain Primer", "Product Feature Deck", "Persona Identification"].map((label, i) => (
                            <li key={i} className={`flex items-center gap-3 text-[11px] font-bold ${isPhase0Done ? "text-slate-600" : "text-slate-300"}`}>
                              <div className={`w-5 h-5 rounded-lg border-2 shrink-0 ${isPhase0Done ? "border-slate-100" : "border-slate-100"}`} />
                              {label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Phase 2 Node: Field Readiness */}
                    <div className="relative z-10 group">
                      <div className="flex flex-col items-center md:items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 text-slate-300 shadow-sm flex items-center justify-center transition-all duration-500 group-hover:bg-slate-50">
                          <Zap className="w-7 h-7" />
                        </div>
                        <div className="text-center md:text-left space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">Locked</span>
                          <h4 className="text-base font-black text-slate-400 leading-tight">READY</h4>
                          <p className="text-[10px] font-mono text-slate-400 font-bold">DAY 6 ONWARDS</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 opacity-40 grayscale">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sim Node</span>
                          <Lock className="w-3 h-3" />
                        </div>
                        <ul className="space-y-3">
                          {["Discovery Simulation", "Objection Roleplay", "Final Pitch"].map((label, i) => (
                            <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                              <Lock className="w-3 h-3 shrink-0" />
                              {label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Phase 3 Node: Elite Performance */}
                    <div 
                      onClick={() => attemptPhaseChange("phase3")}
                      className="relative z-10 group cursor-pointer"
                    >
                      <div className="flex flex-col items-center md:items-start gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl border-2 shadow-sm flex items-center justify-center transition-all duration-500 ${
                          isPhase3Unlocked 
                            ? "bg-mt-orange/10 border-mt-orange text-mt-orange group-hover:scale-105" 
                            : "bg-white border-slate-200 text-slate-300 group-hover:bg-slate-50"
                        }`}>
                          <Rocket className="w-7 h-7" />
                        </div>
                        <div className="text-center md:text-left space-y-1">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            isPhase3Unlocked ? "bg-mt-orange/10 text-mt-orange" : "bg-slate-100 text-slate-400"
                          }`}>
                            {isPhase3Unlocked ? "Unlocked" : "Locked"}
                          </span>
                          <h4 className={`text-base font-black leading-tight ${isPhase3Unlocked ? "text-slate-900" : "text-slate-400"}`}>ELITE</h4>
                        </div>
                      </div>

                      <div className={`border rounded-3xl p-5 transition-all ${
                        isPhase3Unlocked 
                          ? "bg-white border-mt-orange/30 shadow-md" 
                          : "bg-slate-50 border-slate-200 opacity-40 grayscale"
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${isPhase3Unlocked ? "text-mt-orange" : "text-slate-400"}`}>Everboarding</span>
                          {isPhase3Unlocked ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Lock className="w-3 h-3" />}
                        </div>
                        <ul className="space-y-3">
                          {["Deal Support", "Live Metrics", "Recalibration"].map((label, i) => (
                            <li key={i} className={`flex items-center gap-3 text-[11px] font-bold ${isPhase3Unlocked ? "text-slate-700" : "text-slate-400"}`}>
                              {isPhase3Unlocked ? <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <Lock className="w-3 h-3 shrink-0" />}
                              {label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </section>
            
            {/* Interactive Journey Map */}
            <SellerJourneyMap 
              completedTasks={completedTasks} 
              onTaskComplete={(taskId) => {
                if (!completedTasks.includes(taskId)) {
                  setCompletedTasks(prev => [...prev, taskId]);
                }
              }}
            />
            
            {/* Puzzle Pieces Details list - Single Scroll Design */}
            <div className="space-y-12">
              <IntakeConversation 
                onProfileCaptured={(profile) => {
                  if (profile && profile.persona && profile.persona !== "Unassigned") {
                    handleTaskComplete("intake");
                  } else {
                    setCompletedTasks(prev => prev.filter(id => id !== "intake"));
                  }
                }}
                onOpenAdminModal={() => setShowAdminResetModal(true)}
              />
            </div>

            {/* Meet Your Sales Buddy Section */}
            <section id="meet-kai" className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-[#FF6B00]/20 rounded-full blur-xl group-hover:bg-[#FF6B00]/30 transition-all duration-500" />
                  <img 
                    src="https://lh3.googleusercontent.com/d/1-IyYMa9knatGlV8ZcU-XfGuiBDiePzWP" 
                    alt="KAI"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full border-4 border-white shadow-lg animate-bounce z-20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-center md:text-left space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">
                    Meet Your Sales Buddy <span className="text-[#FF6B00]">Kai</span>
                  </h2>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
                    KAI is your personal agentic onboarding orchestrator. He analyzes your profile, identifies gaps, and curates a dynamic learning path to get you revenue-ready in record time.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-3">
                    <button 
                      onClick={() => setIsMenuOpen(true)}
                      className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Get Started with KAI</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Ready to Begin Section */}
            <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden border border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-pink-500/10" />
              <div className="max-w-2xl mx-auto space-y-5 relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Ready to Begin?
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Everything you've explored so far is designed to help you become customer-ready faster. Start your onboarding journey and build the skills, confidence, and product knowledge needed to succeed.
                </p>

                <div className="pt-2">
                  {isRevenueReady ? (
                    <button
                      onClick={() => {
                        attemptPhaseChange("phase1_2");
                      }}
                      className="w-full sm:w-auto bg-gradient-to-r from-mt-orange to-mt-indigo hover:from-mt-orange/90 hover:to-mt-indigo/90 text-white font-black text-xs font-mono uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(255,107,0,0.35)] transition-all duration-300 flex items-center justify-center gap-2.5 group border border-mt-orange/30 mx-auto cursor-pointer"
                    >
                      <span>Start Phase 1: Pressure Testing →</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => attemptPhaseChange("phase1_2")}
                      className="w-full sm:w-auto bg-slate-800 text-slate-400 hover:bg-slate-700 font-black text-xs font-mono uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 mx-auto border border-slate-700"
                    >
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span>Begin Phase 1 ({totalAssembledPieces}/{pieces.length} Pieces Completed)</span>
                    </button>
                  )}
                </div>
              </div>
            </section>

          </main>
        </>
      ) : (
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-12">
          {activePhase === "phase1_2" && <TestAndOnboard userName={userName} />}
          {activePhase === "phase3" && <AccountBuddy userName={userName} />}
          {activePhase === "live" && <ReadinessDashboards userName={userName} />}
        </main>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 md:px-12 text-center text-xs text-slate-400">
        <p>© 2026 Mindtickle Inc. All rights reserved. Revenue Readiness is a registered trademark of Mindtickle.</p>
      </footer>

      {/* Dynamic Certificate of Revenue Readiness Celebration Modal */}
      {showCertModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-12 relative shadow-2xl border border-slate-200 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing achievement shield */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-amber-200">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold">REVENUE FIELD LICENSE CERTIFICATION</span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                Certificate of Revenue Readiness
              </h2>
              <p className="text-slate-400 text-xs">This verifies that the named Account Executive has successfully completed all preparatory simulation tracks.</p>
            </div>

            {/* Certificate Print Area */}
            <div className="border-4 border-double border-slate-200 p-6 rounded-2xl bg-slate-50/50 space-y-6 text-center max-w-md mx-auto">
              <span className="text-slate-400 text-[10px] uppercase font-mono block">MINDTICKLE ACADEMY OF EXCELLENCE</span>
              
              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] italic">This credentials package is proudly awarded to:</span>
                <span className="text-xl font-extrabold text-slate-900 block font-serif tracking-tight border-b border-slate-200 pb-2 max-w-[280px] mx-auto">
                  {userName}
                </span>
              </div>

              <p className="text-slate-500 text-[11px] leading-relaxed max-w-sm mx-auto">
                For demonstrating excellence in sales methodology, product positioning, Objection Handling simulations, and mastering the Elevate OS strategy.
              </p>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-4 border-t border-slate-100">
                <div className="text-left">
                  <span>DATE: 2026-07-01</span>
                </div>
                <div className="text-right">
                  <span className="text-indigo-600 font-bold">STATUS: LICENSED TO SELL</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button 
                onClick={() => window.print()}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Print Credentials</span>
              </button>
              <button 
                onClick={() => setShowCertModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KAI AGENTIC SYSTEM SLIDE-OUT DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          />
          
          {/* Drawer Container */}
          <div className="relative w-full max-w-md bg-mt-deep-space text-white h-full flex flex-col border-l border-mt-royal-purple shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-mt-royal-purple bg-mt-navy flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono font-black tracking-widest text-mt-orange">KAI SYSTEM</span>
                <span className="text-[10px] font-mono text-slate-400 bg-mt-deep-space px-1.5 py-0.5 rounded uppercase font-bold">Agent Active</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (resetCount >= 1) {
                      setShowAdminResetModal(true);
                      setIsMenuOpen(false);
                      return;
                    }
                    setShowConfirmResetModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-slate-300 hover:text-red-400 bg-mt-deep-space hover:bg-red-500/10 rounded-lg border border-slate-700 hover:border-red-500/30 transition-all cursor-pointer"
                  title={resetCount >= 1 ? "Contact Admin to Update Information" : "Reset Questionnaire"}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{resetCount >= 1 ? "RESET QUESTIONNAIRE (CONTACT ADMIN TO UPDATE INFORMATION)" : "RESET QUESTIONNAIRE"}</span>
                </button>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col min-h-0 bg-mt-deep-space">
              <div className="flex-1 flex flex-col justify-between h-full min-h-0 gap-4">
                {/* Messages container */}
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 max-h-[calc(100vh-170px)]">
                  {(kaiState.messages || []).map((msg: any, index: number) => (
                    <div 
                      key={index} 
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-mono text-slate-400">
                          {msg.sender === "user" ? "YOU" : "KAI CO-PILOT"}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">•</span>
                        <span className="text-[9px] font-mono text-slate-500">{msg.time || "Just now"}</span>
                      </div>
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        msg.sender === "user" 
                          ? "bg-mt-indigo text-white rounded-tr-none shadow-mt-indigo/20" 
                          : "bg-mt-navy/50 text-slate-100 rounded-tl-none border border-mt-royal-purple/30"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isKaiTyping && (
                    <div className="flex flex-col items-start max-w-[85%]">
                      <span className="text-[9px] font-mono text-slate-400 mb-1">KAI CO-PILOT</span>
                      <div className="p-3 bg-mt-navy/50 rounded-2xl text-xs rounded-tl-none border border-mt-royal-purple/30 flex items-center gap-1.5 text-slate-400">
                        <span className="w-1.5 h-1.5 bg-mt-orange rounded-full animate-bounce delay-75" />
                        <span className="w-1.5 h-1.5 bg-mt-orange rounded-full animate-bounce delay-150" />
                        <span className="w-1.5 h-1.5 bg-mt-orange rounded-full animate-bounce delay-300" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggestion / Option Quick Chips */}
                <div className="space-y-1.5 border-t border-mt-royal-purple/30 pt-3">
                  {kaiState.current_options && kaiState.current_options.length > 0 ? (
                    <>
                      <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase block">Response Choices</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(kaiState.current_options || []).map((option: string, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => handleSendKaiMessage(option)}
                            className="text-[10px] font-semibold bg-mt-indigo hover:bg-mt-indigo/90 text-white border border-mt-indigo/40 px-2.5 py-1.5 rounded-lg text-left transition-colors max-w-full"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase block">Quick Prompts</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: "What is Elevate OS?", q: "Tell me about Elevate OS playbooks" },
                          { label: "Check Sales Toolkit", q: "How do I setup my Sales Toolkit?" },
                          { label: "How to get Certified?", q: "How do I get my certification?" },
                          { label: "Success Network Mentors", q: "How do I connect with peer mentors?" }
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendKaiMessage(item.q)}
                            className="text-[10px] font-medium bg-mt-navy/60 hover:bg-mt-navy text-slate-300 border border-mt-royal-purple/20 px-2 py-1 rounded-lg text-left transition-colors truncate max-w-full"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Input form */}
                <div className="flex gap-2 border-t border-mt-royal-purple/30 pt-2 pb-1">
                  <input
                    type="text"
                    value={kaiInput}
                    onChange={(e) => setKaiInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendKaiMessage();
                    }}
                    placeholder={
                      kaiState.current_question_index === 6 
                        ? "Describe your experience (min 30 words)..." 
                        : "Ask KAI anything..."
                    }
                    className="flex-1 bg-mt-navy/30 border border-mt-royal-purple/40 focus:border-mt-orange focus:ring-1 focus:ring-mt-orange text-white placeholder-slate-500 rounded-xl px-3 py-2 text-xs focus:outline-none transition-all"
                  />
                  <button
                    onClick={() => handleSendKaiMessage()}
                    className="bg-mt-orange hover:bg-mt-orange/90 text-white font-black px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 active:scale-95 shadow-lg shadow-mt-orange/20"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. USER SWITCHER / LOGIN MODAL */}
      {showUserSwitcherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-48 h-48 bg-mt-indigo/5 rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-mt-indigo/10 flex items-center justify-center text-mt-indigo">
                  <LogIn className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">AE Portal Login & Switcher</h3>
                  <p className="text-xs text-slate-500 font-mono">Simulate user logins & test onboarding states</p>
                </div>
              </div>
              <button
                onClick={() => setShowUserSwitcherModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Select Persona Profile</span>
              
              {/* Profile 1: New AE */}
              <button
                onClick={() => handleSwitchUser("Sarah Connor", "sarah.connor@mindtickle.com", false)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                  userEmail === "sarah.connor@mindtickle.com" 
                    ? "bg-mt-orange/5 border-mt-orange shadow-md ring-1 ring-mt-orange" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-mt-orange text-white font-black flex items-center justify-center shrink-0 mt-0.5">
                  S
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">Sarah Connor (New Hire AE)</h4>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase shrink-0">New • Uncalibrated</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Brand new hire on Day 1. Has not chatted with Kai or answered the questionnaire. Will be prompted immediately and blocked from Phase 1.
                  </p>
                </div>
              </button>

              {/* Profile 2: Current AE */}
              <button
                onClick={() => handleSwitchUser("Devdatta Jujare", "devdatta.jujare@mindtickle.com", hasCompletedQuestionnaire)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                  userEmail === "devdatta.jujare@mindtickle.com" 
                    ? "bg-mt-indigo/5 border-mt-indigo shadow-md ring-1 ring-mt-indigo" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-mt-indigo text-white font-black flex items-center justify-center shrink-0 mt-0.5">
                  D
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">Devdatta Jujare (Senior AE)</h4>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-mt-indigo/10 text-mt-indigo border border-mt-indigo/20 uppercase shrink-0">Current Session</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Your active session and saved local progress in ElevateOS™.
                  </p>
                </div>
              </button>

              {/* Profile 3: Calibrated Veteran */}
              <button
                onClick={() => handleSwitchUser("Alex Mercer", "alex.mercer@mindtickle.com", true)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                  userEmail === "alex.mercer@mindtickle.com" 
                    ? "bg-emerald-500/5 border-emerald-500 shadow-md ring-1 ring-emerald-500" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 mt-0.5">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">Alex Mercer (Enterprise AE)</h4>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase shrink-0">Calibrated & Ready</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Experienced seller who has already completed the questionnaire. Has full access to Phase 1 without being asked again.
                  </p>
                </div>
              </button>
            </div>

            {/* Custom Login Form */}
            <div className="pt-4 border-t border-slate-100 space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Or Login as Custom New User</span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Full Name (e.g. Jordan Vance)"
                  value={customLoginName}
                  onChange={(e) => setCustomLoginName(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-mt-indigo"
                />
                <input
                  type="email"
                  placeholder="Email (@mindtickle.com)"
                  value={customLoginEmail}
                  onChange={(e) => setCustomLoginEmail(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-mt-indigo"
                />
              </div>
              <button
                disabled={!customLoginName.trim() || !customLoginEmail.trim()}
                onClick={() => {
                  if (customLoginName.trim() && customLoginEmail.trim()) {
                    handleSwitchUser(customLoginName.trim(), customLoginEmail.trim(), false);
                    setCustomLoginName("");
                    setCustomLoginEmail("");
                  }
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login as New User (Resets Chat & Questionnaire)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. QUESTIONNAIRE REQUIRED ALERT MODAL */}
      {showQuestionnaireAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 text-center relative overflow-hidden">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-1 rounded-full border border-amber-200 inline-block">Action Required</span>
              <h3 className="text-lg font-black text-slate-900">Onboarding Questionnaire Required</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Before moving to Phase 1 (Pressure Testing) or downstream live simulations, new users must chat with Kai and answer the brief Onboarding Questionnaire to calibrate their ElevateOS™ Revenue Blueprint.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-mt-orange" />
                <span>Why is this required?</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Kai analyzes your role, industry background, and strengths to customize the AI buyer personas and objections you will face in Phase 1 roleplays.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setShowQuestionnaireAlert(false);
                  scrollToSection("intake-conversation");
                  setIsMenuOpen(true);
                }}
                className="w-full bg-gradient-to-r from-mt-orange to-mt-indigo hover:from-mt-orange/90 hover:to-mt-indigo/90 text-white font-black py-3 px-6 rounded-xl text-xs font-mono uppercase tracking-wider shadow-lg shadow-mt-orange/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Kai & Complete Questionnaire Now</span>
              </button>
              <button
                onClick={() => setShowQuestionnaireAlert(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Stay on Phase 0
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PHASE 3 LOCKED MODAL */}
      {showPhase3LockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 text-center relative overflow-hidden">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
              <Lock className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-1 rounded-full border border-amber-200 inline-block">Gate Locked</span>
              <h3 className="text-lg font-black text-slate-900">Elite Performance (Phase 3) Locked</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access to Elite Performance (ElevateOS™ Deal Co-Pilot & Account Buddy) requires completing all onboarding modules across Phase 0 (Cultural Immersive), Phase 1 (Revenue Readiness Simulations), and Phase 2 (Foundation Essentials).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
              <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block border-b border-slate-200 pb-1.5">
                Prerequisite Status
              </span>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2">
                  <span className={isPhase0Done ? "text-emerald-500 font-black" : "text-amber-500 font-black"}>{isPhase0Done ? "✓" : "○"}</span>
                  <span className={isPhase0Done ? "text-slate-800" : "text-slate-600"}>Phase 0: Cultural Immersive (4 Modules)</span>
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isPhase0Done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {isPhase0Done ? "Completed" : `${["journey-company-story", "journey-exec-leadership", "journey-core-values", "journey-industry-activity"].filter(id => completedTasks.includes(id)).length}/4 Done`}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2">
                  <span className={isPhase1Done ? "text-emerald-500 font-black" : "text-amber-500 font-black"}>{isPhase1Done ? "✓" : "○"}</span>
                  <span className={isPhase1Done ? "text-slate-800" : "text-slate-600"}>Phase 1: Pressure Testing (6 Roleplays)</span>
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isPhase1Done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {isPhase1Done ? "Completed" : "Incomplete"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2">
                  <span className={isPhase2Done ? "text-emerald-500 font-black" : "text-amber-500 font-black"}>{isPhase2Done ? "✓" : "○"}</span>
                  <span className={isPhase2Done ? "text-slate-800" : "text-slate-600"}>Phase 2: Foundation Essentials (5 Pillars)</span>
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isPhase2Done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {isPhase2Done ? "Completed" : `${phase2CompletedCount}/5 Done`}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setShowPhase3LockModal(false);
                  if (!isPhase0Done) {
                    attemptPhaseChange("phase0");
                  } else {
                    attemptPhaseChange("phase1_2");
                  }
                }}
                className="w-full bg-gradient-to-r from-mt-orange to-mt-indigo hover:from-mt-orange/90 hover:to-mt-indigo/90 text-white font-black py-3 px-6 rounded-xl text-xs font-mono uppercase tracking-wider shadow-lg shadow-mt-orange/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{!isPhase0Done ? "Go To Phase 0 To Complete Modules →" : "Go To Phase 1 & 2 To Complete Modules →"}</span>
              </button>
              <button
                onClick={() => setShowPhase3LockModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET QUESTIONNAIRE CONFIRMATION MODAL */}
      {showConfirmResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-mt-deep-space rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-mt-royal-purple space-y-6 text-white relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-48 h-48 bg-mt-orange/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-mt-royal-purple/50 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-mt-orange/10 border border-mt-orange/20 flex items-center justify-center text-mt-orange">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-white">Reset Questionnaire?</h3>
                  <p className="text-[11px] text-slate-400 font-mono">One-Time Self-Service Reset</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmResetModal(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 relative z-10">
              <p className="text-xs text-slate-300 leading-relaxed">
                You can reset your questionnaire once if you need to change your answers. Once reset, any future resets will require Enablement Admin authorization.
              </p>
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>Are you sure you want to reset your questionnaire answers now? This action will restart your intake interview.</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 relative z-10">
              <button
                onClick={() => setShowConfirmResetModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmResetModal(false);
                  executeQuestionnaireReset();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-mt-orange to-red-500 hover:from-mt-orange/90 hover:to-red-500/90 text-xs font-bold text-white shadow-lg shadow-mt-orange/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Yes, Reset Once</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. ADMIN RESET AUTHORIZATION MODAL */}
      {showAdminResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-mt-deep-space rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-mt-royal-purple space-y-6 text-white relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-mt-royal-purple/50 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-white">Reset Limit Reached</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Contact Admin to Update Information</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAdminResetModal(false);
                  setAdminResetRequested(false);
                }}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 relative z-10">
              <p className="text-xs text-slate-300 leading-relaxed">
                You have already used your one-time self-service questionnaire reset. Contact Admin to Update Information. To maintain certification integrity and prevent ElevateOS™ data discrepancy, any subsequent resets must be authorized by your Enablement Administrator.
              </p>

              <div className="p-4 rounded-2xl bg-mt-navy/60 border border-mt-royal-purple/40 space-y-2.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-mt-orange block">Assigned Enablement Admin</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                    JD
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">John Davis</div>
                    <div className="text-[10px] text-slate-400 font-mono">VP of Global Sales Enablement</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-300">
                  <span>enablement-admin@mindtickle.com</span>
                  <span className="text-emerald-400 font-mono text-[10px]">● Online</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 relative z-10">
              {adminResetRequested ? (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Reset request dispatched to John Davis (enablement-admin@mindtickle.com)!</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAdminResetRequested(true);
                    setTimeout(() => {
                      setShowAdminResetModal(false);
                      setAdminResetRequested(false);
                    }, 3000);
                  }}
                  className="w-full bg-gradient-to-r from-mt-indigo to-mt-royal-purple hover:opacity-90 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-mt-indigo/20 border border-mt-indigo/40 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Request Admin Reset Authorization</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
