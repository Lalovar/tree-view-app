import React from "react";
import { useCallback, useState } from "react";
import { TreeNode } from "./TreeNode";
import "./Tree.css";
import {
  createNode,
  deleteNode,
  NodeOperation,
  NodeType,
} from "../../controllers/treeUtils";
import { ThreeInput } from "./TreeInput";
import {
  fetchRemoteData,
  updateRemoteData,
} from "../../controllers/networkOperations";

type TreeProps = {
  data?: {
    name: string;
    children: NodeType[];
  };
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export function Tree({ data, setLoading, setError }: TreeProps) {
  const [treeData, setTreeData] = useState(data);

  const updateNode = useCallback(
    (path: string, nodeOperation: NodeOperation, value?: string) => {
      setLoading(true);
      if (
        value?.length &&
        (nodeOperation === NodeOperation.CREATE ||
          nodeOperation === NodeOperation.BRANCH)
      ) {
        setTreeData(createNode(path, treeData, value, nodeOperation));
        updateRemoteData(treeData, nodeOperation, setError, setLoading);
      }
      if (nodeOperation === NodeOperation.DELETE) {
        setTreeData(deleteNode(path, treeData));
        updateRemoteData(treeData, nodeOperation, setError, setLoading);
      }
    },
    [treeData]
  );

  return (
    <div className="tree">
      <button
        onClick={() => fetchRemoteData(setTreeData, setError, setLoading)}
      >
        Sych data with server
      </button>
      {treeData && (
        <ol>
          <li>
            {treeData.name}
            <ol>
              {treeData.children.map((animalNode, index) => {
                return (
                  <TreeNode
                    name={animalNode.name}
                    level={1}
                    isLastNode={index + 1 === treeData.children.length}
                    nodePath={`${index}`}
                    updateNode={updateNode}
                    totalOfSibilings={treeData.children.length}
                    children={animalNode.children}
                    key={`${animalNode.name}-${index}`}
                    parentName={treeData.name}
                  />
                );
              })}
              <ThreeInput
                placeholder={`add node under ${treeData.name}`}
                nodePath={""}
                callback={updateNode}
                nodeOperation={NodeOperation.CREATE}
                totalOfSibilings={treeData.children.length}
                visible={treeData.children.length !== 0}
              />
            </ol>
          </li>
        </ol>
      )}
    </div>
  );
}
