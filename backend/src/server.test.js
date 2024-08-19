const request = require("supertest");
const app = require("./server"); // Correct path to server.js

let server;

describe("Server API Tests", () => {
  let csrfToken;

  // Increase Jest timeout for this test suite
  jest.setTimeout(10000); // 10 seconds

  beforeAll((done) => {
    // Start the server on a different port to avoid conflicts
    server = app.listen(5001, () => {
      console.log("Test server running on port 5001");
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      console.log("Test server closed");
      done();
    });
  });

  test("should return a CSRF token", async () => {
    const response = await request(server).get("/api/csrf-token");
    expect(response.statusCode).toBe(200);
    expect(response.body.csrfToken).toBeDefined(); // Ensure the CSRF token is present
    csrfToken = response.body.csrfToken; // Save the CSRF token for later tests
  });

  test("should fetch metadata for valid URLs", async () => {
    const csrfResponse = await request(server).get("/api/csrf-token");
    const csrfToken = csrfResponse.body.csrfToken;
    const cookies = csrfResponse.headers["set-cookie"]; // Get CSRF cookie

    const mockUrls = ["https://example.com"];

    const response = await request(server)
      .post("/fetch-metadata")
      .set("Cookie", cookies) // Set CSRF cookie
      .send({ urls: mockUrls })
      .set("CSRF-Token", csrfToken); // Set CSRF token

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].url).toBe(mockUrls[0]);
    expect(response.body[0].metadata).toBeDefined();
  });

  test("should enforce rate limiting", async () => {
    for (let i = 0; i < 6; i++) {
      await request(server).get("/api/csrf-token");
    }

    const response = await request(server).get("/api/csrf-token");

    expect(response.statusCode).toBe(429);
    expect(response.text).toBe(
      "Too many requests. You can only make 5 requests per second."
    );
  });
});
