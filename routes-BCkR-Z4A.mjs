import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Shield, c as Moon, d as Crown, f as CalendarDays, i as Sparkles, l as Flame, n as Swords, o as ScrollText, r as Store, s as Mountain, u as Eye } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { a as DialogTitle, i as DialogPortal, n as DialogContent, r as DialogOverlay, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BCkR-Z4A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hunter_default = "/assets/hunter-Bi3Nl42r.jpg";
var CATEGORY_LABEL = {
	corpo: "Corpo",
	mente: "Mente",
	vontade: "Vontade",
	percepcao: "Percepção",
	sombra: "Sombra"
};
var DIFFICULTY_LABEL = {
	facil: "Fácil",
	normal: "Normal",
	dificil: "Difícil",
	extremo: "Extremo"
};
var SLOT_LABEL = {
	arma: "Arma",
	armadura: "Armadura",
	elmo: "Elmo",
	luvas: "Luvas",
	botas: "Botas",
	amuleto: "Amuleto"
};
var REWARD = {
	facil: {
		xp: 50,
		gold: 30,
		fatigue: 10
	},
	normal: {
		xp: 90,
		gold: 50,
		fatigue: 14
	},
	dificil: {
		xp: 150,
		gold: 90,
		fatigue: 22
	},
	extremo: {
		xp: 240,
		gold: 150,
		fatigue: 32
	}
};
var RARITY_LABEL = {
	comum: "Comum",
	rara: "Rara",
	epica: "Épica",
	lendaria: "Lendária"
};
var SKILLS = [
	{
		id: "postura",
		name: "Postura de Ferro",
		category: "corpo",
		rarity: "comum",
		maxLevel: 5,
		description: "O corpo aprende a não ceder no meio da série.",
		bonusPerLevel: { vit: 2 }
	},
	{
		id: "impacto",
		name: "Impacto Curto",
		category: "corpo",
		rarity: "comum",
		maxLevel: 5,
		description: "Cada repetição fica mais pesada, e você também.",
		bonusPerLevel: { str: 2 }
	},
	{
		id: "folego",
		name: "Fôlego Longo",
		category: "corpo",
		rarity: "rara",
		maxLevel: 4,
		description: "A fadiga sobe mais devagar quando o treino é honesto.",
		bonusPerLevel: { fatigueReduce: .06 }
	},
	{
		id: "passo",
		name: "Passo Explosivo",
		category: "corpo",
		rarity: "rara",
		maxLevel: 4,
		description: "O deslocamento vira hábito, não desculpa.",
		bonusPerLevel: { agi: 2 }
	},
	{
		id: "leitura",
		name: "Leitura Fria",
		category: "mente",
		rarity: "comum",
		maxLevel: 5,
		description: "Estudar sem pressa ainda conta como combate.",
		bonusPerLevel: { int: 2 }
	},
	{
		id: "memoria",
		name: "Memória de Batalha",
		category: "mente",
		rarity: "rara",
		maxLevel: 4,
		description: "O que você leu hoje fica disponível quando a prova chegar.",
		bonusPerLevel: {
			int: 1,
			per: 1
		}
	},
	{
		id: "foco",
		name: "Foco Absoluto",
		category: "mente",
		rarity: "epica",
		maxLevel: 3,
		description: "Uma hora inteira, sem negociar com a distração.",
		bonusPerLevel: {
			int: 1,
			wil: 1
		}
	},
	{
		id: "recusa",
		name: "Recusa",
		category: "vontade",
		rarity: "comum",
		maxLevel: 5,
		description: "Dizer não ao atalho. O sistema registra.",
		bonusPerLevel: { wil: 2 }
	},
	{
		id: "juramento",
		name: "Juramento",
		category: "vontade",
		rarity: "rara",
		maxLevel: 4,
		description: "A palavra dada de manhã ainda vale à noite.",
		bonusPerLevel: {
			wil: 1,
			str: 1
		}
	},
	{
		id: "sangue",
		name: "Sangue Frio",
		category: "vontade",
		rarity: "epica",
		maxLevel: 3,
		description: "A penalidade assusta menos quem já pagou uma.",
		bonusPerLevel: {
			wil: 1,
			fatigueReduce: .05
		}
	},
	{
		id: "olho",
		name: "Olho Atento",
		category: "percepcao",
		rarity: "comum",
		maxLevel: 5,
		description: "Você nota o dia escapando antes que ele acabe.",
		bonusPerLevel: { per: 2 }
	},
	{
		id: "rastro",
		name: "Rastro",
		category: "percepcao",
		rarity: "rara",
		maxLevel: 4,
		description: "Padrões de fuga — seus — ficam visíveis.",
		bonusPerLevel: {
			per: 1,
			agi: 1
		}
	},
	{
		id: "instinto",
		name: "Instinto",
		category: "percepcao",
		rarity: "epica",
		maxLevel: 3,
		description: "Sabe quando a missão está quase perdida.",
		bonusPerLevel: {
			per: 1,
			wil: 1
		}
	},
	{
		id: "manto",
		name: "Manto Curto",
		category: "sombra",
		rarity: "rara",
		maxLevel: 4,
		description: "Uma presença discreta. Só aparece para quem cumpre.",
		bonusPerLevel: {
			per: 1,
			agi: 1
		}
	},
	{
		id: "comando",
		name: "Comando",
		category: "sombra",
		rarity: "epica",
		maxLevel: 3,
		description: "Invocações ativas lutam com mais peso ao seu lado.",
		bonusPerLevel: { summonPower: 12 }
	},
	{
		id: "presenca",
		name: "Presença",
		category: "sombra",
		rarity: "lendaria",
		maxLevel: 3,
		description: "O ambiente inteiro entende que você não vai embora.",
		bonusPerLevel: {
			str: 1,
			vit: 1,
			agi: 1,
			int: 1,
			per: 1,
			wil: 1
		}
	}
];
var SKILL_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));
var ITEMS = [
	{
		id: "adaga",
		name: "Adaga de Treino",
		slot: "arma",
		price: 80,
		description: "Leve o bastante para não servir de desculpa.",
		bonus: { str: 2 }
	},
	{
		id: "lamina-vigia",
		name: "Lâmina do Vigia",
		slot: "arma",
		price: 340,
		description: "Corta a hesitação, não a pele.",
		bonus: {
			str: 5,
			agi: 2
		}
	},
	{
		id: "estoque",
		name: "Estoque do Abismo",
		slot: "arma",
		price: 1400,
		description: "Uma arma para quem já não negocia com o cansaço.",
		bonus: {
			str: 8,
			wil: 4
		}
	},
	{
		id: "manto",
		name: "Manto Gasto",
		slot: "armadura",
		price: 90,
		description: "Ainda cobre. Ainda conta.",
		bonus: { vit: 2 }
	},
	{
		id: "couraca",
		name: "Couraça de Cinza",
		slot: "armadura",
		price: 480,
		description: "Peso no ombro. Postura no resto.",
		bonus: {
			vit: 6,
			wil: 2
		}
	},
	{
		id: "placas",
		name: "Placas do Soberano",
		slot: "armadura",
		price: 2200,
		description: "Quem usa isto já atravessou a penalidade mais de uma vez.",
		bonus: {
			vit: 10,
			str: 4
		}
	},
	{
		id: "capuz",
		name: "Capuz",
		slot: "elmo",
		price: 70,
		description: "Esconde o rosto. Não esconde a falta.",
		bonus: { per: 2 }
	},
	{
		id: "viseira",
		name: "Viseira Rúnica",
		slot: "elmo",
		price: 420,
		description: "Marca o que ainda está incompleto no ciclo.",
		bonus: {
			per: 4,
			int: 2
		}
	},
	{
		id: "luvas",
		name: "Luvas de Treino",
		slot: "luvas",
		price: 70,
		description: "Para a centésima flexão, não para a primeira.",
		bonus: { agi: 2 }
	},
	{
		id: "garras",
		name: "Garras Leves",
		slot: "luvas",
		price: 380,
		description: "Agarram o dia antes que ele feche.",
		bonus: {
			agi: 4,
			str: 2
		}
	},
	{
		id: "botas",
		name: "Botas de Estrada",
		slot: "botas",
		price: 110,
		description: "Um quilômetro de cada vez, sem teatro.",
		bonus: { agi: 3 }
	},
	{
		id: "passos",
		name: "Passos Silenciosos",
		slot: "botas",
		price: 540,
		description: "Você chega. O sistema já sabia.",
		bonus: {
			agi: 5,
			per: 3
		}
	},
	{
		id: "fio",
		name: "Fio de Disciplina",
		slot: "amuleto",
		price: 220,
		description: "Um nó. Um lembrete. Uma vontade a mais.",
		bonus: { wil: 4 }
	},
	{
		id: "nucleo",
		name: "Núcleo de Mana",
		slot: "amuleto",
		price: 640,
		description: "Estudo vira reserva, não intenção.",
		bonus: {
			int: 6,
			xpBonus: .06
		}
	},
	{
		id: "olho-sistema",
		name: "Olho do Sistema",
		slot: "amuleto",
		price: 1800,
		description: "Vê a sequência, o poder e o que ainda falta.",
		bonus: {
			per: 3,
			int: 3,
			wil: 3,
			xpBonus: .08
		}
	}
];
var ITEM_BY_ID = Object.fromEntries(ITEMS.map((item) => [item.id, item]));
var SUMMONS = [
	{
		id: "sentinela",
		name: "Sentinela de Cinza",
		title: "Guardião",
		lore: "Um lobo de pedra. Só caminha com quem não falta ao próprio treino.",
		bonus: {
			vit: 4,
			wil: 2
		},
		power: 40
	},
	{
		id: "coruja",
		name: "Coruja de Vigília",
		title: "Observadora",
		lore: "Enxerga o dia que você tenta esconder de si mesmo.",
		bonus: {
			per: 4,
			int: 2
		},
		power: 36
	},
	{
		id: "lamina",
		name: "Lâmina Errante",
		title: "Algoz",
		lore: "Uma espada sem mão. Fiel apenas à decisão já tomada.",
		bonus: {
			str: 5,
			agi: 2
		},
		power: 55
	},
	{
		id: "vulto",
		name: "O Primeiro Vulto",
		title: "Sombra maior",
		lore: "Não é um servo. É a prova de que você não volta atrás.",
		bonus: {
			str: 3,
			wil: 4,
			int: 2
		},
		power: 90
	}
];
var SUMMON_BY_ID = Object.fromEntries(SUMMONS.map((s) => [s.id, s]));
var RANKS = [
	{
		id: "E",
		name: "Rank E",
		title: "Desperto",
		job: "Desperto",
		level: 1,
		streak: 0,
		power: 0,
		missions: 0,
		skills: 0,
		summons: 0,
		gold: 80,
		points: 3,
		trial: "hold",
		blurb: "Segure o selo. Existir já é a primeira prova."
	},
	{
		id: "D",
		name: "Rank D",
		title: "Rastreado",
		job: "Rastreado",
		level: 4,
		streak: 3,
		power: 160,
		missions: 4,
		skills: 0,
		summons: 0,
		gold: 200,
		points: 4,
		summonId: "sentinela",
		trial: "memory",
		blurb: "Três dias sem falhar. Depois, repita a sequência que o sistema mostrar."
	},
	{
		id: "C",
		name: "Rank C",
		title: "Caçador",
		job: "Caçador",
		level: 8,
		streak: 7,
		power: 240,
		missions: 12,
		skills: 1,
		summons: 0,
		gold: 360,
		points: 5,
		summonId: "coruja",
		trial: "pulse",
		blurb: "Uma semana inteira. Acerte o pulso quando ele cruzar o centro."
	},
	{
		id: "B",
		name: "Rank B",
		title: "Algoz",
		job: "Algoz",
		level: 14,
		streak: 14,
		power: 380,
		missions: 25,
		skills: 3,
		summons: 1,
		gold: 640,
		points: 6,
		summonId: "lamina",
		trial: "precision",
		blurb: "Duas semanas de disciplina. Toque os selos antes que se apaguem."
	},
	{
		id: "A",
		name: "Rank A",
		title: "Ascendente",
		job: "Ascendente",
		level: 22,
		streak: 21,
		power: 540,
		missions: 40,
		skills: 5,
		summons: 2,
		gold: 980,
		points: 8,
		skillId: "manto",
		trial: "memory",
		blurb: "Vinte e um dias. A memória agora é mais longa."
	},
	{
		id: "S",
		name: "Rank S",
		title: "Soberano",
		job: "Soberano",
		level: 32,
		streak: 30,
		power: 780,
		missions: 60,
		skills: 7,
		summons: 3,
		gold: 1600,
		points: 10,
		summonId: "vulto",
		skillId: "comando",
		trial: "abyss",
		blurb: "Um mês sem quebrar. Ignore tudo o que pedir para você parar."
	},
	{
		id: "M",
		name: "Monarca",
		title: "Monarca do Véu",
		job: "Monarca do Véu",
		level: 45,
		streak: 45,
		power: 1100,
		missions: 90,
		skills: 8,
		summons: 4,
		gold: 3200,
		points: 15,
		skillId: "presenca",
		trial: "oath",
		blurb: "Poder avassalador não é um título emprestado. É o que sobra depois de não faltar."
	}
];
var RANK_BY_ID = Object.fromEntries(RANKS.map((r) => [r.id, r]));
var OATH = "EU NÃO VOLTO A SER O MAIS FRACO";
var STAT_KEYS = [
	"str",
	"vit",
	"agi",
	"int",
	"per",
	"wil"
];
var STATS_META = [
	{
		key: "str",
		short: "FOR",
		name: "Força"
	},
	{
		key: "vit",
		short: "VIT",
		name: "Vitalidade"
	},
	{
		key: "agi",
		short: "AGI",
		name: "Agilidade"
	},
	{
		key: "int",
		short: "INT",
		name: "Inteligência"
	},
	{
		key: "per",
		short: "PER",
		name: "Percepção"
	},
	{
		key: "wil",
		short: "VON",
		name: "Vontade"
	}
];
var RANK_ORDER = [
	"E",
	"D",
	"C",
	"B",
	"A",
	"S",
	"M"
];
function uid() {
	return crypto.randomUUID();
}
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function shiftDate(key, days) {
	const [y, m, d] = key.split("-").map(Number);
	const dt = new Date(y, m - 1, d);
	dt.setDate(dt.getDate() + days);
	return todayKey(dt);
}
function dayGap(from, to) {
	const [y1, m1, d1] = from.split("-").map(Number);
	const [y2, m2, d2] = to.split("-").map(Number);
	const a = new Date(y1, m1 - 1, d1).getTime();
	const b = new Date(y2, m2 - 1, d2).getTime();
	return Math.round((b - a) / 864e5);
}
function msUntilMidnight(now = /* @__PURE__ */ new Date()) {
	const next = new Date(now);
	next.setHours(24, 0, 0, 0);
	return next.getTime() - now.getTime();
}
function formatRemain(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;
}
function xpForLevel(level) {
	return Math.round(40 + level * 18);
}
function emptyStats() {
	return {
		str: 0,
		vit: 0,
		agi: 0,
		int: 0,
		per: 0,
		wil: 0
	};
}
function baseStats() {
	return {
		str: 10,
		vit: 10,
		agi: 10,
		int: 10,
		per: 10,
		wil: 10
	};
}
function addStats(a, b) {
	const out = { ...a };
	for (const key of STAT_KEYS) out[key] += b[key] ?? 0;
	return out;
}
function scaleBonus(bonus, factor) {
	const out = {};
	for (const key of STAT_KEYS) if (bonus[key]) out[key] = Math.round((bonus[key] ?? 0) * factor);
	if (bonus.fatigueReduce) out.fatigueReduce = bonus.fatigueReduce * factor;
	if (bonus.xpBonus) out.xpBonus = bonus.xpBonus * factor;
	if (bonus.summonPower) out.summonPower = bonus.summonPower * factor;
	return out;
}
function bonusLabel(bonus) {
	const parts = [];
	for (const meta of STATS_META) {
		const value = bonus[meta.key];
		if (value) parts.push(`${meta.short} +${value}`);
	}
	if (bonus.fatigueReduce) parts.push(`fadiga −${Math.round(bonus.fatigueReduce * 100)}%`);
	if (bonus.xpBonus) parts.push(`XP +${Math.round(bonus.xpBonus * 100)}%`);
	if (bonus.summonPower) parts.push(`invocação +${bonus.summonPower} poder`);
	return parts.join(" · ");
}
function combatPower(totals, level, summonPower) {
	const core = totals.str * 2.2 + totals.vit * 1.5 + totals.agi * 2 + totals.int * 1.7 + totals.per * 1.5 + totals.wil * 1.9;
	return Math.floor(core + level * 8 + summonPower);
}
function highestRank(ranks) {
	let best = null;
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
function goalsDone(goals) {
	return goals.length > 0 && goals.every((g) => g.current >= g.target && g.target > 0);
}
function respecCost(level) {
	return 120 + level * 15;
}
function skillSlotsFor(level) {
	return Math.min(4, 1 + Math.floor(level / 8));
}
function summonSlotsFor(level) {
	return Math.min(3, 1 + Math.floor(level / 12));
}
function spentPoints(stats) {
	return STAT_KEYS.reduce((sum, key) => sum + Math.max(0, stats[key] - 10), 0);
}
function stamp(iso) {
	return new Date(iso).toLocaleString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function pushLog(log, text) {
	return [{
		id: uid(),
		at: (/* @__PURE__ */ new Date()).toISOString(),
		text
	}, ...log].slice(0, 40);
}
function derive(data) {
	const bonus = emptyStats();
	let fatigueReduce = 0;
	let xpBonus = 0;
	let summonPowerFlat = 0;
	for (const id of Object.values(data.equipped)) {
		if (!id) continue;
		const item = ITEM_BY_ID[id];
		if (!item) continue;
		for (const key of Object.keys(bonus)) bonus[key] += item.bonus[key] ?? 0;
		xpBonus += item.bonus.xpBonus ?? 0;
		fatigueReduce += item.bonus.fatigueReduce ?? 0;
	}
	const slots = skillSlotsFor(data.level);
	const equippedSkills = data.skills.filter((s) => s.equipped && s.unlocked).slice(0, slots);
	for (const skill of equippedSkills) {
		const def = SKILL_BY_ID[skill.id];
		if (!def) continue;
		const scaled = scaleBonus(def.bonusPerLevel, skill.level);
		for (const key of Object.keys(bonus)) bonus[key] += scaled[key] ?? 0;
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
		for (const key of Object.keys(bonus)) bonus[key] += def.bonus[key] ?? 0;
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
		fatigueReduce: Math.min(.55, fatigueReduce),
		xpBonus,
		equippedSkillIds: equippedSkills.map((s) => s.id)
	};
}
function chime(kind) {
	if (typeof window === "undefined") return;
	try {
		const ctx = new AudioContext();
		const now = ctx.currentTime;
		(kind === "great" ? [
			523,
			659,
			784,
			1046
		] : kind === "bad" ? [196, 146] : [659, 880]).forEach((freq, i) => {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "triangle";
			osc.frequency.value = freq;
			osc.connect(gain);
			gain.connect(ctx.destination);
			const t = now + i * .08;
			gain.gain.setValueAtTime(1e-4, t);
			gain.gain.exponentialRampToValueAtTime(.045, t + .02);
			gain.gain.exponentialRampToValueAtTime(1e-4, t + .24);
			osc.start(t);
			osc.stop(t + .25);
		});
		window.setTimeout(() => void ctx.close(), 1400);
	} catch {}
}
var RANK_IDS = new Set(RANK_ORDER);
function initialSkills() {
	return SKILLS.map((skill) => ({
		id: skill.id,
		unlocked: false,
		level: 1,
		proficiency: 0,
		equipped: false
	}));
}
function goal(id, label, target) {
	return {
		id,
		label,
		current: 0,
		target
	};
}
function initialData() {
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
		daily: [{
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
				goal("g-corrida", "Quilômetros de corrida", 10)
			]
		}, {
			id: "daily-mente",
			title: "Treino da mente",
			description: "Uma hora de estudo, leitura ou prática deliberada. Sem segunda tela.",
			category: "mente",
			difficulty: "normal",
			obrigatoria: true,
			repeat: "diaria",
			goals: [goal("g-estudo", "Horas de estudo ou leitura", 1)]
		}],
		custom: [],
		skills: initialSkills(),
		ownedItems: [],
		equipped: {},
		summons: [
			"sentinela",
			"coruja",
			"lamina",
			"vulto"
		].map((id) => ({
			id,
			obtained: false,
			loyalty: 0,
			active: false
		})),
		days: {},
		streak: 0,
		bestStreak: 0,
		totalMissions: 0,
		ranksCleared: [],
		lastSeenDate: null,
		penalty: {
			active: false,
			stacks: 0
		},
		log: []
	};
}
function asMission(value) {
	if (!value || typeof value !== "object") return null;
	const m = value;
	if (typeof m.id !== "string" || typeof m.title !== "string" || !Array.isArray(m.goals)) return null;
	const goals = m.goals.filter((g) => g && typeof g.id === "string").map((g) => ({
		id: g.id,
		label: typeof g.label === "string" && g.label.trim() ? g.label : "Objetivo",
		current: Number.isFinite(g.current) ? Math.max(0, g.current) : 0,
		target: Number.isFinite(g.target) ? Math.max(1, g.target) : 1
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
		completedOn: typeof m.completedOn === "string" ? m.completedOn : void 0
	};
}
function normalize(partial) {
	const base = initialData();
	if (!partial || typeof partial !== "object") return base;
	try {
		const skills = base.skills.map((skill) => {
			const old = partial.skills?.find((item) => item.id === skill.id);
			return old ? {
				...skill,
				unlocked: Boolean(old.unlocked),
				level: Math.max(1, old.level || 1),
				proficiency: Math.max(0, old.proficiency || 0),
				equipped: Boolean(old.equipped)
			} : skill;
		});
		const summons = base.summons.map((summon) => {
			const old = partial.summons?.find((item) => item.id === summon.id);
			return old ? {
				...summon,
				obtained: Boolean(old.obtained),
				loyalty: Math.max(0, Math.min(100, old.loyalty || 0)),
				active: Boolean(old.active && old.obtained)
			} : summon;
		});
		const dailyRaw = Array.isArray(partial.daily) ? partial.daily.map(asMission).filter((m) => Boolean(m)) : [];
		const customRaw = Array.isArray(partial.custom) ? partial.custom.map(asMission).filter((m) => Boolean(m)) : [];
		return {
			...base,
			...partial,
			stats: {
				...base.stats,
				...partial.stats
			},
			penalty: {
				active: Boolean(partial.penalty?.active),
				stacks: Math.max(0, partial.penalty?.stacks ?? 0)
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
			fatigue: Math.max(0, Math.min(100, partial.fatigue || 0))
		};
	} catch {
		return base;
	}
}
function dayGapLocal(from, to) {
	const [y1, m1, d1] = from.split("-").map(Number);
	const [y2, m2, d2] = to.split("-").map(Number);
	return Math.round((new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime()) / 864e5);
}
function rollDay(data, today) {
	if (!data.initialized || !data.lastSeenDate || data.lastSeenDate === today) return null;
	const gap = dayGapLocal(data.lastSeenDate, today);
	const rec = data.days[data.lastSeenDate];
	const failed = !(rec?.perfect === true) || gap > 1;
	let gold = data.gold;
	let streak = data.streak;
	let penalty = data.penalty;
	let days = data.days;
	const notices = [];
	if (failed) {
		const stacks = penalty.stacks + 1;
		const loss = Math.min(gold, 50 * stacks);
		gold -= loss;
		penalty = {
			active: true,
			stacks
		};
		streak = 0;
		days = {
			...days,
			[data.lastSeenDate]: {
				xp: rec?.xp ?? 0,
				missions: rec?.missions ?? 0,
				perfect: false,
				penalty: true
			}
		};
		notices.push(loss > 0 ? `A missão diária falhou. Penalidade aplicada. −${loss} ouro.` : "A missão diária falhou. A zona de penalidade foi aberta.");
	}
	const reset = (list) => list.map((mission) => mission.repeat === "unica" ? mission : {
		...mission,
		completedOn: void 0,
		goals: mission.goals.map((item) => ({
			...item,
			current: 0
		}))
	});
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
			log: notices.reduce((log, text) => pushLog(log, text), data.log)
		},
		notices
	};
}
function locate(data, id) {
	const daily = data.daily.find((mission) => mission.id === id);
	if (daily) return {
		bucket: "daily",
		mission: daily
	};
	const custom = data.custom.find((mission) => mission.id === id);
	if (custom) return {
		bucket: "custom",
		mission: custom
	};
	return null;
}
function replaceMission(data, mission) {
	return data.daily.some((item) => item.id === mission.id) ? {
		...data,
		daily: data.daily.map((item) => item.id === mission.id ? mission : item)
	} : {
		...data,
		custom: data.custom.map((item) => item.id === mission.id ? mission : item)
	};
}
function weighted(items, weight) {
	const total = items.reduce((sum, item) => sum + Math.max(0, weight(item)), 0);
	if (total <= 0 || !items.length) return null;
	let roll = Math.random() * total;
	for (const item of items) {
		roll -= Math.max(0, weight(item));
		if (roll <= 0) return item;
	}
	return items[items.length - 1] ?? null;
}
var RARITY_W = {
	comum: 5,
	rara: 3,
	epica: 1.2,
	lendaria: .35
};
function trainSkill(data, id, amount) {
	const def = SKILL_BY_ID[id];
	if (!def) return { data };
	let note;
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
		return {
			...skill,
			level,
			proficiency
		};
	});
	return {
		data: {
			...data,
			skills
		},
		note
	};
}
function unlockSkill(data, id) {
	const def = SKILL_BY_ID[id];
	if (!def) return { data };
	if (data.skills.some((skill) => skill.id === id && skill.unlocked)) return trainSkill(data, id, 30);
	return {
		data: {
			...data,
			skills: data.skills.map((skill) => skill.id === id ? {
				...skill,
				unlocked: true,
				level: 1,
				proficiency: 0
			} : skill)
		},
		note: `Habilidade desperta: ${def.name}.`
	};
}
function afterMission(data, mission) {
	const view = derive(data);
	const reward = REWARD[mission.difficulty] ?? REWARD.normal;
	const xpGain = Math.max(1, Math.round(reward.xp * (1 + view.xpBonus)));
	const fatigueGain = Math.max(4, Math.round(reward.fatigue * (1 - view.fatigueReduce)));
	let xp = data.xp + xpGain;
	let level = data.level;
	let statPoints = data.statPoints;
	const levels = [];
	while (level < 99 && xp >= xpForLevel(level)) {
		xp -= xpForLevel(level);
		level += 1;
		statPoints += 3;
		levels.push(level);
	}
	const today = data.lastSeenDate ?? todayKey();
	let next = {
		...replaceMission(data, {
			...mission,
			completedOn: today
		}),
		xp,
		level,
		statPoints,
		totalXp: data.totalXp + xpGain,
		gold: data.gold + reward.gold,
		fatigue: Math.min(100, data.fatigue + fatigueGain),
		totalMissions: data.totalMissions + 1,
		summons: data.summons.map((summon) => summon.active && summon.obtained ? {
			...summon,
			loyalty: Math.min(100, summon.loyalty + 4)
		} : summon)
	};
	const notes = [`${mission.title}: +${xpGain} XP, +${reward.gold} ouro.`];
	if (levels.length) notes.push(levels.length === 1 ? `Nível ${levels[0]}.` : `Nível ${levels[levels.length - 1]}.`);
	const chance = {
		facil: .22,
		normal: .34,
		dificil: .48,
		extremo: .62
	}[mission.difficulty];
	const highRank = data.ranksCleared.some((rank) => [
		"B",
		"A",
		"S",
		"M"
	].includes(rank));
	const locked = SKILLS.filter((skill) => {
		if (skill.category !== mission.category) return false;
		if (skill.rarity === "lendaria" && mission.difficulty !== "extremo" && mission.difficulty !== "dificil" && !highRank) return false;
		return true;
	}).filter((skill) => next.skills.some((item) => item.id === skill.id && !item.unlocked));
	if (!next.skills.filter((skill) => skill.unlocked && SKILL_BY_ID[skill.id]?.category === mission.category).length && locked.length) {
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
		const owned = next.skills.filter((skill) => skill.unlocked && SKILL_BY_ID[skill.id]?.category === mission.category);
		if (owned.length && Math.random() < .7) {
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
		if (penalty.stacks > 0 && !penalty.active) penalty = {
			...penalty,
			stacks: penalty.stacks - 1
		};
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
				penalty: prevDay?.penalty ?? false
			}
		},
		log: notes.reduce((log, text) => pushLog(log, text), next.log)
	};
	return {
		data: next,
		notes,
		levels
	};
}
function applyGoals(data, missionId, nextGoals) {
	if (data.penalty.active) return { error: "A zona de penalidade está aberta." };
	if (data.fatigue >= 100) return { error: "Fadiga no limite. O ciclo precisa virar." };
	const found = locate(data, missionId);
	if (!found) return { error: "Missão não encontrada." };
	const today = data.lastSeenDate ?? todayKey();
	if (found.mission.completedOn === today) return { error: "Esta missão já foi concluída neste ciclo." };
	if (found.mission.repeat === "unica" && found.mission.completedOn) return { error: "Esta missão única já foi concluída." };
	const mission = {
		...found.mission,
		goals: nextGoals
	};
	if (!goalsDone(mission.goals)) return {
		data: replaceMission(data, mission),
		notes: [],
		levels: []
	};
	return afterMission(replaceMission(data, mission), mission);
}
function toast(text, tone) {
	return {
		id: uid(),
		text,
		tone
	};
}
function gate(data) {
	if (data.penalty.active) return "A zona de penalidade está aberta.";
	return null;
}
var useSystem = create()(persist((set, get) => {
	function commit(mut, extras = []) {
		if (!mut && !extras.length) return;
		const notes = [...extras, ...mut?.notes ?? []];
		const tone = mut?.tone ?? "info";
		if (mut?.chime) chime(mut.chime);
		set((state) => ({
			...state,
			data: mut?.data ?? state.data,
			fanfare: mut?.fanfare === void 0 ? state.fanfare : mut.fanfare,
			toasts: [...state.toasts, ...notes.slice(0, 3).map((text) => toast(text, tone))].slice(-4)
		}));
	}
	function live() {
		const rolled = rollDay(get().data, todayKey());
		if (!rolled) return {
			data: get().data,
			notices: []
		};
		return rolled;
	}
	return {
		data: initialData(),
		toasts: [],
		fanfare: null,
		actions: {
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
						log: pushLog([], `Registro criado. Jogador: ${clean}.`)
					},
					toasts: [toast("A missão diária está ativa. Falhar tem custo.", "info")]
				}));
			},
			rename(name) {
				const clean = name.trim().slice(0, 18);
				if (clean.length < 2) return;
				set((state) => ({
					...state,
					data: {
						...state.data,
						profileName: clean
					}
				}));
			},
			ensureToday() {
				const rolled = rollDay(get().data, todayKey());
				if (!rolled) return;
				if (rolled.data.penalty.active) chime("bad");
				set((state) => ({
					...state,
					data: rolled.data,
					toasts: [...state.toasts, ...rolled.notices.map((text) => toast(text, "bad"))].slice(-4)
				}));
			},
			setGoal(missionId, goalId, current) {
				const { data, notices } = live();
				const found = locate(data, missionId);
				if (!found) return;
				const value = Math.max(0, Math.floor(Number.isFinite(current) ? current : 0));
				const result = applyGoals(data, missionId, found.mission.goals.map((item) => item.id === goalId ? {
					...item,
					current: Math.min(item.target, value)
				} : item));
				if ("error" in result) {
					commit({
						data,
						notes: [result.error],
						tone: "bad"
					}, notices);
					return;
				}
				const levels = result.levels;
				commit({
					data: result.data,
					notes: result.notes,
					tone: result.notes.length ? "good" : "info",
					chime: levels.length ? "great" : result.notes.length ? "good" : void 0,
					fanfare: levels.length ? {
						kind: "level",
						level: levels[levels.length - 1]
					} : void 0
				}, notices);
			},
			completeMission(missionId) {
				const { data, notices } = live();
				const found = locate(data, missionId);
				if (!found) return;
				const result = applyGoals(data, missionId, found.mission.goals.map((item) => ({
					...item,
					current: item.target
				})));
				if ("error" in result) {
					commit({
						data,
						notes: [result.error],
						tone: "bad"
					}, notices);
					return;
				}
				const levels = result.levels;
				commit({
					data: result.data,
					notes: result.notes,
					tone: "good",
					chime: levels.length ? "great" : "good",
					fanfare: levels.length ? {
						kind: "level",
						level: levels[levels.length - 1]
					} : void 0
				}, notices);
			},
			saveMission(draft, bucket) {
				const { data, notices } = live();
				const title = draft.title.trim().slice(0, 48);
				if (title.length < 2) {
					commit({
						data,
						notes: ["Dê um nome à missão."],
						tone: "bad"
					}, notices);
					return false;
				}
				const goals = draft.goals.filter((item) => item.label.trim()).slice(0, 6).map((item) => ({
					id: item.id || uid(),
					label: item.label.trim().slice(0, 42),
					target: Math.max(1, Math.min(9999, Math.floor(item.target) || 1))
				}));
				if (!goals.length) {
					commit({
						data,
						notes: ["A missão precisa de ao menos um objetivo."],
						tone: "bad"
					}, notices);
					return false;
				}
				if (draft.id) {
					const found = locate(data, draft.id);
					if (!found) return false;
					const turningOff = found.mission.obrigatoria && !draft.obrigatoria;
					const obrigCount = data.daily.filter((mission) => mission.obrigatoria).length;
					if (found.bucket === "daily" && turningOff && obrigCount <= 1) {
						commit({
							data,
							notes: ["Pelo menos uma missão diária permanece obrigatória."],
							tone: "bad"
						}, notices);
						return false;
					}
					commit({
						data: replaceMission(data, {
							...found.mission,
							title,
							description: draft.description.trim().slice(0, 180),
							category: draft.category,
							difficulty: draft.difficulty,
							obrigatoria: found.bucket === "daily" ? draft.obrigatoria : false,
							repeat: found.bucket === "custom" ? draft.repeat : "diaria",
							goals: goals.map((item) => {
								const prev = found.mission.goals.find((goalItem) => goalItem.id === item.id);
								return {
									...item,
									current: Math.min(prev?.current ?? 0, item.target)
								};
							})
						}),
						notes: ["Missão atualizada."]
					}, notices);
					return true;
				}
				if (bucket === "daily" && data.daily.length >= 8) {
					commit({
						data,
						notes: ["O ciclo comporta no máximo 8 missões diárias."],
						tone: "bad"
					}, notices);
					return false;
				}
				if (bucket === "custom" && data.custom.length >= 24) {
					commit({
						data,
						notes: ["Limite de missões livres atingido."],
						tone: "bad"
					}, notices);
					return false;
				}
				const mission = {
					id: uid(),
					title,
					description: draft.description.trim().slice(0, 180),
					category: draft.category,
					difficulty: draft.difficulty,
					obrigatoria: bucket === "daily" ? draft.obrigatoria : false,
					repeat: bucket === "custom" ? draft.repeat : "diaria",
					goals: goals.map((item) => ({
						...item,
						current: 0
					}))
				};
				commit({
					data: bucket === "daily" ? {
						...data,
						daily: [...data.daily, mission]
					} : {
						...data,
						custom: [...data.custom, mission]
					},
					notes: ["Missão registrada."],
					tone: "good",
					chime: "good"
				}, notices);
				return true;
			},
			deleteMission(id) {
				const { data, notices } = live();
				if (id === "daily-corpo") {
					commit({
						data,
						notes: ["O fortalecimento do corpo não pode ser apagado. Edite os números."],
						tone: "bad"
					}, notices);
					return;
				}
				const found = locate(data, id);
				if (!found) return;
				if (found.bucket === "daily" && found.mission.obrigatoria) {
					if (!data.daily.filter((mission) => mission.obrigatoria && mission.id !== id).length) {
						commit({
							data,
							notes: ["Mantenha ao menos uma obrigação diária."],
							tone: "bad"
						}, notices);
						return;
					}
				}
				commit({
					data: found.bucket === "daily" ? {
						...data,
						daily: data.daily.filter((mission) => mission.id !== id)
					} : {
						...data,
						custom: data.custom.filter((mission) => mission.id !== id)
					},
					notes: ["Missão removida."]
				}, notices);
			},
			allocate(key) {
				if (get().data.statPoints <= 0) return;
				set((state) => ({
					...state,
					data: {
						...state.data,
						statPoints: state.data.statPoints - 1,
						stats: {
							...state.data.stats,
							[key]: state.data.stats[key] + 1
						}
					}
				}));
			},
			respec() {
				const data = get().data;
				const spent = spentPoints(data.stats);
				const cost = respecCost(data.level);
				if (spent <= 0) return;
				if (data.gold < cost) {
					commit({
						data,
						notes: [`Redistribuir custa ${cost} ouro.`],
						tone: "bad"
					});
					return;
				}
				commit({
					data: {
						...data,
						gold: data.gold - cost,
						statPoints: data.statPoints + spent,
						stats: baseStats(),
						log: pushLog(data.log, `Atributos redistribuídos. −${cost} ouro.`)
					},
					notes: ["Atributos liberados."]
				});
			},
			buy(itemId) {
				const { data, notices } = live();
				const blocked = gate(data);
				if (blocked) {
					commit({
						data,
						notes: [blocked],
						tone: "bad"
					}, notices);
					return;
				}
				const item = ITEM_BY_ID[itemId];
				if (!item) return;
				if (data.ownedItems.includes(itemId)) return;
				if (data.gold < item.price) {
					commit({
						data,
						notes: ["Ouro insuficiente."],
						tone: "bad"
					}, notices);
					return;
				}
				commit({
					data: {
						...data,
						gold: data.gold - item.price,
						ownedItems: [...data.ownedItems, itemId],
						log: pushLog(data.log, `Comprou ${item.name}.`)
					},
					notes: [`${item.name} entrou no inventário.`],
					tone: "good",
					chime: "good"
				}, notices);
			},
			equip(itemId) {
				const data = get().data;
				const item = ITEM_BY_ID[itemId];
				if (!item || !data.ownedItems.includes(itemId)) return;
				const previous = data.equipped[item.slot];
				const equipped = {
					...data.equipped,
					[item.slot]: itemId
				};
				set((state) => ({
					...state,
					data: {
						...state.data,
						equipped
					},
					toasts: previous === itemId ? state.toasts : [...state.toasts, toast(`${item.name} equipado.`, "good")].slice(-4)
				}));
			},
			unequip(slot) {
				const data = get().data;
				if (!data.equipped[slot]) return;
				const equipped = { ...data.equipped };
				delete equipped[slot];
				set((state) => ({
					...state,
					data: {
						...state.data,
						equipped
					}
				}));
			},
			sell(itemId) {
				const data = get().data;
				const item = ITEM_BY_ID[itemId];
				if (!item || !data.ownedItems.includes(itemId)) return;
				const refund = Math.floor(item.price * .4);
				const equipped = { ...data.equipped };
				if (equipped[item.slot] === itemId) delete equipped[item.slot];
				commit({
					data: {
						...data,
						gold: data.gold + refund,
						ownedItems: data.ownedItems.filter((id) => id !== itemId),
						equipped,
						log: pushLog(data.log, `Vendeu ${item.name} por ${refund} ouro.`)
					},
					notes: [`+${refund} ouro.`],
					tone: "good"
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
					commit({
						data,
						notes: [`Só ${view.slots} habilidade(s) equipada(s) neste nível.`],
						tone: "bad"
					});
					return;
				}
				set((state) => ({
					...state,
					data: {
						...state.data,
						skills: state.data.skills.map((item) => item.id === id ? {
							...item,
							equipped: !item.equipped
						} : item)
					}
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
					commit({
						data,
						notes: [`Só ${view.summonSlots} invocação(ões) ativa(s) neste nível.`],
						tone: "bad"
					});
					return;
				}
				set((state) => ({
					...state,
					data: {
						...state.data,
						summons: state.data.summons.map((item) => item.id === id ? {
							...item,
							active: !item.active
						} : item)
					}
				}));
			},
			passRank(id) {
				const { data, notices } = live();
				if (data.penalty.active) {
					commit({
						data,
						notes: ["Saia da penalidade antes da prova."],
						tone: "bad"
					}, notices);
					return;
				}
				if (data.ranksCleared.includes(id)) return;
				const index = RANK_ORDER.indexOf(id);
				if (index > 0 && !data.ranksCleared.includes(RANK_ORDER[index - 1])) return;
				const def = RANK_BY_ID[id];
				const view = derive(data);
				const unlocked = data.skills.filter((skill) => skill.unlocked).length;
				const obtained = data.summons.filter((summon) => summon.obtained).length;
				if (data.level < def.level || data.streak < def.streak || view.power < def.power || data.totalMissions < def.missions || unlocked < def.skills || obtained < def.summons) return;
				let next = {
					...data,
					ranksCleared: [...data.ranksCleared, id],
					gold: data.gold + def.gold,
					statPoints: data.statPoints + def.points,
					earnedTitle: def.title
				};
				const notes = [`${def.name} conquistado. +${def.gold} ouro, +${def.points} pontos.`];
				if (def.summonId) {
					const summon = SUMMON_BY_ID[def.summonId];
					next = {
						...next,
						summons: next.summons.map((item) => item.id === def.summonId ? {
							...item,
							obtained: true,
							loyalty: Math.max(item.loyalty, 8)
						} : item)
					};
					if (summon) notes.push(`${summon.name} respondeu ao chamado.`);
				}
				if (def.skillId) {
					const unlockedSkill = unlockSkill(next, def.skillId);
					next = unlockedSkill.data;
					if (unlockedSkill.note) notes.push(unlockedSkill.note);
				}
				next = {
					...next,
					log: notes.reduce((log, text) => pushLog(log, text), next.log)
				};
				commit({
					data: next,
					notes,
					tone: "good",
					chime: "great",
					fanfare: {
						kind: "rank",
						rank: id,
						title: def.title
					}
				}, notices);
			},
			clearPenalty() {
				if (!get().data.penalty.active) return;
				chime("good");
				set((state) => ({
					...state,
					data: {
						...state.data,
						penalty: {
							...state.data.penalty,
							active: false
						},
						fatigue: 30,
						log: pushLog(state.data.log, "Você saiu da zona de penalidade.")
					},
					toasts: [...state.toasts, toast("Penalidade encerrada. As missões do ciclo ainda estão abertas.", "good")].slice(-4)
				}));
			},
			dismissToast(id) {
				set((state) => ({
					...state,
					toasts: state.toasts.filter((item) => item.id !== id)
				}));
			},
			dismissFanfare() {
				set((state) => ({
					...state,
					fanfare: null
				}));
			},
			wipe() {
				set((state) => ({
					...state,
					data: initialData(),
					toasts: [],
					fanfare: null
				}));
			}
		}
	};
}, {
	name: "sistema-ascensao",
	version: 1,
	partialize: (state) => ({ data: state.data }),
	merge: (persisted, current) => {
		const saved = persisted;
		return {
			...current,
			data: normalize(saved?.data),
			toasts: [],
			fanfare: null
		};
	}
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Frame({ title, extra, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("sys-frame relative", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { className: "-top-px -left-px border-t-2 border-l-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { className: "-top-px -right-px border-t-2 border-r-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { className: "-bottom-px -left-px border-b-2 border-l-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, { className: "-right-px -bottom-px border-r-2 border-b-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xs tracking-widest text-primary uppercase",
					children: title
				}), extra]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children
			})
		]
	});
}
function Corner({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("pointer-events-none absolute size-3 border-primary", className) });
}
function Meter({ label, value, max, tone = "primary" }) {
	const pct = max <= 0 ? 0 : Math.max(0, Math.min(100, value / max * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-baseline justify-between gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tabular-nums text-fg",
			children: [value, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: ["/", max]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 bg-surface-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full transition-all", tone === "gold" ? "bg-gold" : tone === "danger" ? "bg-danger" : "bg-primary"),
			style: { width: `${pct}%` }
		})
	})] });
}
function Btn({ variant = "primary", className, type = "button", ...props }) {
	const look = {
		primary: "bg-primary text-bg",
		gold: "bg-gold text-bg",
		danger: "bg-danger text-fg",
		ghost: "border border-line bg-transparent text-fg"
	}[variant];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 px-4 text-base font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-40", look, className),
		...props
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-sm tracking-wide text-muted uppercase",
			children: label
		}), children]
	});
}
var fieldClass = "min-h-11 w-full border border-line bg-bg px-3 text-fg outline-none";
function SystemDialog({ open, onOpenChange, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-bg/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sys-frame fixed inset-x-4 top-16 z-40 mx-auto max-h-[80vh] max-w-lg overflow-y-auto p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-lg tracking-wide text-primary",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children
			})]
		})] })
	});
}
function JournalPanel() {
	const data = useSystem((s) => s.data);
	useSystem((s) => s.actions);
	const view = derive(data);
	const today = data.lastSeenDate ?? todayKey();
	const perfect = Object.values(data.days).filter((day) => day.perfect).length;
	const chart = Array.from({ length: 14 }, (_, index) => {
		const key = shiftDate(today, index - 13);
		const day = data.days[key];
		return {
			date: key.slice(5),
			xp: day?.xp ?? 0
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
				title: "Disciplina",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Sequência",
							v: data.streak
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Melhor",
							v: data.bestStreak
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Dias perfeitos",
							v: perfect
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Missões",
							v: data.totalMissions
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "XP total",
							v: data.totalXp
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Poder",
							v: view.power
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Nível",
							v: data.level
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Penalidades",
							v: data.penalty.stacks
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "O registro fica neste aparelho. A sequência sobe quando todas as obrigações do ciclo fecham."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
				title: "Últimos ciclos",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-48 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: chart,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "date",
									stroke: "var(--color-muted)",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 12
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--color-muted)",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 12
									},
									width: 36
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--color-surface)",
									border: "1px solid var(--color-line)",
									color: "var(--color-fg)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									dataKey: "xp",
									name: "XP",
									stroke: "var(--color-primary)",
									fill: "var(--color-primary)",
									fillOpacity: .2
								})
							]
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
				title: "Calendário",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
					days: data.days,
					today
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wipe, {})
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line bg-bg px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-2xl tabular-nums text-fg",
			children: v
		})]
	});
}
function Calendar({ days, today }) {
	const [y, m, d] = today.split("-").map(Number);
	const start = shiftDate(today, -((new Date(y, m - 1, d).getDay() + 6) % 7 + 77));
	const cells = [];
	for (let i = 0;; i++) {
		const key = shiftDate(start, i);
		cells.push(key);
		if (key === today || i > 100) break;
	}
	while (cells.length % 7 !== 0) cells.push("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-2 grid grid-cols-7 gap-1 text-center text-xs tracking-wide text-muted",
			children: [
				"S",
				"T",
				"Q",
				"Q",
				"S",
				"S",
				"D"
			].map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }, `${label}-${index}`))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7 gap-1",
			children: cells.map((key, index) => {
				if (!key) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `pad-${index}`);
				const day = days[key];
				const future = dayGap(today, key) > 0;
				const tone = day?.penalty ? "bg-danger" : day?.perfect ? "bg-primary" : day && day.missions > 0 ? "bg-primary/40" : "bg-surface";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					title: `${key}${day ? ` · ${day.xp} XP` : ""}`,
					className: `aspect-square border ${key === today ? "border-gold" : "border-line"} ${future ? "opacity-30" : ""} ${tone}`
				}, key);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "Ciano: ciclo perfeito. Vermelho: penalidade. Borda dourada: hoje."
		})
	] });
}
function Wipe() {
	const actions = useSystem((s) => s.actions);
	const [phrase, setPhrase] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		title: "Apagar registro",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Isto zera nível, ouro, missões e ranks neste aparelho. Não há volta."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Digite APAGAR",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					value: phrase,
					onChange: (event) => setPhrase(event.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "danger",
				className: "mt-3",
				disabled: phrase.trim().toUpperCase() !== "APAGAR",
				onClick: () => actions.wipe(),
				children: "Apagar tudo"
			})
		]
	});
}
var CATEGORIES = Object.keys(CATEGORY_LABEL);
var DIFFICULTIES = Object.keys(DIFFICULTY_LABEL);
function blank(bucket) {
	return {
		title: "",
		description: "",
		category: bucket === "daily" ? "corpo" : "vontade",
		difficulty: "normal",
		obrigatoria: bucket === "daily",
		repeat: "diaria",
		goals: [{
			id: uid(),
			label: "",
			target: 10
		}]
	};
}
function fromMission(mission) {
	return {
		id: mission.id,
		title: mission.title,
		description: mission.description,
		category: mission.category,
		difficulty: mission.difficulty,
		obrigatoria: mission.obrigatoria,
		repeat: mission.repeat,
		goals: mission.goals.map((goal) => ({
			id: goal.id,
			label: goal.label,
			target: goal.target
		}))
	};
}
function MissionsPanel() {
	const data = useSystem((s) => s.data);
	useSystem((s) => s.actions);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [bucket, setBucket] = (0, import_react.useState)("daily");
	const today = data.lastSeenDate;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
				title: "Missão diária",
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: () => {
						setBucket("daily");
						setDraft(blank("daily"));
					},
					children: "Nova"
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-danger",
					children: "Aviso: falhar numa missão marcada como obrigatória até o fim do ciclo abre a zona de penalidade."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: data.daily.map((mission) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionCard, {
						mission,
						today,
						onEdit: () => {
							setBucket("daily");
							setDraft(fromMission(mission));
						}
					}, mission.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
				title: "Missões livres",
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: () => {
						setBucket("custom");
						setDraft(blank("custom"));
					},
					children: "Criar"
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: "Feitas do zero. Dão XP e podem despertar uma habilidade da mesma afinidade. Não geram penalidade."
				}), data.custom.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nenhuma missão livre. O sistema espera a primeira."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: data.custom.map((mission) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionCard, {
						mission,
						today,
						onEdit: () => {
							setBucket("custom");
							setDraft(fromMission(mission));
						}
					}, mission.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemDialog, {
				open: draft !== null,
				onOpenChange: (open) => !open && setDraft(null),
				title: draft?.id ? "Editar missão" : "Nova missão",
				children: draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionForm, {
					draft,
					bucket,
					onChange: setDraft,
					onClose: () => setDraft(null)
				}) : null
			})
		]
	});
}
function MissionCard({ mission, today, onEdit }) {
	const actions = useSystem((s) => s.actions);
	const done = mission.completedOn === today || mission.repeat === "unica" && Boolean(mission.completedOn);
	const reward = REWARD[mission.difficulty];
	const progress = mission.goals.reduce((sum, goal) => sum + Math.min(goal.current, goal.target), 0);
	const total = mission.goals.reduce((sum, goal) => sum + goal.target, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border border-line bg-bg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-fg",
					children: mission.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						CATEGORY_LABEL[mission.category],
						" · ",
						DIFFICULTY_LABEL[mission.difficulty],
						" · ",
						reward.xp,
						" XP · ",
						reward.gold,
						" ouro"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [mission.obrigatoria ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "border border-gold px-2 py-1 text-xs tracking-widest text-gold uppercase",
						children: "Obrigatória"
					}) : null, mission.repeat === "unica" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "border border-line px-2 py-1 text-xs tracking-widest text-muted uppercase",
						children: "Única"
					}) : null]
				})]
			}),
			mission.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: mission.description
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs tracking-widest text-muted uppercase tabular-nums",
				children: [
					progress,
					"/",
					total
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-2",
				children: mission.goals.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 text-sm",
							children: goal.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "h-11 w-20 border border-line bg-surface px-2 text-center tabular-nums",
							type: "number",
							min: 0,
							max: goal.target,
							disabled: done,
							value: goal.current,
							"aria-label": goal.label,
							onChange: (event) => actions.setGoal(mission.id, goal.id, Number(event.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: ["/ ", goal.target]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ghost",
							className: "px-3",
							disabled: done,
							onClick: () => actions.setGoal(mission.id, goal.id, goal.current + 1),
							children: "+1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ghost",
							className: "px-3",
							disabled: done,
							onClick: () => actions.setGoal(mission.id, goal.id, goal.current + 10),
							children: "+10"
						})
					]
				}, goal.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "flex-1",
						disabled: done,
						onClick: () => actions.completeMission(mission.id),
						children: done ? "Concluída neste ciclo" : "Concluir missão"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						onClick: onEdit,
						children: "Editar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						onClick: () => actions.deleteMission(mission.id),
						children: "Apagar"
					})
				]
			})
		]
	});
}
function MissionForm({ draft, bucket, onChange, onClose }) {
	const actions = useSystem((s) => s.actions);
	const lockedCore = draft.id === "daily-corpo";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-3",
		onSubmit: (event) => {
			event.preventDefault();
			if (actions.saveMission(draft, bucket)) onClose();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Título",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					value: draft.title,
					maxLength: 48,
					onChange: (event) => onChange({
						...draft,
						title: event.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Descrição",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${fieldClass} min-h-20 py-2`,
					value: draft.description,
					maxLength: 180,
					onChange: (event) => onChange({
						...draft,
						description: event.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Afinidade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: fieldClass,
						value: draft.category,
						onChange: (event) => onChange({
							...draft,
							category: event.target.value
						}),
						children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: category,
							children: CATEGORY_LABEL[category]
						}, category))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Dificuldade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: fieldClass,
						value: draft.difficulty,
						onChange: (event) => onChange({
							...draft,
							difficulty: event.target.value
						}),
						children: DIFFICULTIES.map((difficulty) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: difficulty,
							children: [
								DIFFICULTY_LABEL[difficulty],
								" · ",
								REWARD[difficulty].xp,
								" XP"
							]
						}, difficulty))
					})
				})]
			}),
			bucket === "daily" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 items-center gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: draft.obrigatoria,
					disabled: lockedCore,
					onChange: (event) => onChange({
						...draft,
						obrigatoria: event.target.checked
					})
				}), "Obrigatória até o fim do ciclo"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Repetição",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: fieldClass,
					value: draft.repeat,
					onChange: (event) => onChange({
						...draft,
						repeat: event.target.value
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "diaria",
						children: "Reaparece todo ciclo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "unica",
						children: "Uma vez"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tracking-wide text-muted uppercase",
						children: "Objetivos"
					}),
					draft.goals.map((goal, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								placeholder: "Nome do objetivo",
								value: goal.label,
								maxLength: 42,
								onChange: (event) => {
									const goals = draft.goals.slice();
									goals[index] = {
										...goal,
										label: event.target.value
									};
									onChange({
										...draft,
										goals
									});
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 w-20 border border-line bg-bg px-2 text-center tabular-nums",
								type: "number",
								min: 1,
								max: 9999,
								value: goal.target,
								"aria-label": "Meta",
								onChange: (event) => {
									const goals = draft.goals.slice();
									goals[index] = {
										...goal,
										target: Number(event.target.value)
									};
									onChange({
										...draft,
										goals
									});
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								className: "px-3",
								disabled: draft.goals.length <= 1,
								onClick: () => onChange({
									...draft,
									goals: draft.goals.filter((item) => item.id !== goal.id)
								}),
								children: "−"
							})
						]
					}, goal.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						disabled: draft.goals.length >= 6,
						onClick: () => onChange({
							...draft,
							goals: [...draft.goals, {
								id: uid(),
								label: "",
								target: 10
							}]
						}),
						children: "Adicionar objetivo"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					className: "flex-1",
					children: "Salvar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: onClose,
					children: "Cancelar"
				})]
			})
		]
	});
}
var RUNES = [
	Swords,
	Shield,
	Eye,
	Flame,
	Moon,
	Mountain
];
function RanksPanel() {
	const data = useSystem((s) => s.data);
	const actions = useSystem((s) => s.actions);
	const view = derive(data);
	const cleared = new Set(data.ranksCleared);
	const next = RANKS.find((rank) => !cleared.has(rank.id)) ?? null;
	const [attempt, setAttempt] = (0, import_react.useState)(0);
	const [note, setNote] = (0, import_react.useState)("");
	const unlocked = data.skills.filter((skill) => skill.unlocked).length;
	const obtained = data.summons.filter((summon) => summon.obtained).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
			title: "Rank",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-4xl text-gold",
				children: view.rankLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "De E até S, e além: Monarca. Cada prova só abre quando o corpo, a sequência e o poder acompanham."
			})]
		}), RANKS.map((rank, index) => {
			const done = cleared.has(rank.id);
			const isNext = next?.id === rank.id;
			const reasons = [];
			if (index > 0 && !cleared.has(RANKS[index - 1].id)) reasons.push("Rank anterior em aberto.");
			if (data.level < rank.level) reasons.push(`Nível ${rank.level} (atual ${data.level}).`);
			if (data.streak < rank.streak) reasons.push(`Sequência de ${rank.streak} dias (atual ${data.streak}).`);
			if (view.power < rank.power) reasons.push(`Poder ${rank.power} (atual ${view.power}).`);
			if (data.totalMissions < rank.missions) reasons.push(`${rank.missions} missões (atual ${data.totalMissions}).`);
			if (unlocked < rank.skills) reasons.push(`${rank.skills} habilidades (atual ${unlocked}).`);
			if (obtained < rank.summons) reasons.push(`${rank.summons} invocações (atual ${obtained}).`);
			const ready = reasons.length === 0 && isNext && !data.penalty.active;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
				title: rank.name,
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs tracking-widest text-gold uppercase",
					children: done ? "Conquistado" : rank.title
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: rank.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-fg",
						children: [
							"Recompensa: ",
							rank.gold,
							" ouro · ",
							rank.points,
							" pontos",
							rank.summonId ? " · uma invocação" : "",
							rank.skillId ? " · uma habilidade" : ""
						]
					}),
					done ? null : isNext ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: reasons.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-1 text-sm text-muted",
							children: reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reason }, reason))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2",
							children: [note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-sm text-danger",
								children: note
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trial, {
								rank: rank.id,
								kind: rank.trial,
								disabled: !ready,
								onSuccess: () => {
									setNote("");
									actions.passRank(rank.id);
								},
								onFail: () => {
									setNote("A prova falhou. O rank continua onde estava.");
									setAttempt((value) => value + 1);
								}
							}, `${rank.id}-${attempt}`)]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs tracking-widest text-muted uppercase",
						children: "Selado"
					})
				]
			}, rank.id);
		})]
	});
}
function Trial({ rank, kind, disabled, onSuccess, onFail }) {
	if (disabled) return null;
	if (kind === "hold") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldSeal, {
		seconds: 12,
		label: "Segurar o selo",
		onSuccess
	});
	if (kind === "memory") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryTrial, {
		length: rank === "A" ? 5 : 4,
		onSuccess,
		onFail
	});
	if (kind === "pulse") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PulseTrial, {
		onSuccess,
		onFail
	});
	if (kind === "precision") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrecisionTrial, {
		onSuccess,
		onFail
	});
	if (kind === "abyss") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbyssTrial, {
		onSuccess,
		onFail
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OathTrial, { onSuccess });
}
function HoldSeal({ seconds, label, onSuccess }) {
	const [pct, setPct] = (0, import_react.useState)(0);
	const holding = (0, import_react.useRef)(false);
	const start = (0, import_react.useRef)(0);
	const frame = (0, import_react.useRef)(0);
	const done = (0, import_react.useRef)(false);
	const stop = () => {
		holding.current = false;
		cancelAnimationFrame(frame.current);
		if (!done.current) setPct(0);
	};
	const loop = (time) => {
		if (!holding.current || done.current) return;
		const ratio = Math.min(1, (time - start.current) / (seconds * 1e3));
		setPct(ratio);
		if (ratio >= 1) {
			done.current = true;
			holding.current = false;
			onSuccess();
			return;
		}
		frame.current = requestAnimationFrame(loop);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "relative min-h-16 w-full touch-none overflow-hidden border border-primary bg-bg font-semibold tracking-widest text-fg",
		onPointerDown: (event) => {
			if (done.current) return;
			event.currentTarget.setPointerCapture(event.pointerId);
			holding.current = true;
			start.current = performance.now();
			frame.current = requestAnimationFrame(loop);
		},
		onPointerUp: stop,
		onPointerCancel: stop,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute inset-y-0 left-0 bg-primary/30",
			style: { width: `${pct * 100}%` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative",
			children: label
		})]
	});
}
function MemoryTrial({ length, onSuccess, onFail }) {
	const [phase, setPhase] = (0, import_react.useState)("show");
	const [sequence, setSequence] = (0, import_react.useState)([]);
	const [cursor, setCursor] = (0, import_react.useState)(0);
	const [lit, setLit] = (0, import_react.useState)(null);
	const done = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const seq = Array.from({ length }, () => Math.floor(Math.random() * RUNES.length));
		setSequence(seq);
		let cancelled = false;
		let index = 0;
		const timers = [];
		const later = (fn, ms) => {
			timers.push(window.setTimeout(() => {
				if (!cancelled) fn();
			}, ms));
		};
		const play = () => {
			if (cancelled) return;
			if (index >= seq.length) {
				setLit(null);
				setPhase("input");
				return;
			}
			setLit(seq[index]);
			later(() => {
				setLit(null);
				later(() => {
					index += 1;
					play();
				}, 200);
			}, 620);
		};
		later(play, 350);
		return () => {
			cancelled = true;
			timers.forEach((id) => window.clearTimeout(id));
		};
	}, [length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-sm text-muted",
		children: phase === "show" ? "Observe a sequência." : "Repita a sequência."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-2",
		children: RUNES.map((Icon, index) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: phase !== "input",
				className: `flex min-h-14 items-center justify-center border ${lit === index ? "border-primary bg-primary text-bg" : "border-line bg-bg text-fg"}`,
				onClick: () => {
					if (done.current || phase !== "input") return;
					if (sequence[cursor] !== index) {
						done.current = true;
						onFail();
						return;
					}
					const next = cursor + 1;
					setCursor(next);
					if (next >= sequence.length) {
						done.current = true;
						onSuccess();
					}
				},
				"aria-label": `Runa ${index + 1}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
			}, index);
		})
	})] });
}
function PulseTrial({ onSuccess, onFail }) {
	const pos = (0, import_react.useRef)(0);
	const dir = (0, import_react.useRef)(1);
	const speed = (0, import_react.useRef)(.42);
	const hits = (0, import_react.useRef)(0);
	const misses = (0, import_react.useRef)(0);
	const done = (0, import_react.useRef)(false);
	const [shown, setShown] = (0, import_react.useState)(0);
	const [hud, setHud] = (0, import_react.useState)("0/8");
	(0, import_react.useEffect)(() => {
		let frame = 0;
		let last = performance.now();
		const loop = (time) => {
			const dt = Math.min(.05, (time - last) / 1e3);
			last = time;
			pos.current += dir.current * speed.current * dt;
			if (pos.current >= 1) {
				pos.current = 1;
				dir.current = -1;
			}
			if (pos.current <= 0) {
				pos.current = 0;
				dir.current = 1;
			}
			setShown(pos.current);
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-12 border border-line bg-bg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-y-0 bg-primary/25",
				style: {
					left: "40%",
					width: "20%"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-y-0 w-1 bg-gold",
				style: { left: `${shown * 100}%` }
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm tabular-nums text-muted",
			children: [
				"Acertos ",
				hud,
				". Toque quando a marca cruzar a faixa."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			className: "mt-3 w-full",
			onClick: () => {
				if (done.current) return;
				if (pos.current >= .4 && pos.current <= .6) {
					hits.current += 1;
					speed.current += .05;
					setHud(`${hits.current}/8 · erros ${misses.current}`);
					if (hits.current >= 8) {
						done.current = true;
						onSuccess();
					}
				} else {
					misses.current += 1;
					setHud(`${hits.current}/8 · erros ${misses.current}`);
					if (misses.current >= 3) {
						done.current = true;
						onFail();
					}
				}
			},
			children: "Agora"
		})
	] });
}
function PrecisionTrial({ onSuccess, onFail }) {
	const hits = (0, import_react.useRef)(0);
	const misses = (0, import_react.useRef)(0);
	const done = (0, import_react.useRef)(false);
	const serial = (0, import_react.useRef)(1);
	const [targets, setTargets] = (0, import_react.useState)([]);
	const [hud, setHud] = (0, import_react.useState)("0/8");
	const fail = (0, import_react.useRef)(onFail);
	const success = (0, import_react.useRef)(onSuccess);
	fail.current = onFail;
	success.current = onSuccess;
	(0, import_react.useEffect)(() => {
		const spawn = window.setInterval(() => {
			if (done.current) return;
			setTargets((curr) => {
				if (curr.length >= 2) return curr;
				return [...curr, {
					id: serial.current++,
					x: 16 + Math.random() * 68,
					y: 18 + Math.random() * 62,
					born: performance.now()
				}];
			});
		}, 680);
		const tick = window.setInterval(() => {
			if (done.current) return;
			const now = performance.now();
			setTargets((curr) => {
				const expired = curr.filter((target) => now - target.born >= 1400);
				if (expired.length) {
					misses.current += expired.length;
					setHud(`${hits.current}/8 · erros ${misses.current}`);
					if (misses.current >= 3) {
						done.current = true;
						fail.current();
					}
				}
				return curr.filter((target) => now - target.born < 1400);
			});
		}, 120);
		return () => {
			window.clearInterval(spawn);
			window.clearInterval(tick);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-2 text-sm tabular-nums text-muted",
		children: [
			"Selos ",
			hud,
			". Três erros encerram a prova."
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative h-64 border border-line bg-bg",
		children: targets.map((target) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-primary/20",
			style: {
				left: `${target.x}%`,
				top: `${target.y}%`
			},
			"aria-label": "Selo",
			onClick: () => {
				if (done.current) return;
				hits.current += 1;
				setTargets((curr) => curr.filter((item) => item.id !== target.id));
				setHud(`${hits.current}/8 · erros ${misses.current}`);
				if (hits.current >= 8) {
					done.current = true;
					success.current();
				}
			}
		}, target.id))
	})] });
}
function AbyssTrial({ onSuccess, onFail }) {
	const [decoys, setDecoys] = (0, import_react.useState)([]);
	const done = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const labels = [
			"Desistir",
			"Adiar",
			"Amanhã",
			"Fraqueza"
		];
		const id = window.setInterval(() => {
			setDecoys(Array.from({ length: 2 }, (_, index) => ({
				id: Date.now() + index,
				x: 6 + Math.random() * 58,
				y: 8 + Math.random() * 42,
				label: labels[Math.floor(Math.random() * labels.length)]
			})));
		}, 1300);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-72 border border-line bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 pt-3 text-sm text-muted",
				children: "Segure o selo. Qualquer outro comando é rendição."
			}),
			decoys.map((decoy) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute min-h-11 border border-danger px-3 text-sm text-danger",
				style: {
					left: `${decoy.x}%`,
					top: `${decoy.y}%`
				},
				onClick: () => {
					if (done.current) return;
					done.current = true;
					onFail();
				},
				children: decoy.label
			}, decoy.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-3 bottom-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldSeal, {
					seconds: 20,
					label: "Manter o selo",
					onSuccess: () => {
						if (done.current) return;
						done.current = true;
						onSuccess();
					}
				})
			})
		]
	});
}
function OathTrial({ onSuccess }) {
	const [text, setText] = (0, import_react.useState)("");
	const ready = text.trim().toLocaleUpperCase("pt-BR").replace(/\s+/g, " ") === OATH;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "O sistema pede o juramento, letra por letra."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg text-gold",
				children: OATH
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: fieldClass,
				value: text,
				onChange: (event) => setText(event.target.value),
				"aria-label": "Juramento",
				autoCapitalize: "characters"
			}),
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldSeal, {
				seconds: 12,
				label: "Selar o juramento",
				onSuccess
			}) : null
		]
	});
}
var SLOTS = [
	"arma",
	"armadura",
	"elmo",
	"luvas",
	"botas",
	"amuleto"
];
function ShopPanel() {
	const data = useSystem((s) => s.data);
	const actions = useSystem((s) => s.actions);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
				title: "Equipado",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: SLOTS.map((slot) => {
						const id = data.equipped[slot];
						const item = id ? ITEM_BY_ID[id] : void 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 border border-line bg-bg px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-muted uppercase",
									children: SLOT_LABEL[slot]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-fg",
									children: item ? item.name : "Vazio"
								}),
								item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-primary",
									children: bonusLabel(item.bonus)
								}) : null
							] }), item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								onClick: () => actions.unequip(slot),
								children: "Tirar"
							}) : null]
						}, slot);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
				title: "Inventário",
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums text-gold",
					children: [data.gold, " ouro"]
				}),
				children: [data.ownedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nada comprado ainda."
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: data.ownedItems.map((id) => {
						const item = ITEM_BY_ID[id];
						if (!item) return null;
						const on = data.equipped[item.slot] === id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-wrap items-center justify-between gap-2 border border-line bg-bg p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									SLOT_LABEL[item.slot],
									" · ",
									bonusLabel(item.bonus)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									variant: on ? "gold" : "primary",
									onClick: () => actions.equip(id),
									children: on ? "Em uso" : "Equipar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
									variant: "ghost",
									onClick: () => actions.sell(id),
									children: ["Vender ", Math.floor(item.price * .4)]
								})]
							})]
						}, id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
				title: "Loja do sistema",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: ITEMS.map((item) => {
						const owned = data.ownedItems.includes(item.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-col border border-line bg-bg p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-gold",
										children: item.price
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-muted uppercase",
									children: SLOT_LABEL[item.slot]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 text-sm text-muted",
									children: item.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-primary",
									children: bonusLabel(item.bonus)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									className: "mt-3",
									disabled: owned || data.gold < item.price,
									onClick: () => actions.buy(item.id),
									children: owned ? "Adquirido" : "Comprar"
								})
							]
						}, item.id);
					})
				})
			})
		]
	});
}
function SkillsPanel() {
	const data = useSystem((s) => s.data);
	const actions = useSystem((s) => s.actions);
	const view = derive(data);
	const unlocked = data.skills.filter((skill) => skill.unlocked).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		title: "Habilidades",
		extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm text-muted tabular-nums",
			children: [
				view.equippedSkillIds.length,
				"/",
				view.slots,
				" equipadas"
			]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-sm text-muted",
			children: [
				"Elas não vêm soltas. Cada missão tem uma afinidade — corpo, mente, vontade, percepção ou sombra — e é dali que o sistema oferece o que despertar. ",
				unlocked,
				" de ",
				SKILLS.length,
				" abertas."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: SKILLS.map((def) => {
				const progress = data.skills.find((skill) => skill.id === def.id);
				const open = Boolean(progress?.unlocked);
				const level = progress?.level ?? 1;
				const effect = open ? bonusLabel(scaleBonus(def.bonusPerLevel, level)) : "Afinidade: " + CATEGORY_LABEL[def.category];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col border border-line bg-bg p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-fg",
								children: open ? def.name : "???"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-widest text-gold uppercase",
								children: RARITY_LABEL[def.rarity]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs tracking-widest text-primary uppercase",
							children: CATEGORY_LABEL[def.category]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-sm text-muted",
							children: open ? def.description : "Conclua missões desta afinidade."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-fg",
							children: effect
						}),
						open && progress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm tabular-nums text-muted",
								children: [
									"Nível ",
									level,
									"/",
									def.maxLevel
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									label: "Proficiência",
									value: progress.proficiency,
									max: 100
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								className: "mt-3",
								variant: progress.equipped ? "gold" : "ghost",
								onClick: () => actions.toggleSkill(def.id),
								children: progress.equipped ? "Equipada" : "Equipar"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs tracking-widest text-muted uppercase",
							children: "Selada"
						})
					]
				}, def.id);
			})
		})]
	});
}
function StatusPanel({ mode }) {
	const data = useSystem((s) => s.data);
	const actions = useSystem((s) => s.actions);
	const view = derive(data);
	const [name, setName] = (0, import_react.useState)(data.profileName);
	const cost = respecCost(data.level);
	const spent = spentPoints(data.stats);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			mode === "compact" || mode === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
				title: "Status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hunter_default,
							alt: "Silhueta do caçador, rosto na sombra",
							className: "size-24 shrink-0 border border-line object-cover sm:size-28"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-display text-xl text-fg",
									children: data.profileName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm tracking-wide text-gold uppercase",
									children: view.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										view.job,
										" · ",
										view.rankLabel
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted",
									children: ["Nível ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-fg",
										children: data.level
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								label: "HP",
								value: view.hp,
								max: view.hp
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								label: "MP",
								value: view.mp,
								max: view.mp
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								label: "Fadiga",
								value: data.fatigue,
								max: 100,
								tone: data.fatigue >= 80 ? "danger" : "primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								label: "XP",
								value: data.xp,
								max: view.xpNeed,
								tone: "gold"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center font-display text-3xl tabular-nums text-primary glow-num",
						children: view.power
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs tracking-widest text-muted uppercase",
						children: "Poder de combate"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
				title: "Atributos",
				extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums text-sm text-gold",
					children: [data.statPoints, " pts"]
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: STATS_META.map((meta) => {
							const base = data.stats[meta.key];
							const total = view.totals[meta.key];
							const extra = total - base;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-14",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold tracking-wide text-primary",
											children: meta.short
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: meta.name
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex-1 tabular-nums text-lg",
										children: [total, extra > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-2 text-sm text-primary",
											children: ["+", extra]
										}) : null]
									}),
									mode === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										variant: "ghost",
										className: "min-w-11 px-0",
										disabled: data.statPoints <= 0,
										onClick: () => actions.allocate(meta.key),
										"aria-label": `Aumentar ${meta.name}`,
										children: "+"
									}) : null
								]
							}, meta.key);
						})
					}),
					mode === "full" && spent > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						variant: "ghost",
						className: "mt-4 w-full",
						onClick: () => actions.respec(),
						children: [
							"Redistribuir · ",
							cost,
							" ouro"
						]
					}) : null,
					mode === "compact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Equipamento e habilidades entram no número maior."
					}) : null
				]
			}),
			mode === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
				title: "Registro",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex flex-col gap-3 sm:flex-row",
						onSubmit: (event) => {
							event.preventDefault();
							actions.rename(name);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome do jogador",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								value: name,
								maxLength: 18,
								onChange: (event) => setName(event.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							className: "sm:self-end",
							type: "submit",
							children: "Renomear"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 flex flex-col gap-2",
						children: [data.log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "O sistema ainda não anotou nada."
						}) : null, data.log.slice(0, 8).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-line pb-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-2 tabular-nums text-muted",
								children: stamp(entry.at)
							}), entry.text]
						}, entry.id))]
					}),
					Object.values(view.bonus).some((value) => value > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: ["Bônus ativo: ", bonusLabel(view.bonus)]
					}) : null
				]
			}) : null
		]
	});
}
var ART = {
	sentinela: "/assets/sentinela-VPUaDE-k.jpg",
	coruja: "/assets/coruja-Ce4iVASQ.jpg",
	lamina: "/assets/lamina-YT5bz1Xc.jpg",
	vulto: "/assets/vulto-B-Ft-sVF.jpg"
};
function SummonsPanel() {
	const data = useSystem((s) => s.data);
	const actions = useSystem((s) => s.actions);
	const view = derive(data);
	const active = data.summons.filter((summon) => summon.active && summon.obtained).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		title: "Invocações",
		extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm tabular-nums text-muted",
			children: [
				active,
				"/",
				view.summonSlots,
				" ativas"
			]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: "Elas chegam quando o rank sobe, não quando você pede. Ativas, emprestam atributo e poder. A lealdade cresce se estiverem em campo quando uma missão fecha."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: SUMMONS.map((def) => {
				const progress = data.summons.find((summon) => summon.id === def.id);
				const obtained = Boolean(progress?.obtained);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "border border-line bg-bg",
					children: [obtained ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ART[def.id],
						alt: "",
						className: "aspect-square w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex aspect-square items-center justify-center bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl text-line",
							children: "?"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-gold uppercase",
								children: obtained ? def.title : "Sinal ausente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg text-fg",
								children: obtained ? def.name : "???"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: obtained ? def.lore : "Ainda não há resposta. Suba de rank."
							}),
							obtained && progress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-primary",
									children: [
										bonusLabel(def.bonus),
										" · poder ",
										def.power + Math.floor(progress.loyalty / 2)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
										label: "Lealdade",
										value: progress.loyalty,
										max: 100,
										tone: "gold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									className: "mt-3 w-full",
									variant: progress.active ? "gold" : "ghost",
									onClick: () => actions.toggleSummon(def.id),
									children: progress.active ? "Em campo" : "Invocar"
								})
							] }) : null
						]
					})]
				}, def.id);
			})
		})]
	});
}
var TABS = [
	{
		id: "status",
		label: "Status",
		icon: Swords
	},
	{
		id: "missoes",
		label: "Missões",
		icon: ScrollText
	},
	{
		id: "habilidades",
		label: "Habilidades",
		icon: Sparkles
	},
	{
		id: "loja",
		label: "Loja",
		icon: Store
	},
	{
		id: "rank",
		label: "Rank",
		icon: Shield
	},
	{
		id: "invocacoes",
		label: "Invocações",
		icon: Crown
	},
	{
		id: "diario",
		label: "Diário",
		icon: CalendarDays
	}
];
function SystemApp() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const initialized = useSystem((s) => s.data.initialized);
	(0, import_react.useEffect)(() => {
		const finish = () => setReady(true);
		const unsub = useSystem.persist.onFinishHydration(finish);
		if (useSystem.persist.hasHydrated()) finish();
		return () => {
			unsub();
		};
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, {});
	if (!initialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Awaken, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
function Boot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl tracking-widest text-primary",
			children: "Sincronizando"
		})
	});
}
function Awaken() {
	const actions = useSystem((s) => s.actions);
	const [name, setName] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-6 px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hunter_default,
				alt: "",
				className: "mx-auto size-40 border border-line object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-primary uppercase",
					children: "Sistema"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl text-fg",
					children: "Você foi escolhido."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg text-muted",
					children: "Daqui em diante há missão diária, penalidade e rank. O nome que você der é o que o registro vai usar."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: (event) => {
					event.preventDefault();
					actions.awaken(name);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm tracking-wide text-muted uppercase",
						htmlFor: "hunter-name",
						children: "Nome do jogador"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "hunter-name",
						className: fieldClass,
						value: name,
						maxLength: 18,
						autoComplete: "nickname",
						onChange: (event) => setName(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						disabled: name.trim().length < 2,
						children: "Confirmar existência"
					})
				]
			})
		]
	});
}
function Shell() {
	const data = useSystem((s) => s.data);
	const actions = useSystem((s) => s.actions);
	const toasts = useSystem((s) => s.toasts);
	const fanfare = useSystem((s) => s.fanfare);
	const view = derive(data);
	const [tab, setTab] = (0, import_react.useState)("missoes");
	const [remain, setRemain] = (0, import_react.useState)(() => formatRemain(msUntilMidnight()));
	(0, import_react.useEffect)(() => {
		actions.ensureToday();
		const id = window.setInterval(() => {
			actions.ensureToday();
			setRemain(formatRemain(msUntilMidnight()));
		}, 15e3);
		return () => window.clearInterval(id);
	}, [actions]);
	(0, import_react.useEffect)(() => {
		if (!toasts.length) return;
		const id = window.setTimeout(() => actions.dismissToast(toasts[0].id), 3400);
		return () => window.clearTimeout(id);
	}, [toasts, actions]);
	const obrigLeft = data.daily.filter((mission) => mission.obrigatoria && mission.completedOn !== data.lastSeenDate).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg tracking-widest text-primary",
						children: "Sistema"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							data.profileName,
							" · ",
							view.rankLabel,
							" · Nv ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-fg",
								children: data.level
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-gold",
							children: [data.gold, " ouro"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								"Seq. ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-fg",
									children: data.streak
								}),
								" · ciclo ",
								remain
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2",
					children: TABS.map((item) => {
						const Icon = item.icon;
						const on = tab === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTab(item.id),
							className: cn("inline-flex min-h-11 shrink-0 items-center gap-2 px-3 text-sm font-semibold tracking-wide", on ? "border border-primary text-primary" : "border border-transparent text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}, item.id);
					})
				})]
			}),
			data.penalty.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenaltyOverlay, {}) : obrigLeft > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-6xl px-4 pt-3 text-sm text-danger",
				children: [obrigLeft, " obrigação(ões) ainda aberta(s) neste ciclo."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-6xl px-4 pt-3 text-sm text-primary",
				children: "Obrigações do ciclo cumpridas."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4", tab === "status" ? "" : "lg:flex-row"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: cn("lg:sticky lg:top-28 lg:w-80 lg:shrink-0 lg:self-start", tab === "status" ? "hidden" : "hidden lg:block"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPanel, { mode: "compact" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "min-w-0 flex-1",
					children: [
						tab === "status" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPanel, { mode: "full" }) : null,
						tab === "missoes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionsPanel, {}) : null,
						tab === "habilidades" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsPanel, {}) : null,
						tab === "loja" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopPanel, {}) : null,
						tab === "rank" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RanksPanel, {}) : null,
						tab === "invocacoes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummonsPanel, {}) : null,
						tab === "diario" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalPanel, {}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 top-24 z-50 flex flex-col items-center gap-2 px-4",
				children: toasts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => actions.dismissToast(item.id),
					className: cn("pointer-events-auto w-full max-w-md border px-4 py-3 text-left text-sm", item.tone === "bad" ? "border-danger bg-bg text-danger" : item.tone === "good" ? "border-primary bg-bg text-primary" : "border-line bg-bg text-fg"),
					children: item.text
				}, item.id))
			}),
			fanfare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fanfare, {}) : null
		]
	});
}
function PenaltyOverlay() {
	const data = useSystem((s) => s.data);
	const actions = useSystem((s) => s.actions);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/95 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "sys-frame w-full max-w-md p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-danger uppercase",
					children: "Zona de penalidade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl text-fg",
					children: "Você falhou."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-muted",
					children: [
						"A missão diária obrigatória não foi cumprida. Ouro foi tomado. A fadiga está no limite. Enquanto isto durar, seu título é O Fraco. Pilha ",
						data.penalty.stacks,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-fg",
					children: "Segure o selo para sair. Não há atalho."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldInline, { onDone: () => actions.clearPenalty() })
				})
			]
		})
	});
}
function HoldInline({ onDone }) {
	const [pct, setPct] = (0, import_react.useState)(0);
	const holding = useRefHold();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "relative min-h-16 w-full touch-none overflow-hidden border border-danger bg-bg font-semibold tracking-widest text-fg",
		onPointerDown: (event) => {
			event.currentTarget.setPointerCapture(event.pointerId);
			holding.start(setPct, onDone, 16);
		},
		onPointerUp: () => holding.stop(setPct),
		onPointerCancel: () => holding.stop(setPct),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute inset-y-0 left-0 bg-danger/40",
			style: { width: `${pct * 100}%` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative",
			children: "Suportar"
		})]
	});
}
function useRefHold() {
	return (0, import_react.useState)(() => {
		let frame = 0;
		let holding = false;
		let done = false;
		return {
			start(setPct, onDone, seconds) {
				if (done) return;
				holding = true;
				const started = performance.now();
				const loop = (time) => {
					if (!holding || done) return;
					const ratio = Math.min(1, (time - started) / (seconds * 1e3));
					setPct(ratio);
					if (ratio >= 1) {
						done = true;
						holding = false;
						onDone();
						return;
					}
					frame = requestAnimationFrame(loop);
				};
				frame = requestAnimationFrame(loop);
			},
			stop(setPct) {
				holding = false;
				cancelAnimationFrame(frame);
				if (!done) setPct(0);
			}
		};
	})[0];
}
function Fanfare() {
	const fanfare = useSystem((s) => s.fanfare);
	const actions = useSystem((s) => s.actions);
	if (!fanfare) return null;
	const levelUp = fanfare.kind === "level";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-center justify-center bg-bg/80 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "sys-frame w-full max-w-md p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-primary uppercase",
					children: levelUp ? "Nível aumentado" : "Rank conquistado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-5xl text-primary glow-num",
					children: levelUp ? fanfare.level : fanfare.rank === "M" ? "Monarca" : `Rank ${fanfare.rank}`
				}),
				!levelUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-gold",
					children: fanfare.title
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: levelUp ? "Pontos de atributo foram concedidos." : "O sistema atualizou o seu lugar."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-5 w-full",
					onClick: () => actions.dismissFanfare(),
					children: "Continuar"
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemApp, {});
}
//#endregion
export { Home as component };
