import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  favorites: Hero[];
  favoriteCount: number;

  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const isValidHero = (obj: unknown): obj is Hero => {
  if (typeof obj !== "object" || obj === null) return false;
  const hero = obj as Record<string, unknown>;
  return (
    typeof hero.id === "string" &&
    typeof hero.name === "string" &&
    typeof hero.alias === "string" &&
    typeof hero.slug === "string" &&
    Array.isArray(hero.powers) &&
    typeof hero.description === "string" &&
    typeof hero.strength === "number" &&
    typeof hero.intelligence === "number" &&
    typeof hero.speed === "number" &&
    typeof hero.durability === "number" &&
    typeof hero.team === "string" &&
    typeof hero.image === "string" &&
    typeof hero.firstAppearance === "string" &&
    typeof hero.status === "string" &&
    typeof hero.category === "string" &&
    typeof hero.universe === "string"
  );
};

const getFavoriteFromLocalStorage = (): Hero[] => {
  try {
    const favorites = localStorage.getItem("favorites");
    if (!favorites) return [];
    const parsed = JSON.parse(favorites);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidHero);
  } catch {
    return [];
  }
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoriteFromLocalStorage(),
  );

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      const newFavorite = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavorite);
      return;
    }
    setFavorites([...favorites, hero]);
  };

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      console.warn("Failed to save favorites to localStorage");
    }
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favoriteCount: favorites.length,
        favorites: favorites,

        isFavorite: (hero: Hero) => favorites.some((h) => h.id === hero.id),
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
