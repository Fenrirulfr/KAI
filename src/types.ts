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

// ── Kaleidoscope AI Backend API Schemas (Pydantic / OpenAPI alignment) ──
export interface CreateSessionResponse {
  session_id: string;
  message: string;
  phase: string;
  question_number: number | null;
  total_questions: number;
  is_multiple_choice: boolean;
  options: string[] | null;
  min_words_required: number | null;
  learner_profile: Record<string, any> | null;
  recommendations: Record<string, any> | null;
  onboarding_complete: boolean;
  returning_learner: boolean;
}

export interface CreateSessionRequest {
  email?: string;
}

export interface SendMessageRequest {
  content: string; // min_length=1, max_length=2000
}

export interface SendMessageResponse {
  session_id: string;
  message: string;
  phase: string;
  question_number: number | null;
  total_questions: number;
  is_multiple_choice: boolean;
  options: string[] | null;
  min_words_required: number | null;
  learner_profile: Record<string, any> | null;
  recommendations: Record<string, any> | null;
  onboarding_complete: boolean;
  returning_learner: boolean;
}

export interface LearnerRecordResponse {
  email: string;
  raw_answers: Record<string, any>;
  learner_profile: Record<string, any>;
  recommendations: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ErrorResponse {
  detail: string;
  error?: string;
}

// ── Phase 2 Recommendation Schemas ──
export interface RecommendationRequest {
  well?: string;
  wrong?: string;
  strengths?: string;
  areas?: string;
  blueprint?: string;
  status?: string;
}

export interface ActivityOut {
  title: string;
  type: string;
  detail: string;
  ai_roleplay: boolean;
  scenario: string;
  seat_time_mins: number;
  availability: string;
  exit_criteria: string;
}

export interface PathDataOut {
  icon: string;
  layer: string;
  trigger: string;
  activities: ActivityOut[];
}

export interface StatusConfigOut {
  label: string;
  color: string;
  description: string;
}

export interface RecommendationResponse {
  system_status: string;
  status_config: StatusConfigOut;
  prescribed_path: string;
  path_data: PathDataOut;
  directive: string;
  total_seat_time_mins: number;
  [key: string]: any;
}

