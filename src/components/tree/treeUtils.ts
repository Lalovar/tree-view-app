export enum NodeOperation {
  CREATE,
  BRANCH,
  DELETE,
}

function setDeep(
  obj: { [key: string]: any },
  path: string[],
  value: any,
  setrecursively: boolean = false
) {
  path.reduce((a, b, level) => {
    if (
      setrecursively &&
      typeof a[b] === "undefined" &&
      level !== path.length
    ) {
      a[b] = value;
      return a[b];
    }

    if (level === path.length) {
      a[b] = value;
      return value;
    }
    return a[b];
  }, obj);
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

export function createNewNode(
  path: string,
  treeData: any,
  value?: string,
  totalOfChilds?: number
) {
  const treeDataClone = Object.assign({}, treeData);
  let finalPathArray = getNamedNodePath(path);
  finalPathArray = finalPathArray.slice(0, finalPathArray.length - 1);
  finalPathArray.push(`${totalOfChilds}`);
  setDeep(
    treeDataClone,
    finalPathArray,
    {
      name: value,
      children: [],
    },
    true
  );
  return treeDataClone;
}

function deleteKey(obj: { [key: string]: any }, keys: string[]) {
  let prop = keys.pop() ?? 0;
  let c = keys.reduce((a, c) => a[c], obj);
  if (prop && Array.isArray(c)) {
    c.splice(prop as unknown as number, 1);
  } else {
    delete c[prop];
  }
}

export function deleteNode(path: string, treeData: any) {
  const treeDataClone = Object.assign({}, treeData);
  const finalPathArray = getNamedNodePath(path);
  deleteKey(treeDataClone, finalPathArray);
  return treeDataClone;
}

export function branchNewNode(
  path: string,
  treeData: any,
  value?: string
) {
  let finalPathArray = getNamedNodePath(path);
  const treeDataClone = Object.assign({}, treeData);
  let selectedElement = treeDataClone;

  for (let index = 0; index < finalPathArray.length; index++) {
    selectedElement = selectedElement[finalPathArray[index]];
  }

  selectedElement["children"].push({
    name: value,
    children: [],
  });

  return treeDataClone;
}
