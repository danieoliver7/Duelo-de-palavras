/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

export type Category = 'Filmes' | 'Famosos' | 'Profissões' | 'Objetos' | 'Frutas' | 'Cores';

export interface GameSettings {
  pairsCount: number;
  timePerRound: number; // in seconds
  scoreGoal: number;
  category: Category | 'Geral';
  difficulty: Difficulty;
  vibration: boolean;
  sound: boolean;
}

export interface Team {
  id: number;
  name: string;
  score: number;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTeamIndex: number;
  teams: Team[];
  settings: GameSettings;
  currentTime: number;
  currentWord: string;
  roundWords: string[];
  skippedWords: string[];
  isGameOver: boolean;
}

export const CATEGORIES: Category[] = ['Filmes', 'Famosos', 'Profissões', 'Objetos', 'Frutas', 'Cores'];
export const DIFFICULTIES: Difficulty[] = ['Fácil', 'Médio', 'Difícil'];
export const TIMES = [30, 60, 90];
export const GOALS = [5, 10, 15];
