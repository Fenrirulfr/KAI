/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TeamMember } from "../types";
import { INITIAL_SUCCESS_NETWORK } from "../data";
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ChevronRight, 
  MessageSquare, 
  X,
  Mail,
  UserCheck
} from "lucide-react";

interface SuccessNetworkProps {
  onTaskComplete: (taskId: string) => void;
  completedTasks: string[];
}

export default function SuccessNetwork({ onTaskComplete, completedTasks }: SuccessNetworkProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleConnect = (member: TeamMember) => {
    onTaskComplete(`connect-${member.id}`);
  };

  const completedConnectionsCount = INITIAL_SUCCESS_NETWORK.filter(m => completedTasks.includes(`connect-${m.id}`)).length;

  return (
    <section id="success-network" className="scroll-mt-24 space-y-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 relative overflow-hidden shadow-sm">
      {/* Geometric interlocking cutouts eating into the container */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-slate-50 rounded-full border-r border-slate-200 hidden md:block"></div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-slate-50 rounded-full border-l border-slate-200 hidden md:block"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-mt-orange font-mono text-xs tracking-wider uppercase">
            <Users className="w-4 h-4" />
            <span>Success Pillar 06</span>
          </div>
          <h2 className="text-3xl font-bold text-mt-navy mt-1 font-sans tracking-tight">
            Your Success Network
          </h2>
          <p className="text-slate-500 text-sm mt-1.5 max-w-2xl">
            Learning is faster when you know who to ask. Connect with the right people for guidance, product knowledge, sales best practices, and onboarding support. Lock in connections to achieve Revenue Readiness.
          </p>
        </div>

        {/* Local Piece Checklist */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-xs space-y-2 shadow-sm min-w-[200px]">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Sparkles className="w-4 h-4 text-mt-orange" />
            <span>Network Status</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Sync Meetings Set</span>
              <span className="font-mono">{completedConnectionsCount} of {INITIAL_SUCCESS_NETWORK.length}</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-mt-orange rounded-full transition-all duration-500"
                style={{ width: `${(completedConnectionsCount / INITIAL_SUCCESS_NETWORK.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
        {INITIAL_SUCCESS_NETWORK.map((member) => {
          const isConnected = completedTasks.includes(`connect-${member.id}`);
          return (
            <div 
              key={member.id}
              className={`bg-white border rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${
                isConnected ? "border-mt-orange/40 bg-mt-orange/5" : "border-slate-200/80"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-11 h-11 rounded-full object-cover border border-slate-200" 
                    />
                    {isConnected && (
                      <div className="absolute -bottom-1 -right-1 bg-mt-orange border border-white p-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-0.5 truncate">
                    <h4 className="text-sm font-bold text-mt-navy">{member.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium truncate">{member.role}</p>
                    <p className="text-[10px] text-mt-indigo font-mono tracking-wider">{member.department}</p>
                  </div>
                </div>

                <p className="text-slate-500 text-[11px] leading-normal min-h-[60px] line-clamp-3">
                  {member.bio}
                </p>

                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl space-y-1 text-[10px] font-mono">
                  <span className="text-slate-400 block font-semibold uppercase">Regular Availability</span>
                  <span className="text-slate-600 font-medium">{member.availability}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-4 flex gap-2">
                <button
                  onClick={() => setSelectedMember(member)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-2 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Bio</span>
                </button>

                <button
                  onClick={() => handleConnect(member)}
                  className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                    isConnected
                      ? "bg-mt-orange/10 text-mt-orange hover:bg-mt-orange/20"
                      : "bg-mt-navy hover:bg-mt-navy/90 text-white shadow-sm"
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isConnected ? "Connected" : "Sync-up"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-mt-navy text-white p-5 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest text-mt-orange uppercase">MENTOR IDENTIFICATION</span>
              <button 
                onClick={() => setSelectedMember(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <img src={selectedMember.avatar} alt={selectedMember.name} className="w-16 h-16 rounded-full object-cover border border-slate-200 shadow" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-800">{selectedMember.name}</h3>
                  <p className="text-xs text-indigo-600 font-mono tracking-wider font-semibold">{selectedMember.role} ({selectedMember.department})</p>
                  <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 font-semibold text-[10px] px-2 py-0.5 rounded-full border border-amber-200">
                    Onboarding Coach
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-semibold text-slate-700 block uppercase tracking-wider text-[10px] text-slate-400">Professional Bio</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{selectedMember.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <span className="text-slate-400 block text-[9px] uppercase font-semibold">Contact Option</span>
                  <span className="text-slate-700 font-semibold flex items-center gap-1 mt-1">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    {selectedMember.name.toLowerCase()}@mindtickle
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <span className="text-slate-400 block text-[9px] uppercase font-semibold">Next Available Sync</span>
                  <span className="text-slate-700 font-semibold flex items-center gap-1 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    {selectedMember.availability.split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-150 p-4 flex justify-end gap-2 text-xs">
              <button 
                onClick={() => setSelectedMember(null)}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleConnect(selectedMember);
                  setSelectedMember(null);
                }}
                className="bg-mt-orange hover:bg-mt-orange/90 text-white font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Request Booking</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
