"use client";

import useSWR from "swr";
import ProductList from "@/components/ProductList";
import { Product } from "@/models/product";
import { fetchProducts } from "@/lib/clientApi";

export default function HomePage() {
  const { data: products, error, isLoading } = useSWR<Product[]>("/api/products", fetchProducts);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-white">
      <section className="max-w-7xl mx-auto px-6 py-16 sm:px-10 lg:px-16">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-300 mb-4">
            🛍️ Product Catalog
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Discover our curated collection of quality products with top reviews and fresh style.
          </p>
          <div className="h-1 w-20 bg-indigo-600 dark:bg-indigo-400 mt-6 mx-auto rounded-full" />
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">שגיאה בטעינת מוצרים</p>
        ) : products && products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <p className="text-center text-zinc-500 dark:text-zinc-400">No products found.</p>
        )}
      </section>
    </main>
  );
}
