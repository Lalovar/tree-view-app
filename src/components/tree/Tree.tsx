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
  return (
    <li>
      {name}
      {children.map((childNode, index) => {
        return (
          <ol>
            <TreeNode
              name={childNode.name}
              level={level}
              children={childNode.children}
              key={`${childNode.name}-${index}-${level}`}
            />
          </ol>
        );
      })}
    </li>
  );
};
