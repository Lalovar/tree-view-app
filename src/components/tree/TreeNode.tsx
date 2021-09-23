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
};

export const TreeNode = ({
  name,
  level,
  isLastNode,
  nodePath,
  updateNode,
  totalOfSibilings,
  children,
}: TreeNodeProps) => {
  const [inputValue, setInputValue] = useState("");
  const newLevel = children.length > 0 ? level + 1 : level;
  const nameWithDots =
    name.charAt(0) + getDots(level) + name.substring(1, name.length);

  const handleKeyPress = useCallback(
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

  const handlebuttonClick = useCallback((nodePath: string, name: string) => {
    updateNode(nodePath, NodeOperation.DELETE, name);
  }, []);

  const handleInputChange = useCallback(
    (event: React.SyntheticEvent<EventTarget>) => {
      const value = (event.target as HTMLInputElement).value;
      setInputValue(value);
    },
    []
  );

  return (
    <li>
      {nameWithDots}{" "}
      <span
        className="tree-remove-button"
        onClick={() => handlebuttonClick(nodePath, name)}
      >
        ❌
      </span>
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
            placeholder={`Add a new node at level ${level}`}
            className="tree-input"
            value={inputValue}
            onKeyPress={(evt) =>
              handleKeyPress(evt, nodePath, totalOfSibilings)
            }
            onChange={handleInputChange}
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
