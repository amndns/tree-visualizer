import {
  NodeTypes,
  PlusNodeName,
  TreeData,
} from 'datastore/collections/tree/tree.model';
import { MAX_TREE_CHILDREN_COUNT } from './constants';

export enum NodeClickActions {
  AddNewNode,
  ShowPlusNodes,
  HidePlusNodes,
}

/**
 * Checks if the tree node has two open child 'plus' nodes.
 */
export const checkChildrenPlusNodes = (node: TreeData): boolean =>
  !!node.children &&
  node.children.length === MAX_TREE_CHILDREN_COUNT &&
  node.children[0].type === NodeTypes.Plus &&
  node.children[1].type === NodeTypes.Plus;

/**
 * Checks if the tree node only has an open left child 'plus' node.
 */
export const checkLeftChildPlusNodeOnly = (node: TreeData): boolean =>
  !!node.children &&
  node.children.length === MAX_TREE_CHILDREN_COUNT &&
  node.children[0].type === NodeTypes.Plus &&
  node.children[1].type === NodeTypes.Regular;

/**
 * Checks if the tree node only has an open right child 'plus' node.
 */
export const checkRightChildPlusNodeOnly = (node: TreeData): boolean =>
  !!node.children &&
  node.children.length === MAX_TREE_CHILDREN_COUNT &&
  node.children[0].type === NodeTypes.Regular &&
  node.children[1].type === NodeTypes.Plus;

/**
 * Checks if the tree node is a 'plus' node.
 */
export const checkPlusNode = (node: TreeData): boolean =>
  node.type === NodeTypes.Plus;

/**
 * Checks if the tree node is a regular non-'plus' node.
 */
export const checkRegularNode = (node: TreeData): boolean =>
  node.type === NodeTypes.Regular;

/**
 * Checks if the tree node is a non-'plus' leaf node.
 */
export const checkLeafNode = (node: TreeData): boolean =>
  (!node.children || node.children.length === 0) &&
  node.type === NodeTypes.Regular;

/**
 * Checks if the tree node is non-leaf node with hidden
 * 'plus' nodes as children.
 */
export const checkNonLeafNode = (node: TreeData): boolean =>
  !!node.children &&
  node.children.length === 2 &&
  ((node.children[0].type === NodeTypes.Plus &&
    node.children[0].name === PlusNodeName.Hidden) ||
    (node.children[1].type === NodeTypes.Plus &&
      node.children[1].name === PlusNodeName.Hidden));

/**
 * Retrieve the appropriate node action based on the status of the clicked node.
 */
export const getNodeClickAction = (node: TreeData): number => {
  if (node.type === NodeTypes.Plus) {
    return NodeClickActions.AddNewNode;
  }
  if (checkLeafNode(node) || checkNonLeafNode(node)) {
    return NodeClickActions.ShowPlusNodes;
  }
  return NodeClickActions.HidePlusNodes;
};
