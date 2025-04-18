import { Review } from "@/models/review";

type Props = {
    reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
    if (reviews.length === 0) {
        return <p className="text-sm text-zinc-500">אין עדיין ביקורות למוצר זה.</p>;
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div
                    key={review._id?.toString()}
                    className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700"
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-zinc-800 dark:text-white">
                            {review.author}
                        </span>
                        <span className="text-yellow-500 text-sm">⭐ {review.rating}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">{review.comment}</p>
                    <p className="text-xs text-zinc-400 mt-2">
                        {new Date(review.createdAt).toLocaleDateString("he-IL")}
                    </p>
                </div>
            ))}
        </div>
    );
}
