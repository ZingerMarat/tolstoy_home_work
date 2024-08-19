import React from "react";
import MetadataCard from "./MetadataCard";

function MetadataResults({ metadata }) {
  return (
    <div>
      <h2>Metadata Results:</h2>
      <div style={styles.cardContainer}>
        {metadata && metadata.length > 0 ? (
          metadata.map((item, index) => (
            <MetadataCard
              key={index}
              url={item.url}
              title={item.metadata?.title}
              description={item.metadata?.description}
              image={item.metadata?.image}
              error={item.error}
            />
          ))
        ) : (
          <div style={styles.noResultsContainer}>
            <p>No results yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  noResultsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    textAlign: "center",
  },
};

export default MetadataResults;
