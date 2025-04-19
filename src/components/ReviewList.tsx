import ReviewCard from "./ReviewCard";
import { ReviewListProps } from "@/types/reviewTypes";

export default function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
        return <p className="text-sm text-zinc-500">אין עדיין ביקורות למוצר זה.</p>;
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <ReviewCard key={review._id?.toString()} review={review} />
            ))}
        </div>
    );
}
