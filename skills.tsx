import { CATEGORY_LABEL, RARITY_LABEL, SKILLS } from "@/lib/system/catalog";
import { derive } from "@/lib/system/derive";
import { bonusLabel, scaleBonus } from "@/lib/system/formulas";
import { useSystem } from "@/lib/system/store";
import { Btn, Frame, Meter } from "./ui";

export function SkillsPanel() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  const view = derive(data);
  const unlocked = data.skills.filter((skill) => skill.unlocked).length;

  return (
    <Frame
      title="Habilidades"
      extra={
        <span className="text-sm text-muted tabular-nums">
          {view.equippedSkillIds.length}/{view.slots} equipadas
        </span>
      }
    >
      <p className="mb-4 text-sm text-muted">
        Elas não vêm soltas. Cada missão tem uma afinidade — corpo, mente, vontade, percepção ou sombra — e é
        dali que o sistema oferece o que despertar. {unlocked} de {SKILLS.length} abertas.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {SKILLS.map((def) => {
          const progress = data.skills.find((skill) => skill.id === def.id);
          const open = Boolean(progress?.unlocked);
          const level = progress?.level ?? 1;
          const effect = open ? bonusLabel(scaleBonus(def.bonusPerLevel, level)) : "Afinidade: " + CATEGORY_LABEL[def.category];
          return (
            <article key={def.id} className="flex flex-col border border-line bg-bg p-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-fg">{open ? def.name : "???"}</h3>
                <span className="text-xs tracking-widest text-gold uppercase">{RARITY_LABEL[def.rarity]}</span>
              </div>
              <p className="mt-1 text-xs tracking-widest text-primary uppercase">{CATEGORY_LABEL[def.category]}</p>
              <p className="mt-2 flex-1 text-sm text-muted">{open ? def.description : "Conclua missões desta afinidade."}</p>
              <p className="mt-2 text-sm text-fg">{effect}</p>
              {open && progress ? (
                <>
                  <p className="mt-2 text-sm tabular-nums text-muted">
                    Nível {level}/{def.maxLevel}
                  </p>
                  <div className="mt-2">
                    <Meter label="Proficiência" value={progress.proficiency} max={100} />
                  </div>
                  <Btn
                    className="mt-3"
                    variant={progress.equipped ? "gold" : "ghost"}
                    onClick={() => actions.toggleSkill(def.id)}
                  >
                    {progress.equipped ? "Equipada" : "Equipar"}
                  </Btn>
                </>
              ) : (
                <p className="mt-3 text-xs tracking-widest text-muted uppercase">Selada</p>
              )}
            </article>
          );
        })}
      </div>
    </Frame>
  );
}
