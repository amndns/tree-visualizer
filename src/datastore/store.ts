import { Tree } from './collections/tree/tree.model';
import { Visualization } from './collections/visualization/visualization.model';

export interface RootState {
  tree: Tree;
  visualization: Visualization;
}
