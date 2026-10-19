export type Stats = {
  str: number;
  vit: number;
  agi: number;
  int: number;
  per: number;
  wil: number;
};

export type Category = "corpo" | "mente" | "vontade" | "percepcao" | "sombra";
export type Difficulty = "facil" | "normal" | "dificil" | "extremo";
export type Slot = "arma" | "armadura" | "elmo" | "luvas" | "botas" | "amuleto";
export type RankId = "E" | "D" | "C" | "B" | "A" | "S" | "M";
export type Rarity = "comum" | "rara" | "epica" | "lendaria";

export type Bonus = Partial<Stats> & {
  fatigueReduce?: number;
  xpBonus?: number;
  summonPower?: number;
};

export type Goal = {
  id: string;
  label: string;
  current: number;
  target: number;
};

export type Mission = {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  goals: Goal[];
  obrigatoria: boolean;
  repeat: "diaria" | "unica";
  completedOn?: string;
};

export type SkillProgress = {
  id: string;
  unlocked: boolean;
  level: number;
  proficiency: number;
  equipped: boolean;
};

export type SummonProgress = {
  id: string;
  obtained: boolean;
  loyalty: number;
  active: boolean;
};

export type DayLog = {
  xp: number;
  missions: number;
  perfect: boolean;
  penalty: boolean;
};

export type LogEntry = { id: string; at: string; text: string };

export type Penalty = { active: boolean; stacks: number };

export type Data = {
  profileName: string;
  initialized: boolean;
  level: number;
  xp: number;
  totalXp: number;
  gold: number;
  statPoints: number;
  stats: Stats;
  earnedTitle: string;
  fatigue: number;
  daily: Mission[];
  custom: Mission[];
  skills: SkillProgress[];
  ownedItems: string[];
  equipped: Partial<Record<Slot, string>>;
  summons: SummonProgress[];
  days: Record<string, DayLog>;
  streak: number;
  bestStreak: number;
  totalMissions: number;
  ranksCleared: RankId[];
  lastSeenDate: string | null;
  penalty: Penalty;
  log: LogEntry[];
};

export type Toast = { id: string; text: string; tone: "info" | "good" | "bad" };

export type Fanfare = { kind: "level"; level: number } | { kind: "rank"; rank: RankId; title: string };
