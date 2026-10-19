import sentinela from "@/assets/summons/sentinela.jpg";
import coruja from "@/assets/summons/coruja.jpg";
import lamina from "@/assets/summons/lamina.jpg";
import vulto from "@/assets/summons/vulto.jpg";
import { SUMMONS } from "@/lib/system/catalog";
import { derive } from "@/lib/system/derive";
import { bonusLabel } from "@/lib/system/formulas";
import { useSystem } from "@/lib/system/store";
import { Btn, Frame, Meter } from "./ui";

const ART: Record<string, string> = { sentinela, coruja, lamina, vulto };

export function SummonsPanel() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  const view = derive(data);
  const active = data.summons.filter((summon) => summon.active && summon.obtained).length;

  return (
    <Frame
      title="Invocações"
      extra={
        <span className="text-sm tabular-nums text-muted">
          {active}/{view.summonSlots} ativas
        </span>
      }
    >
      <p className="mb-4 text-sm text-muted">
        Elas chegam quando o rank sobe, não quando você pede. Ativas, emprestam atributo e poder. A lealdade cresce
        se estiverem em campo quando uma missão fecha.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {SUMMONS.map((def) => {
          const progress = data.summons.find((summon) => summon.id === def.id);
          const obtained = Boolean(progress?.obtained);
          return (
            <article key={def.id} className="border border-line bg-bg">
              {obtained ? (
                <img src={ART[def.id]} alt="" className="aspect-square w-full object-cover" />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-surface-2">
                  <span className="font-display text-4xl text-line">?</span>
                </div>
              )}
              <div className="p-3">
                <p className="text-xs tracking-widest text-gold uppercase">{obtained ? def.title : "Sinal ausente"}</p>
                <h3 className="font-display text-lg text-fg">{obtained ? def.name : "???"}</h3>
                <p className="mt-2 text-sm text-muted">
                  {obtained ? def.lore : "Ainda não há resposta. Suba de rank."}
                </p>
                {obtained && progress ? (
                  <>
                    <p className="mt-2 text-sm text-primary">
                      {bonusLabel(def.bonus)} · poder {def.power + Math.floor(progress.loyalty / 2)}
                    </p>
                    <div className="mt-2">
                      <Meter label="Lealdade" value={progress.loyalty} max={100} tone="gold" />
                    </div>
                    <Btn
                      className="mt-3 w-full"
                      variant={progress.active ? "gold" : "ghost"}
                      onClick={() => actions.toggleSummon(def.id)}
                    >
                      {progress.active ? "Em campo" : "Invocar"}
                    </Btn>
                  </>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </Frame>
  );
}
