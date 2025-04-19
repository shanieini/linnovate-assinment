export function isValidReview(author: string, comment: string) {
    return author.trim().length > 0 && comment.trim().length > 10;
}
