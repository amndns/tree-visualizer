import cloneDeep from 'lodash-es/cloneDeep';

import {
  NodeChildIndex,
  NodeTypes,
  NodeVisibility,
  PlusNodeName,
  TreeData,
} from 'datastore/collections/tree/tree.model';

import { PLUS_NODE_SVG_STYLE, SELECTED_NODE_SVG_STYLE } from './constants';
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
    currentNode = currentNode.children[parseInt(path, 10)];
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
 * Create a 'plus' node.
 */
export const createPlusNode = (
  location: string,
  nodeChildIndex: NodeChildIndex
): TreeData => ({
  name: PlusNodeName.Shown,
  location: location + nodeChildIndex,
  type: NodeTypes.Plus,
  nodeSvgShape: cloneDeep(PLUS_NODE_SVG_STYLE),
});

/**
 * Hide the children 'plus' nodes of the referenced node by updating
 * it. Note that updates here are done by directly modifying the node
 * being passed as a param.
 */
export const hidePlusNodeChildren = (node: TreeData): void => {
  delete node.nodeSvgShape;

  if (!node.children) return;

  if (checkChildrenPlusNodes(node)) {
    delete node.children;
  } else if (checkLeftChildPlusNodeOnly(node)) {
    node.children[0].name = PlusNodeName.Hidden;
    node.children[0].nodeSvgShape.shapeProps.visibility = NodeVisibility.Hidden;
  } else if (checkRightChildPlusNodeOnly(node)) {
    node.children[1].name = PlusNodeName.Hidden;
    node.children[1].nodeSvgShape.shapeProps.visibility = NodeVisibility.Hidden;
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
      createPlusNode(node.location, NodeChildIndex.Left),
      createPlusNode(node.location, NodeChildIndex.Right),
    ];
  } else if (!!node.children && checkLeftChildPlusNodeOnly(node)) {
    node.children[0].name = PlusNodeName.Shown;
    node.children[0].nodeSvgShape.shapeProps.visibility =
      NodeVisibility.Visible;
  } else if (!!node.children && checkRightChildPlusNodeOnly(node)) {
    node.children[1].name = PlusNodeName.Shown;
    node.children[1].nodeSvgShape.shapeProps.visibility =
      NodeVisibility.Visible;
  }
};

/**
 * Create a regular node and add a selection style to it.
 */
export const createRegularNode = (node: TreeData): void => {
  node.name = '1A';
  node.type = NodeTypes.Regular;
  node.children = [
    createPlusNode(node.location, NodeChildIndex.Left),
    createPlusNode(node.location, NodeChildIndex.Right),
  ];
  selectNode(node);
};

/**
 * Hide the children 'plus' nodes of a node by locating it in the tree and
 * updating the referenced node. Note that updates here are done by directly
 * modifying the root of the tree being passed as a param.
 */
export const hidePlusNodesByLocation = (
  root: TreeData,
  location: string | null
): void => {
  if (location === null) return;

  const currentNode = getNodeByLocation(root, location);
  hidePlusNodeChildren(currentNode);
};
