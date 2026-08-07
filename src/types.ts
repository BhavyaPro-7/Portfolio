export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Development' | 'Productivity' | 'AI Tools' | 'Design';
  icon: string;
  badgeBg?: string;
  badgeText?: string;
  badgeColor?: string;
  level?: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  purpose: string;
  category: string;
  icon: string;
  iconBg: string;
  image?: string;
  tags: string[];
  link?: string;
  github?: string;
  highlights: string[];
  status: 'Active' | 'Completed' | 'In Progress';
  whatILearned: string;
  challenges: string;
  futureImprovements: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FocusItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio1: string;
  bio2: string;
  learningPhilosophy: string;
  whyBuildProjects: string;
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
  location: string;
  educationYear: string;
  educationDegree: string;
  educationSchool: string;
  quoteBanner: string;
  superpowerQuote: string;
  yearTag: string;
  journey: JourneyItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  coreValues: CoreValue[];
  focusItems: FocusItem[];
}
