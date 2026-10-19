import type { Bonus, Category, Difficulty, RankId, Rarity, Slot } from "./types";

export const CATEGORY_LABEL: Record<Category, string> = {
  corpo: "Corpo",
  mente: "Mente",
  vontade: "Vontade",
  percepcao: "Percepção",
  sombra: "Sombra",
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  facil: "Fácil",
  normal: "Normal",
  dificil: "Difícil",
  extremo: "Extremo",
};

export const SLOT_LABEL: Record<Slot, string> = {
  arma: "Arma",
  armadura: "Armadura",
  elmo: "Elmo",
  luvas: "Luvas",
  botas: "Botas",
  amuleto: "Amuleto",
};

export const REWARD: Record<Difficulty, { xp: number; gold: number; fatigue: number }> = {
  facil: { xp: 50, gold: 30, fatigue: 10 },
  normal: { xp: 90, gold: 50, fatigue: 14 },
  dificil: { xp: 150, gold: 90, fatigue: 22 },
  extremo: { xp: 240, gold: 150, fatigue: 32 },
};

export const RARITY_LABEL: Record<Rarity, string> = {
  comum: "Comum",
  rara: "Rara",
  epica: "Épica",
  lendaria: "Lendária",
};

export type SkillDef = {
  id: string;
  name: string;
  category: Category;
  rarity: Rarity;
  maxLevel: number;
  description: string;
  bonusPerLevel: Bonus;
};

export const SKILLS: SkillDef[] = [
  { id: "postura", name: "Postura de Ferro", category: "corpo", rarity: "comum", maxLevel: 5, description: "O corpo aprende a não ceder no meio da série.", bonusPerLevel: { vit: 2 } },
  { id: "impacto", name: "Impacto Curto", category: "corpo", rarity: "comum", maxLevel: 5, description: "Cada repetição fica mais pesada, e você também.", bonusPerLevel: { str: 2 } },
  { id: "folego", name: "Fôlego Longo", category: "corpo", rarity: "rara", maxLevel: 4, description: "A fadiga sobe mais devagar quando o treino é honesto.", bonusPerLevel: { fatigueReduce: 0.06 } },
  { id: "passo", name: "Passo Explosivo", category: "corpo", rarity: "rara", maxLevel: 4, description: "O deslocamento vira hábito, não desculpa.", bonusPerLevel: { agi: 2 } },
  { id: "leitura", name: "Leitura Fria", category: "mente", rarity: "comum", maxLevel: 5, description: "Estudar sem pressa ainda conta como combate.", bonusPerLevel: { int: 2 } },
  { id: "memoria", name: "Memória de Batalha", category: "mente", rarity: "rara", maxLevel: 4, description: "O que você leu hoje fica disponível quando a prova chegar.", bonusPerLevel: { int: 1, per: 1 } },
  { id: "foco", name: "Foco Absoluto", category: "mente", rarity: "epica", maxLevel: 3, description: "Uma hora inteira, sem negociar com a distração.", bonusPerLevel: { int: 1, wil: 1 } },
  { id: "recusa", name: "Recusa", category: "vontade", rarity: "comum", maxLevel: 5, description: "Dizer não ao atalho. O sistema registra.", bonusPerLevel: { wil: 2 } },
  { id: "juramento", name: "Juramento", category: "vontade", rarity: "rara", maxLevel: 4, description: "A palavra dada de manhã ainda vale à noite.", bonusPerLevel: { wil: 1, str: 1 } },
  { id: "sangue", name: "Sangue Frio", category: "vontade", rarity: "epica", maxLevel: 3, description: "A penalidade assusta menos quem já pagou uma.", bonusPerLevel: { wil: 1, fatigueReduce: 0.05 } },
  { id: "olho", name: "Olho Atento", category: "percepcao", rarity: "comum", maxLevel: 5, description: "Você nota o dia escapando antes que ele acabe.", bonusPerLevel: { per: 2 } },
  { id: "rastro", name: "Rastro", category: "percepcao", rarity: "rara", maxLevel: 4, description: "Padrões de fuga — seus — ficam visíveis.", bonusPerLevel: { per: 1, agi: 1 } },
  { id: "instinto", name: "Instinto", category: "percepcao", rarity: "epica", maxLevel: 3, description: "Sabe quando a missão está quase perdida.", bonusPerLevel: { per: 1, wil: 1 } },
  { id: "manto", name: "Manto Curto", category: "sombra", rarity: "rara", maxLevel: 4, description: "Uma presença discreta. Só aparece para quem cumpre.", bonusPerLevel: { per: 1, agi: 1 } },
  { id: "comando", name: "Comando", category: "sombra", rarity: "epica", maxLevel: 3, description: "Invocações ativas lutam com mais peso ao seu lado.", bonusPerLevel: { summonPower: 12 } },
  { id: "presenca", name: "Presença", category: "sombra", rarity: "lendaria", maxLevel: 3, description: "O ambiente inteiro entende que você não vai embora.", bonusPerLevel: { str: 1, vit: 1, agi: 1, int: 1, per: 1, wil: 1 } },
];

export const SKILL_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

export type ItemDef = {
  id: string;
  name: string;
  slot: Slot;
  price: number;
  description: string;
  bonus: Bonus;
};

export const ITEMS: ItemDef[] = [
  { id: "adaga", name: "Adaga de Treino", slot: "arma", price: 80, description: "Leve o bastante para não servir de desculpa.", bonus: { str: 2 } },
  { id: "lamina-vigia", name: "Lâmina do Vigia", slot: "arma", price: 340, description: "Corta a hesitação, não a pele.", bonus: { str: 5, agi: 2 } },
  { id: "estoque", name: "Estoque do Abismo", slot: "arma", price: 1400, description: "Uma arma para quem já não negocia com o cansaço.", bonus: { str: 8, wil: 4 } },
  { id: "manto", name: "Manto Gasto", slot: "armadura", price: 90, description: "Ainda cobre. Ainda conta.", bonus: { vit: 2 } },
  { id: "couraca", name: "Couraça de Cinza", slot: "armadura", price: 480, description: "Peso no ombro. Postura no resto.", bonus: { vit: 6, wil: 2 } },
  { id: "placas", name: "Placas do Soberano", slot: "armadura", price: 2200, description: "Quem usa isto já atravessou a penalidade mais de uma vez.", bonus: { vit: 10, str: 4 } },
  { id: "capuz", name: "Capuz", slot: "elmo", price: 70, description: "Esconde o rosto. Não esconde a falta.", bonus: { per: 2 } },
  { id: "viseira", name: "Viseira Rúnica", slot: "elmo", price: 420, description: "Marca o que ainda está incompleto no ciclo.", bonus: { per: 4, int: 2 } },
  { id: "luvas", name: "Luvas de Treino", slot: "luvas", price: 70, description: "Para a centésima flexão, não para a primeira.", bonus: { agi: 2 } },
  { id: "garras", name: "Garras Leves", slot: "luvas", price: 380, description: "Agarram o dia antes que ele feche.", bonus: { agi: 4, str: 2 } },
  { id: "botas", name: "Botas de Estrada", slot: "botas", price: 110, description: "Um quilômetro de cada vez, sem teatro.", bonus: { agi: 3 } },
  { id: "passos", name: "Passos Silenciosos", slot: "botas", price: 540, description: "Você chega. O sistema já sabia.", bonus: { agi: 5, per: 3 } },
  { id: "fio", name: "Fio de Disciplina", slot: "amuleto", price: 220, description: "Um nó. Um lembrete. Uma vontade a mais.", bonus: { wil: 4 } },
  { id: "nucleo", name: "Núcleo de Mana", slot: "amuleto", price: 640, description: "Estudo vira reserva, não intenção.", bonus: { int: 6, xpBonus: 0.06 } },
  { id: "olho-sistema", name: "Olho do Sistema", slot: "amuleto", price: 1800, description: "Vê a sequência, o poder e o que ainda falta.", bonus: { per: 3, int: 3, wil: 3, xpBonus: 0.08 } },
];

export const ITEM_BY_ID = Object.fromEntries(ITEMS.map((item) => [item.id, item]));

export type SummonDef = {
  id: string;
  name: string;
  title: string;
  lore: string;
  bonus: Bonus;
  power: number;
};

export const SUMMONS: SummonDef[] = [
  { id: "sentinela", name: "Sentinela de Cinza", title: "Guardião", lore: "Um lobo de pedra. Só caminha com quem não falta ao próprio treino.", bonus: { vit: 4, wil: 2 }, power: 40 },
  { id: "coruja", name: "Coruja de Vigília", title: "Observadora", lore: "Enxerga o dia que você tenta esconder de si mesmo.", bonus: { per: 4, int: 2 }, power: 36 },
  { id: "lamina", name: "Lâmina Errante", title: "Algoz", lore: "Uma espada sem mão. Fiel apenas à decisão já tomada.", bonus: { str: 5, agi: 2 }, power: 55 },
  { id: "vulto", name: "O Primeiro Vulto", title: "Sombra maior", lore: "Não é um servo. É a prova de que você não volta atrás.", bonus: { str: 3, wil: 4, int: 2 }, power: 90 },
];

export const SUMMON_BY_ID = Object.fromEntries(SUMMONS.map((s) => [s.id, s]));

export type RankDef = {
  id: RankId;
  name: string;
  title: string;
  job: string;
  level: number;
  streak: number;
  power: number;
  missions: number;
  skills: number;
  summons: number;
  gold: number;
  points: number;
  summonId?: string;
  skillId?: string;
  trial: "hold" | "memory" | "pulse" | "precision" | "abyss" | "oath";
  blurb: string;
};

export const RANKS: RankDef[] = [
  { id: "E", name: "Rank E", title: "Desperto", job: "Desperto", level: 1, streak: 0, power: 0, missions: 0, skills: 0, summons: 0, gold: 80, points: 3, trial: "hold", blurb: "Segure o selo. Existir já é a primeira prova." },
  { id: "D", name: "Rank D", title: "Rastreado", job: "Rastreado", level: 4, streak: 3, power: 160, missions: 4, skills: 0, summons: 0, gold: 200, points: 4, summonId: "sentinela", trial: "memory", blurb: "Três dias sem falhar. Depois, repita a sequência que o sistema mostrar." },
  { id: "C", name: "Rank C", title: "Caçador", job: "Caçador", level: 8, streak: 7, power: 240, missions: 12, skills: 1, summons: 0, gold: 360, points: 5, summonId: "coruja", trial: "pulse", blurb: "Uma semana inteira. Acerte o pulso quando ele cruzar o centro." },
  { id: "B", name: "Rank B", title: "Algoz", job: "Algoz", level: 14, streak: 14, power: 380, missions: 25, skills: 3, summons: 1, gold: 640, points: 6, summonId: "lamina", trial: "precision", blurb: "Duas semanas de disciplina. Toque os selos antes que se apaguem." },
  { id: "A", name: "Rank A", title: "Ascendente", job: "Ascendente", level: 22, streak: 21, power: 540, missions: 40, skills: 5, summons: 2, gold: 980, points: 8, skillId: "manto", trial: "memory", blurb: "Vinte e um dias. A memória agora é mais longa." },
  { id: "S", name: "Rank S", title: "Soberano", job: "Soberano", level: 32, streak: 30, power: 780, missions: 60, skills: 7, summons: 3, gold: 1600, points: 10, summonId: "vulto", skillId: "comando", trial: "abyss", blurb: "Um mês sem quebrar. Ignore tudo o que pedir para você parar." },
  { id: "M", name: "Monarca", title: "Monarca do Véu", job: "Monarca do Véu", level: 45, streak: 45, power: 1100, missions: 90, skills: 8, summons: 4, gold: 3200, points: 15, skillId: "presenca", trial: "oath", blurb: "Poder avassalador não é um título emprestado. É o que sobra depois de não faltar." },
];

export const RANK_BY_ID = Object.fromEntries(RANKS.map((r) => [r.id, r])) as Record<RankId, RankDef>;

export const OATH = "EU NÃO VOLTO A SER O MAIS FRACO";
