import { Tree } from './collections/tree/tree.model';
import { initialTreeState } from './collections/tree';
import { Visualization } from './collections/visualization/visualization.model';
import { initialVisualizationState } from './collections/visualization';

export interface RootState {
  tree: Tree;
  visualization: Visualization;
}

const initialRootState = {
  tree: initialTreeState,
  visualization: initialVisualizationState,
};

export default initialRootState;
