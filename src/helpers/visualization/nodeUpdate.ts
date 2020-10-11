import { cloneDeep } from 'lodash-es';

import { NodeTypes, TreeData } from 'datastore/collections/tree/tree.model';
import { TraversalActions } from 'datastore/collections/visualization/visualization.model';
import { deselectNode } from 'helpers/tree';

import { EXPLORED_NODE_SVG_STYLE, PROCESSED_NODE_SVG_STYLE } from './constants';

/**
 * Add style to a regular node to indicate a selection has
 * occurred.
 */
export const visualizeNode = (
  node: TreeData,
  action: TraversalActions
): void => {
  switch (action) {
    case TraversalActions.Explore:
      node.nodeSvgShape = cloneDeep(EXPLORED_NODE_SVG_STYLE);
      break;

    case TraversalActions.Process:
      node.nodeSvgShape = cloneDeep(PROCESSED_NODE_SVG_STYLE);
      break;

    default:
      throw new Error('[VisualizationHelper] Invalid `TraversalActions` type.');
  }
};

/**
 * Clears the color styling of all the nodes in the tree.
 * Useful when the traversal visualization is over.
 */
export const resetTreeNodeStyles = (root: TreeData): void => {
  const currentNode = root;
  const queue: TreeData[] = [currentNode];

  while (queue.length) {
    const node = queue.shift();

    if (!node) continue;

    deselectNode(node);

    if (!node.children) continue;

    node.children.forEach((child) => {
      if (child.type === NodeTypes.Regular) {
        queue.push(child);
      }
    });
  }
};
