import { CART_STORAGE_KEY } from "@/utils/constants";
export const truncate = (s = "", max) => (s && s.length > max ? s.slice(0, max).trimEnd() + " …" : s || "");

export const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
};

export const saveCart = state => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch(err) {
    console.log(err);
  }
};