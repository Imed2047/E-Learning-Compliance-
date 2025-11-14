
export interface PlatformData {
  platform: string;
  last_updated: string;
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  author: string;
  duration: number | null;
  difficulty: 'beginner' | 'intermediate' | 'expert' | string;
  objectives?: string[];
  content: ModuleContent;
  quiz?: Quiz;
}

export interface ModuleContent {
  case_study?: CaseStudy;
  definitions?: Definition[];
  red_flags?: RedFlag[];
}

export interface CaseStudy {
  title: string;
  content: string;
  learning_points?: string[];
}

export interface Definition {
  term: string;
  definition: string;
  reference?: string;
}

export interface RedFlag {
  description: string;
  severity: 'low' | 'medium' | 'high' | 'very_high' | string;
  examples?: string[];
  investigation_actions?: string[];
}

export interface Quiz {
  questions: QuizQuestion[];
  passing_score: number;
}

export interface QuizQuestion {
  id?: string;
  question: string;
  options: QuizOption[];
  explanation: string;
  reference?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface Progress {
  [moduleId: string]: {
    completed?: boolean;
    quizScore?: number;
    quizTotal?: number;
  }
}
