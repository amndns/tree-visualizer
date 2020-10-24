import cloneDeep from 'lodash-es/cloneDeep';

import {
  NodeChildIndex,
  NodeTypes,
  PlusNodeName,
  TreeData,
} from 'datastore/collections/tree/tree.model';

import toNumber from '../utils';
import {
  VISIBLE_PLUS_NODE_SVG_STYLE,
  HIDDEN_PLUS_NODE_SVG_STYLE,
  REGULAR_NODE_SVG_STYLE,
  SELECTED_NODE_SVG_STYLE,
} from './constants';
import {
  checkLeafNode,
  checkChildrenPlusNodes,
  checkLeftChildPlusNodeOnly,
  checkRightChildPlusNodeOnly,
} from './nodeStatus';

/**
 * Return the reference to the node being located given the root of
 * the tree and the location of a node.
 */
export const getNodeByLocation = (
  root: TreeData,
  location: string
): TreeData => {
  let currentNode = root;
  location.split('').forEach((path) => {
    if (!currentNode.children) return;
    currentNode = currentNode.children[toNumber(path)];
  });
  return currentNode;
};

/**
 * Add style to a regular node to indicate a selection has occurred.
 */
export const selectNode = (node: TreeData): void => {
  node.nodeSvgShape = cloneDeep(SELECTED_NODE_SVG_STYLE);
};

/**
 * Remove styling from a regular node to indicate a deselection has occurred.
 * This can also be repurposed as a node style clearing action.
 */
export const deselectNode = (node: TreeData): void => {
  node.nodeSvgShape = cloneDeep(REGULAR_NODE_SVG_STYLE);
};

/**
 * Create a 'plus' node as a child to the current node.
 */
export const createPlusNode = (location: string, visible = true): TreeData => ({
  name: visible ? PlusNodeName.Shown : PlusNodeName.Hidden,
  location,
  type: NodeTypes.Plus,
  nodeSvgShape: visible
    ? cloneDeep(VISIBLE_PLUS_NODE_SVG_STYLE)
    : cloneDeep(HIDDEN_PLUS_NODE_SVG_STYLE),
});

/**
 * Deselect the referenced node and hide the children 'plus' nodes of
 * the referenced node by updating it.Note that updates here are done
 * by directly modifying the node being passed as a param.
 */
export const hidePlusNodeChildren = (node: TreeData): void => {
  deselectNode(node);

  if (!node.children) return;

  if (checkChildrenPlusNodes(node)) {
    delete node.children;
  } else if (checkLeftChildPlusNodeOnly(node)) {
    node.children[0].name = PlusNodeName.Hidden;
    node.children[0].nodeSvgShape = cloneDeep(HIDDEN_PLUS_NODE_SVG_STYLE);
  } else if (checkRightChildPlusNodeOnly(node)) {
    node.children[1].name = PlusNodeName.Hidden;
    node.children[1].nodeSvgShape = cloneDeep(HIDDEN_PLUS_NODE_SVG_STYLE);
  }
};

/**
 * Show the children 'plus' nodes of the referenced node by updating
 * it. Note that updates here are done by directly modifying the node
 * being passed as a param.
 */
export const showPlusNodeChildren = (node: TreeData): void => {
  selectNode(node);

  if (checkLeafNode(node)) {
    node.children = [
      createPlusNode(node.location + NodeChildIndex.Left),
      createPlusNode(node.location + NodeChildIndex.Right),
    ];
  } else if (!!node.children && checkLeftChildPlusNodeOnly(node)) {
    node.children[0].name = PlusNodeName.Shown;
    node.children[0].nodeSvgShape = cloneDeep(VISIBLE_PLUS_NODE_SVG_STYLE);
  } else if (!!node.children && checkRightChildPlusNodeOnly(node)) {
    node.children[1].name = PlusNodeName.Shown;
    node.children[1].nodeSvgShape = cloneDeep(VISIBLE_PLUS_NODE_SVG_STYLE);
  }
};

/**
 * Convert the node into a regular node.
 */
export const convertNodeToRegular = (node: TreeData, name = '0'): void => {
  node.name = name;
  node.type = NodeTypes.Regular;
  node.nodeSvgShape = cloneDeep(REGULAR_NODE_SVG_STYLE);
};

/**
 * Create a regular root node.
 */
export const createRegularNode = (name = '0', location = ''): TreeData => ({
  name,
  location,
  type: NodeTypes.Regular,
  nodeSvgShape: cloneDeep(REGULAR_NODE_SVG_STYLE),
});

/**
 * Deselect and hide the children 'plus' nodes of a node by locating it in the
 * tree and updating the referenced node. Note that updates here are done by
 * directly modifying the root of the tree being passed as a param.
 */
export const hidePlusNodesByLocation = (
  root: TreeData,
  location?: string
): void => {
  if (location === undefined) return;

  const currentNode = getNodeByLocation(root, location);
  hidePlusNodeChildren(currentNode);
};
