import { useRef, useEffect } from "react";

export enum NodeOperation {
  CREATE,
  BRANCH,
  DELETE,
}

export type NodeType = {
  name: string;
  children: NodeType[] | [];
};

export type TreeNodeProps = {
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

export function getNameWithDots(name: string, level: number) {
  return name.charAt(0) + getDots(level) + name.substring(1, name.length);
}

export function createNode(
  path: string,
  treeData: any,
  value: string,
  nodeOperation: NodeOperation
) {
  const treeDataClone = Object.assign({}, treeData);
  let finalPathArray = getNamedNodePath(path);
  let selectedElement = treeDataClone;
  if (nodeOperation === NodeOperation.CREATE) {
    finalPathArray = finalPathArray.slice(0, finalPathArray.length - 2);
  }

  for (let index = 0; index < finalPathArray.length; index++) {
    selectedElement = selectedElement[finalPathArray[index]];
  }

  selectedElement["children"].push({
    name: value,
    children: [],
  });

  return treeDataClone;
}

export function deleteNode(path: string, treeData: any) {
  const treeDataClone = Object.assign({}, treeData);
  const finalPathArray = getNamedNodePath(path);
  deleteKey(treeDataClone, finalPathArray);
  return treeDataClone;
}

const getDots = (totalOfDots: number) => {
  let dotsString = "";
  while (totalOfDots-- > 0) {
    dotsString += ".";
  }
  return dotsString;
};

function deleteKey(obj: { [key: string]: any }, keys: string[]) {
  let prop = keys.pop() ?? 0;
  let c = keys.reduce((a, c) => a[c], obj);
  if (prop && Array.isArray(c)) {
    c.splice(prop as unknown as number, 1);
  } else {
    delete c[prop];
  }
}

function getNamedNodePath(path: string) {
  const pathArray = path.split(".");
  let finalPathArray = [] as string[];
  for (let index = 0; index < pathArray.length; index++) {
    finalPathArray.push("children");
    finalPathArray.push(pathArray[index]);
  }
  return finalPathArray;
}
