import { ITEM_BY_ID, ITEMS, SLOT_LABEL } from "@/lib/system/catalog";
import { bonusLabel } from "@/lib/system/formulas";
import { useSystem } from "@/lib/system/store";
import type { Slot } from "@/lib/system/types";
import { Btn, Frame } from "./ui";

const SLOTS: Slot[] = ["arma", "armadura", "elmo", "luvas", "botas", "amuleto"];

export function ShopPanel() {
  const data = useSystem((s) => s.data);
  const actions = useSystem((s) => s.actions);

  return (
    <div className="flex flex-col gap-4">
      <Frame title="Equipado">
        <ul className="grid gap-2 sm:grid-cols-2">
          {SLOTS.map((slot) => {
            const id = data.equipped[slot];
            const item = id ? ITEM_BY_ID[id] : undefined;
            return (
              <li key={slot} className="flex items-center justify-between gap-3 border border-line bg-bg px-3 py-2">
                <div>
                  <p className="text-xs tracking-widest text-muted uppercase">{SLOT_LABEL[slot]}</p>
                  <p className="text-fg">{item ? item.name : "Vazio"}</p>
                  {item ? <p className="text-sm text-primary">{bonusLabel(item.bonus)}</p> : null}
                </div>
                {item ? (
                  <Btn variant="ghost" onClick={() => actions.unequip(slot)}>
                    Tirar
                  </Btn>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Frame>

      <Frame title="Inventário" extra={<span className="tabular-nums text-gold">{data.gold} ouro</span>}>
        {data.ownedItems.length === 0 ? <p className="text-sm text-muted">Nada comprado ainda.</p> : null}
        <div className="flex flex-col gap-2">
          {data.ownedItems.map((id) => {
            const item = ITEM_BY_ID[id];
            if (!item) return null;
            const on = data.equipped[item.slot] === id;
            return (
              <article key={id} className="flex flex-wrap items-center justify-between gap-2 border border-line bg-bg p-3">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted">
                    {SLOT_LABEL[item.slot]} · {bonusLabel(item.bonus)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Btn variant={on ? "gold" : "primary"} onClick={() => actions.equip(id)}>
                    {on ? "Em uso" : "Equipar"}
                  </Btn>
                  <Btn variant="ghost" onClick={() => actions.sell(id)}>
                    Vender {Math.floor(item.price * 0.4)}
                  </Btn>
                </div>
              </article>
            );
          })}
        </div>
      </Frame>

      <Frame title="Loja do sistema">
        <div className="grid gap-3 sm:grid-cols-2">
          {ITEMS.map((item) => {
            const owned = data.ownedItems.includes(item.id);
            return (
              <article key={item.id} className="flex flex-col border border-line bg-bg p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="tabular-nums text-gold">{item.price}</span>
                </div>
                <p className="text-xs tracking-widest text-muted uppercase">{SLOT_LABEL[item.slot]}</p>
                <p className="mt-2 flex-1 text-sm text-muted">{item.description}</p>
                <p className="mt-2 text-sm text-primary">{bonusLabel(item.bonus)}</p>
                <Btn className="mt-3" disabled={owned || data.gold < item.price} onClick={() => actions.buy(item.id)}>
                  {owned ? "Adquirido" : "Comprar"}
                </Btn>
              </article>
            );
          })}
        </div>
      </Frame>
    </div>
  );
}
