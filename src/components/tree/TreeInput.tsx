import React, { useState } from "react";
import { NodeOperation } from "./treeUtils";

type ThreeInputProps = {
  placeholder?: string;
  isSideInput?: boolean;
  visible?: boolean;
  nodePath: string;
  callback: any;
  nodeOperation: NodeOperation;
  totalOfSibilings?: number;
};

export function ThreeInput({
  placeholder,
  isSideInput,
  visible,
  nodePath,
  callback,
  nodeOperation,
  totalOfSibilings,
}: ThreeInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    nodePath: string,
    callback: any,
    nodeOperation: NodeOperation,
    totalOfSibilings?: number
  ) => {
    if (event.key === "Enter") {
      if (inputValue.trim().length > 0) {
        callback(nodePath, nodeOperation, inputValue, totalOfSibilings);
        setInputValue("");
      }
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={isSideInput ? "tree-input-side" : "tree-input"}
      value={inputValue}
      onKeyPress={(evt) =>
        handleKeyPress(evt, nodePath, callback, nodeOperation, totalOfSibilings)
      }
      style={{
        display: visible ? "none" : "inline",
      }}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
