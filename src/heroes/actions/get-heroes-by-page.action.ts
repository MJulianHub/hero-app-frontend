import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

const MAX_LIMIT = 50;
const VALID_CATEGORIES = ["all", "hero", "villain", "antihero"];

export const getHeroesByPageAction = async (
  page: number,
  limit: number = 6,
  category: string = "all",
): Promise<HeroesResponse> => {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(MAX_LIMIT, Math.max(1, Number(limit) || 6));
  const safeCategory = VALID_CATEGORIES.includes(category) ? category : "all";

  const { data } = await heroApi.get<HeroesResponse>("/", {
    params: {
      limit: safeLimit,
      offset: (safePage - 1) * safeLimit,
      category: safeCategory,
    },
  });

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`.replace(/[<>'"&]/g, ""),
  }));

  return {
    ...data,
    heroes,
  };
};

export default getHeroesByPageAction;
