/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Persona, TeamMember, ToolkitApp } from "./types";

export const INITIAL_PERSONAS: Persona[] = [
  {
    id: "sarah-ciso",
    name: "Sarah Jenkins",
    title: "Chief Information Security Officer",
    company: "SecureNet Solutions",
    industry: "Cybersecurity Enterprise",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    behavior: "Extremely detail-oriented, skeptical of non-compliant vendors, values data protection above all, short patience for generic SaaS pitches.",
    painPoints: "High security compliance overhead, long software vetting cycles, lack of security alignment across expanding field sales reps.",
    initialMessage: "Hi, I'm Sarah. We are expanding rapidly, but security compliance vetting is holding up deals, and my security reps are speaking a different language than my general AEs. How exactly does Mindtickle help align this without exposing us to risks?"
  },
  {
    id: "marcus-revops",
    name: "Marcus Vance",
    title: "VP of Revenue Operations",
    company: "CloudScale Systems",
    industry: "SaaS Infrastructure",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    behavior: "Analytical, metrics-driven, values tool consolidation, obsessed with pipeline hygiene and AE ramp time statistics.",
    painPoints: "New hire ramp time is currently 6.5 months, too many disconnected enablement tools, lack of data showing what behavior drives closed-won deals.",
    initialMessage: "Hey there. Our biggest headache is AE ramp time—it's taking over half a year for new AEs to hits quota. Plus, we're paying for five different training and content platforms. What's the unified story here?"
  },
  {
    id: "elena-sales",
    name: "Elena Rostova",
    title: "VP of Global Enterprise Sales",
    company: "ApexLogistics",
    industry: "Logistics & Supply Chain",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    behavior: "High-energy, focused entirely on quota attainment, coaching consistency, and deal-simulation training.",
    painPoints: "Managers aren't coaching consistently, average performers aren't replicating the behaviors of top-tier sellers, key deals slip in late stages.",
    initialMessage: "Nice to meet you. I have 120 reps globally. Ten percent are crushing it, but the middle 60% are missing their numbers. We need structural coaching that actually works, not just slide presentations. How do we change behavior?"
  }
];

export const INITIAL_SUCCESS_NETWORK: TeamMember[] = [
  {
    id: "suraj-enablement",
    name: "Suraj",
    role: "Enablement Lead",
    department: "Sales Enablement",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    bio: "Onboarding architect. Reach out to Suraj for curriculum questions, deal simulation evaluations, or anything relating to your 6-Week Path.",
    availability: "Mon, Wed, Fri (1:00 PM - 3:00 PM)",
    connected: false
  },
  {
    id: "jane-pmm",
    name: "Jane Doe",
    role: "Product Marketing Director",
    department: "Marketing",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    bio: "Competitive intelligence and positioning expert. Connect with Jane to understand competitor battlecards, persona deep dives, or core collateral.",
    availability: "Tue, Thu (11:00 AM - 12:30 PM)",
    connected: false
  },
  {
    id: "john-manager",
    name: "John Smith",
    role: "Enterprise Sales Manager",
    department: "Sales",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    bio: "Your direct coach and manager. Connect with John to review account planning strategies, demo certifications, and mock negotiations.",
    availability: "Daily (4:00 PM - 5:00 PM)",
    connected: false
  },
  {
    id: "emily-ae",
    name: "Emily Chen",
    role: "Senior Account Executive",
    department: "Sales",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    bio: "Peer mentor and top-performing enterprise rep. Ask Emily about real field tips, handling objections, and navigating internal deal reviews.",
    availability: "Wed, Thu (2:00 PM - 4:00 PM)",
    connected: false
  },
  {
    id: "michael-revops",
    name: "Michael Ross",
    role: "RevOps Partner",
    department: "Revenue Operations",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
    bio: "System, quoting, and process expert. Reach out to Michael for Salesforce setup, pricing calculators, contract approvals, and commission rules.",
    availability: "Tue, Fri (9:00 AM - 10:30 AM)",
    connected: false
  }
];

export const INITIAL_TOOLKIT: ToolkitApp[] = [
  {
    id: "linkedin",
    name: "LinkedIn Sales Navigator",
    category: "Prospecting & Insights",
    description: "Target enterprise buyers, map decision-makers, and track company trigger events.",
    url: "https://linkedin.com",
    iconName: "Linkedin",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    launched: false
  },
  {
    id: "sfdc",
    name: "SFDC (Salesforce CRM)",
    category: "System of Record",
    description: "Manage accounts, log activities, and track deal stages throughout the sales cycle.",
    url: "https://salesforce.com",
    iconName: "Database",
    color: "bg-sky-50 text-sky-600 border-sky-200",
    launched: false
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "Collaborate with your sales engineering, product marketing, and leadership support pods.",
    url: "https://slack.com",
    iconName: "MessageSquareCode",
    color: "bg-rose-50 text-rose-600 border-rose-200",
    launched: false
  },
  {
    id: "zoom",
    name: "Lead IQ",
    category: "Prospecting & Insights",
    description: "Identify key stakeholders, capture accurate contact details, and sync prospects directly to your database.",
    url: "https://leadiq.com",
    iconName: "Database",
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    launched: false
  }
];

export const COMPANY_EXPLORER_DETAILS = {
  companyStory: {
    title: "Our Story: Defining Sales Readiness",
    text: "Founded in 2011, Mindtickle pioneered the Sales Readiness category. We realized that B2B selling had evolved from transactional relationships to deep, skill-intensive solution consultations. Simply giving sellers marketing collateral wasn't working. We built a platform designed to systematically measure and improve rep capability. Today, Mindtickle powers revenue productivity for over 500+ global enterprises. We believe that readiness is not a one-time onboarding event, but an ongoing 'everboarding' discipline that drives predictable, repeatable revenue growth.",
    achievements: [
      "Over $100B in revenue pipeline optimized",
      "Consistently recognized as a Category Leader by G2 and Gartner",
      "Global presence across US, Europe, and Asia-Pacific"
    ]
  },
  coreValues: [
    {
      name: "Customer Obsession",
      focus: "We win when our clients' sales reps are ready and winning in the field.",
      icon: "Heart"
    },
    {
      name: "Continuous Everboarding",
      focus: "Readiness isn't a one-time onboarding milestone; it is an ongoing daily discipline.",
      icon: "Sparkles"
    },
    {
      name: "One Team Alignment",
      focus: "Cross-functional synergy between sales, marketing, and product creates a unified front.",
      icon: "Users2"
    },
    {
      name: "Data-Driven Excellence",
      focus: "Using quantitative readiness scores and smart voice analysis to validate rep capability.",
      icon: "TrendingUp"
    }
  ],
  leadership: [
    {
      name: "Krishna Depura",
      role: "Co-Founder & CEO",
      quote: "Revenue readiness is the ultimate competitive moat. When your reps know more, consult better, and adapt faster than competitors, you win.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Deepak Diwakar",
      role: "Co-Founder & CTO",
      quote: "We don't build software just for compliance training; we build highly interactive intelligent engines that actively shape human potential and mastery.",
      img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150"
    }
  ]
};
