const STORAGE_KEY = "recipes";

export type Recipe = {
  title: string;
  ingredients: string;
  steps: string;
};

// get recipes
export const getRecipes = (): Recipe[] => {
  // Run only client side
  if (typeof window === "undefined") {
    return [];
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

// save recipes
export const saveRecipe = (recipe: Recipe) => {
  // Run only client side
  if (typeof window === "undefined") {
    return;
  }
  const recipes = getRecipes();
  recipes.push(recipe);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

// delete recipes
export const deleteRecipe = (id: number) => {
  // Run only client side
  if (typeof window === "undefined") {
    return;
  }
  const recipes = getRecipes().filter((_, index) => index !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

// update recipes
export const updateRecipe = (id: number, updatedRecipe: Recipe) => {
  if (typeof window === "undefined") {
    return;
  }
  const recipes = getRecipes();
  recipes[id] = updatedRecipe;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};
