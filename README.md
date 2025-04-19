# 🛍️ Product Catalog App

A modern, responsive product catalog built with Next.js, featuring product listings, average ratings, and a client-side review system.

## 🚀 Technologies Used

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** for modern, responsive styling
- **MongoDB** for database
- **SWR** for client-side data fetching and cache revalidation
- **Vitest** for unit and integration testing
- **Playwright** for end-to-end testing

### 🧪 Testing Overview

This project includes 3 types of tests:

#### 1. **Unit Tests** (with Vitest)
- Purpose: Test individual pure functions or small logic units.
- Location: Usually inside `src/lib/utils/`.
- Example: `calculateAverageRating.test.ts`
- Run with: npx vitest run
#### 2. **Integration Tests** (with Vitest + React Testing Library)
- Purpose: Test how multiple units (e.g., components + logic) work together in React.
- Location: Typically inside src/components/.
- Example: AddReviewForm.test.tsx
- Run with: npx vitest run
#### 3. **E2E (End-to-End) Tests** (with Playwright)
- Purpose: Simulate real user behavior in a browser (e.g., clicking buttons, submitting forms, navigating pages).
- Location: In the e2e/ directory at the root of the project.
- Example: add-review.spec.ts
- Run with: npx playwright test

## ▶️ Getting Started

Follow these steps to run the project locally:

- npm install
- npm run dev