import { initialPlaygroundState } from './collections/playground';
import { Playground } from './collections/playground/playground.model';
import { initialTreeState } from './collections/tree';
import { Tree } from './collections/tree/tree.model';
import { initialVisualizationState } from './collections/visualization';
import { Visualization } from './collections/visualization/visualization.model';

export interface RootState {
  playground: Playground;
  tree: Tree;
  visualization: Visualization;
}

const initialRootState = {
  playground: initialPlaygroundState,
  tree: initialTreeState,
  visualization: initialVisualizationState,
};

export default initialRootState;
