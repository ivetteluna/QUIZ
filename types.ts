
export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizConfig {
  level: string;
  grade: string;
  subject: string;
  studentName: string;
}

export interface Settings {
  adminPhone: string;
  schoolLogo: string | null;
}

export type AppState = 'SETUP' | 'LOADING' | 'QUIZ' | 'RESULTS' | 'SETTINGS' | 'ERROR';
