// Cloud Living cart, held in the browser until a commerce engine (headless Shopify, Stripe or Odoo) takes over the
// cart and checkout. Lines are keyed by product, colour and size. Every change fires "cart:change" on the document
// so the header count, the drawer and the cart page redraw.

export interface CartLine {
  slug: string;
  colour?: string;
  size?: string;
  qty: number;
}

const KEY = "cloud-living-cart";
let memory: CartLine[] = [];

const keyOf = (line: Omit<CartLine, "qty">) => [line.slug, line.colour ?? "", line.size ?? ""].join("|");

export function readCart(): CartLine[] {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) memory = JSON.parse(stored);
  } catch {
    // Storage blocked (private window, preview): keep the in-memory cart
  }
  return memory.filter((line) => line && typeof line.slug === "string" && line.qty > 0);
}

function writeCart(lines: CartLine[]) {
  memory = lines;
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Storage blocked: the cart lasts until the page closes
  }
  document.dispatchEvent(new CustomEvent("cart:change", { detail: lines }));
}

export function addToCart(item: Omit<CartLine, "qty">, qty = 1) {
  const lines = readCart();
  const existing = lines.find((line) => keyOf(line) === keyOf(item));
  if (existing) existing.qty += qty;
  else lines.push({ ...item, qty });
  writeCart(lines);
  document.dispatchEvent(new CustomEvent("cart:open"));
}

export function setQty(key: string, qty: number) {
  writeCart(readCart().flatMap((line) => (keyOf(line) !== key ? [line] : qty > 0 ? [{ ...line, qty }] : [])));
}

export const lineKey = keyOf;

export const cartCount = (lines = readCart()) => lines.reduce((sum, line) => sum + line.qty, 0);

/** Wire every add button on the page: data-add-to-cart with data-slug, and the option inputs it names. */
export function bindAddButtons(root: ParentNode = document) {
  root.querySelectorAll<HTMLButtonElement>("[data-add-to-cart]").forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = "1";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const form = button.closest("form");
      const pick = (name: string) => form?.querySelector<HTMLInputElement>(`[name="${name}"]:checked`)?.value ?? button.dataset[name];
      const qty = Number(form?.querySelector<HTMLInputElement>("[name='qty']")?.value ?? 1) || 1;
      addToCart({ slug: button.dataset.slug!, colour: pick("colour") || undefined, size: pick("size") || undefined }, qty);
    });
  });
}
