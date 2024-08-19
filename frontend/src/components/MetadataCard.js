import React from "react";

function MetadataCard({ url, title, description, image, error }) {
  return (
    <div style={styles.card}>
      <h3>{url}</h3>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <>
          <p>
            <strong>Title:</strong> {title}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          {image && <img src={image} alt="Metadata" style={styles.image} />}
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flex: "1 1 calc(33.333% - 20px)",
    margin: "10px",
    boxSizing: "border-box",
  },
  image: {
    maxWidth: "100px",
    marginTop: "8px",
  },
};

export default MetadataCard;
