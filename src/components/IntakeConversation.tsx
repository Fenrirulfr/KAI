import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  Send, 
  Lightbulb, 
  RefreshCw, 
  User, 
  CornerDownLeft,
  ChevronRight,
  AlertTriangle,
  RotateCcw
} from "lucide-react";

interface IntakeConversationProps {
  onProfileCaptured?: (profile: { persona: string; focus: string; lastRole: string }) => void;
  onOpenAdminModal?: () => void;
  onOpenConfirmResetModal?: () => void;
}

interface LearnerState {
  messages: { sender: "kai" | "user" | "buddy"; text: string; role?: "user" | "model"; time: string }[];
  session_id: string;
  current_question_index: number;
  answers: Record<string, string>;
  phase: "greeting" | "onboarding" | "returning" | "generating" | "chat";
  learner_profile: {
    persona: string;
    experience_level: string;
    industry_background: string;
    communication_preference: string;
    communication_style?: string;
    strengths: string[];
    development_areas: string[];
  } | null;
  recommendations: {
    recommended_tutor_modules: string[];
    recommended_missions: string[];
    peer_learning_recommendations: { topic: string; reason: string }[];
  } | null;
  current_options: string[] | null;
  email: string;
  is_returning_learner: boolean;
  experience_track: string;
  awaiting_other_detail: boolean;
}

export default function IntakeConversation({ onProfileCaptured, onOpenAdminModal, onOpenConfirmResetModal }: IntakeConversationProps) {
  const [learnerState, setLearnerState] = useState<LearnerState>(() => {
    try {
      const saved = localStorage.getItem("kai_agent_state");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved KAI state", e);
    }

    return {
      messages: [],
      session_id: "session_" + Math.random().toString(36).substring(2, 9),
      current_question_index: -1,
      answers: {},
      phase: "greeting",
      learner_profile: null,
      recommendations: null,
      current_options: null,
      email: "devdatta.jujare@mindtickle.com",
      is_returning_learner: false,
      experience_track: "",
      awaiting_other_detail: false
    };
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [resetCount, setResetCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("kai_reset_count");
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-sync State changes across tabs and components
  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem("kai_agent_state");
        if (saved) {
          const parsed = JSON.parse(saved);
          setLearnerState(parsed);
          if (parsed.messages && parsed.messages.length === 0) {
            setInput("");
            setError(null);
          }
          
          // Notify parent on load if profile is complete or reset
          if (onProfileCaptured) {
            if (parsed.learner_profile) {
              onProfileCaptured({
                persona: parsed.learner_profile.persona,
                focus: parsed.learner_profile.communication_preference || parsed.learner_profile.communication_style || "",
                lastRole: parsed.answers.last_role || parsed.answers.experience_level || "AE"
              });
            } else {
              onProfileCaptured({
                persona: "Unassigned",
                focus: "",
                lastRole: ""
              });
            }
          }
        }
        const savedReset = localStorage.getItem("kai_reset_count");
        setResetCount(savedReset ? parseInt(savedReset, 10) : 0);
      } catch (e) {
        console.error("Sync state error:", e);
      }
    };
    window.addEventListener("kai_state_updated", handleSync);
    window.addEventListener("kai_reset_count_updated", handleSync);
    return () => {
      window.removeEventListener("kai_state_updated", handleSync);
      window.removeEventListener("kai_reset_count_updated", handleSync);
    };
  }, [onProfileCaptured]);

  // Initial greeting trigger
  useEffect(() => {
    if (learnerState.messages.length === 0 && learnerState.phase === "greeting") {
      triggerInitialGreeting();
    }
  }, [learnerState.messages.length, learnerState.phase]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [learnerState.messages, isTyping]);

  const triggerInitialGreeting = async () => {
    setIsTyping(true);
    setError(null);
    try {
      const response = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: learnerState }),
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
        const updatedState = { ...data.finalState, messages: withTimes };
        setLearnerState(updatedState);
        localStorage.setItem("kai_agent_state", JSON.stringify(updatedState));
        setTimeout(() => window.dispatchEvent(new Event("kai_state_updated")), 0);
      }
    } catch (err: any) {
      console.error("Error fetching KAI greeting:", err);
      setError("Failed to initialize KAI. Please click reset to try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleAnswerSubmit = async (answerText: string) => {
    if (isTyping || !answerText.trim()) return;

    const userMsg = {
      sender: "user" as const,
      text: answerText,
      role: "user" as const,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updatedState = {
      ...learnerState,
      messages: [...learnerState.messages, userMsg]
    };

    setLearnerState(updatedState);
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: updatedState }),
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
        const nextState = { ...data.finalState, messages: withTimes };
        setLearnerState(nextState);
        localStorage.setItem("kai_agent_state", JSON.stringify(nextState));
        
        if (onProfileCaptured && nextState.learner_profile) {
          setTimeout(() => {
            onProfileCaptured({
              persona: nextState.learner_profile!.persona,
              focus: nextState.learner_profile!.communication_preference || nextState.learner_profile!.communication_style || "",
              lastRole: nextState.answers.last_role || nextState.answers.experience_level || "AE"
            });
          }, 0);
        }

        setTimeout(() => window.dispatchEvent(new Event("kai_state_updated")), 0);
      }
    } catch (err: any) {
      console.error("Error communicating with KAI agent:", err);
      setError("Failed to send response to KAI. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    if (resetCount >= 1) {
      if (onOpenAdminModal) {
        onOpenAdminModal();
      } else {
        window.dispatchEvent(new CustomEvent("open_admin_reset_modal"));
      }
      return;
    }
    if (onOpenConfirmResetModal) {
      onOpenConfirmResetModal();
    } else {
      window.dispatchEvent(new CustomEvent("open_confirm_reset_modal"));
    }
  };

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const isAboutYouQuestion = learnerState.experience_track && 
    (learnerState.current_question_index === 6 || learnerState.awaiting_other_detail);

  // Show the Kai Revenue Readiness chat box only to new user
  if (learnerState.is_returning_learner) {
    return null;
  }

  return (
    <section id="intake-conversation" className="scroll-mt-24 space-y-6">
      {/* Main UI Widget - styled exactly like the screenshot */}
      <div className="bg-mt-navy rounded-2xl border border-slate-800 shadow-xl overflow-hidden text-white font-sans max-w-5xl mx-auto">
        {/* Header Block */}
        <div className="border-b border-slate-800 bg-mt-navy/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Avatar Icon 'K' */}
            <img 
              src="https://lh3.googleusercontent.com/d/1-IyYMa9knatGlV8ZcU-XfGuiBDiePzWP"
              referrerPolicy="no-referrer"
              alt="Kai"
              className="w-10 h-10 rounded-full object-cover shadow-md shrink-0 border border-slate-700 bg-slate-900"
            />
            <div>
              <h3 className="font-extrabold text-sm text-white tracking-wide">
                Kai — Revenue Readiness Co-Pilot
              </h3>
              <p className="text-[11px] text-slate-400 font-mono tracking-wider flex items-center gap-1.5">
                <span>Intake Conversation</span>
                <span className="text-slate-600">•</span>
                <span>ElevateOS™ Engine</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {learnerState.experience_track && (
              <div className="text-right">
                <span className="text-[9px] font-mono text-mt-orange bg-mt-orange/10 px-2 py-1 rounded font-bold uppercase border border-mt-orange/20">
                  Track: {learnerState.experience_track}
                </span>
              </div>
            )}
            <button 
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-slate-700 hover:border-red-500/30"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{resetCount >= 1 ? "RESET QUESTIONNAIRE (CONTACT ADMIN TO UPDATE INFORMATION)" : "RESET QUESTIONNAIRE"}</span>
            </button>
          </div>
        </div>

        {/* Chat Stream Area */}
        <div className="p-6 space-y-6 max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          {(learnerState.messages || []).map((msg, index) => {
            const isKai = msg.sender === "kai" || msg.sender === "buddy";
            return (
              <div key={index} className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Sender Title label */}
                <div className={`text-[10px] font-mono tracking-widest font-black uppercase ${
                  isKai ? "text-slate-500" : "text-mt-indigo"
                }`}>
                  {isKai ? "KAI CO-PILOT" : "YOU"}
                </div>
                
                {/* Text Bubble */}
                <div className={`max-w-[85%] rounded-2xl px-5 py-4 text-[13px] leading-relaxed whitespace-pre-line ${
                  isKai 
                    ? "bg-slate-900 text-slate-100 border border-slate-800/60 rounded-tl-sm shadow-sm"
                    : "bg-mt-indigo text-white font-medium ml-auto rounded-tr-sm shadow-md"
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                KAI CO-PILOT
              </div>
              <div className="bg-slate-900 text-slate-300 rounded-2xl rounded-tl-sm px-5 py-3.5 text-xs inline-flex items-center gap-1.5">
                <span className="w-2 h-2 bg-mt-orange rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-mt-orange rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-mt-orange rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-950/40 border border-red-900/60 p-4 rounded-xl text-xs text-red-400 font-medium">
              {error}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Action Panel / Input controls */}
        <div className="border-t border-slate-800/80 bg-[#0d1a29] p-5 space-y-4">
          
          {/* Dynamic Options Choices from State Graph */}
          {learnerState.current_options && learnerState.current_options.length > 0 && !isTyping && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                Select your response:
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(learnerState.current_options || []).map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput("");
                      handleAnswerSubmit(option);
                    }}
                    disabled={isTyping}
                    className="bg-[#16273b] hover:bg-[#1f354f] border border-slate-700/80 hover:border-sky-500/40 text-slate-200 hover:text-white rounded-xl px-4 py-2.5 text-xs font-semibold text-left transition-all duration-200 flex items-center justify-between gap-3 group max-w-full"
                  >
                    <span>{option}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#1da1f2] shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Input Box (Visible when no options OR during open-ended assessment OR in free chat mode) */}
          {(!learnerState.current_options || learnerState.current_options.length === 0 || isAboutYouQuestion || learnerState.phase === "chat") && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!input.trim() || isTyping) return;
                if (isAboutYouQuestion && wordCount < 30) return;
                const text = input;
                setInput("");
                handleAnswerSubmit(text);
              }}
              className="relative flex flex-col gap-2 pt-2 border-t border-slate-800/50"
            >
              {isAboutYouQuestion && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-1 gap-2">
                  <span className="text-[11px] text-mt-amber font-medium">
                    Kai requires a descriptive reply (minimum 30 words) to run the blueprint compiler.
                  </span>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    wordCount >= 30 ? "bg-mt-teal/20 text-mt-teal border border-mt-teal/30" : "bg-mt-amber/20 text-mt-amber border border-mt-amber/30"
                  }`}>
                    {wordCount} / 30 words
                  </span>
                </div>
              )}
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    isAboutYouQuestion 
                      ? "Describe your sales background, prior ICP, key victories, and goals..." 
                      : learnerState.phase === "chat"
                        ? "Ask Kai any coaching question, playbook guidelines, or mentoring matches..."
                        : "Type your answer here..."
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                  className="w-full bg-[#132235] border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-mt-orange focus:ring-1 focus:ring-mt-orange transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping || (isAboutYouQuestion && wordCount < 30)}
                  className="absolute right-2.5 p-2 rounded-lg bg-mt-orange hover:bg-mt-orange/90 text-white disabled:bg-slate-800 disabled:text-slate-500 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
