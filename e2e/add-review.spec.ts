import { test, expect } from "@playwright/test";

test("user can add a review and see it update", async ({ page }) => {
    const productId = "68015da8774e09366ba10c03";
    await page.goto(`http://localhost:3000/product/${productId}`);
    await page.click("button:text('Add Review')");
    await page.fill("input#review-author", "Shani");
    await page.fill("textarea#review-comment", "This is an amazing product!");
    await page.click("button[aria-label='Rate 5 stars']");
    await page.click("button[type='submit']");
    await expect(page.getByText("This is an amazing product!")).toBeVisible();
});
