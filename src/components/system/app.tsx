import { CalendarDays, Crown, ScrollText, Shield, Sparkles, Store, Swords } from "lucide-react";
import { useEffect, useState } from "react";
import hunter from "@/assets/hunter.jpg";
import { derive } from "@/lib/system/derive";
import { formatRemain, msUntilMidnight } from "@/lib/system/formulas";
import { useSystem } from "@/lib/system/store";
import { cn } from "@/lib/cn";
import { JournalPanel } from "./journal";
import { MissionsPanel } from "./missions";
import { RanksPanel } from "./ranks";
import { ShopPanel } from "./shop";
import { SkillsPanel } from "./skills";
import { StatusPanel } from "./status";
import { SummonsPanel } from "./summons";
import { Btn, fieldClass } from "./ui";

const TABS = [
  { id: "status", label: "Status", icon: Swords },
  { id: "missoes", label: "Missões", icon: ScrollText },
  { id: "habilidades", label: "Habilidades", icon: Sparkles },
  { id: "loja", label: "Loja", icon: Store },
  { id: "rank", label: "Rank", icon: Shield },
  { id: "invocacoes", label: "Invocações", icon: Crown },
  { id: "diario", label: "Diário", icon: CalendarDays },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function SystemApp() {
  const [ready, setReady] = useState(false);
  const initialized = useSystem((s) => s.data.initialized);

  useEffect(() => {
    const finish = () => setReady(true);
    const unsub = useSystem.persist.onFinishHydration(finish);
    if (useSystem.persist.hasHydrated()) finish();
    return () => {
      unsub();
    };
  }, []);

  if (!ready) return <Boot />;
  if (!initialized) return <Awaken />;
  return <Shell />;
}

function Boot() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <p className="font-display text-xl tracking-widest text-primary">Sincronizando</p>
    </main>
  );
}

function Awaken() {
  const actions = useSystem((s) => s.actions);
  const [name, setName] = useState("");
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-6 px-5 py-10">
      <img src={hunter} alt="" className="mx-auto size-40 border border-line object-cover" />
      <div>
        <p className="text-xs tracking-widest text-primary uppercase">Sistema</p>
        <h1 className="mt-2 font-display text-4xl text-fg">Você foi escolhido.</h1>
        <p className="mt-3 text-lg text-muted">
          Daqui em diante há missão diária, penalidade e rank. O nome que você der é o que o registro vai usar.
        </p>
      </div>
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          actions.awaken(name);
        }}
      >
        <label className="text-sm tracking-wide text-muted uppercase" htmlFor="hunter-name">
          Nome do jogador
        </label>
        <input
          id="hunter-name"
          className={fieldClass}
          value={name}
          maxLength={18}
          autoComplete="nickname"
          onChange={(event) => setName(event.target.value)}
        />
        <Btn type="submit" disabled={name.trim().length < 2}>
          Confirmar existência
        </Btn>
      </form>
    </main>
  );
}

function Shell() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  const toasts = useSystem((s) => s.toasts);
  const fanfare = useSystem((s) => s.fanfare);
  const view = derive(data);
  const [tab, setTab] = useState<TabId>("missoes");
  const [remain, setRemain] = useState(() => formatRemain(msUntilMidnight()));

  useEffect(() => {
    actions.ensureToday();
    const id = window.setInterval(() => {
      actions.ensureToday();
      setRemain(formatRemain(msUntilMidnight()));
    }, 15000);
    return () => window.clearInterval(id);
  }, [actions]);

  useEffect(() => {
    if (!toasts.length) return;
    const id = window.setTimeout(() => actions.dismissToast(toasts[0].id), 3400);
    return () => window.clearTimeout(id);
  }, [toasts, actions]);

  const obrigLeft = data.daily.filter((mission) => mission.obrigatoria && mission.completedOn !== data.lastSeenDate).length;

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-display text-lg tracking-widest text-primary">Sistema</p>
            <p className="text-sm text-muted">
              {data.profileName} · {view.rankLabel} · Nv <span className="tabular-nums text-fg">{data.level}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="tabular-nums text-gold">{data.gold} ouro</p>
            <p className="text-sm text-muted">
              Seq. <span className="tabular-nums text-fg">{data.streak}</span> · ciclo {remain}
            </p>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
          {TABS.map((item) => {
            const Icon = item.icon;
            const on = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 px-3 text-sm font-semibold tracking-wide",
                  on ? "border border-primary text-primary" : "border border-transparent text-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      {data.penalty.active ? (
        <PenaltyOverlay />
      ) : obrigLeft > 0 ? (
        <p className="mx-auto max-w-6xl px-4 pt-3 text-sm text-danger">
          {obrigLeft} obrigação(ões) ainda aberta(s) neste ciclo.
        </p>
      ) : (
        <p className="mx-auto max-w-6xl px-4 pt-3 text-sm text-primary">Obrigações do ciclo cumpridas.</p>
      )}

      <div className={cn("mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4", tab === "status" ? "" : "lg:flex-row")}>
        <aside className={cn("lg:sticky lg:top-28 lg:w-80 lg:shrink-0 lg:self-start", tab === "status" ? "hidden" : "hidden lg:block")}>
          <StatusPanel mode="compact" />
        </aside>
        <main className="min-w-0 flex-1">
          {tab === "status" ? <StatusPanel mode="full" /> : null}
          {tab === "missoes" ? <MissionsPanel /> : null}
          {tab === "habilidades" ? <SkillsPanel /> : null}
          {tab === "loja" ? <ShopPanel /> : null}
          {tab === "rank" ? <RanksPanel /> : null}
          {tab === "invocacoes" ? <SummonsPanel /> : null}
          {tab === "diario" ? <JournalPanel /> : null}
        </main>
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-24 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => actions.dismissToast(item.id)}
            className={cn(
              "pointer-events-auto w-full max-w-md border px-4 py-3 text-left text-sm",
              item.tone === "bad" ? "border-danger bg-bg text-danger" : item.tone === "good" ? "border-primary bg-bg text-primary" : "border-line bg-bg text-fg",
            )}
          >
            {item.text}
          </button>
        ))}
      </div>

      {fanfare ? <Fanfare /> : null}
    </div>
  );
}

function PenaltyOverlay() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 px-4">
      <section className="sys-frame w-full max-w-md p-5">
        <p className="text-xs tracking-widest text-danger uppercase">Zona de penalidade</p>
        <h2 className="mt-2 font-display text-3xl text-fg">Você falhou.</h2>
        <p className="mt-3 text-muted">
          A missão diária obrigatória não foi cumprida. Ouro foi tomado. A fadiga está no limite. Enquanto isto durar,
          seu título é O Fraco. Pilha {data.penalty.stacks}.
        </p>
        <p className="mt-3 text-sm text-fg">Segure o selo para sair. Não há atalho.</p>
        <div className="mt-4">
          <HoldInline onDone={() => actions.clearPenalty()} />
        </div>
      </section>
    </div>
  );
}

function HoldInline({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const holding = useRefHold();
  return (
    <button
      type="button"
      className="relative min-h-16 w-full touch-none overflow-hidden border border-danger bg-bg font-semibold tracking-widest text-fg"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        holding.start(setPct, onDone, 16);
      }}
      onPointerUp={() => holding.stop(setPct)}
      onPointerCancel={() => holding.stop(setPct)}
    >
      <span className="absolute inset-y-0 left-0 bg-danger/40" style={{ width: `${pct * 100}%` }} />
      <span className="relative">Suportar</span>
    </button>
  );
}

function useRefHold() {
  const state = useState(() => {
    let frame = 0;
    let holding = false;
    let done = false;
    return {
      start(setPct: (n: number) => void, onDone: () => void, seconds: number) {
        if (done) return;
        holding = true;
        const started = performance.now();
        const loop = (time: number) => {
          if (!holding || done) return;
          const ratio = Math.min(1, (time - started) / (seconds * 1000));
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
      stop(setPct: (n: number) => void) {
        holding = false;
        cancelAnimationFrame(frame);
        if (!done) setPct(0);
      },
    };
  })[0];
  return state;
}

function Fanfare() {
  const fanfare = useSystem((s) => s.fanfare);
  const actions = useSystem((s) => s.actions);
  if (!fanfare) return null;
  const levelUp = fanfare.kind === "level";
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-bg/80 px-4">
      <section className="sys-frame w-full max-w-md p-6 text-center">
        <p className="text-xs tracking-widest text-primary uppercase">{levelUp ? "Nível aumentado" : "Rank conquistado"}</p>
        <p className="mt-3 font-display text-5xl text-primary glow-num">
          {levelUp ? fanfare.level : fanfare.rank === "M" ? "Monarca" : `Rank ${fanfare.rank}`}
        </p>
        {!levelUp ? <p className="mt-2 text-gold">{fanfare.title}</p> : null}
        <p className="mt-3 text-muted">{levelUp ? "Pontos de atributo foram concedidos." : "O sistema atualizou o seu lugar."}</p>
        <Btn className="mt-5 w-full" onClick={() => actions.dismissFanfare()}>
          Continuar
        </Btn>
      </section>
    </div>
  );
}
