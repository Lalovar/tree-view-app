import React from "react";
import axios from "axios";
import { NodeOperation } from "./treeUtils";
import { getActiveUsers } from "./UserUtils";

export function fetchRemoteData(
  setRemoteData: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  axios
    .get("https://api.jsonbin.io/b/614cf83d4a82881d6c543f40/latest")
    .then(function (response) {
      setRemoteData(response.data);
    })
    .catch(function () {
      setError("Error fetching the server, using offline data");
    })
    .then(function () {
      setLoading(false);
    });
}

export function updateRemoteData(
  data: any,
  nodeOperation: NodeOperation,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  axios({
    method: "put",
    url: "https://api.jsonbin.io/b/614cf83d4a82881d6c543f40",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$gZgOGJz.7Fm5nZgxgQK2GeeaPXqdGK1FuODgwVIIfl.OzhuOrgS1e",
    },
    data,
  })
    .catch(function () {
      const errorMsg =
        nodeOperation === NodeOperation.DELETE ? "removing" : "adding";
      setError(`Error ${errorMsg} the data into the server`);
    })
    .then(function () {
      setLoading(false);
    });
}

export function synchRemoteUsers(
  setRemoteData: React.Dispatch<any>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLoading(true);
  axios
    .get("https://api.jsonbin.io/b/614d7a814a82881d6c546293/latest")
    .then(function (response) {
      const activeUsers = getActiveUsers(response.data);
      setRemoteData(activeUsers);
      if (activeUsers.length) {
        updateRemoteUsers(activeUsers, setError);
      }
    })
    .catch(function () {
      setError("Error synching users");
    })
    .then(function () {
      setLoading(false);
    });
}

export function fetchRemoteUsers() {
  return axios.get("https://api.jsonbin.io/b/614d7a814a82881d6c546293/latest");
}

export function updateRemoteUsers(
  data: any,
  setError?: React.Dispatch<React.SetStateAction<string>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (setLoading) {
    setLoading(true);
  }
  axios({
    method: "put",
    url: "https://api.jsonbin.io/b/614d7a814a82881d6c546293",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$gZgOGJz.7Fm5nZgxgQK2GeeaPXqdGK1FuODgwVIIfl.OzhuOrgS1e",
    },
    data,
  })
    .catch(function () {
      if (setError) {
        setError("Error synching users");
      }
    })
    .then(function () {
      if (setLoading) {
        setLoading(false);
      }
    });
}
