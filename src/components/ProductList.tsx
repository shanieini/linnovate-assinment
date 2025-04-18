import ProductCard from "./ProductCard";
import { Product } from "@/models/product";

type Props = {
    products: Product[];
};

export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
                <ProductCard key={product._id?.toString()} product={product} />
            ))}
        </div>
    );
}
