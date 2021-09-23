import { useCallback, useState } from "react";
import { TreeNode } from "./TreeNode";
import data from "./data.json";
import "./Tree.css";
import { createNode, deleteNode, NodeOperation } from "./treeUtils";
import { ThreeInput } from "./TreeInput";

export function Tree() {
  const [treeData, setTreeData] = useState(data);

  const updateNode = useCallback(
    (path: string, nodeOperation: NodeOperation, value?: string) => {
      if (
        value?.length &&
        (nodeOperation === NodeOperation.CREATE ||
          nodeOperation === NodeOperation.BRANCH)
      ) {
        setTreeData(createNode(path, treeData, value, nodeOperation));
      }
      if (nodeOperation === NodeOperation.DELETE) {
        setTreeData(deleteNode(path, treeData));
      }
    },
    [treeData]
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
      </div>
    </div>
  );
}
