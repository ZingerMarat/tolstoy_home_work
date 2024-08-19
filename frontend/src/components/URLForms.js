import React, { useState, useEffect } from "react";
import URLInput from "./URLInput";
import axios from "axios";

//const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function URLForms({ setMetadata }) {
  const [csrfToken, setCsrfToken] = useState(null); // Save the CSRF token in the state
  const [urls, setURLs] = useState(["", "", ""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);

  const handleChange = (index, value) => {
    const newURLs = [...urls];
    newURLs[index] = value;

    // Check for empty field after the third element
    if (value.trim() === "" && index >= 3) {
      // Remove the empty field
      newURLs.splice(index, 1);
      setURLs(newURLs);

      // Remove the corresponding input error as well
      const newInputErrors = [...inputErrors];
      newInputErrors.splice(index, 1);
      setInputErrors(newInputErrors);
    } else {
      setURLs(newURLs);

      const newInputErrors = [...inputErrors];
      if (value.trim() === "") {
        newInputErrors[index] = null;
      } else if (!validateURLs(value)) {
        newInputErrors[index] = "Invalid URL";
      } else {
        newInputErrors[index] = null;
      }
      setInputErrors(newInputErrors);
    }
  };

  const handleDelete = (index) => {
    const newURLs = urls.filter((_, i) => i !== index);
    setURLs(newURLs);

    const newInputErrors = [...inputErrors];
    newInputErrors.splice(index, 1);
    setInputErrors(newInputErrors);
  };

  useEffect(() => {
    const allFieldsFilled = urls.every((url) => url.length > 0);
    if (allFieldsFilled) {
      setURLs([...urls, ""]);
    }
  }, [urls]);

  // Validate URL
  const validateURLs = (url) => {
    const urlRegex =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/.*)?$/;
    return urlRegex.test(url);
  };

  // Normalize URL
  const normalizeURL = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    return url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputErrors.some((error) => error)) {
      setError("Please correct the invalid URLs before submitting.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Normalize URLs before sending to the server
      const normalizedUrls = urls
        .filter((url) => url.trim() !== "")
        .map(normalizeURL);

      const responce = await axios.post(
        "/fetch-metadata",
        {
          urls: normalizedUrls,
        },
        {
          headers: {
            "CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );

      setMetadata(responce.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch metadata");
    } finally {
      setLoading(false);
    }
  };

  // Fetch CSRF token
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("/api/csrf-token");
        setCsrfToken(response.data.csrfToken);
        //console.log("CSRF token:", response.data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <div>
      <h2>Insert URL's here:</h2>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", flex: 1 }}>
              <URLInput
                key={index}
                value={url}
                onChange={(value) => handleChange(index, value)}
                placeholder={`Enter URL ${index + 1}`}
              />
              {url.trim() && index > 2 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              )}
            </div>
            <div style={{ minHeight: "10px", marginTop: "5px" }}>
              {inputErrors[index] && (
                <p
                  style={{
                    color: "red",
                    fontSize: "10px",
                    margin: 0,
                  }}
                >
                  {inputErrors[index]}
                </p>
              )}
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default URLForms;
