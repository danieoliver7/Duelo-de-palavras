/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from './hooks/useGame';
import { Button, Card, TopNavbar } from './components/UI';
import { CATEGORIES, DIFFICULTIES, TIMES, GOALS, GameSettings, Category, Difficulty } from './types';
import { PlayCircle, HelpCircle, Settings as SettingsIcon, X, Check, SkipForward, Trophy, RotateCcw, Home as HomeIcon, ChevronLeft, ChevronRight, Plus, Minus, Timer, Rocket, Film, Music, Utensils, Zap, Users } from 'lucide-react';
import { cn } from './lib/utils';

type Screen = 'HOME' | 'SETUP' | 'GAME' | 'RESULT' | 'HOW_TO_PLAY';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const { state, startGame, handleCorrect, handleSkip, resetGame, setPaused } = useGame();
  
  const [setupData, setSetupData] = useState<GameSettings>(() => {
    const saved = localStorage.getItem('duelo_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing settings', e);
      }
    }
    return {
      pairsCount: 2,
      timePerRound: 60,
      scoreGoal: 10,
      category: 'Geral',
      difficulty: 'Médio',
      vibration: true,
      sound: true,
    };
  });

  const updateSetup = (data: Partial<GameSettings>) => {
    setSetupData(prev => {
      const next = { ...prev, ...data };
      localStorage.setItem('duelo_settings', JSON.stringify(next));
      return next;
    });
  };


  const handleStart = () => {
    startGame(setupData);
    setCurrentScreen('GAME');
  };

  return (
    <div className="min-h-screen bg-mesh selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {currentScreen === 'HOME' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <div className="w-full max-w-sm flex flex-col items-center mb-16">
              <motion.div 
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="relative mb-8"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary opacity-30 blur-2xl rounded-full"></div>
                <Zap size={96} className="text-tertiary relative fill-current" />
              </motion.div>
              <h2 className="font-headline text-5xl uppercase italic leading-none text-center">
                <span className="block text-on-surface">DUELO</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">DAS</span>
                <span className="block text-on-surface">PALAVRAS</span>
              </h2>
            </div>

            <div className="w-full max-w-md flex flex-col gap-6">
              <Button size="xl" onClick={() => setCurrentScreen('SETUP')} className="w-full">
                <PlayCircle size={32} fill="currentColor" className="text-on-tertiary" />
                <span className="text-on-tertiary">Jogar</span>
              </Button>
              
              <div className="grid grid-cols-1 gap-4">
                <Button variant="ghost" size="lg" onClick={() => setCurrentScreen('HOW_TO_PLAY')} className="w-full">
                  <HelpCircle size={24} className="text-primary" />
                  Como Jogar
                </Button>
                <Button variant="ghost" size="lg" className="w-full opacity-50 cursor-not-allowed">
                  <SettingsIcon size={24} className="text-primary" />
                  Configurações
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {currentScreen === 'HOW_TO_PLAY' && (
          <motion.div
            key="how-to"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="min-h-screen p-6 bg-mesh"
          >
            <TopNavbar 
              title="COMO JOGAR" 
              rightElement={
                <Button variant="ghost" className="rounded-full w-12 h-12 p-0" onClick={() => setCurrentScreen('HOME')}>
                  <X />
                </Button>
              }
            />
            <div className="pt-32 max-w-lg mx-auto space-y-6">
              <Card>
                <h3 className="text-2xl font-headline mb-4 uppercase text-primary">Regras Básicas</h3>
                <ul className="space-y-4 text-on-surface-variant font-body">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">1</div>
                    Dividam-se em duplas. Um segura o celular e o outro adivinha.
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">2</div>
                    Descreva a palavra sem dizer o nome dela ou rimas proibidas!
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">3</div>
                    Acertou? Ganhe 1 ponto. Pular? A palavra volta depois.
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">4</div>
                    Vence a dupla que atingir a meta de pontos primeiro!
                  </li>
                </ul>
              </Card>
              <Button variant="primary" size="lg" className="w-full" onClick={() => setCurrentScreen('SETUP')}>
                Entendi, vamos jogar!
              </Button>
            </div>
          </motion.div>
        )}

        {currentScreen === 'SETUP' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="min-h-screen bg-mesh pb-32"
          >
            <TopNavbar title="CONFIGURAÇÃO" rightElement={
              <Button variant="ghost" className="rounded-full w-12 h-12 p-0" onClick={() => setCurrentScreen('HOME')}>
                <X />
              </Button>
            } />
            
            <main className="pt-32 px-6 max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pairs Count */}
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 border border-white/10">
                  <Users size={40} className="text-secondary" />
                  <span className="font-headline text-xs uppercase tracking-widest text-on-surface-variant">Duplas</span>
                  <div className="flex items-center gap-6">
                    <Button 
                      variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0"
                      onClick={() => updateSetup({ pairsCount: Math.max(2, setupData.pairsCount - 1) })}
                    >
                      <Minus />
                    </Button>
                    <span className="text-4xl font-headline text-white">{setupData.pairsCount}</span>
                    <Button 
                      variant="secondary" size="sm" className="rounded-full w-10 h-10 p-0"
                      onClick={() => updateSetup({ pairsCount: setupData.pairsCount + 1 })}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>

                {/* Time */}
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 border border-white/10">
                  <Timer size={40} className="text-secondary" />
                  <span className="font-headline text-xs uppercase tracking-widest text-on-surface-variant">Tempo</span>
                  <div className="flex items-center gap-4">
                    {TIMES.map(t => (
                      <button
                        key={t}
                        onClick={() => updateSetup({ timePerRound: t })}
                        className={cn(
                          "w-12 h-12 rounded-full font-headline transition-all",
                          setupData.timePerRound === t 
                            ? "bg-secondary text-on-secondary shadow-lg scale-110" 
                            : "bg-surface-container-highest text-slate-400"
                        )}
                      >
                        {t}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 md:col-span-2 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Trophy size={40} className="text-tertiary" />
                    <span className="font-headline text-xs uppercase tracking-widest text-on-surface-variant">Meta</span>
                  </div>
                  <div className="w-full flex justify-between items-center bg-surface-container-low rounded-full p-1 border border-white/5">
                    {GOALS.map(g => (
                      <button
                        key={g}
                        onClick={() => updateSetup({ scoreGoal: g })}
                        className={cn(
                          "flex-1 py-3 rounded-full font-headline text-xl transition-all",
                          setupData.scoreGoal === g 
                            ? "bg-tertiary text-on-tertiary shadow-lg" 
                            : "text-slate-500"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="glass-card p-6 rounded-2xl space-y-4 md:col-span-2 border border-white/10">
                  <span className="font-headline text-xs uppercase tracking-widest text-on-surface-variant block">Categorias</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Button 
                      variant={setupData.category === 'Geral' ? 'primary' : 'ghost'} 
                      onClick={() => updateSetup({ category: 'Geral' })}
                      className="h-16"
                    >
                      Geral
                    </Button>
                    {(['Filmes', 'Famosos', 'Profissões', 'Objetos', 'Frutas', 'Cores'] as Category[]).map(c => (
                      <Button
                        key={c}
                        variant={setupData.category === c ? 'primary' : 'ghost'}
                        onClick={() => updateSetup({ category: c })}
                        className="h-16"
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="glass-card p-6 rounded-2xl space-y-4 md:col-span-2 border border-white/10">
                  <span className="font-headline text-xs uppercase tracking-widest text-on-surface-variant block">Dificuldade</span>
                  <div className="flex gap-4">
                    {DIFFICULTIES.map(d => (
                      <Button
                        key={d}
                        variant={setupData.difficulty === d ? 'secondary' : 'ghost'}
                        onClick={() => updateSetup({ difficulty: d })}
                        className="flex-1"
                      >
                        {d}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </main>

            <div className="fixed bottom-10 left-0 w-full px-6 flex justify-center z-40">
              <Button variant="primary" size="xl" className="w-full max-w-xl" onClick={handleStart}>
                INICIAR PARTIDA
              </Button>
            </div>
          </motion.div>
        )}

        {currentScreen === 'GAME' && state.isPlaying && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen bg-mesh flex flex-col"
          >
            <TopNavbar 
              title={`TIME ${state.teams[state.currentTeamIndex].id}`} 
              subtitle="Partida em Curso"
              rightElement={
                <div className="bg-slate-900 rounded-full py-2 px-4 border-2 border-slate-800 text-secondary font-headline">
                  {state.teams[state.currentTeamIndex].score} pts
                </div>
              }
            />

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {state.isPaused ? (
                <Card className="p-12 space-y-8 max-w-md w-full border-primary/20">
                  <h3 className="text-4xl font-headline text-white uppercase italic">PREPARADOS?</h3>
                  <p className="text-on-surface-variant font-body">Vez da {state.teams[state.currentTeamIndex].name}</p>
                  <Button variant="primary" size="xl" className="w-full" onClick={() => setPaused(false)}>
                    ESTAMOS PRONTOS!
                  </Button>
                </Card>
              ) : (
                <>
                  <div className="mb-12">
                    <span className="inline-block px-4 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 font-headline text-xs uppercase tracking-[0.2em] mb-4">
                      Adivinhe a palavra
                    </span>
                    <motion.h1 
                      key={state.currentWord}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-headline text-6xl text-white uppercase tracking-tighter drop-shadow-lg leading-tight break-words px-4"
                    >
                      {state.currentWord}
                    </motion.h1>
                  </div>

                  <div className="relative w-56 h-56 flex items-center justify-center">
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle className="text-white/5" cx="112" cy="112" r="100" fill="transparent" stroke="currentColor" strokeWidth="12" />
                      <motion.circle 
                        className="text-tertiary" cx="112" cy="112" r="100" fill="transparent" stroke="currentColor" strokeWidth="12"
                        strokeDasharray={628}
                        strokeDashoffset={628 - (628 * state.currentTime) / state.settings.timePerRound}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <span className="font-headline text-7xl text-white leading-none">{state.currentTime}</span>
                      <span className="font-headline text-on-surface-variant text-xs uppercase tracking-widest mt-1">segundos</span>
                    </div>
                  </div>
                </>
              )}
            </main>

            {!state.isPaused && (
              <footer className="p-6 pb-12 grid grid-cols-2 gap-4 max-w-md mx-auto w-full">
                <Button variant="ghost" size="lg" className="bg-orange-600 text-white border-none shadow-[0_6px_0_0_#9a3412]" onClick={handleSkip}>
                  <SkipForward size={24} />
                  Pular
                </Button>
                <Button variant="success" size="lg" onClick={handleCorrect}>
                  <Check size={24} strokeWidth={4} />
                  Acertou
                </Button>
              </footer>
            )}
          </motion.div>
        )}

        {(state.isGameOver || currentScreen === 'RESULT') && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-mesh p-6 flex flex-col items-center pt-32 pb-12"
          >
            <TopNavbar title="FIM DE JOGO" />
            
            <section className="relative flex flex-col items-center mb-12">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-tertiary/40 blur-[40px] rounded-full scale-110"></div>
                <div className="relative bg-gradient-to-b from-yellow-300 to-orange-500 p-10 rounded-[3rem] shadow-[0_12px_0_0_#b45309] border-4 border-yellow-200">
                  <Trophy size={100} className="text-white drop-shadow-xl" fill="currentColor" />
                </div>
              </div>
              <h2 className="font-headline text-5xl text-white uppercase italic text-center drop-shadow-md">
                VITÓRIA!
              </h2>
              <p className="font-headline text-2xl text-secondary mt-2">Partida Encerrada</p>
            </section>

            <div className="w-full max-w-lg space-y-4 mb-12">
              {[...state.teams].sort((a,b) => b.score - a.score).map((team, index) => (
                <div 
                  key={team.id}
                  className={cn(
                    "glass-card p-6 rounded-2xl flex items-center justify-between border-2 transition-all",
                    index === 0 ? "border-tertiary/50 bg-tertiary/10" : "border-white/10"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 flex items-center justify-center rounded-full font-headline text-2xl border-b-4",
                      index === 0 ? "bg-tertiary text-on-tertiary border-tertiary-container" : "bg-slate-700 text-white border-slate-900"
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-[10px] font-headline text-slate-400 tracking-widest uppercase">EQUIPE</p>
                      <h3 className="text-2xl font-headline text-white">{team.name}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-headline text-white leading-none">{team.score}</p>
                    <p className="text-[10px] font-headline text-slate-400 tracking-widest uppercase">PONTOS</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full max-w-lg space-y-4">
              <Button variant="primary" size="lg" className="w-full" onClick={() => { resetGame(); setCurrentScreen('SETUP'); }}>
                <RotateCcw size={24} />
                Jogar Novamente
              </Button>
              <Button variant="ghost" size="lg" className="w-full" onClick={() => { resetGame(); setCurrentScreen('HOME'); }}>
                <HomeIcon size={24} />
                Menu Principal
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

