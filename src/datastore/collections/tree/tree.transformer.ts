import { createPlusNode, createRegularNode } from 'helpers/tree';

import { NodeChildIndex, NodeTypes, TreeData } from './tree.model';

// fix all any
const isValidTreeDataArray = (treeDataArray: any[]) =>
  Array.isArray(treeDataArray) &&
  treeDataArray.length > 0 &&
  treeDataArray[0] !== null;

// fill me
// const isValidTreeNodeValue = (treeNodeValue: any) =>

export const deserializeTreeData = (
  serializeTreeData: string | null
): TreeData | [] => {
  const treeDataArray = JSON.parse(serializeTreeData ?? '[]');

  if (!isValidTreeDataArray(treeDataArray)) return [];

  const root = createRegularNode(treeDataArray[0].toString());
  const queue: [TreeData, number][] = [[root, 0]];

  while (queue.length) {
    const queueElem = queue.shift();

    if (!queueElem) continue;

    const [parent, treeIdx] = queueElem;
    const leftIdx = treeIdx * 2 + 1;
    const rightIdx = treeIdx * 2 + 2;

    if (
      parent.type === NodeTypes.Plus ||
      (leftIdx >= treeDataArray.length && rightIdx >= treeDataArray.length) ||
      (treeDataArray[leftIdx] === null && treeDataArray[rightIdx] === null)
    ) {
      continue;
    }

    parent.children = [
      leftIdx < treeDataArray.length && treeDataArray[leftIdx] !== null
        ? createRegularNode(
            treeDataArray[leftIdx].toString(),
            parent.location + NodeChildIndex.Left
          )
        : createPlusNode(parent.location + NodeChildIndex.Left, false),
      rightIdx < treeDataArray.length && treeDataArray[rightIdx] !== null
        ? createRegularNode(
            treeDataArray[rightIdx].toString(),
            parent.location + NodeChildIndex.Right
          )
        : createPlusNode(parent.location + NodeChildIndex.Right, false),
    ];

    queue.push([parent.children[NodeChildIndex.Left], leftIdx]);
    queue.push([parent.children[NodeChildIndex.Right], rightIdx]);
  }

  return root;
};

export const serializeTreeData = 2;

// [1,2,null,null,3,4]
// queue [2]
// 1
