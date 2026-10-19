import { Eye, Flame, Moon, Mountain, Shield, Swords, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OATH, RANKS } from "@/lib/system/catalog";
import { derive } from "@/lib/system/derive";
import { useSystem } from "@/lib/system/store";
import type { RankId } from "@/lib/system/types";
import { Btn, Frame, fieldClass } from "./ui";

const RUNES: LucideIcon[] = [Swords, Shield, Eye, Flame, Moon, Mountain];

export function RanksPanel() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  const view = derive(data);
  const cleared = new Set(data.ranksCleared);
  const next = RANKS.find((rank) => !cleared.has(rank.id)) ?? null;
  const [attempt, setAttempt] = useState(0);
  const [note, setNote] = useState("");

  const unlocked = data.skills.filter((skill) => skill.unlocked).length;
  const obtained = data.summons.filter((summon) => summon.obtained).length;

  return (
    <div className="flex flex-col gap-4">
      <Frame title="Rank">
        <p className="font-display text-4xl text-gold">{view.rankLabel}</p>
        <p className="mt-1 text-sm text-muted">
          De E até S, e além: Monarca. Cada prova só abre quando o corpo, a sequência e o poder acompanham.
        </p>
      </Frame>
      {RANKS.map((rank, index) => {
        const done = cleared.has(rank.id);
        const isNext = next?.id === rank.id;
        const reasons: string[] = [];
        if (index > 0 && !cleared.has(RANKS[index - 1].id)) reasons.push("Rank anterior em aberto.");
        if (data.level < rank.level) reasons.push(`Nível ${rank.level} (atual ${data.level}).`);
        if (data.streak < rank.streak) reasons.push(`Sequência de ${rank.streak} dias (atual ${data.streak}).`);
        if (view.power < rank.power) reasons.push(`Poder ${rank.power} (atual ${view.power}).`);
        if (data.totalMissions < rank.missions) reasons.push(`${rank.missions} missões (atual ${data.totalMissions}).`);
        if (unlocked < rank.skills) reasons.push(`${rank.skills} habilidades (atual ${unlocked}).`);
        if (obtained < rank.summons) reasons.push(`${rank.summons} invocações (atual ${obtained}).`);
        const ready = reasons.length === 0 && isNext && !data.penalty.active;
        return (
          <Frame
            key={rank.id}
            title={rank.name}
            extra={<span className="text-xs tracking-widest text-gold uppercase">{done ? "Conquistado" : rank.title}</span>}
          >
            <p className="text-sm text-muted">{rank.blurb}</p>
            <p className="mt-2 text-sm text-fg">
              Recompensa: {rank.gold} ouro · {rank.points} pontos
              {rank.summonId ? " · uma invocação" : ""}
              {rank.skillId ? " · uma habilidade" : ""}
            </p>
            {done ? null : isNext ? (
              <div className="mt-3">
                {reasons.length ? (
                  <ul className="flex flex-col gap-1 text-sm text-muted">
                    {reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-2">
                    {note ? <p className="mb-2 text-sm text-danger">{note}</p> : null}
                    <Trial
                      key={`${rank.id}-${attempt}`}
                      rank={rank.id}
                      kind={rank.trial}
                      disabled={!ready}
                      onSuccess={() => {
                        setNote("");
                        actions.passRank(rank.id);
                      }}
                      onFail={() => {
                        setNote("A prova falhou. O rank continua onde estava.");
                        setAttempt((value) => value + 1);
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-3 text-xs tracking-widest text-muted uppercase">Selado</p>
            )}
          </Frame>
        );
      })}
    </div>
  );
}

function Trial({
  rank,
  kind,
  disabled,
  onSuccess,
  onFail,
}: {
  rank: RankId;
  kind: (typeof RANKS)[number]["trial"];
  disabled: boolean;
  onSuccess: () => void;
  onFail: () => void;
}) {
  if (disabled) return null;
  if (kind === "hold") return <HoldSeal seconds={12} label="Segurar o selo" onSuccess={onSuccess} />;
  if (kind === "memory") return <MemoryTrial length={rank === "A" ? 5 : 4} onSuccess={onSuccess} onFail={onFail} />;
  if (kind === "pulse") return <PulseTrial onSuccess={onSuccess} onFail={onFail} />;
  if (kind === "precision") return <PrecisionTrial onSuccess={onSuccess} onFail={onFail} />;
  if (kind === "abyss") return <AbyssTrial onSuccess={onSuccess} onFail={onFail} />;
  return <OathTrial onSuccess={onSuccess} />;
}

function HoldSeal({ seconds, label, onSuccess }: { seconds: number; label: string; onSuccess: () => void }) {
  const [pct, setPct] = useState(0);
  const holding = useRef(false);
  const start = useRef(0);
  const frame = useRef(0);
  const done = useRef(false);

  const stop = () => {
    holding.current = false;
    cancelAnimationFrame(frame.current);
    if (!done.current) setPct(0);
  };

  const loop = (time: number) => {
    if (!holding.current || done.current) return;
    const ratio = Math.min(1, (time - start.current) / (seconds * 1000));
    setPct(ratio);
    if (ratio >= 1) {
      done.current = true;
      holding.current = false;
      onSuccess();
      return;
    }
    frame.current = requestAnimationFrame(loop);
  };

  return (
    <button
      type="button"
      className="relative min-h-16 w-full touch-none overflow-hidden border border-primary bg-bg font-semibold tracking-widest text-fg"
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
      <span className="relative">{label}</span>
    </button>
  );
}

function MemoryTrial({ length, onSuccess, onFail }: { length: number; onSuccess: () => void; onFail: () => void }) {
  const [phase, setPhase] = useState<"show" | "input">("show");
  const [sequence, setSequence] = useState<number[]>([]);
  const [cursor, setCursor] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const seq = Array.from({ length }, () => Math.floor(Math.random() * RUNES.length));
    setSequence(seq);
    let cancelled = false;
    let index = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) fn();
        }, ms),
      );
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

  return (
    <div>
      <p className="mb-3 text-sm text-muted">{phase === "show" ? "Observe a sequência." : "Repita a sequência."}</p>
      <div className="grid grid-cols-3 gap-2">
        {RUNES.map((Icon, index) => {
          const hot = lit === index;
          return (
            <button
              key={index}
              type="button"
              disabled={phase !== "input"}
              className={`flex min-h-14 items-center justify-center border ${hot ? "border-primary bg-primary text-bg" : "border-line bg-bg text-fg"}`}
              onClick={() => {
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
              }}
              aria-label={`Runa ${index + 1}`}
            >
              <Icon className="size-6" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PulseTrial({ onSuccess, onFail }: { onSuccess: () => void; onFail: () => void }) {
  const pos = useRef(0);
  const dir = useRef(1);
  const speed = useRef(0.42);
  const hits = useRef(0);
  const misses = useRef(0);
  const done = useRef(false);
  const [shown, setShown] = useState(0);
  const [hud, setHud] = useState("0/8");

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const loop = (time: number) => {
      const dt = Math.min(0.05, (time - last) / 1000);
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

  return (
    <div>
      <div className="relative h-12 border border-line bg-bg">
        <div className="absolute inset-y-0 bg-primary/25" style={{ left: "40%", width: "20%" }} />
        <div className="absolute inset-y-0 w-1 bg-gold" style={{ left: `${shown * 100}%` }} />
      </div>
      <p className="mt-2 text-sm tabular-nums text-muted">Acertos {hud}. Toque quando a marca cruzar a faixa.</p>
      <Btn
        className="mt-3 w-full"
        onClick={() => {
          if (done.current) return;
          const ok = pos.current >= 0.4 && pos.current <= 0.6;
          if (ok) {
            hits.current += 1;
            speed.current += 0.05;
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
        }}
      >
        Agora
      </Btn>
    </div>
  );
}

function PrecisionTrial({ onSuccess, onFail }: { onSuccess: () => void; onFail: () => void }) {
  const hits = useRef(0);
  const misses = useRef(0);
  const done = useRef(false);
  const serial = useRef(1);
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; born: number }[]>([]);
  const [hud, setHud] = useState("0/8");
  const fail = useRef(onFail);
  const success = useRef(onSuccess);
  fail.current = onFail;
  success.current = onSuccess;

  useEffect(() => {
    const spawn = window.setInterval(() => {
      if (done.current) return;
      setTargets((curr) => {
        if (curr.length >= 2) return curr;
        return [
          ...curr,
          { id: serial.current++, x: 16 + Math.random() * 68, y: 18 + Math.random() * 62, born: performance.now() },
        ];
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

  return (
    <div>
      <p className="mb-2 text-sm tabular-nums text-muted">Selos {hud}. Três erros encerram a prova.</p>
      <div className="relative h-64 border border-line bg-bg">
        {targets.map((target) => (
          <button
            key={target.id}
            type="button"
            className="absolute size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-primary/20"
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            aria-label="Selo"
            onClick={() => {
              if (done.current) return;
              hits.current += 1;
              setTargets((curr) => curr.filter((item) => item.id !== target.id));
              setHud(`${hits.current}/8 · erros ${misses.current}`);
              if (hits.current >= 8) {
                done.current = true;
                success.current();
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AbyssTrial({ onSuccess, onFail }: { onSuccess: () => void; onFail: () => void }) {
  const [decoys, setDecoys] = useState<{ id: number; x: number; y: number; label: string }[]>([]);
  const done = useRef(false);

  useEffect(() => {
    const labels = ["Desistir", "Adiar", "Amanhã", "Fraqueza"];
    const id = window.setInterval(() => {
      setDecoys(
        Array.from({ length: 2 }, (_, index) => ({
          id: Date.now() + index,
          x: 6 + Math.random() * 58,
          y: 8 + Math.random() * 42,
          label: labels[Math.floor(Math.random() * labels.length)],
        })),
      );
    }, 1300);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-72 border border-line bg-bg">
      <p className="px-3 pt-3 text-sm text-muted">Segure o selo. Qualquer outro comando é rendição.</p>
      {decoys.map((decoy) => (
        <button
          key={decoy.id}
          type="button"
          className="absolute min-h-11 border border-danger px-3 text-sm text-danger"
          style={{ left: `${decoy.x}%`, top: `${decoy.y}%` }}
          onClick={() => {
            if (done.current) return;
            done.current = true;
            onFail();
          }}
        >
          {decoy.label}
        </button>
      ))}
      <div className="absolute inset-x-3 bottom-3">
        <HoldSeal
          seconds={20}
          label="Manter o selo"
          onSuccess={() => {
            if (done.current) return;
            done.current = true;
            onSuccess();
          }}
        />
      </div>
    </div>
  );
}

function OathTrial({ onSuccess }: { onSuccess: () => void }) {
  const [text, setText] = useState("");
  const ready = text.trim().toLocaleUpperCase("pt-BR").replace(/\s+/g, " ") === OATH;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">O sistema pede o juramento, letra por letra.</p>
      <p className="font-display text-lg text-gold">{OATH}</p>
      <input className={fieldClass} value={text} onChange={(event) => setText(event.target.value)} aria-label="Juramento" autoCapitalize="characters" />
      {ready ? <HoldSeal seconds={12} label="Selar o juramento" onSuccess={onSuccess} /> : null}
    </div>
  );
}
