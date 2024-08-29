const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Prompt API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new prompt", async () => {
    const res = await request(app).post("/api/prompts").send({
      originalPrompt: "Test prompt",
      refinedPrompt: "Refined test prompt",
      technique: "zero-shot",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should get all prompts", async () => {
    const res = await request(app).get("/api/prompts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
