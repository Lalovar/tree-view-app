import React from "react";
import { useEffect, useState } from "react";
import { synchRemoteUsers } from "../../controllers/networkOperations";
import "./UsersBar.css";

type UsersBarProps = {
  user: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export function UsersBar({ user, setError, setLoading }: UsersBarProps) {
  const [users, setUsers] = useState<any>();
  const [panelVisible, togglePanelVisible] = useState(false);

  useEffect(() => {
    synchRemoteUsers(setUsers, setError, setLoading);
  }, []);

  return (
    <div className={"users-container"}>
      {
        //<span className="user-logout">❌</span>
      }
      Welcome {user}!{" "}
      <div
        className={"user-logout user-toggle"}
        style={{
          transform: panelVisible ? "rotate(270deg)" : "rotate(90deg)",
        }}
        onClick={() => togglePanelVisible(!panelVisible)}
      >
        ➜
      </div>
      <div
        className="users-container-list"
        style={{ display: panelVisible ? "block" : "none" }}
      >
        <hr />
        <span>Online users:</span>
        <div className="users-online-list">
          {users &&
            Object.keys(users).map((key: string) => (
              <div key={users[key].username}>{users[key].username} </div>
            ))}
        </div>
      </div>
    </div>
  );
}
