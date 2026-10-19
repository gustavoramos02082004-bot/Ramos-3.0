import type { Bonus, Data, RankId, Stats } from "./types";

export const STAT_KEYS = ["str", "vit", "agi", "int", "per", "wil"] as const;

export const STATS_META: { key: keyof Stats; short: string; name: string }[] = [
  { key: "str", short: "FOR", name: "Força" },
  { key: "vit", short: "VIT", name: "Vitalidade" },
  { key: "agi", short: "AGI", name: "Agilidade" },
  { key: "int", short: "INT", name: "Inteligência" },
  { key: "per", short: "PER", name: "Percepção" },
  { key: "wil", short: "VON", name: "Vontade" },
];

export const RANK_ORDER: RankId[] = ["E", "D", "C", "B", "A", "S", "M"];

export function uid() {
  return crypto.randomUUID();
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function shiftDate(key: string, days: number) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return todayKey(dt);
}

export function dayGap(from: string, to: string) {
  const [y1, m1, d1] = from.split("-").map(Number);
  const [y2, m2, d2] = to.split("-").map(Number);
  const a = new Date(y1, m1 - 1, d1).getTime();
  const b = new Date(y2, m2 - 1, d2).getTime();
  return Math.round((b - a) / 86_400_000);
}

export function msUntilMidnight(now = new Date()) {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}

export function formatRemain(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;
}

export function xpForLevel(level: number) {
  return Math.round(40 + level * 18);
}

export function emptyStats(): Stats {
  return { str: 0, vit: 0, agi: 0, int: 0, per: 0, wil: 0 };
}

export function baseStats(): Stats {
  return { str: 10, vit: 10, agi: 10, int: 10, per: 10, wil: 10 };
}

export function addStats(a: Stats, b: Partial<Stats>): Stats {
  const out = { ...a };
  for (const key of STAT_KEYS) out[key] += b[key] ?? 0;
  return out;
}

export function scaleBonus(bonus: Bonus, factor: number): Bonus {
  const out: Bonus = {};
  for (const key of STAT_KEYS) {
    if (bonus[key]) out[key] = Math.round((bonus[key] ?? 0) * factor);
  }
  if (bonus.fatigueReduce) out.fatigueReduce = bonus.fatigueReduce * factor;
  if (bonus.xpBonus) out.xpBonus = bonus.xpBonus * factor;
  if (bonus.summonPower) out.summonPower = bonus.summonPower * factor;
  return out;
}

export function bonusLabel(bonus: Bonus) {
  const parts: string[] = [];
  for (const meta of STATS_META) {
    const value = bonus[meta.key];
    if (value) parts.push(`${meta.short} +${value}`);
  }
  if (bonus.fatigueReduce) parts.push(`fadiga −${Math.round(bonus.fatigueReduce * 100)}%`);
  if (bonus.xpBonus) parts.push(`XP +${Math.round(bonus.xpBonus * 100)}%`);
  if (bonus.summonPower) parts.push(`invocação +${bonus.summonPower} poder`);
  return parts.join(" · ");
}

export function combatPower(totals: Stats, level: number, summonPower: number) {
  const core =
    totals.str * 2.2 +
    totals.vit * 1.5 +
    totals.agi * 2 +
    totals.int * 1.7 +
    totals.per * 1.5 +
    totals.wil * 1.9;
  return Math.floor(core + level * 8 + summonPower);
}

export function highestRank(ranks: RankId[]): RankId | null {
  let best: RankId | null = null;
  let bestI = -1;
  for (const rank of ranks) {
    const i = RANK_ORDER.indexOf(rank);
    if (i > bestI) {
      best = rank;
      bestI = i;
    }
  }
  return best;
}

export function goalsDone(goals: { current: number; target: number }[]) {
  return goals.length > 0 && goals.every((g) => g.current >= g.target && g.target > 0);
}

export function respecCost(level: number) {
  return 120 + level * 15;
}

export function skillSlotsFor(level: number) {
  return Math.min(4, 1 + Math.floor(level / 8));
}

export function summonSlotsFor(level: number) {
  return Math.min(3, 1 + Math.floor(level / 12));
}

export function spentPoints(stats: Stats) {
  return STAT_KEYS.reduce((sum, key) => sum + Math.max(0, stats[key] - 10), 0);
}

export function stamp(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export function pushLog(log: Data["log"], text: string) {
  return [{ id: uid(), at: new Date().toISOString(), text }, ...log].slice(0, 40);
}
