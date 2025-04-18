import { Product } from "@/models/product";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    return (
        <Link
            href={`/product/${product._id}`}
            className="relative block group transform transition-transform hover:-translate-y-1"
        >
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 dark:bg-zinc-800/80 p-2 rounded-full shadow-md backdrop-blur-md">
                        <ShoppingCart className="w-5 h-5 text-zinc-700 dark:text-white" />
                    </div>
                </div>
                <div className="p-5 space-y-2">
                    <h2 className="text-xl font-semibold text-zinc-800 dark:text-white truncate">
                        {product.name}
                    </h2>
                    {product.category && (
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                            {product.category}
                        </p>
                    )}
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                            {product.price} ₪
                        </span>
                        ⭐ {Number.isInteger(product.rating) ? product.rating : product.rating.toFixed(1)}
                    </div>
                </div>
            </div>
        </Link>
    );
}
