import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, GameSettings, Team } from './types';
import { getWordList } from '../data/words';
import confetti from 'canvas-confetti';

const DEFAULT_SETTINGS: GameSettings = {
  pairsCount: 2,
  timePerRound: 60,
  scoreGoal: 10,
  category: 'Geral',
  difficulty: 'Médio',
  vibration: true,
  sound: true,
};

export function useGame() {
  const [state, setState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    currentTeamIndex: 0,
    teams: [],
    settings: DEFAULT_SETTINGS,
    currentTime: 60,
    currentWord: '',
    roundWords: [],
    skippedWords: [],
    isGameOver: false,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initializeTeams = (count: number): Team[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Dupla ${i + 1}`,
      score: 0,
    }));
  };

  const startGame = (settings: GameSettings) => {
    const teams = initializeTeams(settings.pairsCount);
    const words = getWordList(settings.category, settings.difficulty);
    
    setState({
      isPlaying: true,
      isPaused: false,
      currentTeamIndex: 0,
      teams,
      settings,
      currentTime: settings.timePerRound,
      currentWord: words[0],
      roundWords: words.slice(1),
      skippedWords: [],
      isGameOver: false,
    });
  };

  const pauseGame = () => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const nextRound = useCallback(() => {
    setState(prev => {
      const nextTeamIndex = (prev.currentTeamIndex + 1) % prev.teams.length;
      // Re-shuffle words or reuse skipped ones
      const availableWords = [...prev.roundWords, ...prev.skippedWords];
      if (availableWords.length === 0) {
        // This should rarely happen with the lists provided, but for safety:
        return { ...prev, isGameOver: true, isPlaying: false };
      }

      return {
        ...prev,
        currentTeamIndex: nextTeamIndex,
        currentTime: prev.settings.timePerRound,
        currentWord: availableWords[0],
        roundWords: availableWords.slice(1),
        skippedWords: [],
        isPaused: true, // Wait for user to start their turn
      };
    });
  }, []);

  const handleCorrect = () => {
    setState(prev => {
      const currentTeam = prev.teams[prev.currentTeamIndex];
      const newScore = currentTeam.score + 1;
      
      const newTeams = prev.teams.map((t, i) => 
        i === prev.currentTeamIndex ? { ...t, score: newScore } : t
      );

      if (newScore >= prev.settings.scoreGoal) {
        confetti();
        return { ...prev, teams: newTeams, isGameOver: true, isPlaying: false };
      }

      const nextWord = prev.roundWords.length > 0 ? prev.roundWords[0] : prev.skippedWords[0];
      const remainingWords = prev.roundWords.length > 0 
        ? prev.roundWords.slice(1) 
        : prev.skippedWords.slice(1);

      return {
        ...prev,
        teams: newTeams,
        currentWord: nextWord || 'Fim das palavras!',
        roundWords: remainingWords,
      };
    });
  };

  const handleSkip = () => {
    setState(prev => {
      const skipped = [...prev.skippedWords, prev.currentWord];
      const nextWord = prev.roundWords.length > 0 ? prev.roundWords[0] : skipped[0];
      const remainingWords = prev.roundWords.length > 0 
        ? prev.roundWords.slice(1) 
        : skipped.slice(1);

      return {
        ...prev,
        skippedWords: skipped,
        currentWord: nextWord,
        roundWords: remainingWords,
      };
    });
  };

  useEffect(() => {
    if (state.isPlaying && !state.isPaused && !state.isGameOver) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.currentTime <= 1) {
            clearInterval(timerRef.current!);
            nextRound();
            return { ...prev, currentTime: 0 };
          }
          return { ...prev, currentTime: prev.currentTime - 1 };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isPlaying, state.isPaused, state.isGameOver, nextRound]);

  return {
    state,
    startGame,
    pauseGame,
    handleCorrect,
    handleSkip,
    resetGame: () => setState(prev => ({ ...prev, isPlaying: false, isGameOver: false })),
    setPaused: (paused: boolean) => setState(prev => ({ ...prev, isPaused: paused })),
  };
}
