import { useRef, useState } from "react";
import { DUNGEON_FATIGUE, DUNGEONS, RANK_BY_ID, SUMMON_BY_ID, type DungeonDef } from "@/lib/system/catalog";
import { derive } from "@/lib/system/derive";
import { useSystem } from "@/lib/system/store";
import { cn } from "@/lib/cn";
import { SUMMON_ART } from "./summon-art";
import { Btn, Frame, Meter } from "./ui";

const SKILL_MP = 25;

function dungeonLabel(id: string) {
  return id === "M" ? "Dungeon do Monarca" : `Dungeon Rank ${id}`;
}

export function DungeonsPanel() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  const view = derive(data);
  const [running, setRunning] = useState<DungeonDef | null>(null);

  if (running) {
    return (
      <Raid
        key={running.id}
        dungeon={running}
        onExit={(won) => {
          actions.finishDungeon(running.id, won);
          setRunning(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Frame title="Dungeons">
        <p className="text-sm text-muted">
          Cada rank conquistado abre um portal. Derrote o boss da dungeon para extrair a sombra dele: é a única forma de
          obter uma invocação. Entrar custa {DUNGEON_FATIGUE} de fadiga.
        </p>
      </Frame>
      {DUNGEONS.map((dungeon) => {
        const open = data.ranksCleared.includes(dungeon.id);
        const cleared = data.dungeonsCleared.includes(dungeon.id);
        const summon = SUMMON_BY_ID[dungeon.summonId];
        const owned = data.summons.some((s) => s.id === dungeon.summonId && s.obtained);
        const tooTired = data.fatigue + DUNGEON_FATIGUE > 100;
        const weak = view.power < dungeon.power;
        return (
          <Frame
            key={dungeon.id}
            title={dungeonLabel(dungeon.id)}
            extra={
              <span className={cn("text-xs tracking-widest uppercase", cleared ? "text-primary" : open ? "text-gold" : "text-muted")}>
                {cleared ? "Concluída" : open ? "Portal aberto" : "Selada"}
              </span>
            }
          >
            <div className="flex gap-3">
              <div className="size-20 shrink-0 overflow-hidden border border-line bg-surface-2">
                {owned ? (
                  <img src={SUMMON_ART[dungeon.summonId]} alt={summon?.name ?? ""} className="size-full object-cover" />
                ) : (
                  <div className="flex size-full items-center justify-center font-display text-3xl text-line">?</div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg text-fg">{dungeon.name}</h3>
                <p className="text-sm text-muted">{dungeon.blurb}</p>
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-muted">Boss</dt>
                <dd className="text-fg">{open || cleared ? dungeon.boss.name : "???"}</dd>
              </div>
              <div>
                <dt className="text-muted">Poder recomendado</dt>
                <dd className={cn("tabular-nums", weak ? "text-danger" : "text-fg")}>
                  {dungeon.power} <span className="text-muted">(você {view.power})</span>
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted">Recompensa</dt>
                <dd className="text-fg">
                  {cleared
                    ? `${Math.round(dungeon.gold * 0.4)} ouro · ${Math.round(dungeon.xp * 0.4)} XP (repetição)`
                    : `${dungeon.gold} ouro · ${dungeon.xp} XP · invocação do boss`}
                </dd>
              </div>
            </dl>
            {open ? (
              <Btn
                className="mt-3 w-full"
                variant={cleared ? "ghost" : "primary"}
                disabled={tooTired || data.penalty.active}
                onClick={() => {
                  if (actions.enterDungeon(dungeon.id)) setRunning(dungeon);
                }}
              >
                {tooTired ? "Fadiga alta demais" : cleared ? "Repetir a incursão" : "Entrar no portal"}
              </Btn>
            ) : (
              <p className="mt-3 text-xs tracking-widest text-muted uppercase">
                Conquiste o {RANK_BY_ID[dungeon.id].name} para abrir
              </p>
            )}
          </Frame>
        );
      })}
    </div>
  );
}

type Phase = "fight" | "extract" | "won" | "lost";

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function Raid({ dungeon, onExit }: { dungeon: DungeonDef; onExit: (won: boolean) => void }) {
  const data = useSystem((s) => s.data);
  const view = useRef(derive(data)).current;
  const owned = data.summons.some((s) => s.id === dungeon.summonId && s.obtained);
  const army = data.summons
    .filter((s) => s.active && s.obtained)
    .slice(0, view.summonSlots)
    .map((s) => SUMMON_BY_ID[s.id])
    .filter(Boolean);
  const enemies = [...dungeon.waves, dungeon.boss];

  const [wave, setWave] = useState(0);
  const [hp, setHp] = useState(view.hp);
  const [mp, setMp] = useState(view.mp);
  const [foeHp, setFoeHp] = useState(enemies[0].hp);
  const [turn, setTurn] = useState(1);
  const [phase, setPhase] = useState<Phase>("fight");
  const [log, setLog] = useState<string[]>([`Você atravessou o portal de ${dungeon.name}.`]);

  const foe = enemies[wave];
  const isBoss = wave === enemies.length - 1;
  const charging = isBoss && turn % 3 === 0;
  const crit = Math.min(0.35, view.totals.per / 200);
  const dodge = Math.min(0.25, view.totals.agi / 300);

  function act(kind: "attack" | "skill" | "defend") {
    if (phase !== "fight") return;
    if (kind === "skill" && mp < SKILL_MP) return;
    const lines: string[] = [];
    let nextMp = mp;
    let dealt = 0;

    if (kind === "defend") {
      nextMp = Math.min(view.mp, mp + 15);
      lines.push("Você assume guarda e recupera mana.");
    } else {
      const mult = kind === "skill" ? 2.2 : 1;
      if (kind === "skill") nextMp -= SKILL_MP;
      let dmg = view.power * 0.28 * mult * rand(0.85, 1.15);
      const isCrit = Math.random() < crit;
      if (isCrit) dmg *= 1.6;
      dealt = Math.max(8, Math.round(dmg));
      lines.push(`${kind === "skill" ? "Golpe Sombrio" : "Ataque"}${isCrit ? " crítico" : ""}: ${dealt} de dano.`);
    }

    for (const summon of army) {
      const hit = Math.round(summon.power * 0.3 * rand(0.8, 1.2));
      dealt += hit;
      lines.push(`${summon.name} golpeia: ${hit}.`);
    }

    const remaining = foeHp - dealt;
    if (remaining <= 0) {
      lines.push(`${foe.name} caiu.`);
      if (isBoss) {
        setFoeHp(0);
        setMp(nextMp);
        setPhase(owned ? "won" : "extract");
        if (!owned) lines.push("O sistema detecta uma sombra extraível.");
      } else {
        const nextWave = wave + 1;
        setWave(nextWave);
        setFoeHp(enemies[nextWave].hp);
        setHp((value) => Math.min(view.hp, Math.round(value + view.hp * 0.2)));
        setMp(Math.min(view.mp, nextMp + 20));
        setTurn(1);
        lines.push(nextWave === enemies.length - 1 ? `O boss desperta: ${enemies[nextWave].name}.` : `Nova onda: ${enemies[nextWave].name}.`);
      }
      setLog((prev) => [...lines.reverse(), ...prev].slice(0, 8));
      return;
    }

    let nextHp = hp;
    if (Math.random() < dodge) {
      lines.push(`Você esquiva de ${foe.name}.`);
    } else {
      let incoming = foe.atk * (charging ? 1.8 : 1) * rand(0.8, 1.2) - view.totals.vit * 0.3;
      if (kind === "defend") incoming *= 0.5;
      const taken = Math.max(1, Math.round(incoming));
      nextHp -= taken;
      lines.push(`${foe.name}${charging ? " desfere um golpe devastador" : " ataca"}: −${taken} HP.`);
    }

    setFoeHp(remaining);
    setMp(nextMp);
    setHp(Math.max(0, nextHp));
    setTurn((value) => value + 1);
    if (nextHp <= 0) {
      setPhase("lost");
      lines.push("Você caiu. O portal te expulsa.");
    }
    setLog((prev) => [...lines.reverse(), ...prev].slice(0, 8));
  }

  const summon = SUMMON_BY_ID[dungeon.summonId];

  return (
    <Frame
      title={dungeonLabel(dungeon.id)}
      extra={
        <span className="text-xs tracking-widest text-gold uppercase">
          {isBoss ? "Boss" : `Onda ${wave + 1}/${dungeon.waves.length}`}
        </span>
      }
    >
      <h2 className="font-display text-2xl text-fg">{dungeon.name}</h2>

      <div className={cn("mt-4 border p-3", isBoss ? "border-danger" : "border-line")}>
        <p className="text-xs tracking-widest text-muted uppercase">{isBoss ? "Boss da dungeon" : "Inimigo"}</p>
        <p className={cn("font-display text-xl", isBoss ? "text-danger" : "text-fg")}>{foe.name}</p>
        <div className="mt-2">
          <Meter label="HP" value={Math.max(0, foeHp)} max={foe.hp} tone="danger" />
        </div>
        {phase === "fight" && isBoss && (turn + 1) % 3 === 0 ? (
          <p className="mt-2 text-sm text-gold">O boss está concentrando poder. Considere defender.</p>
        ) : null}
        {phase === "fight" && charging ? <p className="mt-2 text-sm text-danger">Golpe devastador iminente.</p> : null}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Meter label="Seu HP" value={hp} max={view.hp} tone="primary" />
        <Meter label="Mana" value={mp} max={view.mp} tone="gold" />
      </div>
      {army.length ? (
        <p className="mt-2 text-sm text-muted">Em campo: {army.map((s) => s.name).join(", ")}</p>
      ) : (
        <p className="mt-2 text-sm text-muted">Nenhuma invocação em campo.</p>
      )}

      {phase === "fight" ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Btn onClick={() => act("attack")}>Atacar</Btn>
          <Btn variant="gold" disabled={mp < SKILL_MP} onClick={() => act("skill")}>
            Golpe Sombrio ({SKILL_MP} MP)
          </Btn>
          <Btn variant="ghost" onClick={() => act("defend")}>
            Defender
          </Btn>
          <Btn variant="danger" onClick={() => onExit(false)}>
            Fugir
          </Btn>
        </div>
      ) : null}

      {phase === "extract" && summon ? (
        <div className="mt-4 border border-primary p-4 text-center">
          <p className="text-xs tracking-widest text-primary uppercase">Extração de sombra</p>
          <p className="mt-2 text-muted">O corpo de {dungeon.boss.name} ainda guarda vontade. Dê a ordem.</p>
          <div className="mt-4">
            <AriseHold onDone={() => onExit(true)} />
          </div>
        </div>
      ) : null}

      {phase === "won" ? (
        <div className="mt-4 border border-primary p-4 text-center">
          <p className="font-display text-2xl text-primary">Dungeon concluída</p>
          <Btn className="mt-3 w-full" onClick={() => onExit(true)}>
            Sair do portal
          </Btn>
        </div>
      ) : null}

      {phase === "lost" ? (
        <div className="mt-4 border border-danger p-4 text-center">
          <p className="font-display text-2xl text-danger">Derrota</p>
          <p className="mt-1 text-sm text-muted">Fique mais forte e tente de novo.</p>
          <Btn variant="danger" className="mt-3 w-full" onClick={() => onExit(false)}>
            Sair
          </Btn>
        </div>
      ) : null}

      <ol className="mt-4 flex flex-col gap-1 border-t border-line pt-3 text-sm" aria-live="polite">
        {log.map((line, index) => (
          <li key={`${index}-${line}`} className={index === 0 ? "text-fg" : "text-muted"}>
            {line}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function AriseHold({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const holding = useRef(false);
  const done = useRef(false);
  const frame = useRef(0);
  const start = useRef(0);

  const loop = (time: number) => {
    if (!holding.current || done.current) return;
    const ratio = Math.min(1, (time - start.current) / 2500);
    setPct(ratio);
    if (ratio >= 1) {
      done.current = true;
      onDone();
      return;
    }
    frame.current = requestAnimationFrame(loop);
  };

  const stop = () => {
    holding.current = false;
    cancelAnimationFrame(frame.current);
    if (!done.current) setPct(0);
  };

  return (
    <button
      type="button"
      className="relative min-h-16 w-full touch-none overflow-hidden border border-primary bg-bg font-display text-xl tracking-widest text-primary"
      onPointerDown={(event) => {
        if (done.current) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        holding.current = true;
        start.current = performance.now();
        frame.current = requestAnimationFrame(loop);
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      <span className="absolute inset-y-0 left-0 bg-primary/30" style={{ width: `${pct * 100}%` }} />
      <span className="relative">Levante-se</span>
    </button>
  );
}
