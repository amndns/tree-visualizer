import { StrictNodeSvgShape } from 'datastore/collections/tree/tree.model';
import {
  VisualizationAlgorithms,
  VisualizationSpeed,
} from 'datastore/collections/visualization/visualization.model';

/**
 * UI-friendly display for the visualization algorithm options.
 */
export const VISUALIZATION_ALGORITHMS_DISPLAY = {
  [VisualizationAlgorithms.LevelOrder]: 'Level-Order',
  [VisualizationAlgorithms.PreOrder]: 'Pre-Order',
  [VisualizationAlgorithms.InOrder]: 'In-Order',
  [VisualizationAlgorithms.PostOrder]: 'Post-Order',
};

/**
 * UI-friendly display for the visualization speed options.
 */
export const VISUALIZATION_SPEED_DISPLAY = {
  [VisualizationSpeed.Fast]: 'Fast',
  [VisualizationSpeed.Average]: 'Average',
  [VisualizationSpeed.Slow]: 'Slow',
};

/**
 * Visualization speed option to millisecond mapping.
 */
export const VISUALIZATION_SPEED_MAPPING = {
  [VisualizationSpeed.Fast]: 250,
  [VisualizationSpeed.Average]: 550,
  [VisualizationSpeed.Slow]: 800,
};

/**
 * Style indicator that a node has been explored in the traversal
 * algorithm. Friendly reminder to deep clone the constant to avoid
 * any accidental updates.
 */
export const EXPLORED_NODE_SVG_STYLE: Readonly<StrictNodeSvgShape> = {
  shape: 'circle',
  shapeProps: {
    r: 30,
    stroke: 'blue', // CHANGE_ME
    strokeWidth: 10,
    fill: '#FFFFFF',
  },
};

/**
 * Style indicator that a node has been processed in the traversal
 * algorithm. Friendly reminder to deep clone the constant to avoid
 * any accidental updates.
 */
export const PROCESSED_NODE_SVG_STYLE: Readonly<StrictNodeSvgShape> = {
  shape: 'circle',
  shapeProps: {
    r: 30,
    stroke: 'green', // CHANGE_ME
    strokeWidth: 10,
    fill: '#FFFFFF',
  },
};
