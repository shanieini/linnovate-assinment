import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    use: {
        baseURL: "http://localhost:3000",
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
});
