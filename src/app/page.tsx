"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  // editing item's index
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<
    { title: string; ingredients: string; steps: string }[]
  >([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    setRecipes(savedRecipes);
  }, []);

  // Create a new recipe
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("レシピ名:", title);
    console.log("材料:", ingredients);
    console.log("手順:", steps);

    const newRecipe = { title, ingredients, steps };
    const updatedRecipes = [...recipes];

    if (editingIndex !== null) {
      // 既存のレシピを更新
      updatedRecipes[editingIndex] = newRecipe;
    } else {
      // 新しいレシピを追加
      updatedRecipes.push(newRecipe);
    }

    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

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
