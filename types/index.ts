export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'student';
  email: string;
  institution?: string;
  progress?: UserProgress;
}

export interface UserProgress {
  totalQuestions: number;
  correctAnswers: number;
  correctRate: number;
  loginStreak: number;
  learningHistory: DailyProgress[];
  categoryProgress: { [category: string]: CategoryProgress };
}

export interface DailyProgress {
  date: string;
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number;
}

export interface CategoryProgress {
  correct: number;
  total: number;
  progress: number;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswers: number[];
  isMultipleChoice: boolean;
  explanation: string;
  scenario?: string;
  createdAt: string;
  createdBy: string;
}

export interface QuizResult {
  questionId: number;
  questionText: string;
  category: string;
  selectedAnswer: number | number[];
  correctAnswer: number[];
  isCorrect: boolean;
  isMultipleChoice: boolean;
  options: string[];
}