import { createPlusNode, createRegularNode } from 'helpers/tree';
import toNumber from 'helpers/utils';

import { NodeChildIndex, NodeTypes, TreeData } from './tree.model';

type TreeDataArray = (number | null)[];

/**
 * Checks if the input tree data array is valid. A tree data array
 * is the LeetCode style flattened version of the tree data. This
 * array contains the node values of the tree data in level-order
 * sequence (including the null values of the tree).
 */
const isValidTreeDataArray = (treeDataArray: TreeDataArray[]) =>
  Array.isArray(treeDataArray) &&
  treeDataArray.length > 0 &&
  treeDataArray[0] !== null;

/**
 * Prunes the suffix null values of tree data array.
 */
const pruneTreeDataArray = (treeDataArray: TreeDataArray): TreeDataArray => {
  let nodeIdx = treeDataArray.length - 1;

  while (nodeIdx >= 0) {
    if (treeDataArray[nodeIdx] !== null) break;
    treeDataArray.pop();
    nodeIdx -= 1;
  }

  return treeDataArray;
};

/**
 * Handles the deserialization of the tree data array in JSON format
 * by converting it into a tree data format that we use all throughout
 * the application. Since the tree data array is a sequence of node
 * values in a level-order manner, the deserialization is achieved by
 * iterating through those node values and building them in a level-order
 * manner too.
 */
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

/**
 * Handles the serialization of the tree data by converting it into a
 * tree data array format and then converting it to JSON. The
 * serialization is achieved by traversing the tree in a level-order
 * manner and then pushing them into the tree data array. The complex
 * part is identifying the amount of null values to push in between
 * node values in the tree data array.
 */
export const serializeTreeData = (treeData: TreeData | []): string => {
  if (treeData === []) return '[]';

  let treeDataArray: TreeDataArray = [];
  let treeLevel = 0;

  const currentNode = treeData as TreeData;
  const queue: [TreeData, number][] = [[currentNode, 0]];

  while (queue.length) {
    const numNodesInLevel = 1 << treeLevel;
    let numNodesInQueueToProcess = queue.length;
    let numNodesSoFar = 0;
    let prevNodeIdx = -1;

    while (numNodesInQueueToProcess > 0) {
      const stackElem = queue.shift();

      if (!stackElem) break;

      const [node, currNodeIdx] = stackElem;

      if (prevNodeIdx === -1 && currNodeIdx !== 0) {
        treeDataArray = treeDataArray.concat(Array(currNodeIdx).fill(null));
      } else if (
        prevNodeIdx !== currNodeIdx - 1 &&
        prevNodeIdx !== currNodeIdx
      ) {
        treeDataArray = treeDataArray.concat(
          Array(currNodeIdx - prevNodeIdx - 1).fill(null)
        );
      }

      treeDataArray.push(toNumber(node.name));

      numNodesSoFar = currNodeIdx + 1;
      numNodesInQueueToProcess -= 1;
      prevNodeIdx = currNodeIdx;

      if (!node.children) continue;

      if (node.children[NodeChildIndex.Left].type === NodeTypes.Regular) {
        queue.push([node.children[NodeChildIndex.Left], 2 * currNodeIdx]);
      }

      if (node.children[NodeChildIndex.Right].type === NodeTypes.Regular) {
        queue.push([node.children[NodeChildIndex.Right], 2 * currNodeIdx + 1]);
      }
    }

    if (numNodesSoFar !== numNodesInLevel) {
      treeDataArray = treeDataArray.concat(
        Array(numNodesInLevel - numNodesSoFar).fill(null)
      );
    }

    treeLevel += 1;
  }

  pruneTreeDataArray(treeDataArray);
  return JSON.stringify(treeDataArray);
};
