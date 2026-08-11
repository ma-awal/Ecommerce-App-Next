import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand ekta lightweight state manager - Redux er moto boilerplate lage na.
// persist() middleware localStorage e cart save kore rakhe, tai browser
// refresh korle o cart data hariye jabe na.

// Ekta item ke unique kore chena jai color+size combination diye -
// shudhu slug diye na, karon shei same t-shirt kintu different color/size
// alada cart line hote hobe.
function makeLineId(item) {
  return `${item.slug}__${item.color}__${item.size}`;
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ lineId, slug, name, price, color, colorName, size, qty }]

      addItem: (newItem) => {
        const lineId = makeLineId(newItem);
        const existing = get().items.find((i) => i.lineId === lineId);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.lineId === lineId ? { ...i, qty: i.qty + newItem.qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...newItem, lineId }] });
        }
      },

      updateQty: (lineId, qty) => {
        if (qty < 1) return;
        set({
          items: get().items.map((i) =>
            i.lineId === lineId ? { ...i, qty } : i
          ),
        });
      },

      removeItem: (lineId) => {
        set({ items: get().items.filter((i) => i.lineId !== lineId) });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.qty * i.price, 0),
    }),
    {
      name: "anchor-tee-cart", // localStorage key
    }
  )
);