import { NodeTypes, TreeData } from 'datastore/collections/tree/tree.model';
import {
  Traversal,
  TraversalActions,
  VisualizationAlgorithms,
} from 'datastore/collections/visualization/visualization.model';

/**
 * Generate a traversal path for the Level-Order traversal algorithm.
 */
export const generateLevelOrderPath = (
  root: TreeData
): ReadonlyArray<Traversal> => {
  const currentNode = root;
  const traversalPath: Traversal[] = [];
  const queue: TreeData[] = [currentNode];

  while (queue.length) {
    const node = queue.shift();

    if (!node) continue;

    traversalPath.push({
      location: node.location,
      action: TraversalActions.Explore,
    });
    traversalPath.push({
      location: node.location,
      action: TraversalActions.Process,
    });

    if (!node.children) continue;

    node.children.forEach((child) => {
      if (child.type === NodeTypes.Regular) {
        queue.push(child);
      }
    });
  }

  return traversalPath;
};

/**
 * Generate a traversal path for the Pre-Order traversal algorithm.
 */
export const generatePreOrderPath = (
  root: TreeData
): ReadonlyArray<Traversal> => {
  const currentNode = root;
  const traversalPath: Traversal[] = [];
  const stack: TreeData[] = [currentNode];

  while (stack.length) {
    const node = stack.pop();

    if (!node) continue;

    traversalPath.push({
      location: node.location,
      action: TraversalActions.Explore,
    });
    traversalPath.push({
      location: node.location,
      action: TraversalActions.Process,
    });

    if (!node.children) continue;

    node.children
      .slice()
      .reverse()
      .forEach((child) => {
        if (child.type === NodeTypes.Regular) {
          stack.push(child);
        }
      });
  }

  return traversalPath;
};

/**
 * Generate a traversal path for the In-Order traversal algorithm.
 */
export const generateInOrderPath = (
  root: TreeData
): ReadonlyArray<Traversal> => {
  const currentNode = root;
  const traversalPath: Traversal[] = [];
  const stack: TreeData[] = [];

  let node: TreeData | null | undefined = currentNode;

  while (stack.length || node) {
    while (node && node.type === NodeTypes.Regular) {
      stack.push(node);
      traversalPath.push({
        location: node.location,
        action: TraversalActions.Explore,
      });

      if (node.children && node.children[0]) {
        [node] = node.children;
      } else {
        node = null;
      }
    }

    node = stack.pop();

    if (!node) continue;

    traversalPath.push({
      location: node.location,
      action: TraversalActions.Process,
    });

    if (node.children && node.children[1]) {
      [, node] = node.children;
    } else {
      node = null;
    }
  }

  return traversalPath;
};

/**
 * Generate a traversal path for the Post-Order traversal algorithm.
 */
export const generatePostOrderPath = (
  root: TreeData
): ReadonlyArray<Traversal> => {
  const currentNode = root;
  const traversalPath: Traversal[] = [];
  const stack: [TreeData, boolean][] = [[currentNode, false]];

  while (stack.length) {
    const stackElem = stack.pop();

    if (!stackElem) continue;

    const [node, visited] = stackElem;

    if (visited) {
      traversalPath.push({
        location: node.location,
        action: TraversalActions.Process,
      });
    } else {
      traversalPath.push({
        location: node.location,
        action: TraversalActions.Explore,
      });

      stack.push([node, true]);

      if (!node.children) continue;

      node.children
        .slice()
        .reverse()
        .forEach((child) => {
          if (child.type === NodeTypes.Regular) {
            stack.push([child, false]);
          }
        });
    }
  }

  return traversalPath;
};

/**
 * Generate a traversal path for a given traversal algorithm.
 */
export const generateTraversalPath = (
  root: TreeData,
  algorithm: VisualizationAlgorithms
): ReadonlyArray<Traversal> => {
  switch (algorithm) {
    case VisualizationAlgorithms.LevelOrder:
      return generateLevelOrderPath(root);

    case VisualizationAlgorithms.PreOrder:
      return generatePreOrderPath(root);

    case VisualizationAlgorithms.InOrder:
      return generateInOrderPath(root);

    case VisualizationAlgorithms.PostOrder:
      return generatePostOrderPath(root);

    default:
      throw new Error(
        '[VisualizationHelper] Invalid `VisualizationAlgorithms` type.'
      );
  }
};
