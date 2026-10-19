import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ITEM_BY_ID,
  RANK_BY_ID,
  REWARD,
  SKILL_BY_ID,
  SKILLS,
  SUMMON_BY_ID,
} from "./catalog";
import { derive } from "./derive";
import {
  baseStats,
  goalsDone,
  pushLog,
  RANK_ORDER,
  respecCost,
  spentPoints,
  todayKey,
  uid,
  xpForLevel,
} from "./formulas";
import { chime } from "./sound";
import type {
  Category,
  Data,
  Difficulty,
  Fanfare,
  Goal,
  Mission,
  RankId,
  SkillProgress,
  Slot,
  Stats,
  Toast,
} from "./types";

const RANK_IDS = new Set<string>(RANK_ORDER);

function initialSkills(): SkillProgress[] {
  return SKILLS.map((skill) => ({
    id: skill.id,
    unlocked: false,
    level: 1,
    proficiency: 0,
    equipped: false,
  }));
}

function goal(id: string, label: string, target: number): Goal {
  return { id, label, current: 0, target };
}

export function initialData(): Data {
  return {
    profileName: "",
    initialized: false,
    level: 1,
    xp: 0,
    totalXp: 0,
    gold: 0,
    statPoints: 5,
    stats: baseStats(),
    earnedTitle: "O Mais Fraco",
    fatigue: 0,
    daily: [
      {
        id: "daily-corpo",
        title: "Fortalecimento do corpo",
        description: "A missão diária do sistema. Os números podem ser seus. A obrigação, não.",
        category: "corpo",
        difficulty: "dificil",
        obrigatoria: true,
        repeat: "diaria",
        goals: [
          goal("g-flexao", "Flexões", 100),
          goal("g-abdomen", "Abdominais", 100),
          goal("g-agacho", "Agachamentos", 100),
          goal("g-corrida", "Quilômetros de corrida", 10),
        ],
      },
      {
        id: "daily-mente",
        title: "Treino da mente",
        description: "Uma hora de estudo, leitura ou prática deliberada. Sem segunda tela.",
        category: "mente",
        difficulty: "normal",
        obrigatoria: true,
        repeat: "diaria",
        goals: [goal("g-estudo", "Horas de estudo ou leitura", 1)],
      },
    ],
    custom: [],
    skills: initialSkills(),
    ownedItems: [],
    equipped: {},
    summons: ["sentinela", "coruja", "lamina", "vulto"].map((id) => ({
      id,
      obtained: false,
      loyalty: 0,
      active: false,
    })),
    days: {},
    streak: 0,
    bestStreak: 0,
    totalMissions: 0,
    ranksCleared: [],
    lastSeenDate: null,
    penalty: { active: false, stacks: 0 },
    log: [],
  };
}

function asMission(value: unknown): Mission | null {
  if (!value || typeof value !== "object") return null;
  const m = value as Mission;
  if (typeof m.id !== "string" || typeof m.title !== "string" || !Array.isArray(m.goals)) return null;
  const goals = m.goals
    .filter((g) => g && typeof g.id === "string")
    .map((g) => ({
      id: g.id,
      label: typeof g.label === "string" && g.label.trim() ? g.label : "Objetivo",
      current: Number.isFinite(g.current) ? Math.max(0, g.current) : 0,
      target: Number.isFinite(g.target) ? Math.max(1, g.target) : 1,
    }));
  if (!goals.length) return null;
  return {
    id: m.id,
    title: m.title,
    description: typeof m.description === "string" ? m.description : "",
    category: m.category ?? "vontade",
    difficulty: m.difficulty ?? "normal",
    goals,
    obrigatoria: Boolean(m.obrigatoria),
    repeat: m.repeat === "unica" ? "unica" : "diaria",
    completedOn: typeof m.completedOn === "string" ? m.completedOn : undefined,
  };
}

export function normalize(partial?: Partial<Data>): Data {
  const base = initialData();
  if (!partial || typeof partial !== "object") return base;
  try {
    const skills = base.skills.map((skill) => {
      const old = partial.skills?.find((item) => item.id === skill.id);
      return old
        ? {
            ...skill,
            unlocked: Boolean(old.unlocked),
            level: Math.max(1, old.level || 1),
            proficiency: Math.max(0, old.proficiency || 0),
            equipped: Boolean(old.equipped),
          }
        : skill;
    });
    const summons = base.summons.map((summon) => {
      const old = partial.summons?.find((item) => item.id === summon.id);
      return old
        ? {
            ...summon,
            obtained: Boolean(old.obtained),
            loyalty: Math.max(0, Math.min(100, old.loyalty || 0)),
            active: Boolean(old.active && old.obtained),
          }
        : summon;
    });
    const dailyRaw = Array.isArray(partial.daily) ? partial.daily.map(asMission).filter((m): m is Mission => Boolean(m)) : [];
    const customRaw = Array.isArray(partial.custom) ? partial.custom.map(asMission).filter((m): m is Mission => Boolean(m)) : [];
    return {
      ...base,
      ...partial,
      stats: { ...base.stats, ...partial.stats },
      penalty: {
        active: Boolean(partial.penalty?.active),
        stacks: Math.max(0, partial.penalty?.stacks ?? 0),
      },
      skills,
      summons,
      days: partial.days ?? {},
      daily: dailyRaw.length ? dailyRaw : base.daily,
      custom: customRaw,
      equipped: partial.equipped ?? {},
      ownedItems: Array.isArray(partial.ownedItems) ? partial.ownedItems : [],
      ranksCleared: (partial.ranksCleared ?? []).filter((rank) => RANK_IDS.has(rank)),
      log: Array.isArray(partial.log) ? partial.log.slice(0, 40) : [],
      level: Math.max(1, partial.level || 1),
      xp: Math.max(0, partial.xp || 0),
      gold: Math.max(0, partial.gold || 0),
      statPoints: Math.max(0, partial.statPoints || 0),
      fatigue: Math.max(0, Math.min(100, partial.fatigue || 0)),
    };
  } catch {
    return base;
  }
}

function dayGapLocal(from: string, to: string) {
  const [y1, m1, d1] = from.split("-").map(Number);
  const [y2, m2, d2] = to.split("-").map(Number);
  return Math.round((new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime()) / 86_400_000);
}

export function rollDay(data: Data, today: string): { data: Data; notices: string[] } | null {
  if (!data.initialized || !data.lastSeenDate || data.lastSeenDate === today) return null;
  const gap = dayGapLocal(data.lastSeenDate, today);
  const rec = data.days[data.lastSeenDate];
  const perfect = rec?.perfect === true;
  const failed = !perfect || gap > 1;
  let gold = data.gold;
  let streak = data.streak;
  let penalty = data.penalty;
  let days = data.days;
  const notices: string[] = [];
  if (failed) {
    const stacks = penalty.stacks + 1;
    const loss = Math.min(gold, 50 * stacks);
    gold -= loss;
    penalty = { active: true, stacks };
    streak = 0;
    days = {
      ...days,
      [data.lastSeenDate]: { xp: rec?.xp ?? 0, missions: rec?.missions ?? 0, perfect: false, penalty: true },
    };
    notices.push(
      loss > 0
        ? `A missão diária falhou. Penalidade aplicada. −${loss} ouro.`
        : "A missão diária falhou. A zona de penalidade foi aberta.",
    );
  }
  const reset = (list: Mission[]) =>
    list.map((mission) =>
      mission.repeat === "unica"
        ? mission
        : {
            ...mission,
            completedOn: undefined,
            goals: mission.goals.map((item) => ({ ...item, current: 0 })),
          },
    );
  return {
    data: {
      ...data,
      gold,
      streak,
      penalty,
      days,
      daily: reset(data.daily),
      custom: reset(data.custom),
      fatigue: failed ? 100 : 0,
      lastSeenDate: today,
      log: notices.reduce((log, text) => pushLog(log, text), data.log),
    },
    notices,
  };
}

function locate(data: Data, id: string): { bucket: "daily" | "custom"; mission: Mission } | null {
  const daily = data.daily.find((mission) => mission.id === id);
  if (daily) return { bucket: "daily", mission: daily };
  const custom = data.custom.find((mission) => mission.id === id);
  if (custom) return { bucket: "custom", mission: custom };
  return null;
}

function replaceMission(data: Data, mission: Mission): Data {
  const inDaily = data.daily.some((item) => item.id === mission.id);
  return inDaily
    ? { ...data, daily: data.daily.map((item) => (item.id === mission.id ? mission : item)) }
    : { ...data, custom: data.custom.map((item) => (item.id === mission.id ? mission : item)) };
}

function weighted<T>(items: T[], weight: (item: T) => number) {
  const total = items.reduce((sum, item) => sum + Math.max(0, weight(item)), 0);
  if (total <= 0 || !items.length) return null;
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= Math.max(0, weight(item));
    if (roll <= 0) return item;
  }
  return items[items.length - 1] ?? null;
}

const RARITY_W = { comum: 5, rara: 3, epica: 1.2, lendaria: 0.35 };

function trainSkill(data: Data, id: string, amount: number): { data: Data; note?: string } {
  const def = SKILL_BY_ID[id];
  if (!def) return { data };
  let note: string | undefined;
  const skills = data.skills.map((skill) => {
    if (skill.id !== id || !skill.unlocked) return skill;
    let level = skill.level;
    let proficiency = skill.proficiency + amount;
    while (proficiency >= 100 && level < def.maxLevel) {
      proficiency -= 100;
      level += 1;
      note = `${def.name} subiu para o nível ${level}.`;
    }
    if (level >= def.maxLevel) proficiency = Math.min(100, proficiency);
    return { ...skill, level, proficiency };
  });
  return { data: { ...data, skills }, note };
}

function unlockSkill(data: Data, id: string): { data: Data; note?: string } {
  const def = SKILL_BY_ID[id];
  if (!def) return { data };
  if (data.skills.some((skill) => skill.id === id && skill.unlocked)) return trainSkill(data, id, 30);
  return {
    data: {
      ...data,
      skills: data.skills.map((skill) =>
        skill.id === id ? { ...skill, unlocked: true, level: 1, proficiency: 0 } : skill,
      ),
    },
    note: `Habilidade desperta: ${def.name}.`,
  };
}

function afterMission(data: Data, mission: Mission): { data: Data; notes: string[]; levels: number[] } {
  const view = derive(data);
  const reward = REWARD[mission.difficulty] ?? REWARD.normal;
  const xpGain = Math.max(1, Math.round(reward.xp * (1 + view.xpBonus)));
  const fatigueGain = Math.max(4, Math.round(reward.fatigue * (1 - view.fatigueReduce)));
  let xp = data.xp + xpGain;
  let level = data.level;
  let statPoints = data.statPoints;
  const levels: number[] = [];
  while (level < 99 && xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level += 1;
    statPoints += 3;
    levels.push(level);
  }
  const today = data.lastSeenDate ?? todayKey();
  const marked: Mission = { ...mission, completedOn: today };
  let next: Data = {
    ...replaceMission(data, marked),
    xp,
    level,
    statPoints,
    totalXp: data.totalXp + xpGain,
    gold: data.gold + reward.gold,
    fatigue: Math.min(100, data.fatigue + fatigueGain),
    totalMissions: data.totalMissions + 1,
    summons: data.summons.map((summon) =>
      summon.active && summon.obtained ? { ...summon, loyalty: Math.min(100, summon.loyalty + 4) } : summon,
    ),
  };
  const notes = [`${mission.title}: +${xpGain} XP, +${reward.gold} ouro.`];
  if (levels.length) notes.push(levels.length === 1 ? `Nível ${levels[0]}.` : `Nível ${levels[levels.length - 1]}.`);

  const chance = { facil: 0.22, normal: 0.34, dificil: 0.48, extremo: 0.62 }[mission.difficulty];
  const highRank = data.ranksCleared.some((rank) => ["B", "A", "S", "M"].includes(rank));
  const pool = SKILLS.filter((skill) => {
    if (skill.category !== mission.category) return false;
    if (skill.rarity === "lendaria" && mission.difficulty !== "extremo" && mission.difficulty !== "dificil" && !highRank) {
      return false;
    }
    return true;
  });
  const locked = pool.filter((skill) => next.skills.some((item) => item.id === skill.id && !item.unlocked));
  const ownedInCategory = next.skills.filter(
    (skill) => skill.unlocked && SKILL_BY_ID[skill.id]?.category === mission.category,
  );
  if (!ownedInCategory.length && locked.length) {
    const picked = locked.find((skill) => skill.rarity === "comum") ?? locked[0];
    const unlocked = unlockSkill(next, picked.id);
    next = unlocked.data;
    if (unlocked.note) notes.push(unlocked.note);
  } else if (Math.random() < chance && locked.length) {
    const picked = weighted(locked, (skill) => RARITY_W[skill.rarity]);
    if (picked) {
      const unlocked = unlockSkill(next, picked.id);
      next = unlocked.data;
      if (unlocked.note) notes.push(unlocked.note);
    }
  } else {
    const owned = next.skills.filter(
      (skill) => skill.unlocked && SKILL_BY_ID[skill.id]?.category === mission.category,
    );
    if (owned.length && Math.random() < 0.7) {
      const picked = owned[Math.floor(Math.random() * owned.length)];
      const trained = trainSkill(next, picked.id, mission.difficulty === "extremo" ? 36 : 22);
      next = trained.data;
      if (trained.note) notes.push(trained.note);
    }
  }

  const obrig = next.daily.filter((item) => item.obrigatoria);
  const perfect = obrig.length > 0 && obrig.every((item) => item.completedOn === today);
  const prevDay = next.days[today];
  const wasPerfect = prevDay?.perfect === true;
  let earnedTitle = next.earnedTitle;
  let streak = next.streak;
  let bestStreak = next.bestStreak;
  let penalty = next.penalty;
  if (perfect && !wasPerfect) {
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    if (earnedTitle === "O Mais Fraco") {
      earnedTitle = "Aquele que se Levanta";
      notes.push("Título obtido: Aquele que se Levanta.");
    }
    if (penalty.stacks > 0 && !penalty.active) penalty = { ...penalty, stacks: penalty.stacks - 1 };
    notes.push("Obrigações do ciclo cumpridas. A penalidade foi evitada.");
  }
  next = {
    ...next,
    earnedTitle,
    streak,
    bestStreak,
    penalty,
    days: {
      ...next.days,
      [today]: {
        xp: (prevDay?.xp ?? 0) + xpGain,
        missions: (prevDay?.missions ?? 0) + 1,
        perfect,
        penalty: prevDay?.penalty ?? false,
      },
    },
    log: notes.reduce((log, text) => pushLog(log, text), next.log),
  };
  return { data: next, notes, levels };
}

function applyGoals(data: Data, missionId: string, nextGoals: Goal[]): { data: Data; notes: string[]; levels: number[] } | { error: string } {
  if (data.penalty.active) return { error: "A zona de penalidade está aberta." };
  if (data.fatigue >= 100) return { error: "Fadiga no limite. O ciclo precisa virar." };
  const found = locate(data, missionId);
  if (!found) return { error: "Missão não encontrada." };
  const today = data.lastSeenDate ?? todayKey();
  if (found.mission.completedOn === today) return { error: "Esta missão já foi concluída neste ciclo." };
  if (found.mission.repeat === "unica" && found.mission.completedOn) return { error: "Esta missão única já foi concluída." };
  const mission = { ...found.mission, goals: nextGoals };
  if (!goalsDone(mission.goals)) return { data: replaceMission(data, mission), notes: [], levels: [] };
  return afterMission(replaceMission(data, mission), mission);
}

export type MissionDraft = {
  id?: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  obrigatoria: boolean;
  repeat: "diaria" | "unica";
  goals: { id: string; label: string; target: number }[];
};

type ChimeKind = "good" | "great" | "bad";

type Mutation = {
  data: Data;
  notes?: string[];
  fanfare?: Fanfare | null;
  chime?: ChimeKind;
  tone?: Toast["tone"];
};

type Actions = {
  awaken: (name: string) => void;
  rename: (name: string) => void;
  ensureToday: () => void;
  setGoal: (missionId: string, goalId: string, current: number) => void;
  completeMission: (missionId: string) => void;
  saveMission: (draft: MissionDraft, bucket: "daily" | "custom") => boolean;
  deleteMission: (id: string) => void;
  allocate: (key: keyof Stats) => void;
  respec: () => void;
  buy: (itemId: string) => void;
  equip: (itemId: string) => void;
  unequip: (slot: Slot) => void;
  sell: (itemId: string) => void;
  toggleSkill: (id: string) => void;
  toggleSummon: (id: string) => void;
  passRank: (id: RankId) => void;
  clearPenalty: () => void;
  dismissToast: (id: string) => void;
  dismissFanfare: () => void;
  wipe: () => void;
};

type Store = {
  data: Data;
  toasts: Toast[];
  fanfare: Fanfare | null;
  actions: Actions;
};

function toast(text: string, tone: Toast["tone"]): Toast {
  return { id: uid(), text, tone };
}

function gate(data: Data): string | null {
  if (data.penalty.active) return "A zona de penalidade está aberta.";
  return null;
}

export const useSystem = create<Store>()(
  persist(
    (set, get) => {
      function commit(mut: Mutation | null, extras: string[] = []) {
        if (!mut && !extras.length) return;
        const notes = [...extras, ...(mut?.notes ?? [])];
        const tone = mut?.tone ?? "info";
        if (mut?.chime) chime(mut.chime);
        set((state) => ({
          ...state,
          data: mut?.data ?? state.data,
          fanfare: mut?.fanfare === undefined ? state.fanfare : mut.fanfare,
          toasts: [...state.toasts, ...notes.slice(0, 3).map((text) => toast(text, tone))].slice(-4),
        }));
      }

      function live(): { data: Data; notices: string[] } {
        const rolled = rollDay(get().data, todayKey());
        if (!rolled) return { data: get().data, notices: [] };
        return rolled;
      }

      const actions: Actions = {
        awaken(name) {
          const clean = name.trim().slice(0, 18);
          if (clean.length < 2 || get().data.initialized) return;
          chime("great");
          set((state) => ({
            ...state,
            data: {
              ...state.data,
              profileName: clean,
              initialized: true,
              lastSeenDate: todayKey(),
              log: pushLog([], `Registro criado. Jogador: ${clean}.`),
            },
            toasts: [toast("A missão diária está ativa. Falhar tem custo.", "info")],
          }));
        },
        rename(name) {
          const clean = name.trim().slice(0, 18);
          if (clean.length < 2) return;
          set((state) => ({ ...state, data: { ...state.data, profileName: clean } }));
        },
        ensureToday() {
          const rolled = rollDay(get().data, todayKey());
          if (!rolled) return;
          if (rolled.data.penalty.active) chime("bad");
          set((state) => ({
            ...state,
            data: rolled.data,
            toasts: [...state.toasts, ...rolled.notices.map((text) => toast(text, "bad"))].slice(-4),
          }));
        },
        setGoal(missionId, goalId, current) {
          const { data, notices } = live();
          const found = locate(data, missionId);
          if (!found) return;
          const value = Math.max(0, Math.floor(Number.isFinite(current) ? current : 0));
          const goals = found.mission.goals.map((item) =>
            item.id === goalId ? { ...item, current: Math.min(item.target, value) } : item,
          );
          const result = applyGoals(data, missionId, goals);
          if ("error" in result) {
            commit({ data, notes: [result.error], tone: "bad" }, notices);
            return;
          }
          const levels = result.levels;
          commit(
            {
              data: result.data,
              notes: result.notes,
              tone: result.notes.length ? "good" : "info",
              chime: levels.length ? "great" : result.notes.length ? "good" : undefined,
              fanfare: levels.length ? { kind: "level", level: levels[levels.length - 1] } : undefined,
            },
            notices,
          );
        },
        completeMission(missionId) {
          const { data, notices } = live();
          const found = locate(data, missionId);
          if (!found) return;
          const goals = found.mission.goals.map((item) => ({ ...item, current: item.target }));
          const result = applyGoals(data, missionId, goals);
          if ("error" in result) {
            commit({ data, notes: [result.error], tone: "bad" }, notices);
            return;
          }
          const levels = result.levels;
          commit(
            {
              data: result.data,
              notes: result.notes,
              tone: "good",
              chime: levels.length ? "great" : "good",
              fanfare: levels.length ? { kind: "level", level: levels[levels.length - 1] } : undefined,
            },
            notices,
          );
        },
        saveMission(draft, bucket) {
          const { data, notices } = live();
          const title = draft.title.trim().slice(0, 48);
          if (title.length < 2) {
            commit({ data, notes: ["Dê um nome à missão."], tone: "bad" }, notices);
            return false;
          }
          const goals = draft.goals
            .filter((item) => item.label.trim())
            .slice(0, 6)
            .map((item) => ({
              id: item.id || uid(),
              label: item.label.trim().slice(0, 42),
              target: Math.max(1, Math.min(9999, Math.floor(item.target) || 1)),
            }));
          if (!goals.length) {
            commit({ data, notes: ["A missão precisa de ao menos um objetivo."], tone: "bad" }, notices);
            return false;
          }
          if (draft.id) {
            const found = locate(data, draft.id);
            if (!found) return false;
            const turningOff = found.mission.obrigatoria && !draft.obrigatoria;
            const obrigCount = data.daily.filter((mission) => mission.obrigatoria).length;
            if (found.bucket === "daily" && turningOff && obrigCount <= 1) {
              commit({ data, notes: ["Pelo menos uma missão diária permanece obrigatória."], tone: "bad" }, notices);
              return false;
            }
            const mission: Mission = {
              ...found.mission,
              title,
              description: draft.description.trim().slice(0, 180),
              category: draft.category,
              difficulty: draft.difficulty,
              obrigatoria: found.bucket === "daily" ? draft.obrigatoria : false,
              repeat: found.bucket === "custom" ? draft.repeat : "diaria",
              goals: goals.map((item) => {
                const prev = found.mission.goals.find((goalItem) => goalItem.id === item.id);
                return { ...item, current: Math.min(prev?.current ?? 0, item.target) };
              }),
            };
            commit({ data: replaceMission(data, mission), notes: ["Missão atualizada."] }, notices);
            return true;
          }
          if (bucket === "daily" && data.daily.length >= 8) {
            commit({ data, notes: ["O ciclo comporta no máximo 8 missões diárias."], tone: "bad" }, notices);
            return false;
          }
          if (bucket === "custom" && data.custom.length >= 24) {
            commit({ data, notes: ["Limite de missões livres atingido."], tone: "bad" }, notices);
            return false;
          }
          const mission: Mission = {
            id: uid(),
            title,
            description: draft.description.trim().slice(0, 180),
            category: draft.category,
            difficulty: draft.difficulty,
            obrigatoria: bucket === "daily" ? draft.obrigatoria : false,
            repeat: bucket === "custom" ? draft.repeat : "diaria",
            goals: goals.map((item) => ({ ...item, current: 0 })),
          };
          const next =
            bucket === "daily" ? { ...data, daily: [...data.daily, mission] } : { ...data, custom: [...data.custom, mission] };
          commit({ data: next, notes: ["Missão registrada."], tone: "good", chime: "good" }, notices);
          return true;
        },
        deleteMission(id) {
          const { data, notices } = live();
          if (id === "daily-corpo") {
            commit({ data, notes: ["O fortalecimento do corpo não pode ser apagado. Edite os números."], tone: "bad" }, notices);
            return;
          }
          const found = locate(data, id);
          if (!found) return;
          if (found.bucket === "daily" && found.mission.obrigatoria) {
            const rest = data.daily.filter((mission) => mission.obrigatoria && mission.id !== id);
            if (!rest.length) {
              commit({ data, notes: ["Mantenha ao menos uma obrigação diária."], tone: "bad" }, notices);
              return;
            }
          }
          const next =
            found.bucket === "daily"
              ? { ...data, daily: data.daily.filter((mission) => mission.id !== id) }
              : { ...data, custom: data.custom.filter((mission) => mission.id !== id) };
          commit({ data: next, notes: ["Missão removida."] }, notices);
        },
        allocate(key) {
          const data = get().data;
          if (data.statPoints <= 0) return;
          set((state) => ({
            ...state,
            data: {
              ...state.data,
              statPoints: state.data.statPoints - 1,
              stats: { ...state.data.stats, [key]: state.data.stats[key] + 1 },
            },
          }));
        },
        respec() {
          const data = get().data;
          const spent = spentPoints(data.stats);
          const cost = respecCost(data.level);
          if (spent <= 0) return;
          if (data.gold < cost) {
            commit({ data, notes: [`Redistribuir custa ${cost} ouro.`], tone: "bad" });
            return;
          }
          commit({
            data: {
              ...data,
              gold: data.gold - cost,
              statPoints: data.statPoints + spent,
              stats: baseStats(),
              log: pushLog(data.log, `Atributos redistribuídos. −${cost} ouro.`),
            },
            notes: ["Atributos liberados."],
          });
        },
        buy(itemId) {
          const { data, notices } = live();
          const blocked = gate(data);
          if (blocked) {
            commit({ data, notes: [blocked], tone: "bad" }, notices);
            return;
          }
          const item = ITEM_BY_ID[itemId];
          if (!item) return;
          if (data.ownedItems.includes(itemId)) return;
          if (data.gold < item.price) {
            commit({ data, notes: ["Ouro insuficiente."], tone: "bad" }, notices);
            return;
          }
          commit(
            {
              data: {
                ...data,
                gold: data.gold - item.price,
                ownedItems: [...data.ownedItems, itemId],
                log: pushLog(data.log, `Comprou ${item.name}.`),
              },
              notes: [`${item.name} entrou no inventário.`],
              tone: "good",
              chime: "good",
            },
            notices,
          );
        },
        equip(itemId) {
          const data = get().data;
          const item = ITEM_BY_ID[itemId];
          if (!item || !data.ownedItems.includes(itemId)) return;
          const previous = data.equipped[item.slot];
          const equipped = { ...data.equipped, [item.slot]: itemId };
          set((state) => ({
            ...state,
            data: { ...state.data, equipped },
            toasts: previous === itemId ? state.toasts : [...state.toasts, toast(`${item.name} equipado.`, "good")].slice(-4),
          }));
        },
        unequip(slot) {
          const data = get().data;
          if (!data.equipped[slot]) return;
          const equipped = { ...data.equipped };
          delete equipped[slot];
          set((state) => ({ ...state, data: { ...state.data, equipped } }));
        },
        sell(itemId) {
          const data = get().data;
          const item = ITEM_BY_ID[itemId];
          if (!item || !data.ownedItems.includes(itemId)) return;
          const refund = Math.floor(item.price * 0.4);
          const equipped = { ...data.equipped };
          if (equipped[item.slot] === itemId) delete equipped[item.slot];
          commit({
            data: {
              ...data,
              gold: data.gold + refund,
              ownedItems: data.ownedItems.filter((id) => id !== itemId),
              equipped,
              log: pushLog(data.log, `Vendeu ${item.name} por ${refund} ouro.`),
            },
            notes: [`+${refund} ouro.`],
            tone: "good",
          });
        },
        toggleSkill(id) {
          const data = get().data;
          const skill = data.skills.find((item) => item.id === id);
          const def = SKILL_BY_ID[id];
          if (!skill?.unlocked || !def) return;
          const view = derive(data);
          const equippedCount = data.skills.filter((item) => item.equipped && item.unlocked).length;
          if (!skill.equipped && equippedCount >= view.slots) {
            commit({ data, notes: [`Só ${view.slots} habilidade(s) equipada(s) neste nível.`], tone: "bad" });
            return;
          }
          set((state) => ({
            ...state,
            data: {
              ...state.data,
              skills: state.data.skills.map((item) => (item.id === id ? { ...item, equipped: !item.equipped } : item)),
            },
          }));
        },
        toggleSummon(id) {
          const data = get().data;
          const summon = data.summons.find((item) => item.id === id);
          const def = SUMMON_BY_ID[id];
          if (!summon?.obtained || !def) return;
          const view = derive(data);
          const activeCount = data.summons.filter((item) => item.active && item.obtained).length;
          if (!summon.active && activeCount >= view.summonSlots) {
            commit({ data, notes: [`Só ${view.summonSlots} invocação(ões) ativa(s) neste nível.`], tone: "bad" });
            return;
          }
          set((state) => ({
            ...state,
            data: {
              ...state.data,
              summons: state.data.summons.map((item) => (item.id === id ? { ...item, active: !item.active } : item)),
            },
          }));
        },
        passRank(id) {
          const { data, notices } = live();
          if (data.penalty.active) {
            commit({ data, notes: ["Saia da penalidade antes da prova."], tone: "bad" }, notices);
            return;
          }
          if (data.ranksCleared.includes(id)) return;
          const index = RANK_ORDER.indexOf(id);
          if (index > 0 && !data.ranksCleared.includes(RANK_ORDER[index - 1])) return;
          const def = RANK_BY_ID[id];
          const view = derive(data);
          const unlocked = data.skills.filter((skill) => skill.unlocked).length;
          const obtained = data.summons.filter((summon) => summon.obtained).length;
          if (
            data.level < def.level ||
            data.streak < def.streak ||
            view.power < def.power ||
            data.totalMissions < def.missions ||
            unlocked < def.skills ||
            obtained < def.summons
          ) {
            return;
          }
          let next: Data = {
            ...data,
            ranksCleared: [...data.ranksCleared, id],
            gold: data.gold + def.gold,
            statPoints: data.statPoints + def.points,
            earnedTitle: def.title,
          };
          const notes = [`${def.name} conquistado. +${def.gold} ouro, +${def.points} pontos.`];
          if (def.summonId) {
            const summon = SUMMON_BY_ID[def.summonId];
            next = {
              ...next,
              summons: next.summons.map((item) =>
                item.id === def.summonId ? { ...item, obtained: true, loyalty: Math.max(item.loyalty, 8) } : item,
              ),
            };
            if (summon) notes.push(`${summon.name} respondeu ao chamado.`);
          }
          if (def.skillId) {
            const unlockedSkill = unlockSkill(next, def.skillId);
            next = unlockedSkill.data;
            if (unlockedSkill.note) notes.push(unlockedSkill.note);
          }
          next = { ...next, log: notes.reduce((log, text) => pushLog(log, text), next.log) };
          commit(
            {
              data: next,
              notes,
              tone: "good",
              chime: "great",
              fanfare: { kind: "rank", rank: id, title: def.title },
            },
            notices,
          );
        },
        clearPenalty() {
          const data = get().data;
          if (!data.penalty.active) return;
          chime("good");
          set((state) => ({
            ...state,
            data: {
              ...state.data,
              penalty: { ...state.data.penalty, active: false },
              fatigue: 30,
              log: pushLog(state.data.log, "Você saiu da zona de penalidade."),
            },
            toasts: [...state.toasts, toast("Penalidade encerrada. As missões do ciclo ainda estão abertas.", "good")].slice(-4),
          }));
        },
        dismissToast(id) {
          set((state) => ({ ...state, toasts: state.toasts.filter((item) => item.id !== id) }));
        },
        dismissFanfare() {
          set((state) => ({ ...state, fanfare: null }));
        },
        wipe() {
          set((state) => ({ ...state, data: initialData(), toasts: [], fanfare: null }));
        },
      };

      return { data: initialData(), toasts: [], fanfare: null, actions };
    },
    {
      name: "sistema-ascensao",
      version: 1,
      partialize: (state) => ({ data: state.data }),
      merge: (persisted, current) => {
        const saved = persisted as { data?: Partial<Data> } | undefined;
        return { ...current, data: normalize(saved?.data), toasts: [], fanfare: null };
      },
    },
  ),
);
