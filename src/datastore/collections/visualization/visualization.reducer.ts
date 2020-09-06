import {
  Visualization,
  VisualizationAction,
  VisualizationActionTypes,
  VisualizationAlgorithms,
  VisualizationStatus,
} from './visualization.model';

const reducer = (
  state: Visualization,
  action: VisualizationAction
): Visualization => {
  switch (action.type) {
    case VisualizationActionTypes.UpdateAlgorithm:
      return {
        ...state,
        algorithm: action.payload.algorithm ?? VisualizationAlgorithms.Default,
      };
    case VisualizationActionTypes.UpdateStatus:
      return {
        ...state,
        status: action.payload.status ?? VisualizationStatus.Default,
      };
    case VisualizationActionTypes.UpdateTraversalPath:
      return {
        ...state,
        traversalPath: action.payload.traversalPath ?? [],
      };
    case VisualizationActionTypes.UpdateTraversalPathIndex:
      return {
        ...state,
        traversalPathIndex: action.payload.traversalPathIndex ?? 0,
      };
    default:
      return state;
  }
};

export default reducer;
