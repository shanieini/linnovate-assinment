export function calculateAverageRating(ratings: number[]) {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return sum / ratings.length;
}
