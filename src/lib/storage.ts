const STORAGE_KEY = "recipes";

export type Recipe = {
  title: string;
  ingredients: string;
  steps: string;
};

// get recipes
export const getRecipes = (): Recipe[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

// save recipes
export const saveRecipe = (recipe: Recipe) => {
  const recipes = getRecipes();
  recipes.push(recipe);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

// delete recipes
export const deleteRecipe = (id: number) => {
  const recipes = getRecipes().filter((_, index) => index !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

// update recipes
export const updateRecipe = (id: number, updatedRecipe: Recipe) => {
  const recipes = getRecipes();
  recipes[id] = updatedRecipe;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};
