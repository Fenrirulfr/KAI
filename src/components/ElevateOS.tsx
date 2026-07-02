/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  ArrowRight, 
  Eye
} from "lucide-react";

interface ElevateOSProps {
  onTaskComplete: (taskId: string) => void;
  completedTasks: string[];
}

export default function ElevateOS({ onTaskComplete, completedTasks }: ElevateOSProps) {
  const isCompleted = completedTasks.includes("explore-elevate-os");

  const handleOpenExplore = () => {
    window.open("https://deeplinks.mindtickle.com/vnfxJClGF2b", "_blank", "noopener,noreferrer");
    onTaskComplete("explore-elevate-os");
  };

  return (
    <section id="elevate-os" className="scroll-mt-24 space-y-8">
      <div className="bg-mt-navy rounded-3xl p-6 md:p-10 border border-slate-800 text-white relative overflow-hidden">
        {/* Geometric interlocking cutouts eating into the dark container */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-slate-50 rounded-full border-r border-slate-800 hidden md:block"></div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-slate-50 rounded-full border-l border-slate-800 hidden md:block"></div>

        {/* Abstract glowing background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-mt-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-mt-indigo/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="space-y-5">

            
            <h2 className="text-3xl font-extrabold font-sans tracking-tight">
              ElevateOS™
            </h2>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              Mindtickle is evolving. ElevateOS™ is our brand new consolidated platform designed to bridge the gap between rep readiness and live call execution. Access the latest enablement resources, coaching modules, and AI sales assistance in one unified interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleOpenExplore}
                className="bg-gradient-to-r from-mt-orange to-mt-orange/80 hover:from-mt-orange/90 hover:to-mt-orange/70 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-mt-orange/20"
              >
                <span>ElevateOS™ First Call Deck</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleOpenExplore}
                className="bg-mt-deep-space hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Enablement Vault</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
