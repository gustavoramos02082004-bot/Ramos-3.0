import { useState } from "react";
import { CATEGORY_LABEL, DIFFICULTY_LABEL, REWARD } from "@/lib/system/catalog";
import { uid } from "@/lib/system/formulas";
import { useSystem, type MissionDraft } from "@/lib/system/store";
import type { Category, Difficulty, Mission } from "@/lib/system/types";
import { Btn, Field, Frame, SystemDialog, fieldClass } from "./ui";

const CATEGORIES = Object.keys(CATEGORY_LABEL) as Category[];
const DIFFICULTIES = Object.keys(DIFFICULTY_LABEL) as Difficulty[];

function blank(bucket: "daily" | "custom"): MissionDraft {
  return {
    title: "",
    description: "",
    category: bucket === "daily" ? "corpo" : "vontade",
    difficulty: "normal",
    obrigatoria: bucket === "daily",
    repeat: "diaria",
    goals: [{ id: uid(), label: "", target: 10 }],
  };
}

function fromMission(mission: Mission): MissionDraft {
  return {
    id: mission.id,
    title: mission.title,
    description: mission.description,
    category: mission.category,
    difficulty: mission.difficulty,
    obrigatoria: mission.obrigatoria,
    repeat: mission.repeat,
    goals: mission.goals.map((goal) => ({ id: goal.id, label: goal.label, target: goal.target })),
  };
}

export function MissionsPanel() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);
  const [draft, setDraft] = useState<MissionDraft | null>(null);
  const [bucket, setBucket] = useState<"daily" | "custom">("daily");
  const today = data.lastSeenDate;

  return (
    <div className="flex flex-col gap-4">
      <Frame
        title="Missão diária"
        extra={
          <Btn
            variant="ghost"
            onClick={() => {
              setBucket("daily");
              setDraft(blank("daily"));
            }}
          >
            Nova
          </Btn>
        }
      >
        <p className="mb-4 text-sm text-danger">
          Aviso: falhar numa missão marcada como obrigatória até o fim do ciclo abre a zona de penalidade.
        </p>
        <div className="flex flex-col gap-3">
          {data.daily.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              today={today}
              onEdit={() => {
                setBucket("daily");
                setDraft(fromMission(mission));
              }}
            />
          ))}
        </div>
      </Frame>

      <Frame
        title="Missões livres"
        extra={
          <Btn
            variant="ghost"
            onClick={() => {
              setBucket("custom");
              setDraft(blank("custom"));
            }}
          >
            Criar
          </Btn>
        }
      >
        <p className="mb-4 text-sm text-muted">
          Feitas do zero. Dão XP e podem despertar uma habilidade da mesma afinidade. Não geram penalidade.
        </p>
        {data.custom.length === 0 ? (
          <p className="text-sm text-muted">Nenhuma missão livre. O sistema espera a primeira.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {data.custom.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                today={today}
                onEdit={() => {
                  setBucket("custom");
                  setDraft(fromMission(mission));
                }}
              />
            ))}
          </div>
        )}
      </Frame>

      <SystemDialog open={draft !== null} onOpenChange={(open) => !open && setDraft(null)} title={draft?.id ? "Editar missão" : "Nova missão"}>
        {draft ? (
          <MissionForm
            draft={draft}
            bucket={bucket}
            onChange={setDraft}
            onClose={() => setDraft(null)}
          />
        ) : null}
      </SystemDialog>
    </div>
  );
}

function MissionCard({ mission, today, onEdit }: { mission: Mission; today: string | null; onEdit: () => void }) {
  const actions = useSystem((s) => s.actions);
  const done = mission.completedOn === today || (mission.repeat === "unica" && Boolean(mission.completedOn));
  const reward = REWARD[mission.difficulty];
  const progress = mission.goals.reduce((sum, goal) => sum + Math.min(goal.current, goal.target), 0);
  const total = mission.goals.reduce((sum, goal) => sum + goal.target, 0);

  return (
    <article className="border border-line bg-bg p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-fg">{mission.title}</h3>
          <p className="text-sm text-muted">
            {CATEGORY_LABEL[mission.category]} · {DIFFICULTY_LABEL[mission.difficulty]} · {reward.xp} XP · {reward.gold} ouro
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {mission.obrigatoria ? (
            <span className="border border-gold px-2 py-1 text-xs tracking-widest text-gold uppercase">Obrigatória</span>
          ) : null}
          {mission.repeat === "unica" ? (
            <span className="border border-line px-2 py-1 text-xs tracking-widest text-muted uppercase">Única</span>
          ) : null}
        </div>
      </div>
      {mission.description ? <p className="mt-2 text-sm text-muted">{mission.description}</p> : null}
      <p className="mt-2 text-xs tracking-widest text-muted uppercase tabular-nums">
        {progress}/{total}
      </p>
      <ul className="mt-2 flex flex-col gap-2">
        {mission.goals.map((goal) => (
          <li key={goal.id} className="flex flex-wrap items-center gap-2">
            <span className="min-w-0 flex-1 text-sm">{goal.label}</span>
            <input
              className="h-11 w-20 border border-line bg-surface px-2 text-center tabular-nums"
              type="number"
              min={0}
              max={goal.target}
              disabled={done}
              value={goal.current}
              aria-label={goal.label}
              onChange={(event) => actions.setGoal(mission.id, goal.id, Number(event.target.value))}
            />
            <span className="tabular-nums text-muted">/ {goal.target}</span>
            <Btn variant="ghost" className="px-3" disabled={done} onClick={() => actions.setGoal(mission.id, goal.id, goal.current + 1)}>
              +1
            </Btn>
            <Btn variant="ghost" className="px-3" disabled={done} onClick={() => actions.setGoal(mission.id, goal.id, goal.current + 10)}>
              +10
            </Btn>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn className="flex-1" disabled={done} onClick={() => actions.completeMission(mission.id)}>
          {done ? "Concluída neste ciclo" : "Concluir missão"}
        </Btn>
        <Btn variant="ghost" onClick={onEdit}>
          Editar
        </Btn>
        <Btn variant="ghost" onClick={() => actions.deleteMission(mission.id)}>
          Apagar
        </Btn>
      </div>
    </article>
  );
}

function MissionForm({
  draft,
  bucket,
  onChange,
  onClose,
}: {
  draft: MissionDraft;
  bucket: "daily" | "custom";
  onChange: (draft: MissionDraft) => void;
  onClose: () => void;
}) {
  const actions = useSystem((s) => s.actions);
  const lockedCore = draft.id === "daily-corpo";

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (actions.saveMission(draft, bucket)) onClose();
      }}
    >
      <Field label="Título">
        <input className={fieldClass} value={draft.title} maxLength={48} onChange={(event) => onChange({ ...draft, title: event.target.value })} />
      </Field>
      <Field label="Descrição">
        <textarea
          className={`${fieldClass} min-h-20 py-2`}
          value={draft.description}
          maxLength={180}
          onChange={(event) => onChange({ ...draft, description: event.target.value })}
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Afinidade">
          <select
            className={fieldClass}
            value={draft.category}
            onChange={(event) => onChange({ ...draft, category: event.target.value as Category })}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABEL[category]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Dificuldade">
          <select
            className={fieldClass}
            value={draft.difficulty}
            onChange={(event) => onChange({ ...draft, difficulty: event.target.value as Difficulty })}
          >
            {DIFFICULTIES.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {DIFFICULTY_LABEL[difficulty]} · {REWARD[difficulty].xp} XP
              </option>
            ))}
          </select>
        </Field>
      </div>
      {bucket === "daily" ? (
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={draft.obrigatoria}
            disabled={lockedCore}
            onChange={(event) => onChange({ ...draft, obrigatoria: event.target.checked })}
          />
          Obrigatória até o fim do ciclo
        </label>
      ) : (
        <Field label="Repetição">
          <select
            className={fieldClass}
            value={draft.repeat}
            onChange={(event) => onChange({ ...draft, repeat: event.target.value as MissionDraft["repeat"] })}
          >
            <option value="diaria">Reaparece todo ciclo</option>
            <option value="unica">Uma vez</option>
          </select>
        </Field>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-sm tracking-wide text-muted uppercase">Objetivos</p>
        {draft.goals.map((goal, index) => (
          <div key={goal.id} className="flex gap-2">
            <input
              className={fieldClass}
              placeholder="Nome do objetivo"
              value={goal.label}
              maxLength={42}
              onChange={(event) => {
                const goals = draft.goals.slice();
                goals[index] = { ...goal, label: event.target.value };
                onChange({ ...draft, goals });
              }}
            />
            <input
              className="h-11 w-20 border border-line bg-bg px-2 text-center tabular-nums"
              type="number"
              min={1}
              max={9999}
              value={goal.target}
              aria-label="Meta"
              onChange={(event) => {
                const goals = draft.goals.slice();
                goals[index] = { ...goal, target: Number(event.target.value) };
                onChange({ ...draft, goals });
              }}
            />
            <Btn
              variant="ghost"
              className="px-3"
              disabled={draft.goals.length <= 1}
              onClick={() => onChange({ ...draft, goals: draft.goals.filter((item) => item.id !== goal.id) })}
            >
              −
            </Btn>
          </div>
        ))}
        <Btn
          variant="ghost"
          disabled={draft.goals.length >= 6}
          onClick={() => onChange({ ...draft, goals: [...draft.goals, { id: uid(), label: "", target: 10 }] })}
        >
          Adicionar objetivo
        </Btn>
      </div>
      <div className="flex gap-2">
        <Btn type="submit" className="flex-1">
          Salvar
        </Btn>
        <Btn variant="ghost" onClick={onClose}>
          Cancelar
        </Btn>
      </div>
    </form>
  );
}
