import { Product } from "@/models/product";

export type ProductPageParams = {
    params: {
        id: string;
    };
};

export type ProductCardProps = {
    product: Product;
};

export type ProductReviewsSectionProps = {
    productId: string;
};
