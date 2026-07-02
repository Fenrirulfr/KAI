/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ToolkitApp } from "../types";
import { INITIAL_TOOLKIT } from "../data";
import { 
  Terminal, 
  ExternalLink, 
  Database, 
  Award, 
  Volume2, 
  MessageSquareCode, 
  Linkedin,
  Sparkles,
  BookmarkCheck,
  Globe,
  Video
} from "lucide-react";

interface SalesToolkitProps {
  onTaskComplete: (taskId: string) => void;
  completedTasks: string[];
}

export default function SalesToolkit({ onTaskComplete, completedTasks }: SalesToolkitProps) {
  
  const getIcon = (name: string, colorClass: string) => {
    const props = { className: "w-5 h-5" };
    switch (name) {
      case "Database": return <Database {...props} />;
      case "Award": return <Award {...props} />;
      case "Volume2": return <Volume2 {...props} />;
      case "MessageSquareCode": return <MessageSquareCode {...props} />;
      case "Linkedin": return <Linkedin {...props} />;
      case "Video": return <Video {...props} />;
      default: return <Globe {...props} />;
    }
  };

  const handleLaunchApp = (app: ToolkitApp) => {
    // Standard mock launching notification
    window.open(app.url, "_blank");
    onTaskComplete(`toolkit-${app.id}`);
  };

  const completedToolkitCount = INITIAL_TOOLKIT.filter(app => completedTasks.includes(`toolkit-${app.id}`)).length;

  return (
    <section id="sales-toolkit" className="scroll-mt-24 space-y-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 relative overflow-hidden shadow-sm">
      {/* Geometric interlocking cutouts eating into the container */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-slate-50 rounded-full border-r border-slate-200 hidden md:block"></div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-slate-50 rounded-full border-l border-slate-200 hidden md:block"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-mt-orange font-mono text-xs tracking-wider uppercase">
            <Terminal className="w-4 h-4" />
            <span>Operational Pillar 05</span>
          </div>
          <h2 className="text-3xl font-bold text-mt-navy mt-1 font-sans tracking-tight">
            Your Sales Toolkit
          </h2>
          <p className="text-slate-500 text-sm mt-1.5 max-w-2xl">
            Access and configure the platforms you will use every single day as an Account Executive at Mindtickle. Launch each app to integrate into your Revenue Readiness flow.
          </p>
        </div>

        {/* Local Piece Checklist */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-4 text-xs space-y-3 min-w-[200px]">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Sparkles className="w-4 h-4 text-mt-orange" />
            <span>Toolkit Configuration</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Platforms Synced</span>
              <span className="font-mono">{completedToolkitCount} of {INITIAL_TOOLKIT.length}</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-mt-orange rounded-full transition-all duration-500"
                style={{ width: `${(completedToolkitCount / INITIAL_TOOLKIT.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {INITIAL_TOOLKIT.map((app) => {
          const isLaunched = completedTasks.includes(`toolkit-${app.id}`);
          return (
            <div 
              key={app.id} 
              className={`bg-white border rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${
                isLaunched ? "border-mt-orange/40 bg-mt-orange/5" : "border-slate-200/80"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-xl border ${app.color}`}>
                    {getIcon(app.iconName, app.color)}
                  </div>
                  {isLaunched ? (
                    <BookmarkCheck className="w-5 h-5 text-mt-orange" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200" title="Sync Pending" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    {app.category}
                  </span>
                  <h4 className="text-sm font-bold text-mt-navy tracking-tight">
                    {app.name}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-normal min-h-[50px] line-clamp-3">
                    {app.description}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-4">
                <button
                  onClick={() => handleLaunchApp(app)}
                  className={`w-full py-2 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isLaunched
                      ? "bg-mt-orange/10 text-mt-orange hover:bg-mt-orange/20"
                      : "bg-mt-navy hover:bg-mt-navy/90 text-white shadow-sm"
                  }`}
                >
                  <span>{isLaunched ? "Launch Platform" : "Sync & Launch"}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
