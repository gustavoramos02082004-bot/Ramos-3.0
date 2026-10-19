import { ITEM_BY_ID, RANK_BY_ID, SKILL_BY_ID, SUMMON_BY_ID } from "./catalog";
import {
  addStats,
  combatPower,
  emptyStats,
  highestRank,
  scaleBonus,
  skillSlotsFor,
  summonSlotsFor,
  xpForLevel,
} from "./formulas";
import type { Data } from "./types";

export function derive(data: Data) {
  const bonus = emptyStats();
  let fatigueReduce = 0;
  let xpBonus = 0;
  let summonPowerFlat = 0;

  for (const id of Object.values(data.equipped)) {
    if (!id) continue;
    const item = ITEM_BY_ID[id];
    if (!item) continue;
    for (const key of Object.keys(bonus) as (keyof typeof bonus)[]) {
      bonus[key] += item.bonus[key] ?? 0;
    }
    xpBonus += item.bonus.xpBonus ?? 0;
    fatigueReduce += item.bonus.fatigueReduce ?? 0;
  }

  const slots = skillSlotsFor(data.level);
  const equippedSkills = data.skills.filter((s) => s.equipped && s.unlocked).slice(0, slots);
  for (const skill of equippedSkills) {
    const def = SKILL_BY_ID[skill.id];
    if (!def) continue;
    const scaled = scaleBonus(def.bonusPerLevel, skill.level);
    for (const key of Object.keys(bonus) as (keyof typeof bonus)[]) {
      bonus[key] += scaled[key] ?? 0;
    }
    fatigueReduce += scaled.fatigueReduce ?? 0;
    xpBonus += scaled.xpBonus ?? 0;
    summonPowerFlat += scaled.summonPower ?? 0;
  }

  const summonSlots = summonSlotsFor(data.level);
  const active = data.summons.filter((s) => s.active && s.obtained).slice(0, summonSlots);
  let summonPower = 0;
  for (const summon of active) {
    const def = SUMMON_BY_ID[summon.id];
    if (!def) continue;
    for (const key of Object.keys(bonus) as (keyof typeof bonus)[]) {
      bonus[key] += def.bonus[key] ?? 0;
    }
    summonPower += def.power + Math.floor(summon.loyalty / 2) + summonPowerFlat;
  }

  const totals = addStats(data.stats, bonus);
  const rank = highestRank(data.ranksCleared);
  const rankDef = rank ? RANK_BY_ID[rank] : null;

  return {
    bonus,
    totals,
    power: combatPower(totals, data.level, summonPower),
    hp: 80 + totals.vit * 12 + data.level * 6,
    mp: 30 + totals.int * 8 + totals.per * 2,
    xpNeed: xpForLevel(data.level),
    slots,
    summonSlots,
    job: rankDef?.job ?? "Nenhum",
    rankLabel: rankDef?.name ?? "Não despertado",
    rank,
    title: data.penalty.active ? "O Fraco" : data.earnedTitle,
    fatigueReduce: Math.min(0.55, fatigueReduce),
    xpBonus,
    equippedSkillIds: equippedSkills.map((s) => s.id),
  };
}
