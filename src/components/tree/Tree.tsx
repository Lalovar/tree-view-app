import "./Tree.css";
import data from "./data.json";

export function Tree() {
  const treeData = data;
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
                    children={animalNode.children}
                    key={`${animalNode.name}-${index}`}
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

type TreeNodeType = {
  name: String;
  level: number;
  children: TreeNodeType[] | [];
};

const TreeNode = ({ name, level, children }: TreeNodeType) => {
  const newLevel = children.length > 0 ? level + 1 : level;
  const nameWithDots =
    name.charAt(0) + getDots(level) + name.substring(1, name.length);

  return (
    <li>
      {nameWithDots}
      {children.map((childNode, index) => {
        return (
          <ol>
            <TreeNode
              name={childNode.name}
              level={newLevel}
              children={childNode.children}
              key={`${childNode.name}-${index}-${newLevel}`}
            />
          </ol>
        );
      })}
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
