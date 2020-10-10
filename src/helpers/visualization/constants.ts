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
