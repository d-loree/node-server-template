import request from "supertest";
import express from "express";
import { globalLimiter } from "../../src/middleware/rateLimiter.js";

const app = express();
app.use(globalLimiter);
app.get("/", (req, res) => res.send("OK"));

describe("Rate limiter", () => {
    it("should allow up to 15 requests per minute", async () => {
        for (let i = 0; i < 15; i++) {
            const res = await request(app).get("/");
            expect(res.statusCode).toBe(200);
        }
    });

    it("should block after 15 requests", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(429);
        expect(res.text).toContain("Too many requests");
    });
});
