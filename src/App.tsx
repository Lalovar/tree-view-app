import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { Tree, Info } from "./components";
import { UsersBar } from "./components/usersBar/UsersBar";
import { fetchRemoteData } from "./controllers/networkOperations";
import "./App.css";
import { askForUser } from "./controllers/UserUtils";

function App() {
  const [remoteData, setRemoteData] = useState();
  const [user, setUser] = useState("");
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorVisibility, setErrorVisibility] = useState(false);

  useEffect(() => {
    askForUser(setUser, setUsers);
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
      {users !== undefined && (
        <UsersBar user={user} setError={setError} setLoading={setLoading} />
      )}
      <div className="tree-container">
        {remoteData && (
          <Tree data={remoteData} setLoading={setLoading} setError={setError} />
        )}
      </div>
    </>
  );
}

export default App;
