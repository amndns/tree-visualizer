import {
  Visualization,
  VisualizationStatus,
} from 'datastore/collections/visualization/visualization.model';

/**
 * Checks if the visualization state is valid enough to start
 * the traversal animation.
 */
const shouldInitializeAnimation = (visualization: Visualization): boolean => {
  const { status, traversalPath, traversalPathIndex } = visualization;
  return (
    status === VisualizationStatus.Running &&
    traversalPath.length !== 0 &&
    traversalPathIndex >= 0 &&
    traversalPathIndex < traversalPath.length
  );
};

export default shouldInitializeAnimation;
