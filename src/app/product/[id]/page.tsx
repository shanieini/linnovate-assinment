import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductReviewsSection from "@/components/ProductReviewsSection";

type Props = {
    params: {
        id: string;
    };
};

export default async function ProductPage({ params }: Props) {
    const product = await getProductById(params.id);

    if (!product) return notFound();

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#c7d2fe] dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-white px-6 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-6 sm:p-10">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-2xl mb-6 transition-transform duration-300 hover:scale-105"
                    />
                    <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white text-xs px-3 py-1 rounded-full mb-3 font-medium">
                        {product.category}
                    </span>
                    <h1 className="text-4xl font-extrabold mb-3 text-zinc-900 dark:text-white">
                        {product.name}
                    </h1>
                    {product.category && (
                        <p className="text-sm uppercase text-zinc-500 dark:text-zinc-400 tracking-widest mb-2">
                            {product.category}
                        </p>
                    )}
                    <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {product.price} ₪
                        </span>
                    </div>
                </div>
                <ProductReviewsSection productId={params.id} />
            </div>
        </main>
    );
}
