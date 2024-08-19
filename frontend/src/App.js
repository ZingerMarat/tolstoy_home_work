import React, { useState } from "react";
import "./App.css";
import URLForms from "./components/URLForms";
import MetadataResults from "./components/MetadataResults";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  const [metadata, setMetadata] = useState([]);

  return (
    <div className="App">
      <header style={styles.header}>
        <h1>URL Metadata Fetcher</h1>
      </header>
      <div style={styles.container}>
        <div style={styles.leftPane}>
          <URLForms setMetadata={setMetadata} />
        </div>
        <div style={styles.rightPane}>
          <MetadataResults metadata={metadata} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    textAlign: "center",
    padding: "20px",
    borderBottom: "1px solid #ddd",
  },
  container: {
    display: "flex",
    height: "calc(100vh - 80px)",
  },
  leftPane: {
    flex: 1,
    padding: "20px",
  },
  rightPane: {
    flex: 2,
    padding: "20px",
  },
};

export default App;
