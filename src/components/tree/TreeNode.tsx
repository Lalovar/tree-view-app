import React, { useCallback, useState } from "react";
import { NodeOperation } from "./treeUtils";

type NodeType = {
  name: string;
  children: NodeType[] | [];
};

type TreeNodeProps = {
  name: string;
  level: number;
  isLastNode: boolean;
  nodePath: string;
  updateNode: (
    path: string,
    nodeOperation: NodeOperation,
    value?: string,
    totalOfChilds?: number
  ) => void;
  totalOfSibilings: number;
  children: NodeType[] | [];
  parentName: string;
};

export const TreeNode = ({
  name,
  level,
  isLastNode,
  nodePath,
  updateNode,
  totalOfSibilings,
  children,
  parentName,
}: TreeNodeProps) => {
  const [inputValue, setInputValue] = useState("");
  const [inputBranchValue, setInputBranchValue] = useState("");
  const [branchIconVisible, toggleBranchIconVisible] = useState(true);
  const newLevel = children.length > 0 ? level + 1 : level;
  const nameWithDots =
    name.charAt(0) + getDots(level) + name.substring(1, name.length);
  const shouldDisplayBranchControllers = children.length || !branchIconVisible;

  const handleKeyPressAdd = useCallback(
    (
      event: React.KeyboardEvent<HTMLInputElement>,
      nodePath: string,
      totalOfSibilings: number
    ) => {
      if (event.key === "Enter") {
        updateNode(
          nodePath,
          NodeOperation.CREATE,
          inputValue,
          totalOfSibilings
        );
        setInputValue("");
      }
    },
    [inputValue]
  );

  const handleInputChange = useCallback(
    (
      event: React.SyntheticEvent<EventTarget>,
      setStateFun: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const value = (event.target as HTMLInputElement).value;
      setStateFun(value);
    },
    []
  );

  const handleKeyPressBranch = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, nodePath: string) => {
      if (event.key === "Enter") {
        console.log(inputBranchValue);
        updateNode(nodePath, NodeOperation.BRANCH, inputBranchValue);
        setInputBranchValue("");
      }
    },
    [inputBranchValue]
  );

  return (
    <li>
      {nameWithDots}{" "}
      <span
        title={"Remove " + name}
        className="tree-button"
        onClick={() => updateNode(nodePath, NodeOperation.DELETE, name)}
      >
        ❌
      </span>{" "}
      <span
        title={"Add a node under " + name}
        className="tree-button"
        onClick={() => toggleBranchIconVisible(!branchIconVisible)}
        style={{
          display: shouldDisplayBranchControllers ? "none" : "inline",
        }}
      >
        ➕
      </span>
      <input
        type="text"
        placeholder={`Add a node under ${name}`}
        className="tree-input-side"
        value={inputBranchValue}
        onKeyPress={(evt) => handleKeyPressBranch(evt, nodePath)}
        style={{
          display: children.length || branchIconVisible ? "none" : "inline",
        }}
        onChange={(e) => handleInputChange(e, setInputBranchValue)}
      />
      {children.map((childNode, index) => {
        return (
          <ol>
            <TreeNode
              name={childNode.name}
              level={newLevel}
              isLastNode={index + 1 === children.length}
              nodePath={`${nodePath}.${index}`}
              updateNode={updateNode}
              totalOfSibilings={children.length}
              children={childNode.children}
              parentName={name}
              key={`${childNode.name}-${index}-${newLevel}`}
            />
          </ol>
        );
      })}
      {isLastNode && (
        <>
          <br />
          <input
            type="text"
            placeholder={`Add under ${parentName}`}
            className="tree-input"
            value={inputValue}
            onKeyPress={(evt) =>
              handleKeyPressAdd(evt, nodePath, totalOfSibilings)
            }
            onChange={(e) => handleInputChange(e, setInputValue)}
          />
        </>
      )}
    </li>
  );
};

const getDots = (totalOfDots: number) => {
  let dotsString = "";
  while (totalOfDots-- > 0) {
    dotsString += ".";
  }
  return dotsString;
};
