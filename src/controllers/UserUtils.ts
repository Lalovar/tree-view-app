import React from "react";
import { fetchRemoteUsers, updateRemoteUsers } from "./networkOperations";

export function askForUser(
  setUser: React.Dispatch<React.SetStateAction<any>>,
  setUsers: React.Dispatch<React.SetStateAction<any>>
) {
  let user = prompt(
    `Enter a username to enjoy semi collaborative session. Should have between 2 and 10 characters`
  );
  if (user === undefined || user === null) {
    setUsers(undefined);
    return;
  }
  user = user?.trim() ?? "";
  if (user?.trim().length < 2 || user?.trim().length > 10) {
    askForUser(setUser, setUsers);
  } else {
    setUser(user);
    fetchRemoteUsers().then(function (response) {
      const activeUsers = response.data;
      setUsers(activeUsers);
      activeUsers.push({
        username: user,
        timestamp: Date.now(),
      });
      updateRemoteUsers(activeUsers);
    });
  }
}

export function getActiveUsers(users: any) {
  const activeUsers: { username: any; timestamp: any }[] = [];
  Object.keys(users).forEach((key: string) => {
    const userTimestamp = users[key].timestamp;
    const userDate = new Date(userTimestamp);
    const dateNow = Date.now();
    const diffTime = Math.abs(dateNow - userDate.getTime());
    const diffSeconds = Math.ceil(diffTime / 1000);
    if (diffSeconds < 120) {
      activeUsers.push({
        username: users[key].username,
        timestamp: users[key].timestamp,
      });
    }
  });
  return activeUsers;
}
