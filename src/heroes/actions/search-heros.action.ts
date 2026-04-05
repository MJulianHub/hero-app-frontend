import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const ALLOWED_CATEGORIES = ["hero", "villain", "antihero"];
const ALLOWED_UNIVERSES = ["DC", "Marvel"];
const ALLOWED_STATUSES = ["Active", "Inactive", "Retired"];

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

const sanitizeString = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  return value.replace(/[<>'"&]/g, "").slice(0, 100);
};

const sanitizeNumber = (value: string | undefined, min: number, max: number): string | undefined => {
  if (!value) return undefined;
  const num = Number(value);
  if (isNaN(num)) return undefined;
  return String(Math.max(min, Math.min(max, num)));
};

const sanitizeEnum = (value: string | undefined, allowed: string[]): string | undefined => {
  if (!value) return undefined;
  return allowed.includes(value) ? value : undefined;
};

export const searchHeroesAction = async (options: Options = {}) => {
  const { name, team, category, universe, status, strength } = options;
  if (!name && !team && !category && !universe && !status && !strength) {
    return [];
  }

  const { data } = await heroApi.get<Hero[]>("/search", {
    params: {
      name: sanitizeString(name),
      team: sanitizeString(team),
      category: sanitizeEnum(category, ALLOWED_CATEGORIES),
      universe: sanitizeEnum(universe, ALLOWED_UNIVERSES),
      status: sanitizeEnum(status, ALLOWED_STATUSES),
      strength: sanitizeNumber(strength, 0, 10),
    },
  });
  return data.map((hero) => ({
    ...hero,
    image: `${VITE_API_URL}/images/${sanitizeString(hero.image)}`,
  }));
};
