import { Review } from "@/models/review";

export type AddReviewFormProps = {
    productId: string;
    onSuccess?: () => void;
};

export type AddReviewModalProps = {
    productId: string;
    onReviewAdded?: () => void;
};

export type ReviewCardProps = {
    review: Review;
};

export type ReviewListProps = {
    reviews: Review[];
};