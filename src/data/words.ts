import { Category, Difficulty } from '../types';

export const WORD_LIST: Record<Category, Record<Difficulty, string[]>> = {
  'Filmes': {
    'Fácil': ['Titanic', 'Avatar', 'Coringa', 'Shrek', 'Dumbo', 'Bambi', 'Scream', 'Matrix', 'Gritos', 'Batman'],
    'Médio': ['Inception', 'Interstellar', 'Parasita', 'Godfather', 'Gladiador', 'Ratatouille', 'Interestelar', 'Whiplash', 'Birdman', 'Django'],
    'Difícil': ['Metropolis', 'Eraserhead', 'Stalker', 'Memento', 'Primer', 'Dogville', 'Magnolia', 'Zodiac', 'Suspiria', 'Tarkovsky']
  },
  'Famosos': {
    'Fácil': ['Neymar', 'Anitta', 'Messi', 'Xuxa', 'Pelé', 'Madonna', 'Beyoncé', 'Bolsonaro', 'Lula', 'Ronaldo'],
    'Médio': ['Elon Musk', 'Bill Gates', 'Zendaya', 'Tom Cruise', 'Lady Gaga', 'Brad Pitt', 'Rihanna', 'Adele', 'Drake', 'J Balvin'],
    'Difícil': ['Noam Chomsky', 'Hannah Arendt', 'Carl Sagan', 'Alan Turing', 'Ada Lovelace', 'Nietzsche', 'Bach', 'Vivaldi', 'Tesla', 'Curie']
  },
  'Profissões': {
    'Fácil': ['Médico', 'Professor', 'Policial', 'Padeiro', 'Motorista', 'Ator', 'Cantor', 'Dentista', 'Bombeiro', 'Chef'],
    'Médio': ['Engenheiro', 'Advogado', 'Psicólogo', 'Arquiteto', 'Designer', 'Jornalista', 'Cientista', 'Veterinário', 'Astronauta', 'Escritor'],
    'Difícil': ['Antropólogo', 'Estatístico', 'Geofísico', 'Atuário', 'Paleontólogo', 'Diplomata', 'Mergulhador', 'Escrivão', 'Físico Nuclear', 'Bioquímico']
  },
  'Objetos': {
    'Fácil': ['Cadeira', 'Mesa', 'Copo', 'Relógio', 'Telefone', 'Caneta', 'Lápis', 'Livro', 'Chave', 'Garfo'],
    'Médio': ['Microscópio', 'Extintor', 'Grampeador', 'Termômetro', 'Calculadora', 'Projetor', 'Prancheta', 'Furadeira', 'Alicate', 'Martelo'],
    'Difícil': ['Astrolábio', 'Sextante', 'Goniômetro', 'Pipeta', 'Estetoscópio', 'Diapasão', 'Tornozelo', 'Esquadro', 'Trena', 'Capacímetro']
  },
  'Frutas': {
    'Fácil': ['Banana', 'Maçã', 'Uva', 'Laranja', 'Melancia', 'Morango', 'Abacaxi', 'Limão', 'Pêra', 'Manga'],
    'Médio': ['Ameixa', 'Caju', 'Goiaba', 'Jabuticaba', 'Kiwi', 'Maracujá', 'Pêssego', 'Tangerina', 'Açaí', 'Pitaya'],
    'Difícil': ['Cidra', 'Cherimoia', 'Durião', 'Lichia', 'Mangostão', 'Physalis', 'Rambutã', 'Tamarindo', 'Sapoti', 'Granadilha']
  },
  'Cores': {
    'Fácil': ['Azul', 'Vermelho', 'Verde', 'Amarelo', 'Branco', 'Preto', 'Rosa', 'Cinza', 'Roxo', 'Laranja'],
    'Médio': ['Bege', 'Ciano', 'Magenta', 'Turquesa', 'Dourado', 'Prateado', 'Vinho', 'Marrom', 'Violeta', 'Salmão'],
    'Difícil': ['Escarlate', 'Índigo', 'Ocre', 'Sépia', 'Púrpura', 'Bordô', 'Chartreuse', 'Esmeralda', 'Safira', 'Âmbar']
  }
};

export const getRandomWord = (category: Category | 'Geral', difficulty: Difficulty): string => {
  let list: string[] = [];
  if (category === 'Geral') {
    Object.values(WORD_LIST).forEach(diffList => {
      list = [...list, ...diffList[difficulty]];
    });
  } else {
    list = WORD_LIST[category][difficulty];
  }
  return list[Math.floor(Math.random() * list.length)];
};

export const getWordList = (category: Category | 'Geral', difficulty: Difficulty): string[] => {
  let list: string[] = [];
  if (category === 'Geral') {
    Object.values(WORD_LIST).forEach(diffList => {
      list = [...list, ...diffList[difficulty]];
    });
  } else {
    list = [...WORD_LIST[category][difficulty]];
  }
  // Shuffle list
  return list.sort(() => Math.random() - 0.5);
};
