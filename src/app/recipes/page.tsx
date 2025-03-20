"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<
    { title: string; ingredients: string; steps: string }[]
  >([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    setRecipes(savedRecipes);
  }, []);

  // Delete a recipe
  const handleDelete = (index: number) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1); // 指定したインデックスのレシピを削除
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // 更新を保存
  };

  return (
    <main className="min-h-screen bg-green-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 mb-4">レシピ一覧</h1>
        {recipes.length === 0 ? (
          <div>
            <p className="text-gray-600">保存されたレシピはありません。</p>
            <Link href="/">ホームに戻る</Link>
          </div>
        ) : (
          <div>
            <ul className="space-y-4">
              {recipes.map((recipe, index) => (
                <li key={index} className="">
                  <Link
                    href={`/recipes/${index}`}
                    className="block bg-white p-4 rounded-lg shadow-md hover:bg-gray-100"
                  >
                    <h2 className="text-lg font-bold">{recipe.title}</h2>
                    <p className="text-sm text-gray-700">
                      {recipe.ingredients}
                    </p>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/">ホームに戻る</Link>
          </div>
        )}
      </div>
    </main>
  );
}
