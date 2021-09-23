export enum NodeOperation {
  CREATE,
  UPDATE,
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

export function createNewNode(
  path: string,
  treeData: any,
  value?: string,
  totalOfChilds?: number
) {
  const pathArray = path.split(".");
  const treeDataClone = Object.assign({}, treeData);
  let finalPathArray = [] as string[];
  for (let index = 0; index < pathArray.length; index++) {
    finalPathArray.push("children");
    finalPathArray.push(pathArray[index]);
  }
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
  const pathArray = path.split(".");
  const treeDataClone = Object.assign({}, treeData);
  let finalPathArray = [] as string[];
  for (let index = 0; index < pathArray.length; index++) {
    finalPathArray.push("children");
    finalPathArray.push(pathArray[index]);
  }
  deleteKey(treeDataClone, finalPathArray);
  return treeDataClone;
}
