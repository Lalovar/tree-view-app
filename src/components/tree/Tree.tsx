import { useCallback, useState } from "react";
import { TreeNode } from "./TreeNode";
import data from "./data.json";
import "./Tree.css";
import {
  branchNewNode,
  createNewNode,
  deleteNode,
  NodeOperation,
} from "./treeUtils";

export function Tree() {
  const [treeData, setTreeData] = useState(data);

  const updateNode = useCallback(
    (
      path: string,
      nodeOperation: NodeOperation,
      value?: string,
      totalOfChilds?: number
    ) => {
      switch (nodeOperation) {
        case NodeOperation.CREATE:
          setTreeData(createNewNode(path, treeData, value, totalOfChilds));
          break;
        case NodeOperation.DELETE:
          setTreeData(deleteNode(path, treeData));
          break;
        case NodeOperation.BRANCH:
          setTreeData(branchNewNode(path, treeData, value));
          break;
        default:
      }
    },
    []
  );

  return (
    <div className="tree-container">
      <div className="tree">
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
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}
