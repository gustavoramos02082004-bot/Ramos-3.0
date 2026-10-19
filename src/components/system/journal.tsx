import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { derive } from "@/lib/system/derive";
import { dayGap, shiftDate, todayKey } from "@/lib/system/formulas";
import { useSystem } from "@/lib/system/store";
import type { DayLog } from "@/lib/system/types";
import { Btn, Field, Frame, fieldClass } from "./ui";

export function JournalPanel() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  const view = derive(data);
  const today = data.lastSeenDate ?? todayKey();
  const perfect = Object.values(data.days).filter((day) => day.perfect).length;
  const chart = Array.from({ length: 14 }, (_, index) => {
    const key = shiftDate(today, index - 13);
    const day = data.days[key];
    return { date: key.slice(5), xp: day?.xp ?? 0 };
  });

  return (
    <div className="flex flex-col gap-4">
      <Frame title="Disciplina">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat k="Sequência" v={data.streak} />
          <Stat k="Melhor" v={data.bestStreak} />
          <Stat k="Dias perfeitos" v={perfect} />
          <Stat k="Missões" v={data.totalMissions} />
          <Stat k="XP total" v={data.totalXp} />
          <Stat k="Poder" v={view.power} />
          <Stat k="Nível" v={data.level} />
          <Stat k="Penalidades" v={data.penalty.stacks} />
        </dl>
        <p className="mt-4 text-sm text-muted">O registro fica neste aparelho. A sequência sobe quando todas as obrigações do ciclo fecham.</p>
      </Frame>

      <Frame title="Últimos ciclos">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart}>
              <XAxis dataKey="date" stroke="var(--color-muted)" tick={{ fill: "var(--color-muted)", fontSize: 12 }} />
              <YAxis stroke="var(--color-muted)" tick={{ fill: "var(--color-muted)", fontSize: 12 }} width={36} />
              <Tooltip
                contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", color: "var(--color-fg)" }}
              />
              <Area dataKey="xp" name="XP" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Frame>

      <Frame title="Calendário">
        <Calendar days={data.days} today={today} />
      </Frame>

      <Wipe />
    </div>
  );
}

function Stat({ k, v }: { k: string; v: number }) {
  return (
    <div className="border border-line bg-bg px-3 py-2">
      <dt className="text-xs tracking-widest text-muted uppercase">{k}</dt>
      <dd className="font-display text-2xl tabular-nums text-fg">{v}</dd>
    </div>
  );
}

function Calendar({ days, today }: { days: Record<string, DayLog>; today: string }) {
  const [y, m, d] = today.split("-").map(Number);
  const weekday = new Date(y, m - 1, d).getDay();
  const mondayOffset = (weekday + 6) % 7;
  const start = shiftDate(today, -(mondayOffset + 77));
  const cells: string[] = [];
  for (let i = 0; ; i++) {
    const key = shiftDate(start, i);
    cells.push(key);
    if (key === today || i > 100) break;
  }
  while (cells.length % 7 !== 0) cells.push("");

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs tracking-wide text-muted">
        {["S", "T", "Q", "Q", "S", "S", "D"].map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((key, index) => {
          if (!key) return <span key={`pad-${index}`} />;
          const day = days[key];
          const future = dayGap(today, key) > 0;
          const tone = day?.penalty
            ? "bg-danger"
            : day?.perfect
              ? "bg-primary"
              : day && day.missions > 0
                ? "bg-primary/40"
                : "bg-surface";
          return (
            <span
              key={key}
              title={`${key}${day ? ` · ${day.xp} XP` : ""}`}
              className={`aspect-square border ${key === today ? "border-gold" : "border-line"} ${future ? "opacity-30" : ""} ${tone}`}
            />
          );
        })}
      </div>
      <p className="mt-3 text-sm text-muted">Ciano: ciclo perfeito. Vermelho: penalidade. Borda dourada: hoje.</p>
    </div>
  );
}

function Wipe() {
  const actions = useSystem((s) => s.actions);
  const [phrase, setPhrase] = useState("");
  return (
    <Frame title="Apagar registro">
      <p className="mb-3 text-sm text-muted">Isto zera nível, ouro, missões e ranks neste aparelho. Não há volta.</p>
      <Field label="Digite APAGAR">
        <input className={fieldClass} value={phrase} onChange={(event) => setPhrase(event.target.value)} />
      </Field>
      <Btn
        variant="danger"
        className="mt-3"
        disabled={phrase.trim().toUpperCase() !== "APAGAR"}
        onClick={() => actions.wipe()}
      >
        Apagar tudo
      </Btn>
    </Frame>
  );
}
