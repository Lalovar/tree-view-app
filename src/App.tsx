import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import "./App.css";
import { Tree, Info } from "./components";
import { fetchRemoteData } from "./controllers/networkOperations";

function App() {
  const [remoteData, setRemoteData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorVisibility, setErrorVisibility] = useState(false);

  useEffect(() => {
    fetchRemoteData(setRemoteData, setError, setLoading);
  }, []);

  useEffect(() => {
    if (error !== "") {
      setErrorVisibility(true);
      setTimeout(() => {
        setErrorVisibility(false);
        setError("");
      }, 5000);
    }
  }, [error]);

  return (
    <>
      {loading && (
        <div className="loading-message">Communicating with the server...</div>
      )}
      {errorVisibility && (
        <div className="error-container error-text">{error}</div>
      )}
      <Info />
      <div className="tree-container">
        {remoteData && (
          <Tree data={remoteData} setLoading={setLoading} setError={setError} />
        )}
      </div>
    </>
  );
}

export default App;
