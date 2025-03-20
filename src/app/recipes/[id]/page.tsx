"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<{
    title: string;
    ingredients: string;
    steps: string;
  } | null>(null);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    const recipeIndex = Number(id); // id を number に変換
    if (
      !isNaN(recipeIndex) &&
      recipeIndex >= 0 &&
      recipeIndex < savedRecipes.length
    ) {
      setRecipe(savedRecipes[recipeIndex]);
    }
  }, [id]);

  if (!recipe) return <p className="text-gray-600">レシピが見つかりません。</p>;

  return (
    <main className="min-h-screen bg-green-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          {recipe.title}
        </h1>
        <p className="text-sm text-gray-700">
          <strong>材料:</strong> {recipe.ingredients}
        </p>
        <p className="text-sm text-gray-700 mt-4">
          <strong>手順:</strong> {recipe.steps}
        </p>
        <Link href="/recipes">
          <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            戻る
          </button>
        </Link>
      </div>
    </main>
  );
}
