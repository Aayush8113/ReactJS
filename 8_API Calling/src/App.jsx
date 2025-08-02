import React from "react";
import API from "./components/API";
const App = () => {
  return (
    <>
      {/* <h1>Dog Image Fetcher</h1> */}
      {/* <p>Select a dog breed to see a random image.</p> */}
      <API />
      <footer style={{ marginTop: "20px" }}>
        {/* <p>Powered by Dog CEO's Dog API</p> */}
      </footer>
    </>
  );
};

export default App;
