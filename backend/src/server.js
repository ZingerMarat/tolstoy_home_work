const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = "http://localhost:3000"; // Client origin URL

// CORS Configuration
app.use(
  cors({
    origin: CLIENT_ORIGIN, // Specify your client origin
    credentials: true, // Allow sending cookies
  })
);

app.use(cookieParser());

// CSRF Protection: Protect against CSRF attacks using cookies
const csrfProtection = csrf({ cookie: true });

// Rate Limiting: Limit requests to prevent abuse
const limiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many requests. You can only make 5 requests per second.",
});

app.use(express.json());
app.use(limiter);

// Start the server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Route to get a CSRF token
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  const token = req.csrfToken();
  //console.log("CSRF token:", token);
  res.json({ csrfToken: token });
});

// Helper function to fetch metadata from a given URL
const fetchMetadata = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const title = html.match(/<title>(.*?)<\/title>/);
    const description = html.match(/<meta name="description" content="(.*?)"/);
    const image = html.match(/<meta property="og:image" content="(.*?)"/);

    return {
      title: title ? title[1] : "No title found",
      description: description ? description[1] : "No description found",
      image: image ? image[1] : "No image found",
    };
  } catch (error) {
    throw new Error(`Failed to fetch metadata: ${error.message}`);
  }
};

// Route to fetch metadata for multiple URLs
app.post("/fetch-metadata", csrfProtection, async (req, res) => {
  const { urls } = req.body;

  if (!urls || urls.length === 0) {
    return res.status(400).json({ message: "No URLs provided" });
  }

  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const metadata = await fetchMetadata(url);
          return { url, metadata };
        } catch (error) {
          return { url, error: error.message };
        }
      })
    );

    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
});

// Serving static files from the build folder
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// Process all other requests except the API, sending index.html to the user
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

module.exports = app; // Export the app for testing
