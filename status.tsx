import { useState } from "react";
import hunter from "@/assets/hunter.jpg";
import { derive } from "@/lib/system/derive";
import { bonusLabel, respecCost, spentPoints, STATS_META, stamp } from "@/lib/system/formulas";
import { useSystem } from "@/lib/system/store";
import type { Stats } from "@/lib/system/types";
import { Btn, Field, Frame, Meter, fieldClass } from "./ui";

export function StatusPanel({ mode }: { mode: "compact" | "full" }) {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  const view = derive(data);
  const [name, setName] = useState(data.profileName);
  const cost = respecCost(data.level);
  const spent = spentPoints(data.stats);

  return (
    <div className="flex flex-col gap-4">
      {mode === "compact" || mode === "full" ? (
        <Frame title="Status">
          <div className="flex gap-4">
            <img
              src={hunter}
              alt="Silhueta do caçador, rosto na sombra"
              className="size-24 shrink-0 border border-line object-cover sm:size-28"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-xl text-fg">{data.profileName}</p>
              <p className="text-sm tracking-wide text-gold uppercase">{view.title}</p>
              <p className="text-sm text-muted">
                {view.job} · {view.rankLabel}
              </p>
              <p className="mt-2 text-sm text-muted">
                Nível <span className="tabular-nums text-fg">{data.level}</span>
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Meter label="HP" value={view.hp} max={view.hp} />
            <Meter label="MP" value={view.mp} max={view.mp} />
            <Meter
              label="Fadiga"
              value={data.fatigue}
              max={100}
              tone={data.fatigue >= 80 ? "danger" : "primary"}
            />
            <Meter label="XP" value={data.xp} max={view.xpNeed} tone="gold" />
          </div>
          <p className="mt-4 text-center font-display text-3xl tabular-nums text-primary glow-num">{view.power}</p>
          <p className="text-center text-xs tracking-widest text-muted uppercase">Poder de combate</p>
        </Frame>
      ) : null}

      <Frame title="Atributos" extra={<span className="tabular-nums text-sm text-gold">{data.statPoints} pts</span>}>
        <ul className="flex flex-col gap-2">
          {STATS_META.map((meta) => {
            const base = data.stats[meta.key];
            const total = view.totals[meta.key];
            const extra = total - base;
            return (
              <li key={meta.key} className="flex items-center gap-3">
                <div className="w-14">
                  <p className="text-sm font-semibold tracking-wide text-primary">{meta.short}</p>
                  <p className="text-xs text-muted">{meta.name}</p>
                </div>
                <p className="flex-1 tabular-nums text-lg">
                  {total}
                  {extra > 0 ? <span className="ml-2 text-sm text-primary">+{extra}</span> : null}
                </p>
                {mode === "full" ? (
                  <Btn
                    variant="ghost"
                    className="min-w-11 px-0"
                    disabled={data.statPoints <= 0}
                    onClick={() => actions.allocate(meta.key)}
                    aria-label={`Aumentar ${meta.name}`}
                  >
                    +
                  </Btn>
                ) : null}
              </li>
            );
          })}
        </ul>
        {mode === "full" && spent > 0 ? (
          <Btn variant="ghost" className="mt-4 w-full" onClick={() => actions.respec()}>
            Redistribuir · {cost} ouro
          </Btn>
        ) : null}
        {mode === "compact" ? (
          <p className="mt-3 text-sm text-muted">Equipamento e habilidades entram no número maior.</p>
        ) : null}
      </Frame>

      {mode === "full" ? (
        <Frame title="Registro">
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              actions.rename(name);
            }}
          >
            <Field label="Nome do jogador">
              <input className={fieldClass} value={name} maxLength={18} onChange={(event) => setName(event.target.value)} />
            </Field>
            <Btn className="sm:self-end" type="submit">
              Renomear
            </Btn>
          </form>
          <ul className="mt-4 flex flex-col gap-2">
            {data.log.length === 0 ? <li className="text-sm text-muted">O sistema ainda não anotou nada.</li> : null}
            {data.log.slice(0, 8).map((entry) => (
              <li key={entry.id} className="border-b border-line pb-2 text-sm">
                <span className="mr-2 tabular-nums text-muted">{stamp(entry.at)}</span>
                {entry.text}
              </li>
            ))}
          </ul>
          {Object.values(view.bonus).some((value) => value > 0) ? (
            <p className="mt-3 text-sm text-muted">Bônus ativo: {bonusLabel(view.bonus as Stats)}</p>
          ) : null}
        </Frame>
      ) : null}
    </div>
  );
}
