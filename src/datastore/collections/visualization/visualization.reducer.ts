import {
  Visualization,
  VisualizationAction,
  VisualizationActionPayload,
  VisualizationActionTypes,
  VisualizationAlgorithms,
  VisualizationSpeed,
  VisualizationStatus,
} from './visualization.model';

export const initialVisualizationState: Visualization = {
  algorithm: VisualizationAlgorithms.Default,
  speed: VisualizationSpeed.Default,
  status: VisualizationStatus.Default,
  traversalPath: [],
  traversalPathIndex: 0,
};

export const updateVisualization = (
  payload: VisualizationActionPayload
): VisualizationAction => ({
  type: VisualizationActionTypes.UpdateVisualization,
  payload,
});

const reducer = (
  state: Visualization = initialVisualizationState,
  action: VisualizationAction
): Visualization => {
  switch (action.type) {
    case VisualizationActionTypes.UpdateVisualization:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
