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
 * Generate a traversal path for a given traversal algorithm.
 */
export const generateTraversalPath = (
  root: TreeData,
  algorithm: VisualizationAlgorithms
): ReadonlyArray<Traversal> => {
  switch (algorithm) {
    case VisualizationAlgorithms.LevelOrder:
      return generateLevelOrderPath(root);

    default:
      throw new Error(
        '[VisualizationHelper] Invalid `VisualizationAlgorithms` type.'
      );
  }
};
