"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getRecipes, saveRecipe, Recipe } from "@/lib/storage";

export default function Home() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  // editing item's index
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setRecipes(getRecipes());
  }, []);

  console.log("getRecipes", getRecipes());

  // Create a new recipe
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe: Recipe = { title, ingredients, steps };
    // Saved recipes list
    const updatedRecipes = [...recipes];

    // When an exist recipe is edited
    if (editingIndex !== null) {
      updatedRecipes[editingIndex] = newRecipe;
    } else {
      // When a new recipe is added
      updatedRecipes.push(newRecipe);
    }

    saveRecipe(newRecipe);
    setRecipes(updatedRecipes);

    // Reset input and leave editing mode
    setTitle("");
    setIngredients("");
    setSteps("");
    setEditingIndex(null);
  };

  // Edit a recipe
  const handleEdit = (index: number) => {
    const recipeToEdit = recipes[index];
    setTitle(recipeToEdit.title);
    setIngredients(recipeToEdit.ingredients);
    setSteps(recipeToEdit.steps);
    setEditingIndex(index); // どのレシピを編集しているか記憶
  };

  return (
    <main className="min-h-screen bg-green-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 mb-4">レシピを追加</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              レシピ名
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              材料
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              手順
            </label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={5}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            保存
          </button>
        </form>
      </div>

      <div className="max-w-2xl mx-auto mt-6">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          保存されたレシピ
        </h2>
        <Link href="/recipes">一覧へ</Link>
        {recipes.map((recipe, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-bold">{recipe.title}</h2>
            <p className="text-sm text-gray-700">{recipe.ingredients}</p>
            <p className="text-sm text-gray-700">{recipe.steps}</p>
            <button
              onClick={() => handleEdit(index)}
              className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
