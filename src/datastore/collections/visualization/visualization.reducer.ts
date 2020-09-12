import {
  Visualization,
  VisualizationAction,
  VisualizationActionTypes,
} from './visualization.model';

const reducer = (
  state: Visualization,
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
