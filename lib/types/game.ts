// types/game.ts
import { LucideIcon } from "lucide-react";

export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyShort: string;
  description: string;
  slogan: string;
  avatar: string; // URL to image in /public
  color: "jdu" | "rjd" | "jsp";
}

export interface Metric {
  id: "voteBank" | "youthAppeal" | "womenVoters" | "credibility" | "momentum";
  label: string;
  icon: LucideIcon;
  color: "orange" | "green" | "pink" | "blue" | "red";
}

export interface QuestionOption {
  text: string;
  effects: Partial<Record<Metric["id"], number>>; // e.g., { voteBank: 5, credibility: -2 }
}

export interface Question {
  situation: string;
  options: QuestionOption[];
}

export type GameData = Record<Candidate["id"], Question[]>;

export interface GameState {
  selectedCandidateId: Candidate["id"] | null;
  currentQuestionIndex: number;
  metrics: Record<Metric["id"], number>;
  answers: number[]; // Index of chosen option for each question
  isGameStarted: boolean;
  isGameFinished: boolean;
}
