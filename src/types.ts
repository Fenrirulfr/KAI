/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PuzzlePiece {
  id: string;
  name: string;
  description: string;
  color: string; // Gradient Tailwind class e.g., "from-blue-500 to-indigo-600"
  icon: string; // Lucide icon name
  completed: boolean;
  requiredTasks: number;
  completedTasks: number;
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  avatar: string;
  behavior: string;
  painPoints: string;
  initialMessage: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface PitchFeedback {
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  bio: string;
  availability: string;
  connected: boolean;
}

export interface ToolkitApp {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  iconName: string;
  color: string;
  launched: boolean;
}

export interface LearnerProfile {
  persona: string;
  experience_level: string;
  industry_background: string;
  communication_preference: string;
  communication_style?: string;
  strengths: string[];
  development_areas: string[];
}

export interface PeerLearningItem {
  topic: string;
  reason: string;
}

export interface Recommendations {
  recommended_tutor_modules: string[];
  recommended_missions: string[];
  peer_learning_recommendations: PeerLearningItem[];
}

export interface ProfileGenerationResult {
  profile: LearnerProfile;
  recommendations: Recommendations;
  welcome_message: string;
}
