import { useState } from "react";
import { ThreeActionIcon } from "./TreeActionIcon";
import { ThreeInput } from "./TreeInput";
import {
  getNameWithDots,
  NodeOperation,
  TreeNodeProps,
} from "./treeUtils";

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
  const [branchIconVisible, toggleBranchIconVisible] = useState(true);
  const newLevel = children.length > 0 ? level + 1 : level;

  return (
    <li>
      {getNameWithDots(name, level)}{" "}
      <ThreeActionIcon
        title={"Remove " + name}
        onClick={() => updateNode(nodePath, NodeOperation.DELETE, name)}
        value={"❌"}
      />
      <ThreeActionIcon
        title={"Add a node under " + name}
        onClick={() => toggleBranchIconVisible(!branchIconVisible)}
        value={branchIconVisible ? "➕" : "➖"}
        visible={children.length > 0}
      />
      <ThreeInput
        placeholder={`Add a node under ${name}`}
        nodePath={nodePath}
        isSideInput
        callback={updateNode}
        nodeOperation={NodeOperation.BRANCH}
        visible={children.length > 0 || branchIconVisible}
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
          <ThreeInput
            placeholder={`Add under ${parentName}`}
            nodePath={nodePath}
            callback={updateNode}
            nodeOperation={NodeOperation.CREATE}
            totalOfSibilings={totalOfSibilings}
          />
        </>
      )}
    </li>
  );
};
